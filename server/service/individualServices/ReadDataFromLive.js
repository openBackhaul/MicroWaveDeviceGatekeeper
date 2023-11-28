const IndividualServiceUtility = require('./IndividualServiceUtility');
const createHttpError = require('http-errors');

exports.RequestForProvidingPutDataFromLive = async function (requestBody, httpRequestHeader, forwardingName, pathParams, stringName, eatlRequestHeaders) {
    let responseCode;
    try {
        let consequentOperationClient = await IndividualServiceUtility.getConsequentOperationClient(forwardingName, stringName)
        responseCode = await IndividualServiceUtility.forwardRequest(consequentOperationClient, pathParams, requestBody, httpRequestHeader, eatlRequestHeaders);

    } catch (error) {
        console.log(`${forwardingName} is not success with ${error}`);
        return new createHttpError.InternalServerError();
    }

    return responseCode;
}
