
const createHttpError = require('http-errors');
const IndividualServiceUtility = require('./IndividualServiceUtility')
const OpenDayLightAdapter = require('../OpenDayLightAdapter/RESTClient');

exports.RequestForProvidingPutDataFromLive = async function (requestBody, forwardingName, pathParams, stringName, eatlRequestHeaders) {
    let responseCode;
    try {
        let base64Auth = await OpenDayLightAdapter.getAuthorizationAsync()
        if (base64Auth) {
            let httpRequestHeader = {
                "Authorization": base64Auth
            }
            let consequentOperationClient = await IndividualServiceUtility.getConsequentOperationClient(forwardingName, stringName)
            responseCode = await IndividualServiceUtility.forwardRequest(consequentOperationClient, pathParams, requestBody, httpRequestHeader, eatlRequestHeaders);
        } else {
            return "File not found";
        }
    } catch (error) {
        console.log(`${forwardingName} is not success with ${error}`);
        return new createHttpError.InternalServerError();
    }

    return responseCode;
}
