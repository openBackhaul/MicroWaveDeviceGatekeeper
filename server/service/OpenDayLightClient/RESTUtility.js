'use strict';
const createHttpError = require('http-errors');
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const ProfileCollection = require('onf-core-model-ap/applicationPattern/onfModel/models/ProfileCollection');
const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain');
const ForwardingConstruct = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingConstruct');
const OperationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface');
const IndividualServiceUtility = require('../individualServices/IndividualServiceUtility')

/**
 * This function fetches the string value from the string profile based on the expected string name.
 * @param {String} expectedStringName string name of the string profile.
 * @return {String} string value of the string profile.
 */
exports.getStringProfileInstanceValue = async function(expectedStringName) {
    let stringValue = "";
    try {
        let stringProfileName = "string-profile-1-0:PROFILE_NAME_TYPE_STRING_PROFILE";
        let stringProfileInstanceList = await ProfileCollection.getProfileListForProfileNameAsync(stringProfileName);

        for (let i = 0; i < stringProfileInstanceList.length; i++) {
            let stringProfileInstance = stringProfileInstanceList[i];
            let stringProfilePac = stringProfileInstance[onfAttributes.STRING_PROFILE.PAC];
            let stringProfileCapability = stringProfilePac[onfAttributes.STRING_PROFILE.CAPABILITY];
            let stringName = stringProfileCapability[onfAttributes.STRING_PROFILE.STRING_NAME];
            if (stringName == expectedStringName) {
                let stringProfileConfiguration = stringProfilePac[onfAttributes.STRING_PROFILE.CONFIGURATION];
                stringValue = stringProfileConfiguration[onfAttributes.STRING_PROFILE.STRING_VALUE];
                break;
            }
        }
        return stringValue;
    } catch (error) {
        console.log(`getStringProfileInstanceValue is not success with ${error}`);
        return new createHttpError.InternalServerError();
    }
}

/**
 * This function formulates the query and path parameters from operationName and fields.
 * @param {String} operationName name of the operation to fetch path parameters key .
 * @param {List} pathParamList path parameters value list.
 * @param {String} fields query parameters.
 * @return {Object} params that contains query and path parameters.
 */
exports.getPathParameter = async function(operationName, pathParamList) {
    try {
        let pathParams = new Map();
        let params = {};

        if (pathParamList && (pathParamList.length !== 0)) {
            let pathParamMatches = operationName.match(/\{(.*?)\}/g);
            for (let i = 0; i < pathParamList.length; i++) {
                pathParams.set(pathParamMatches[i], pathParamList[i]);
            }
            params.path = pathParams;
        }

        return params;

    } catch (error) {
        console.log(`getPathParameter is not success with ${error}`);
        return new createHttpError.InternalServerError();
    }
}


/**
 * This function gets the consequent operation details like op-c uuid , operation-name, field parameters.
 * @param {String} forwardingConstructName name of the forwarding construct to fetch consequent op-c uuid.
 * @param {String} stringProfileName string name to fetch the field parameter.
 * @return {Object} consequentOperationClientAndFieldParams that contains op-c uuid , operation-name, field parameters.
 */
exports.getConsequentOperationClientAndFieldParams = async function(forwardingConstructName, stringProfileName) {
    let consequentOperationClientAndFieldParams = {};
    try {
        let forwardingConstructInstance = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingConstructName);
        let outputFcPortForFc = await ForwardingConstruct.getOutputFcPortsAsync(forwardingConstructInstance[onfAttributes.GLOBAL_CLASS.UUID]);
        consequentOperationClientAndFieldParams.operationClientUuid = outputFcPortForFc[0][onfAttributes.FC_PORT.LOGICAL_TERMINATION_POINT];
        consequentOperationClientAndFieldParams.operationName = await OperationClientInterface.getOperationNameAsync(consequentOperationClientAndFieldParams.operationClientUuid);
        if (stringProfileName) {
            consequentOperationClientAndFieldParams.fields = await IndividualServiceUtility.getStringProfileInstanceValue(stringProfileName);
        }
    } catch (error) {
        console.log(`getConsequentOperationClientAndFieldParams is not success with ${error}`);
        return new createHttpError.InternalServerError();
    }
    return consequentOperationClientAndFieldParams;
}

