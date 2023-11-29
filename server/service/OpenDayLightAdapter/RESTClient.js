'use strict';


const LogicalTerminationPoint = require('onf-core-model-ap/applicationPattern/onfModel/models/LogicalTerminationPoint');
const OperationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');
const HttpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface');
const HttpClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpClientInterface');
const ExecutionAndTraceService = require('onf-core-model-ap/applicationPattern/services/ExecutionAndTraceService');
const createHttpError = require('http-errors');
const RestRequestBuilder = require('onf-core-model-ap/applicationPattern/rest/client/RequestBuilder');
const fs = require('fs');
const odlCredentialList = 'odl-credential';
const authorizationValue = 'authorization';
const FileprofileOperation = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/FileProfile')


/**
 * This function formulates the request body based on the operation name and application 
 * @param {String} operationClientUuid uuid of the client operation that needs to be addressed
 * @param {object} httpRequestBody request body for the operation
 * @param {String} httpMethod method of the request if undefined defaults to POST
 * @param {Object} params path and query parameters
 *  @param {String} httpRequestHeader request  for the operation
 * @param {String} user username of the request initiator.
 * @param {String} xCorrelator UUID for the service execution flow that allows to correlate requests and responses.
 * @param {String} traceIndicator Sequence number of the request.
 * @param {String} customerJourney Holds information supporting customer’s journey to which the execution applies.
 */

exports.dispatchEvent = async function (operationClientUuid, httpRequestBody, httpMethod, params, httpRequestHeader, user, xCorrelator, traceIndicator) {
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
        let response = await RestRequestBuilder.BuildAndTriggerRestRequest(
            operationClientUuid,
            httpMethod,
            httpRequestHeader,
            httpRequestBody,
            params
        );
        responseCode = response.status
        responseObj.responseCode = responseCode;
        responseObj.responseData = response.data;

        if (responseCode == 408) {
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
        }
        return responseObj;
    }
    catch (error) {
        console.log(`forwardRequest is not success with ${error}`);
        return new createHttpError.InternalServerError();
    }
}

/**
 * @description This function returns the approval status for the provided application .
 * @param {String} authorization : authorization code of the user , value should be Bse64 Encoding of username and password 
 * @returns {promise} string {approvalStatus}
**/

exports.getAuthorizationAsync = async function () {
    let isAuthorizationExist = false;
    try {
        let applicationDataFile = await FileprofileOperation.getApplicationDataFileContent()
        if (applicationDataFile !== undefined) {
            let applicationData = JSON.parse(fs.readFileSync(applicationDataFile, 'utf8'));
            if (applicationData[odlCredentialList]) {
                let registeredApplicationList = applicationData[odlCredentialList];
                if (registeredApplicationList) {
                    let _authorization = registeredApplicationList[authorizationValue];
                    return _authorization

                }
            }
        }
        return isAuthorizationExist
    } catch (error) {
        console.log(error);

    }
}