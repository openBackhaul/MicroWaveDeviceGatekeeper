'use strict';
const createHttpError = require('http-errors');
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes');
const ProfileCollection = require('onf-core-model-ap/applicationPattern/onfModel/models/ProfileCollection');
 
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
