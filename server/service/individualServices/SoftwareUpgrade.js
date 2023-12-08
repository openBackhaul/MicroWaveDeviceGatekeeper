/**
 * @file This module provides functionality to migrate the data from the current version to the next version. 
 * @module SoftwareUpgrade
 **/

const operationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');
const httpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');
const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const onfAttributeFormatter = require('onf-core-model-ap/applicationPattern/onfModel/utility/OnfAttributeFormatter');
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const FcPort = require('onf-core-model-ap/applicationPattern/onfModel/models/FcPort');
const eventDispatcher = require('onf-core-model-ap/applicationPattern/rest/client/eventDispatcher');
const logicalTerminationPoint = require('onf-core-model-ap/applicationPattern/onfModel/models/LogicalTerminationPoint');
const ForwardingConstruct = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingConstruct');
var traceIncrementer = 1;

/**
 * This method performs the set of procedure to transfer the data from this version to next version 
 * of the application and bring the new release official
 * @param {String} user User identifier from the system starting the service call
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator Sequence of request numbers along the flow
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies
   @returns {Promise} Promise is resolved if the operation succeeded else the Promise is rejected 
* **/
exports.upgradeSoftwareVersion = async function (user, xCorrelator, traceIndicator, customerJourney, newApplicationDetails) {
  await PromptForBequeathingDataCausesUnsubscribingFromControllerNotificationsAtNP(user, xCorrelator, traceIndicator, customerJourney);
  await replaceOldReleaseWithNewRelease(user, xCorrelator, traceIndicator, customerJourney, newApplicationDetails);
}

/**
 * Prepare attributes and automate PromptForBequeathingDataCausesUnsubscribingFromControllerNotificationsAtNP<br>
 * @param {String} user User identifier from the system starting the service call
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator Sequence of request numbers along the flow
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies
 * @returns {boolean} return true if the operation is success or else return false
 */
async function PromptForBequeathingDataCausesUnsubscribingFromControllerNotificationsAtNP(user, xCorrelator, traceIndicator, customerJourney){
  return new Promise(async function (resolve, reject) {
    try {
        let result = true;
        let forwardingKindNameOfTheBequeathOperation = "PromptForBequeathingDataCausesUnsubscribingFromControllerNotificationsAtNP";
        let forwardingKindNameOfTheODLNotificationListener= "PromptForEmbeddingCausesSubscribingForNotifications";
        
        let operationClientUuidOfTheODLNotificationListener = await resolveHttpClientLtpUuidFromForwardingName(forwardingKindNameOfTheODLNotificationListener);
        let listOfOperationToBeUnsubscribed = [];
        let oDLNotificationListenerOperationName = await operationClientInterface.getOperationNameAsync(operationClientUuidOfTheODLNotificationListener);
        listOfOperationToBeUnsubscribed.push(oDLNotificationListenerOperationName);
        /***********************************************************************************
         * Preparing requestBody 
         ************************************************************************************/
        try {
            for (let i = 0; i < listOfOperationToBeUnsubscribed.length; i++) {

                let applicationName = await httpServerInterface.getApplicationNameAsync();
                let releaseNumber = await httpServerInterface.getReleaseNumberAsync();
                let subscriptionName = listOfOperationToBeUnsubscribed[i];

                /***********************************************************************************
                 * PromptForBequeathingDataCausesEndingSubscriptionsToOldRelease
                 *   /v1/end-subscription
                 ************************************************************************************/
                let requestBody = {};
                requestBody.subscriberApplication = applicationName;
                requestBody.subscriberReleaseNumber = releaseNumber;
                requestBody.subscription = subscriptionName;
                requestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(requestBody);
                result = await forwardRequest(
                    forwardingKindNameOfTheBequeathOperation,
                    requestBody,
                    user,
                    xCorrelator,
                    traceIndicator + "." + traceIncrementer++,
                    customerJourney
                );
                if (!result) { //prathiba
                    throw forwardingKindNameOfTheBequeathOperation + "forwarding is not success for the input" + JSON.stringify(requestBody);
                }
            }

        } catch (error) {
            console.log(error);
            throw "operation is not success";
        }

        resolve(result);
    } catch (error) {
        reject(error);
    }
});
}

