'use strict';


const ODLOperations = require('./OpenDayLightClient/ODLOperations')
const IndividualServiceUtility = require('./individualServices/IndividualServiceUtility')
const responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
const createHttpError = require('http-errors');

/**
 * Initiates process of embedding a new release
 *
 * body V1_bequeathyourdataanddie_body 
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.bequeathYourDataAndDie = function (body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}


/**
 * Provides LearnedMacAdresses from live network
 *
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * mountName String The mountName of the device that is addressed by the request
 * returns inline_response_200_7
 **/
exports.postMacInterfaceRpcForProvidingLearnedMacAdresses = async function (mountName, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let response = {};
  let mountNamevalue = mountName;
  try {
    /****************************************************************************************
     * Setting up request header object for making eatl request
     ****************************************************************************************/
    let eatlRequestHeaders = {
      user: user,
      originator: originator,
      xCorrelator: xCorrelator,
      traceIndicator: traceIndicator,
      customerJourney: customerJourney
    };
    let requestBody = {}
    /****************************************************************************************
     * Prepare attributes to intiate ODL request
     ****************************************************************************************/

    const forwardingName = "PostToLiveRpcForProvidingLearnedMacAdressesCausesInitiatingRpcExecutionOnDevice";
    const stringName = "controllerInternalPathToMountPointForRpcs";
    let stringValue = await IndividualServiceUtility.getStringProfileInstanceValue(stringName);

    let pathParams = [];
    pathParams.push(stringValue, mountNamevalue);

    /****************************************************************************************
     * Perform ODL request and formulate final response
     ****************************************************************************************/

    let responseFromODL = await ODLOperations.postToLive(requestBody, forwardingName, pathParams, stringName, eatlRequestHeaders);
    let responseCode = responseFromODL.responseCode
    if (responseCode) {
      response["response-code"] = responseCode;
      let responseData = responseFromODL.responseData;
      let responseDataFromODL = [];
      if (responseData && responseCode.toString().startsWith("2")) {
        responseDataFromODL = responseData["mac-fd-1-0:output"]['mac-table-entry-list']
        for (const key in responseDataFromODL) {
          for (const prop in responseDataFromODL[key]) {
            if (prop == "vlan-id") {
              const parsed = parseInt(responseDataFromODL[key][prop]);
              responseDataFromODL[key][prop] = isNaN(parsed) ? responseDataFromODL[key][prop] : parsed;
            }
          }
        }
      }

      response["mac-fd-1-0:mac-table-entry-list"] = responseDataFromODL;
    } else {
      response["response-code"] = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    }
    return response;
  } catch (error) {
    if (error.message == 'Not Found') {
      throw new createHttpError.NotFound();
    }
    console.log(error);
    return response;
  }
}


/**
 * Provides list of devices that are connected to the controller
 *
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * returns inline_response_200
 **/
