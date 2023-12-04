'use strict';


const createHttpError = require('http-errors');

const LogicalTerminationPoint = require('onf-core-model-ap/applicationPattern/onfModel/models/LogicalTerminationPoint');
const HttpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');
const HttpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const OperationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');
const ExecutionAndTraceService = require('onf-core-model-ap/applicationPattern/services/ExecutionAndTraceService');
const RESTUtility = require('./RESTUtility');
const ODLAuthorization = require('./ODLAuthentication');
const axios = require('axios');


/**
 * @description This function automates the forwarding of request with related pathParameters and consequent op-c.
 * @param {Object} operationClientAndFieldParams operationClientAndFieldParams that contains op-c uuid , operation-name, field parameters of the request.
 * @param {list}   pathParamList list of path parameters values to be sent in request.
 * @param {Integer} traceIndicatorIncrementer incrementer value to increment the trace indicator.
 * @returns {Object} response data fetched for the forwarded request
 **/
exports.prepareAndSendRequestToODL = async function(operationClientAndFieldParams, pathParamList, requestBody, eatlRequestHeaders, httpMethod) {
    try {
        let operationName = operationClientAndFieldParams.operationName;
        let operationClientUuid = operationClientAndFieldParams.operationClientUuid;
        let params = await RESTUtility.getPathParameter(operationName, pathParamList);
        let base64Auth = await ODLAuthorization.getAuthorizationCodeAsync();
        if (base64Auth) {
            let httpRequestHeader = {
                "Authorization": base64Auth
            };
            let responseData = await sendRequestToODL(
                operationClientUuid,
                requestBody,
                httpMethod,
                params,
                httpRequestHeader,
                eatlRequestHeaders.user,
                eatlRequestHeaders.xCorrelator,
                eatlRequestHeaders.traceIndicator,
                eatlRequestHeaders.customerJourney,
            );
            return responseData;
        } else {
            throw "Authorization not found";
        }

    } catch (error) {
        console.log(`forwardRequest is not success with ${error}`);
        if (error == "Authorization not found") {
            throw new createHttpError.NotFound();
        } else {
            return new createHttpError.InternalServerError();
        }
    }
}


/**
 * This function formulates the request body based on the operation name and application 
 * @param {String} operationClientUuid uuid of the client operation that needs to be addressed
 * @param {object} httpRequestBody request body for the operation
 * @param {String} httpMethod method of the request if undefined defaults to POST
 * @param {Object} params path and query parameters
 * @param {String} httpRequestHeader request  for the operation
 * @param {String} user username of the request initiator.
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses.
 * @param {String} traceIndicator Sequence number of the request.
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies.
 */
async function sendRequestToODL(operationClientUuid, httpRequestBody, httpMethod, params, httpRequestHeader, user, xCorrelator, traceIndicator) {
    try {
        let responseObj = {};
        let responseCode;
        let pathParams;
        let operationName = await OperationClientInterface.getOperationNameAsync(
            operationClientUuid);
        if (params) {
            pathParams = params.path;
            if (pathParams) {
                pathParams.forEach((value, param) => {
                    operationName = operationName.replace(param, value)
                });
            }
        }
        let httpClientUuid = await LogicalTerminationPoint.getServerLtpListAsync(operationClientUuid);
        let serverApplicationName = await HttpClientInterface.getApplicationNameAsync(httpClientUuid[0]);
        let serverApplicationReleaseNumber = await HttpClientInterface.getReleaseNumberAsync(httpClientUuid[0]);
        let originator = await HttpServerInterface.getApplicationNameAsync();
        let response = await BuildAndTriggerRestRequest(
            operationClientUuid,
            operationName,
            httpMethod,
            httpRequestHeader,
            httpRequestBody,
            params
        );
        responseCode = response.status
        responseObj.responseCode = responseCode;
        responseObj.responseData = response.data;

        ExecutionAndTraceService.recordServiceRequestFromClient(serverApplicationName, serverApplicationReleaseNumber, xCorrelator, traceIndicator, user, originator, operationName, responseCode, httpRequestBody, response.data)
                .catch((error) => console.log(`record service request ${JSON.stringify({
                    xCorrelator,
                    traceIndicator,
                    user,
                    originator,
                    serverApplicationName,
                    serverApplicationReleaseNumber,
                    operationName,
                    responseCode,
                    reqBody: httpRequestBody,
                    resBody: response.data
                })} failed with error: ${error.message}`));
        return responseObj;
    } catch (error) {
        console.log(`Request to ODL is not success with ${error}`);
        return new createHttpError.InternalServerError();
    }
}

/**
 * This function trigger a rest request by calling the restClient class<br>
 * @param {string} operationClientUuid of service that needs to be addressed in the client application
 * @param {string} operationName url for the REST request
 * @param {string} method http method for the REST request
 * @param {object} requestHeader http request header for the REST call
 * @param {object} requestBody request body for the REST call
 * @returns {Promise<Object>} returns the http response received
 */
let BuildAndTriggerRestRequest = exports.BuildAndTriggerRestRequest = async function (operationClientUuid, operationName, method, requestHeader, requestBody) {
    try {        
        let clientConnectionInfo = await OperationClientInterface.getTcpClientConnectionInfoAsync(operationClientUuid);
        let url = clientConnectionInfo + operationName;
        let request = {
            method: method,
            url: url,
            headers: requestHeader,
            data: requestBody
        }
        let response = await axios(request);
        console.log("\n callback : " + method + " " + url + " header :" + JSON.stringify(requestHeader) +
            "body :" + JSON.stringify(requestBody) + "response code:" + response.status)
        return response;
    } catch (error) {
        if (error.response) {
            return error.response;
        } else if (error.request) {
            console.log(`Request errored with ${error}`);
            return new createHttpError.RequestTimeout();
        }
        console.log(`Unknown request error: ${error}`);
        return new createHttpError.InternalServerError();
    }
}