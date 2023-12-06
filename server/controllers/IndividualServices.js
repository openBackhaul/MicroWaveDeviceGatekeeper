'use strict';

var utils = require('../utils/writer.js');
var IndividualServices = require('../service/IndividualServicesService');
var responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
var restResponseHeader = require('onf-core-model-ap/applicationPattern/rest/server/ResponseHeader');
var restResponseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
var executionAndTraceService = require('onf-core-model-ap/applicationPattern/services/ExecutionAndTraceService');
 

module.exports.bequeathYourDataAndDie = async function bequeathYourDataAndDie (req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument = {};
  await IndividualServices.bequeathYourDataAndDie(body, user, originator, xCorrelator, traceIndicator, customerJourney)
  .then(async function (responseBody) {
    responseBodyToDocument = responseBody;
    let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    restResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
  })
  .catch(async function (responseBody) {
    let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
    let sentResp = restResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  });
  executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.postMacInterfaceRpcForProvidingLearnedMacAdresses = function postMacInterfaceRpcForProvidingLearnedMacAdresses (req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney, mountName) {
  IndividualServices.postMacInterfaceRpcForProvidingLearnedMacAdresses(user, originator, xCorrelator, traceIndicator, customerJourney, mountName)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.provideListOfConnectedDevices = function provideListOfConnectedDevices (req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  IndividualServices.provideListOfConnectedDevices(user, originator, xCorrelator, traceIndicator, customerJourney)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putLiveAirInterfacePerformanceMonitoringIsOn = function putLiveAirInterfacePerformanceMonitoringIsOn (req, res, next, body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  IndividualServices.putLiveAirInterfacePerformanceMonitoringIsOn(body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putLiveAirInterfaceTransimitterIsOn = function putLiveAirInterfaceTransimitterIsOn (req, res, next, body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  IndividualServices.putLiveAirInterfaceTransimitterIsOn(body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putLiveControlConstructExternalLabel = function putLiveControlConstructExternalLabel (req, res, next, body, mountName, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  let openApiPath = req.openapi.openApiRoute;
  IndividualServices.putLiveControlConstructExternalLabel(body, mountName, user, originator, xCorrelator, traceIndicator, customerJourney)
  .then(async function (responseBody) {
    responseBodyToDocument = responseBody;
    let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, openApiPath);
    restResponseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
  })
  .catch(async function (responseBody) {
    let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, openApiPath);
    let sentResp = restResponseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
    responseCode = sentResp.code;
    responseBodyToDocument = sentResp.body;
  });
executionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};
module.exports.putLiveEthernetContainerPerformanceMonitoringIsOn = function putLiveEthernetContainerPerformanceMonitoringIsOn (req, res, next, body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  IndividualServices.putLiveEthernetContainerPerformanceMonitoringIsOn(body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putLiveHybridMwStructurePerformanceMonitoringIsOn = function putLiveHybridMwStructurePerformanceMonitoringIsOn (req, res, next, body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  IndividualServices.putLiveHybridMwStructurePerformanceMonitoringIsOn(body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putLiveLtpExternalLabel = function putLiveLtpExternalLabel (req, res, next, body, mountName, uuid, user, originator, xCorrelator, traceIndicator, customerJourney) {
  IndividualServices.putLiveLtpExternalLabel(body, mountName, uuid, user, originator, xCorrelator, traceIndicator, customerJourney)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putLivePureEthernetStructurePerformanceMonitoringIsOn = function putLivePureEthernetStructurePerformanceMonitoringIsOn (req, res, next, body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  IndividualServices.putLivePureEthernetStructurePerformanceMonitoringIsOn(body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.putLiveWireInterfacePerformanceMonitoringIsOn = function putLiveWireInterfacePerformanceMonitoringIsOn (req, res, next, body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney) {
  IndividualServices.putLiveWireInterfacePerformanceMonitoringIsOn(body, mountName, uuid, localId, user, originator, xCorrelator, traceIndicator, customerJourney)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.regardControllerAttributeValueChange = function regardControllerAttributeValueChange (req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  IndividualServices.regardControllerAttributeValueChange(body, user, originator, xCorrelator, traceIndicator, customerJourney)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