exports.provideListOfConnectedDevices = function (user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "mount-name-list": ["305251234", "105258888"]
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Configures AirInterface PerformanceMonitoringIsOn in live network
 *
 * body Airinterfaceconfiguration_performancemonitoringison_body 
 * mountName String The mountName of the device that is addressed by the request
 * uuid String Instance identifier that is unique within the device
 * localId String Instance identifier that is unique within its list
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * returns inline_response_200_4
 **/
exports.putLiveAirInterfacePerformanceMonitoringIsOn = async function (body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let response = {};
  let mountNamevalue = mountName;
  let requestBody = body;
  let ltpUuid = uuid;
  if (ltpUuid.includes('+')) {
    ltpUuid = ltpUuid.split('+')[1]
  }
  let ltpLocalId = localId;
  try {
    /****************************************************************************************
     * Setting up request header object for making eatl request
     ****************************************************************************************/
    let eatlRequestHeaders = {
      user: user,
      originator: originator,
      xCorrelator: xCorrelator,
      traceIndicator: traceIndicator,
      customerJourney: customerJourney
    };

    /****************************************************************************************
     * Prepare attributes to intiate ODL request
     ****************************************************************************************/

    const forwardingName = "PutToLiveAirInterfacePerformanceMonitoringIsOnCausesWritingIntoDevice";
    const stringName = "controllerInternalPathToMountPoint";
    let stringValue = await IndividualServiceUtility.getStringProfileInstanceValue(stringName);

    let pathParams = [];
    pathParams.push(stringValue, mountNamevalue, ltpUuid, ltpLocalId);

    /****************************************************************************************
     * Perform ODL request and formulate final response
     ****************************************************************************************/

    let responseFromODL = await ODLOperations.writeToLive(requestBody, forwardingName, pathParams, stringName, eatlRequestHeaders);
    if (responseFromODL.responseCode) {
      response["response-code"] = responseFromODL.responseCode;
    } else {
      response["response-code"] = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    }
    return response;
  } catch (error) {
    if (error.message == 'Not Found') {
      throw new createHttpError.NotFound();
    }
    console.log(error);
    return response;
  }
}


/**
 * Configures AirInterface TransmitterIsOn in live network
 *
 * body Airinterfaceconfiguration_transmitterison_body 
 * mountName String The mountName of the device that is addressed by the request
 * uuid String Instance identifier that is unique within the device
 * localId String Instance identifier that is unique within its list
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * returns inline_response_200_3
 **/
exports.putLiveAirInterfaceTransimitterIsOn = async function (body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let response = {};
  let mountNamevalue = mountName;
  let requestBody = body;
  let ltpUuid = uuid;
  if (ltpUuid.includes('+')) {
    ltpUuid = ltpUuid.split('+')[1]
  }
  let ltpLocalId = localId;
  try {
    /****************************************************************************************
     * Setting up request header object for making eatl request
     ****************************************************************************************/
    let eatlRequestHeaders = {
      user: user,
      originator: originator,
      xCorrelator: xCorrelator,
      traceIndicator: traceIndicator,
      customerJourney: customerJourney
    };

    /****************************************************************************************
     * Prepare attributes to intiate ODL request
     ****************************************************************************************/

    const forwardingName = "PutToLiveAirInterfaceTransmitterIsOnCausesWritingIntoDevice";
    const stringName = "controllerInternalPathToMountPoint";
    let stringValue = await IndividualServiceUtility.getStringProfileInstanceValue(stringName);

    let pathParams = [];
    pathParams.push(stringValue, mountNamevalue, ltpUuid, ltpLocalId);

    /****************************************************************************************
     * Perform ODL request and formulate final response
     ****************************************************************************************/

    let responseFromODL = await ODLOperations.writeToLive(requestBody, forwardingName, pathParams, stringName, eatlRequestHeaders);
    if (responseFromODL.responseCode) {
      response["response-code"] = responseFromODL.responseCode;
    } else {
      response["response-code"] = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    }
    return response;
  } catch (error) {
    if (error.message == 'Not Found') {
      throw new createHttpError.NotFound();
    }
    console.log(error);
    return response;
  }
}


/**
 * Writes external label into ControlConstruct of live network
 *
 * body Equipmentaugment10controlconstructpac_externallabel_body 
 * mountName String The mountName of the device that is addressed by the request
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * returns inline_response_200_1
 **/
exports.putLiveControlConstructExternalLabel = async function (body, mountName, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let response = {};
  let mountNamevalue = mountName;
  let requestBody = body;
  try {
    /****************************************************************************************
     * Setting up request header object for making eatl request
     ****************************************************************************************/
    let eatlRequestHeaders = {
      user: user,
      originator: originator,
      xCorrelator: xCorrelator,
      traceIndicator: traceIndicator,
      customerJourney: customerJourney
    };

    /****************************************************************************************
     * Prepare attributes to intiate ODL request
     ****************************************************************************************/

    const forwardingName = "PutToLiveControlConstructExternalLabelCausesWritingIntoDevice";
    const stringName = "controllerInternalPathToMountPoint";
    let stringValue = await IndividualServiceUtility.getStringProfileInstanceValue(stringName);

    let pathParams = [];
    pathParams.push(stringValue, mountNamevalue);

    /****************************************************************************************
     * Perform ODL request and formulate final response
     ****************************************************************************************/

    let responseFromODL = await ODLOperations.writeToLive(requestBody, forwardingName, pathParams, stringName, eatlRequestHeaders);
    if (responseFromODL.responseCode) {
      response["response-code"] = responseFromODL.responseCode;
    } else {
      response["response-code"] = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    }
    return response;
  } catch (error) {
    if (error.message == 'Not Found') {
      throw new createHttpError.NotFound();
    }
    console.log(error);
    return response;
  }
}

/**
 * Configures EthernetContainer PerformanceMonitoringIsOn in live network
 *
 * body Ethernetcontainerconfiguration_performancemonitoringison_body 
 * mountName String The mountName of the device that is addressed by the request
 * uuid String Instance identifier that is unique within the device
 * localId String Instance identifier that is unique within its list
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * returns inline_response_200_5
 **/
exports.putLiveEthernetContainerPerformanceMonitoringIsOn = async function (body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let response = {};
  let mountNamevalue = mountName;
  let requestBody = body;
  let ltpUuid = uuid;
  if (ltpUuid.includes('+')) {
    ltpUuid = ltpUuid.split('+')[1]
  }
  let ltpLocalId = localId;
  try {
    /****************************************************************************************
     * Setting up request header object for making eatl request
     ****************************************************************************************/
    let eatlRequestHeaders = {
      user: user,
      originator: originator,
      xCorrelator: xCorrelator,
      traceIndicator: traceIndicator,
      customerJourney: customerJourney
    };

    /****************************************************************************************
     * Prepare attributes to intiate ODL request
     ****************************************************************************************/

    const forwardingName = "PutToLiveEthernetContainerPerformanceMonitoringIsOnCausesWritingIntoDevice";
    const stringName = "controllerInternalPathToMountPoint";
    let stringValue = await IndividualServiceUtility.getStringProfileInstanceValue(stringName);

    let pathParams = [];
    pathParams.push(stringValue, mountNamevalue, ltpUuid, ltpLocalId);

    /****************************************************************************************
     * Perform ODL request and formulate final response
     ****************************************************************************************/

    let responseFromODL = await ODLOperations.writeToLive(requestBody, forwardingName, pathParams, stringName, eatlRequestHeaders);
    if (responseFromODL.responseCode) {
      response["response-code"] = responseFromODL.responseCode;
    } else {
      response["response-code"] = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    }
    return response;
  } catch (error) {
    if (error.message == 'Not Found') {
      throw new createHttpError.NotFound();
    }
    console.log(error);
    return response;
  }
}


/**
 * Configures HybridMwStructure PerformanceMonitoringIsOn in live network
 *
 * body Hybridmwstructureconfiguration_performancemonitoringison_body 
 * mountName String The mountName of the device that is addressed by the request
 * uuid String Instance identifier that is unique within the device
 * localId String Instance identifier that is unique within its list
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * returns inline_response_200_6
 **/
exports.putLiveHybridMwStructurePerformanceMonitoringIsOn = async function (body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let response = {};
  let mountNamevalue = mountName;
  let requestBody = body;
  let ltpUuid = uuid;
  if (ltpUuid.includes('+')) {
    ltpUuid = ltpUuid.split('+')[1]
  }
  let ltpLocalId = localId;
  try {
    /****************************************************************************************
     * Setting up request header object for making eatl request
     ****************************************************************************************/
    let eatlRequestHeaders = {
      user: user,
      originator: originator,
      xCorrelator: xCorrelator,
      traceIndicator: traceIndicator,
      customerJourney: customerJourney
    };

    /****************************************************************************************
     * Prepare attributes to intiate ODL request
     ****************************************************************************************/

    const forwardingName = "PutToLiveHybridMwStructurePerformanceMonitoringIsOnCausesWritingIntoDevice";
    const stringName = "controllerInternalPathToMountPoint";
    let stringValue = await IndividualServiceUtility.getStringProfileInstanceValue(stringName);

    let pathParams = [];
    pathParams.push(stringValue, mountNamevalue, ltpUuid, ltpLocalId);

    /****************************************************************************************
     * Perform ODL request and formulate final response
     ****************************************************************************************/

    let responseFromODL = await ODLOperations.writeToLive(requestBody, forwardingName, pathParams, stringName, eatlRequestHeaders);
    if (responseFromODL.responseCode) {
      response["response-code"] = responseFromODL.responseCode;
    } else {
      response["response-code"] = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    }
    return response;
  } catch (error) {
    if (error.message == 'Not Found') {
      throw new createHttpError.NotFound();
    }
    console.log(error);
    return response;
  }
}


/**
 * Writes external label into LTP of live network
 *
 * body Ltpaugment10ltpaugmentpac_externallabel_body 
 * mountName String The mountName of the device that is addressed by the request
 * uuid String Instance identifier that is unique within the device
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * returns inline_response_200_2
 **/
exports.putLiveLtpExternalLabel = async function (body, mountName, uuid, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let response = {};
  let mountNamevalue = mountName;
  let requestBody = body;
  let ltpUuid = uuid;
  if (ltpUuid.includes('+')) {
    ltpUuid = ltpUuid.split('+')[1]
  }

  try {
    /****************************************************************************************
     * Setting up request header object for making eatl request
     ****************************************************************************************/
    let eatlRequestHeaders = {
      user: user,
      originator: originator,
      xCorrelator: xCorrelator,
      traceIndicator: traceIndicator,
      customerJourney: customerJourney
    };

    /****************************************************************************************
     * Prepare attributes to intiate ODL request
     ****************************************************************************************/

    const forwardingName = "PutToLiveLtpExternalLabelCausesWritingIntoDevice";
    const stringName = "controllerInternalPathToMountPoint";
    let stringValue = await IndividualServiceUtility.getStringProfileInstanceValue(stringName);

    let pathParams = [];
    pathParams.push(stringValue, mountNamevalue, ltpUuid);

    /****************************************************************************************
     * Perform ODL request and formulate final response
     ****************************************************************************************/

    let responseFromODL = await ODLOperations.writeToLive(requestBody, forwardingName, pathParams, stringName, eatlRequestHeaders);
    if (responseFromODL.responseCode) {
      response["response-code"] = responseFromODL.responseCode;
    } else {
      response["response-code"] = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    }
    return response;
  } catch (error) {
    if (error.message == 'Not Found') {
      throw new createHttpError.NotFound();
    }
    console.log(error);
    return response;
  }
}


/**
 * Configures PureEthernetStructure PerformanceMonitoringIsOn in live network
 *
 * body Pureethernetstructureconfiguration_performancemonitoringison_body 
 * mountName String The mountName of the device that is addressed by the request
 * uuid String Instance identifier that is unique within the device
 * localId String Instance identifier that is unique within its list
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * returns inline_response_200_8
 **/
exports.putLivePureEthernetStructurePerformanceMonitoringIsOn = async function (body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let response = {};
  let mountNamevalue = mountName;
  let requestBody = body;
  let ltpUuid = uuid;
  if (ltpUuid.includes('+')) {
    ltpUuid = ltpUuid.split('+')[1]
  }
  let ltpLocalid = localId
  try {
    /****************************************************************************************
     * Setting up request header object for making eatl request
     ****************************************************************************************/
    let eatlRequestHeaders = {
      user: user,
      originator: originator,
      xCorrelator: xCorrelator,
      traceIndicator: traceIndicator,
      customerJourney: customerJourney
    };

    /****************************************************************************************
     * Prepare attributes to intiate ODL request
     ****************************************************************************************/

    const forwardingName = "PutToLivePureEthernetStructurePerformanceMonitoringIsOnCausesWritingIntoDevice";
    const stringName = "controllerInternalPathToMountPoint";
    let stringValue = await IndividualServiceUtility.getStringProfileInstanceValue(stringName);

    let pathParams = [];
    pathParams.push(stringValue, mountNamevalue, ltpUuid, ltpLocalid);

    /****************************************************************************************
     * Perform ODL request and formulate final response
     ****************************************************************************************/

    let responseFromODL = await ODLOperations.writeToLive(requestBody, forwardingName, pathParams, stringName, eatlRequestHeaders);
    if (responseFromODL.responseCode) {
      response["response-code"] = responseFromODL.responseCode;
    } else {
      response["response-code"] = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    }
    return response;
  } catch (error) {
    if (error.message == 'Not Found') {
      throw new createHttpError.NotFound();
    }
    console.log(error);
    return response;
  }
}


/**
 * Configures WireInterface PerformanceMonitoringIsOn in live network
 *
 * body Wireinterfaceconfiguration_performancemonitoringison_body 
 * mountName String The mountName of the device that is addressed by the request
 * uuid String Instance identifier that is unique within the device
 * localId String Instance identifier that is unique within its list
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * returns inline_response_200_9
 **/
exports.putLiveWireInterfacePerformanceMonitoringIsOn = async function (body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let response = {};
  let mountNamevalue = mountName;
  let requestBody = body;
  let ltpUuid = uuid;
  if (ltpUuid.includes('+')) {
    ltpUuid = ltpUuid.split('+')[1]
  }
  let ltpLocalid = localId
  try {
    /****************************************************************************************
     * Setting up request header object for making eatl request
     ****************************************************************************************/
    let eatlRequestHeaders = {
      user: user,
      originator: originator,
      xCorrelator: xCorrelator,
      traceIndicator: traceIndicator,
      customerJourney: customerJourney
    };

    /****************************************************************************************
     * Prepare attributes to intiate ODL request
     ****************************************************************************************/

    const forwardingName = "PutToLiveWireInterfacePerformanceMonitoringIsOnCausesWritingIntoDevice";
    const stringName = "controllerInternalPathToMountPoint";
    let stringValue = await IndividualServiceUtility.getStringProfileInstanceValue(stringName);

    let pathParams = [];
    pathParams.push(stringValue, mountNamevalue, ltpUuid, ltpLocalid);

    /****************************************************************************************
     * Perform ODL request and formulate final response
     ****************************************************************************************/

    let responseFromODL = await ODLOperations.writeToLive(requestBody, forwardingName, pathParams, stringName, eatlRequestHeaders);
    if (responseFromODL.responseCode) {
      response["response-code"] = responseFromODL.responseCode;
    } else {
      response["response-code"] = responseCodeEnum.code.INTERNAL_SERVER_ERROR;
    }
    return response;
  } catch (error) {
    if (error.message == 'Not Found') {
      throw new createHttpError.NotFound();
    }
    console.log(error);
    return response;
  }
}


/**
 * Receives notifications about attribute value changes at the Controller
 *
 * body V1_regardcontrollerattributevaluechange_body 
 * user String User identifier from the system starting the service call
 * originator String 'Identification for the system consuming the API, as defined in  [/core-model-1-4:control-construct/logical-termination-point={uuid}/layer-protocol=0/http-client-interface-1-0:http-client-interface-pac/http-client-interface-configuration/application-name]' 
 * xCorrelator String UUID for the service execution flow that allows to correlate requests and responses
 * traceIndicator String Sequence of request numbers along the flow
 * customerJourney String Holds information supporting customer’s journey to which the execution applies
 * no response value expected for this operation
 **/
exports.regardControllerAttributeValueChange = function (body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(function (resolve, reject) {
    resolve();
  });
}