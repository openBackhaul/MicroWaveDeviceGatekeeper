'use strict';


const ODLOperations = require('./OpenDayLightClient/ODLOperations');
const IndividualServiceUtility = require('./individualServices/IndividualServiceUtility');
const ProfileCollection = require('onf-core-model-ap/applicationPattern/onfModel/models/ProfileCollection');
const Profile = require('onf-core-model-ap/applicationPattern/onfModel/models/Profile');

const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const forwardingConstructAutomationInput = require('onf-core-model-ap/applicationPattern/onfModel/services/models/forwardingConstruct/AutomationInput');
const HttpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');
const tcpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpServerInterface');
const operationServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationServerInterface');
const ForwardingAutomationService = require('onf-core-model-ap/applicationPattern/onfModel/services/ForwardingConstructAutomationServices');
const HttpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const onfFormatter = require('onf-core-model-ap/applicationPattern/onfModel/utility/OnfAttributeFormatter');

/**
 * Embed yourself into the MBH SDN application layer
 *
 * body V1_embedyourself_body 
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.embedYourself = async function (user, xCorrelator, traceIndicator, customerJourney, operationServerName) {
  try {

    /****************************************************************************************
     * Start CyclicLoadingOfDeviceListFromController and SubscribingForNotifications 
     ****************************************************************************************/
    startCyclicLoadingOfDeviceListFromController(user, xCorrelator, traceIndicator, customerJourney);
    subscribeToControllerNotification(user, xCorrelator, traceIndicator, customerJourney, operationServerName);

  } catch (error) {
    console.log(error);
  }
}

async function subscribeToControllerNotification(user, xCorrelator, traceIndicator, customerJourney, operationServerName) {
  let forwardingConstructAutomationList = [];
  try {
    /***********************************************************************************
     * PromptForEmbeddingCausesSubscribingForNotifications 
     * /v1/notify-controller-attribute-value-changes
     ************************************************************************************/
    let subscribingForNotificationForwardingName = "PromptForEmbeddingCausesSubscribingForNotifications";
    let subscribingForNotificationContext;
    let subscribingForNotificationRequestBody = {};
    subscribingForNotificationRequestBody.subscribingApplicationName = await HttpServerInterface.getApplicationNameAsync();
    subscribingForNotificationRequestBody.subscribingApplicationRelease = await HttpServerInterface.getReleaseNumberAsync();
    subscribingForNotificationRequestBody.notificationsReceivingOperation = await operationServerInterface.getOperationNameAsync("mwdg-1-0-1-op-s-is-000");
    subscribingForNotificationRequestBody.subscribingApplicationAddress = await tcpServerInterface.getLocalAddressForForwarding();
    subscribingForNotificationRequestBody.subscribingApplicationPort = await tcpServerInterface.getLocalPort();
    subscribingForNotificationRequestBody.subscribingApplicationProtocol = await tcpServerInterface.getLocalProtocol();
    subscribingForNotificationRequestBody = onfFormatter.modifyJsonObjectKeysToKebabCase(subscribingForNotificationRequestBody);
    let forwardingAutomation = new forwardingConstructAutomationInput(
      subscribingForNotificationForwardingName,
      subscribingForNotificationRequestBody,
      subscribingForNotificationContext
    );
    forwardingConstructAutomationList.push(forwardingAutomation);

    ForwardingAutomationService.automateForwardingConstructAsync(
      operationServerName,
      forwardingConstructAutomationList,
      user,
      xCorrelator,
      traceIndicator,
      customerJourney
    );

  } catch (error) {
    reject(error);
  }
}


async function startCyclicLoadingOfDeviceListFromController(user, xCorrelator, traceIndicator, customerJourney) {
  try {

    /****************************************************************************************
     * Setting up request header object for making eatl request
     ****************************************************************************************/
    let originator = await HttpServerInterface.getApplicationNameAsync();
    let eatlRequestHeaders = {
      user: user,
      originator: originator,
      xCorrelator: xCorrelator,
      traceIndicator: traceIndicator,
      customerJourney: customerJourney
    };

    /****************************************************************************************
     * Prepare attributes to start the cyclic process and to intiate ODL request
     ****************************************************************************************/
    let deviceListSyncPeriod = await getDeviceListSyncPeriod()
    let deviceListSyncPeriodInMilliseconds = deviceListSyncPeriod * 3600000;

    const forwardingName = "PromptForEmbeddingCausesCyclicLoadingOfDeviceListFromController";
    const prefixStringName = "controllerInternalPathToMountPoint";
    const fieldsFilterStringName = forwardingName + ".fieldsFilter";
    let requestBody = {}
    let stringValue = await IndividualServiceUtility.getStringProfileInstanceValue(prefixStringName);

    let pathParams = [];
    pathParams.push(stringValue);

    /****************************************************************************************
     * Perform ODL request to load the device list from the controller
     ****************************************************************************************/
    updateDeviceListFromController(requestBody, forwardingName, pathParams, fieldsFilterStringName, eatlRequestHeaders);
    setInterval(() => {
      updateDeviceListFromController(requestBody, forwardingName, pathParams, fieldsFilterStringName, eatlRequestHeaders);
    }, deviceListSyncPeriodInMilliseconds);

  } catch (error) {
    console.log(error);
  }
}

async function updateDeviceListFromController(requestBody, forwardingName, pathParams, fieldsFilterStringName, eatlRequestHeaders) {
  try {
    let responseFromODLController = await ODLOperations.readFromLive(requestBody, forwardingName, pathParams, fieldsFilterStringName, eatlRequestHeaders);
    global.networkTopologyList = responseFromODLController.responseData["network-topology:topology"][0]["node"];
    console.log("****************** Updated device list ******************");
    console.log(global.networkTopologyList);
  } catch (error) {
    console.log(error);
  }
}


async function getDeviceListSyncPeriod() {
  let deviceListSyncPeriod;
  let profileNameOfdeviceListSyncPeriod = "deviceListSyncPeriod";
  try {
    let integerProfileList = await ProfileCollection.getProfileListForProfileNameAsync(Profile.profileNameEnum.INTEGER_PROFILE);
    let integerProfile = integerProfileList.find(integerProfile => integerProfile[
      onfAttributes.INTEGER_PROFILE.PAC][
      onfAttributes.INTEGER_PROFILE.CAPABILITY
    ][
      onfAttributes.INTEGER_PROFILE.INTEGER_NAME
    ] === profileNameOfdeviceListSyncPeriod);
    deviceListSyncPeriod = integerProfile[
      onfAttributes.INTEGER_PROFILE.PAC][
      onfAttributes.INTEGER_PROFILE.CONFIGURATION
    ][
      onfAttributes.INTEGER_PROFILE.INTEGER_VALUE
    ];
  } catch (error) {
    console.log(error);
  }
  return deviceListSyncPeriod;
}