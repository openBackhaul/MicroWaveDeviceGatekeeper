'use strict';

const BasicServices = require('onf-core-model-ap-bs/basicServices/BasicServicesService');
const responseBuilder = require('onf-core-model-ap/applicationPattern/rest/server/ResponseBuilder');
const responseCodeEnum = require('onf-core-model-ap/applicationPattern/rest/server/ResponseCode');
const restResponseHeader = require('onf-core-model-ap/applicationPattern/rest/server/ResponseHeader');
const ExecutionAndTraceService = require('onf-core-model-ap/applicationPattern/services/ExecutionAndTraceService');
const { getDeviceListSyncPeriodIntegerValue, getOperationNameForControllerInternalPathToMountPoint, getStringNameForControllerInternalPathToMountPoint, getStringNameForPromptForEmbeddingCausesCyclicLoadingOfDeviceListFromController, getOdlIpPort } = require("../service/basicServices/cyclicProcess")
const { getLtpInfo, buildRequstBody } = require('../service/basicServices/notificationProxy')
const { getAuthorizationCodeAsync } = require('../service/OpenDayLightClient/ODLAuthentication')
const { BuildAndTriggerRestRequest } = require('../service/OpenDayLightClient/ODLClient')

const NEW_RELEASE_FORWARDING_NAME = 'PromptForBequeathingDataCausesTransferOfListOfAlreadyRegisteredApplications';
global.networkTopologyList = []

