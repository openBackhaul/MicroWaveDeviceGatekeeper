'use strict';


const WriteDataToLive = require('./individualServices/WriteDataToLive')
const createHttpError = require('http-errors');
const IndividualServiceUtility = require('./individualServices/IndividualServiceUtility')

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
exports.postMacInterfaceRpcForProvidingLearnedMacAdresses = function (user, originator, xCorrelator, traceIndicator, customerJourney, mountName) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "response-code": 200,
      "mac-fd-1-0:mac-table-entry-list": [{
        "affected-mac-fd": "mac-fd-001",
        "mac-address": "11:22:5e:00:53:af",
        "vlan-id": 17,
        "egress-ltp": "mac-ltp-012"
      }, {
        "affected-mac-fd": "mac-fd-001",
        "mac-address": "11:22:33:44:55:66",
        "vlan-id": 34,
        "egress-ltp": "mac-ltp-012"
      }]
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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
exports.putLiveAirInterfacePerformanceMonitoringIsOn = function (body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "response-code": 204
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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
exports.putLiveAirInterfaceTransimitterIsOn = function (body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "response-code": 204
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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
  let responseCodeLiveResponse = "";
  try {
    let mountNamevalue = mountName;
    let requestBody = body;

    let eatlRequestHeaders = {
      user: user,
      originator: originator,
      xCorrelator: xCorrelator,
      traceIndicator: traceIndicator,
      customerJourney: customerJourney
    };
    const forwardingName = "PutToLiveControlConstructExternalLabelCausesWritingIntoDevice";
    const stringName = "controllerInternalPathToMountPoint";
    let pathParams = [];

    let stringValue = await IndividualServiceUtility.getStringProfileInstanceValue(stringName);
    pathParams.push(stringValue, mountNamevalue);
    responseCodeLiveResponse = await WriteDataToLive.RequestForProvidingPutDataFromLive(requestBody, forwardingName, pathParams, stringName, eatlRequestHeaders);

    if (responseCodeLiveResponse == "File not found") {
      return new createHttpError.NotFound("File not found");
    }
    else if (responseCodeLiveResponse.responseCode) {
      return {
        "response-code": responseCodeLiveResponse.responseCode
      };
    }
    else {
      return {
        "response-code": " "
      };
    }
  } catch (error) {
    console.log(error)
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
exports.putLiveEthernetContainerPerformanceMonitoringIsOn = function (body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "response-code": 204
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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
exports.putLiveHybridMwStructurePerformanceMonitoringIsOn = function (body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "response-code": 204
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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
exports.putLiveLtpExternalLabel = function (body, mountName, uuid, user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "response-code": 204
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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
exports.putLivePureEthernetStructurePerformanceMonitoringIsOn = function (body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "response-code": 204
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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
exports.putLiveWireInterfacePerformanceMonitoringIsOn = function (body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  return new Promise(function (resolve, reject) {
    var examples = {};
    examples['application/json'] = {
      "response-code": 204
    };
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
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
