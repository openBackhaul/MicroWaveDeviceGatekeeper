'use strict';

const createHttpError = require('http-errors');
const RESTUtility = require('./RESTUtility')
const ODLClient = require('./ODLClient')

/**
 * This function performs PUT request to the ODL controller
 * @param {object} requestBody httpRequestBody to be sent to the ODL controller
 * @param {String} forwardingName Name of the forwardingConstruct
 * @param {String} pathParams inline path parameters to be sent in the ODL request
 * @param {String} stringProfileName stringProfile name of the field filter 
 * @param {object} eatlRequestHeaders httpRequestHeader to be sent to record the service information
 * @returns {Integer} responseCode httpResponseCode received from the controller
 */
exports.writeToLive = async function (requestBody, forwardingName, pathParams, stringProfileName, eatlRequestHeaders) {
    let responseCode;
    try {
        let consequentOperationClient = await RESTUtility.getConsequentOperationClientAndFieldParams(forwardingName, stringProfileName);
        responseCode = await ODLClient.prepareAndSendRequestToODL(
            consequentOperationClient,
            pathParams,
            requestBody,
            eatlRequestHeaders,
            "PUT");
    } catch (error) {
        console.log(`${forwardingName} is not success with ${error}`);
        if (error == "Not Found") {
            throw new createHttpError.NotFound();
        } else {
            return new createHttpError.InternalServerError();
        }
    }
    return responseCode;
}

/**
 * This function performs PUT request to the ODL controller
 * @param {object} requestBody httpRequestBody to be sent to the ODL controller
 * @param {String} forwardingName Name of the forwardingConstruct
 * @param {String} pathParams inline path parameters to be sent in the ODL request
 * @param {String} stringProfileName stringProfile name of the field filter 
 * @param {object} eatlRequestHeaders httpRequestHeader to be sent to record the service information
 * @returns {Integer} responseCode httpResponseCode received from the controller
 */
exports.postToLive = async function (requestBody, forwardingName, pathParams, stringProfileName, eatlRequestHeaders) {
    let responseCode;
    try {
        let consequentOperationClient = await RESTUtility.getConsequentOperationClientAndFieldParams(forwardingName, stringProfileName);
        responseCode = await ODLClient.prepareAndSendRequestToODL(
            consequentOperationClient,
            pathParams,
            requestBody,
            eatlRequestHeaders,
            "POST");
    } catch (error) {
        console.log(`${forwardingName} is not success with ${error}`);
        if (error == "Not Found") {
            throw new createHttpError.NotFound();
        } else {
            return new createHttpError.InternalServerError();
        }
    }
    return responseCode;
}


/**
 * This function performs PUT request to the ODL controller
 * @param {object} requestBody httpRequestBody to be sent to the ODL controller
 * @param {String} forwardingName Name of the forwardingConstruct
 * @param {String} pathParams inline path parameters to be sent in the ODL request
 * @param {String} stringProfileName stringProfile name of the field filter 
 * @param {object} eatlRequestHeaders httpRequestHeader to be sent to record the service information
 * @returns {Integer} responseCode httpResponseCode received from the controller
 */
exports.readFromLive = async function (requestBody, forwardingName, pathParams, stringProfileName, eatlRequestHeaders) {
    let responseCode;
    try {
        let consequentOperationClient = await RESTUtility.getConsequentOperationClientAndFieldParams(forwardingName, stringProfileName);
        responseCode = await ODLClient.prepareAndSendRequestToODL(
            consequentOperationClient,
            pathParams,
            requestBody,
            eatlRequestHeaders,
            "GET");
    } catch (error) {
        console.log(`${forwardingName} is not success with ${error}`);
        if (error == "Not Found") {
            throw new createHttpError.NotFound();
        } else {
            return new createHttpError.InternalServerError();
        }
    }
    return responseCode;
}