module.exports.embedYourself = async function embedYourself(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument;
  await BasicServices.embedYourself(body, user, xCorrelator, traceIndicator, customerJourney, req.url)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;

      let deviceListSyncPeriodIntegerValue = await getDeviceListSyncPeriodIntegerValue()
      await cyclicProcess()
      setInterval(async () => {
        await cyclicProcess()
      }, deviceListSyncPeriodIntegerValue * 3600000);

      await notificationProxy(req.headers)

      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
      console.log(responseBodyToDocument, "==", responseCode)
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.endSubscription = async function endSubscription(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument;
  await BasicServices.endSubscription(body, user, xCorrelator, traceIndicator, customerJourney, req.url)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.informAboutApplication = async function informAboutApplication(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.informAboutApplication()
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.informAboutApplicationInGenericRepresentation = async function informAboutApplicationInGenericRepresentation(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.informAboutApplicationInGenericRepresentation(req.url)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.informAboutReleaseHistory = async function informAboutReleaseHistory(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.informAboutReleaseHistory()
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.informAboutReleaseHistoryInGenericRepresentation = async function informAboutReleaseHistoryInGenericRepresentation(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.informAboutReleaseHistoryInGenericRepresentation(req.url)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.inquireOamRequestApprovals = async function inquireOamRequestApprovals(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument;
  await BasicServices.inquireOamRequestApprovals(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.listLtpsAndFcs = async function listLtpsAndFcs(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.listLtpsAndFcs()
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.redirectOamRequestInformation = async function redirectOamRequestInformation(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument;
  await BasicServices.redirectOamRequestInformation(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.redirectServiceRequestInformation = async function redirectServiceRequestInformation(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument;
  await BasicServices.redirectServiceRequestInformation(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.redirectTopologyChangeInformation = async function redirectTopologyChangeInformation(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.redirectTopologyChangeInformation(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.registerYourself = async function registerYourself(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument;
  if (Object.keys(req.body).length === 0) {
    body = req.body;
    user = req.headers["user"];
    originator = req.headers["originator"];
    xCorrelator = req.headers["x-correlator"];
    traceIndicator = req.headers["trace-indicator"];
    customerJourney = req.headers["customer-journey"];
  }
  await BasicServices.registerYourself(body, user, xCorrelator, traceIndicator, customerJourney, req.url)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.startApplicationInGenericRepresentation = async function startApplicationInGenericRepresentation(req, res, next, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.OK;
  let responseBodyToDocument = {};
  await BasicServices.startApplicationInGenericRepresentation(req.url)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.updateClient = async function updateClient(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument;
  await BasicServices.updateClient(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.updateOperationClient = async function updateOperationClient(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument;
  await BasicServices.updateOperationClient(body, user, xCorrelator, traceIndicator, customerJourney, req.url, NEW_RELEASE_FORWARDING_NAME)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

module.exports.updateOperationKey = async function updateOperationKey(req, res, next, body, user, originator, xCorrelator, traceIndicator, customerJourney) {
  let startTime = process.hrtime();
  let responseCode = responseCodeEnum.code.NO_CONTENT;
  let responseBodyToDocument;
  await BasicServices.updateOperationKey(body)
    .then(async function (responseBody) {
      responseBodyToDocument = responseBody;
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      responseBuilder.buildResponse(res, responseCode, responseBody, responseHeader);
    })
    .catch(async function (responseBody) {
      let responseHeader = await restResponseHeader.createResponseHeader(xCorrelator, startTime, req.url);
      let sentResp = responseBuilder.buildResponse(res, undefined, responseBody, responseHeader);
      responseCode = sentResp.code;
      responseBodyToDocument = sentResp.body;
    });
  ExecutionAndTraceService.recordServiceRequest(xCorrelator, traceIndicator, user, originator, req.url, responseCode, req.body, responseBodyToDocument);
};

/**
 * cyclic process to update the list of mounted device and its status from the controller
 */
async function cyclicProcess() {
  return new Promise(async function (resolve, reject) {
    try {
      let forwardingName = "PromptForEmbeddingCausesCyclicLoadingOfDeviceListFromController"
      let operationNameForControllerInternalPathToMountPoint = await getOperationNameForControllerInternalPathToMountPoint(forwardingName)
      let stringNameForControllerInternalPathToMountPoint = await getStringNameForControllerInternalPathToMountPoint(operationNameForControllerInternalPathToMountPoint["operation-name"])
      let stringNameForPromptForEmbeddingCausesCyclicLoadingOfDeviceListFromController = await getStringNameForPromptForEmbeddingCausesCyclicLoadingOfDeviceListFromController(forwardingName)

      let pathParams = "/" + stringNameForControllerInternalPathToMountPoint + "?fields=" + stringNameForPromptForEmbeddingCausesCyclicLoadingOfDeviceListFromController

      let base64Auth = await getAuthorizationCodeAsync();
      if (base64Auth) {
        let httpRequestHeader = {
          "Authorization": base64Auth
        }
        let operationClientUuid = operationNameForControllerInternalPathToMountPoint["op-c-uuid"]
        let responseFromOdlController = await BuildAndTriggerRestRequest(
          operationClientUuid,
          pathParams,
          "GET",
          httpRequestHeader,
          ""
        )

        if (responseFromOdlController.status === 200) {
          global.networkTopologyList = responseFromOdlController.data["network-topology:topology"][0]["node"]
          resolve()
        }else{
          throw responseFromOdlController.status
        }
      } else {
        throw "Authorization not found";
      }
    } catch (error) {
      reject(error)
    }
  })
}

async function notificationProxy(requestHeader) {
  return new Promise(async function (resolve, reject) {
    try {
      let forwardingName = "PromptForEmbeddingCausesSubscribingForNotifications"
      let ltpInfo = await getLtpInfo(forwardingName)
      let requestBody = await buildRequstBody()
      let httpRequestHeader = {
        "user": requestHeader.user,
        "originator": requestHeader.originator,
        "x-correlator": requestHeader["x-correlator"],
        "trace-indicator": requestHeader["trace-indicator"],
        "operation-key": ltpInfo["operation-key"],
        "customer-journey": requestHeader["customer-journey"],
      }
      let response = await BuildAndTriggerRestRequest(
        ltpInfo["op-c-uuid"],
        ltpInfo["operation-name"],
        "POST",
        httpRequestHeader,
        requestBody
      )
      if (response.status == 204) {
        resolve()
      } else {
        throw "failed";
      }
    } catch (error) {
      reject(error)
    }
  })
}