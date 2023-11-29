const createHttpError = require('http-errors');
const IndividualServiceUtility = require('../individualServices/IndividualServiceUtility')
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const OperationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');
const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const ForwardingConstruct = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingConstruct');
const eventDispatcher = require('./RESTClient');


exports.writeToLive = async function (requestBody, forwardingName, pathParams, stringName, eatlRequestHeaders) {
    let responseCode;
    try {
        let consequentOperationClient = await getConsequentOperationClient(forwardingName, stringName)
        responseCode = await forwardRequest(
            consequentOperationClient,
            pathParams,
            requestBody,
            eatlRequestHeaders,
            "PUT");

    } catch (error) {
        console.log(`${forwardingName} is not success with ${error}`);
        if (error == "Authorization not found") {
            throw new createHttpError.NotFound();
        }
        else {
            return new createHttpError.InternalServerError();
        }

    }

    return responseCode;
}

/**
 * This function gets the consequent operation details like op-c uuid , operation-name, field parameters.
 * @param {String} forwardingConstructName name of the forwarding construct to fetch consequent op-c uuid.
 * @param {String} stringName string name to fetch the field parameter.
 * @return {Object} consequentOperationClient that contains op-c uuid , operation-name, field parameters.
 */
async function getConsequentOperationClient(forwardingConstructName) {
    let consequentOperationClient = {};
    try {
        let forwardingConstructInstance = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingConstructName);
        let outputFcPortForFc = await ForwardingConstruct.getOutputFcPortsAsync(forwardingConstructInstance[onfAttributes.GLOBAL_CLASS.UUID]);
        consequentOperationClient.operationClientUuid = outputFcPortForFc[0][onfAttributes.FC_PORT.LOGICAL_TERMINATION_POINT];
        consequentOperationClient.operationName = await OperationClientInterface.getOperationNameAsync(consequentOperationClient.operationClientUuid);

    } catch (error) {
        console.log(`getConsequentOperationClient is not success with ${error}`);
        return new createHttpError.InternalServerError();
    }
    return consequentOperationClient;
}

/**
 * @description This function automates the forwarding of request with related pathParameters and consequent op-c.
 * @param {Object} operationClientAndFieldParams operationClientAndFieldParams that contains op-c uuid , operation-name, field parameters of the request.
 * @param {list}   pathParamList list of path parameters values to be sent in request.
 * @param {Integer} traceIndicatorIncrementer incrementer value to increment the trace indicator.
 * @returns {Object} response data fetched for the forwarded request
 **/
async function forwardRequest(operationClientAndFieldParams, pathParamList, requestBody, eatlRequestHeaders, httpMethod) {
    try {
        let operationName = operationClientAndFieldParams.operationName;
        let operationClientUuid = operationClientAndFieldParams.operationClientUuid;
        let params = await IndividualServiceUtility.getPathParameter(operationName, pathParamList);
        let base64Auth = await eventDispatcher.getAuthorizationAsync()
        if (base64Auth) {
            let httpRequestHeader = {
                "Authorization": base64Auth
            };
            let responseData = await eventDispatcher.dispatchEvent(
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
        }
        else {
            return new createHttpError.InternalServerError();
        }
    }
}