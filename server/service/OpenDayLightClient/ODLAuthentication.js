'use strict';
const fs = require('fs');
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const ProfileCollection = require('onf-core-model-ap/applicationPattern/onfModel/models/ProfileCollection');

const ODL_BASIC_AUTH_CODE = 'odl-basic-auth-code';

/**
 * @description This function provides the credential to access the ODL controller
 * @returns {String} authorizationCode authorization code of the user , value should be Bse64 Encoding of username and password 
 **/
exports.getAuthorizationCodeAsync = async function() {
    let authorizationCode;
    try {
        let applicationDataFileName = await getApplicationDataFileName();
        let completeFilePath = "./application-data/" + applicationDataFileName;
        if (applicationDataFileName !== undefined) {
            let applicationData = JSON.parse(fs.readFileSync(completeFilePath, 'utf8'));
            if (applicationData[ODL_BASIC_AUTH_CODE]) {
                authorizationCode = applicationData[ODL_BASIC_AUTH_CODE];
            }
        }
        return authorizationCode;
    } catch (error) {
        console.log(error);
        return authorizationCode;
    }
}


/**
 * This function fetches the applicationData fileName.
 * @return {String} file name of the applicationData.
 */
async function getApplicationDataFileName() {
    let applicationDataFileName;
    try {
        let fileProfileType = "file-profile-1-0:PROFILE_NAME_TYPE_FILE_PROFILE";
        let fileProfileInstanceList = await ProfileCollection.getProfileListForProfileNameAsync(fileProfileType);

        for (let i = 0; i < fileProfileInstanceList.length; i++) {
            let fileProfileInstance = fileProfileInstanceList[i];
            let fileProfilePac = fileProfileInstance[onfAttributes.FILE_PROFILE.PAC];
            let fileProfileCapability = fileProfilePac[onfAttributes.FILE_PROFILE.CAPABILITY];
            let fileIdentifier = fileProfileCapability[onfAttributes.FILE_PROFILE.FILE_IDENTIFIER];
            if (fileIdentifier == "EncryptedOdlKey") {
                let fileProfileConfiguration = fileProfilePac[onfAttributes.FILE_PROFILE.CONFIGURATION];
                applicationDataFileName = fileProfileConfiguration["file-name"];
                break;
            }
        }
        return applicationDataFileName;
    } catch (error) {
        console.log(`applicationDataFileName is not success with ${error}`);
        return applicationDataFileName;
    }
}