/**
 * This method performs the set of procedure to replace the old release with the new release
 * @param {String} user User identifier from the system starting the service call
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator Sequence of request numbers along the flow
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies
 * The following are the list of forwarding-construct that will be automated to replace the old release with the new release
 * 1. PromptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement
 * 2. PromptForBequeathingDataCausesRequestForDeregisteringOfOldRelease
 */
async function replaceOldReleaseWithNewRelease(user, xCorrelator, traceIndicator, customerJourney, newApplicationDetails) {
  await promptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement(user, xCorrelator, traceIndicator, customerJourney, newApplicationDetails);
  await promptForBequeathingDataCausesRequestForDeregisteringOfOldRelease(user, xCorrelator, traceIndicator, customerJourney, newApplicationDetails);
}

/**
 * Prepare attributes and automate PromptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement<br>
 * @param {String} user User identifier from the system starting the service call
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator Sequence of request numbers along the flow
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies
 * @returns {boolean} return true if the operation is success or else return false
 */
async function promptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement(user, xCorrelator, traceIndicator, customerJourney, newApplicationDetails) {
  return new Promise(async function (resolve, reject) {
    try {
      let result = true;
      let forwardingKindNameOfTheBequeathOperation = "PromptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement";

      /***********************************************************************************
       * Preparing requestBody 
       ************************************************************************************/
      try {
        let currentApplicationName = await httpServerInterface.getApplicationNameAsync();
        let currentReleaseNumber = await httpServerInterface.getReleaseNumberAsync();
        let newApplicationName = newApplicationDetails["new-application-name"];
        let newReleaseNumber = newApplicationDetails["new-application-release"];
        let newApplicationAddress = newApplicationDetails["new-application-address"];
        let newApplicationPort = newApplicationDetails["new-application-port"];
        let newApplicationProtocol = newApplicationDetails["new-application-protocol"];

        /***********************************************************************************
         * PromptForBequeathingDataCausesRequestForBroadcastingInfoAboutServerReplacement
         *   /v1/relay-server-replacement
         ************************************************************************************/
        let requestBody = {};
        requestBody.currentApplicationName = currentApplicationName;
        requestBody.currentReleaseNumber = currentReleaseNumber;
        requestBody.futureApplicationName = newApplicationName;
        requestBody.futureReleaseNumber = newReleaseNumber;
        requestBody.futureProtocol = newApplicationProtocol;
        requestBody.futureAddress = newApplicationAddress;
        requestBody.futurePort = newApplicationPort;
        requestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(requestBody);
        result = await forwardRequest(
          forwardingKindNameOfTheBequeathOperation,
          requestBody,
          user,
          xCorrelator,
          traceIndicator + "." + traceIncrementer++,
          customerJourney
        );
        if (!result) {
          throw forwardingKindNameOfTheBequeathOperation + "forwarding is not success for the input" + JSON.stringify(requestBody);
        }

      } catch (error) {
        console.log(error);
        throw "operation is not success";
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Prepare attributes and automate PromptForBequeathingDataCausesRequestForDeregisteringOfOldRelease<br>
 * @param {String} user User identifier from the system starting the service call
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses
 * @param {String} traceIndicator Sequence of request numbers along the flow
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies
 * @returns {boolean} return true if the operation is success or else return false
 */
async function promptForBequeathingDataCausesRequestForDeregisteringOfOldRelease(user, xCorrelator, traceIndicator, customerJourney, newApplicationDetails) {
  return new Promise(async function (resolve, reject) {
    try {
      let result = true;
      let forwardingKindNameOfTheBequeathOperation = "PromptForBequeathingDataCausesRequestForDeregisteringOfOldRelease";

      /***********************************************************************************
       * Preparing requestBody 
       ************************************************************************************/
      try {
        let oldApplicationName = await httpServerInterface.getApplicationNameAsync();
        let oldReleaseNumber = await httpServerInterface.getReleaseNumberAsync();
        let newReleaseNumber = newApplicationDetails["new-application-release"];

        if (oldReleaseNumber != newReleaseNumber) {
          /***********************************************************************************
           * PromptForBequeathingDataCausesRequestForDeregisteringOfOldRelease
           *   /v1/deregister-application
           ************************************************************************************/
          let requestBody = {};
          requestBody.applicationName = oldApplicationName;
          requestBody.releaseNumber = oldReleaseNumber;
          requestBody = onfAttributeFormatter.modifyJsonObjectKeysToKebabCase(requestBody);
          result = await forwardRequest(
            forwardingKindNameOfTheBequeathOperation,
            requestBody,
            user,
            xCorrelator,
            traceIndicator + "." + traceIncrementer++,
            customerJourney
          );
          if (!result) {
            throw forwardingKindNameOfTheBequeathOperation + "forwarding is not success for the input" + JSON.stringify(requestBody);
          }
        }
      } catch (error) {
        console.log(error);
        throw "operation is not success";
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * @description This function automates the forwarding construct by calling the appropriate call back operations based on the fcPort input and output directions.
 * @param {String} forwardingKindName forwarding Name
 * @param {list}   attributeList list of attributes required during forwarding construct automation(to send in the request body)
 * @param {String} user user who initiates this request
 * @param {string} originator originator of the request
 * @param {string} xCorrelator flow id of this request
 * @param {string} traceIndicator trace indicator of the request
 * @param {string} customerJourney customer journey of the request
 **/
async function forwardRequest(forwardingKindName, attributeList, user, xCorrelator, traceIndicator, customerJourney) {
  let forwardingConstructInstance = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingKindName);
  let operationClientUuid = (getFcPortOutputLogicalTerminationPointList(forwardingConstructInstance))[0];
  let result = await eventDispatcher.dispatchEvent(
    operationClientUuid,
    attributeList,
    user,
    xCorrelator,
    traceIndicator,
    customerJourney
  );
  return result;
}

function getFcPortOutputLogicalTerminationPointList(forwardingConstructInstance) {
  let fcPortOutputLogicalTerminationPointList = [];
  let fcPortList = forwardingConstructInstance[
    onfAttributes.FORWARDING_CONSTRUCT.FC_PORT];
  for (let i = 0; i < fcPortList.length; i++) {
    let fcPort = fcPortList[i];
    let fcPortPortDirection = fcPort[onfAttributes.FC_PORT.PORT_DIRECTION];
    if (fcPortPortDirection == FcPort.portDirectionEnum.OUTPUT) {
      let fclogicalTerminationPoint = fcPort[onfAttributes.FC_PORT.LOGICAL_TERMINATION_POINT];
      fcPortOutputLogicalTerminationPointList.push(fclogicalTerminationPoint);
    }
  }
  return fcPortOutputLogicalTerminationPointList;
}


/**
 * function to get the output fc-port LTP uuid of the provided forwarding name
 * @param {string} forwardingName of the forwardingConstruct
 * @returns {String} operation client uuid
 */
async function resolveHttpClientLtpUuidFromForwardingName(forwardingName) {
  let ForwardConstructName = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingName);
  if (ForwardConstructName === undefined) {
    return null;
  }
  let operationClientUuid;
  let ForwardConstructUuid = ForwardConstructName[onfAttributes.GLOBAL_CLASS.UUID];
  let ListofUuid = await ForwardingConstruct.getFcPortListAsync(ForwardConstructUuid);
  for (let i = 0; i < ListofUuid.length; i++) {
    let PortDirection = ListofUuid[i][[onfAttributes.FC_PORT.PORT_DIRECTION]];
    if (PortDirection === FcPort.portDirectionEnum.OUTPUT) {
      operationClientUuid = ListofUuid[i][onfAttributes.CONTROL_CONSTRUCT.LOGICAL_TERMINATION_POINT];
    }
  }
  return operationClientUuid;
}