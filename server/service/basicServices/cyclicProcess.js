const IntegerProfile = require('onf-core-model-ap/applicationPattern/onfModel/models/profile/IntegerProfile')
const ProfileCollection = require('onf-core-model-ap/applicationPattern/onfModel/models/ProfileCollection')
const Profile = require('onf-core-model-ap/applicationPattern/onfModel/models/Profile')
const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain')
const ForwardingConstruct = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingConstruct')
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes')
const OperationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface')

exports.getDeviceListSyncPeriodIntegerValue = async function () {
    let integerProfiles = await ProfileCollection.getProfileListForProfileNameAsync(Profile.profileNameEnum.INTEGER_PROFILE)
    let getIntegerValue

    for (let integerProfileKey in integerProfiles) {
        let integerName = integerProfiles[integerProfileKey]['integer-profile-1-0:integer-profile-pac']['integer-profile-capability']['integer-name']
        let integerProfileUUID
        if (integerName == "deviceListSyncPeriod") {
            integerProfileUUID = integerProfiles[integerProfileKey]["uuid"]
            getIntegerValue = await IntegerProfile.getIntegerValueAsync(integerProfileUUID)
        }
    }

    if (getIntegerValue != "undefined" && getIntegerValue != null)
        return getIntegerValue
}

exports.getOperationNameForControllerInternalPathToMountPoint = async function (forwardingName) {
    let forwardingConstructForTheForwardingName = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingName)
    let forwardingConstructUuid = forwardingConstructForTheForwardingName[onfAttributes.GLOBAL_CLASS.UUID]
    let fcPortLists = await ForwardingConstruct.getOutputFcPortsAsync(forwardingConstructUuid)

    let fcPortOutputUUID
    fcPortLists.forEach((fcPortList) => {
        fcPortOutputUUID = fcPortList['logical-termination-point']
    })

    if (fcPortOutputUUID != "undefined" && fcPortOutputUUID != null) {
        let operationName = await OperationClientInterface.getOperationNameAsync(fcPortOutputUUID)
        return {
            "operation-name" : operationName,
            "op-c-uuid" : fcPortOutputUUID
        }
    }
}

exports.getStringNameForControllerInternalPathToMountPoint = async function (operationNameForControllerInternalPathToMountPoint) {
    let filterOperationNameForControllerInternalPathToMountPoint = operationNameForControllerInternalPathToMountPoint.match(/(?<=\/{)[a-zA-Z]+(?=})/g)
    let stringProfiles = await ProfileCollection.getProfileListForProfileNameAsync(Profile.profileNameEnum.STRING_PROFILE)
    let stringProfileConfigurationName
    stringProfiles.forEach(stringProfile => {
        let stringProfilePac = stringProfile['string-profile-1-0:string-profile-pac']
        let stringProfileCapabilityName = stringProfilePac['string-profile-capability']['string-name']
        filterOperationNameForControllerInternalPathToMountPoint.forEach(operationName => {
            if(stringProfileCapabilityName == operationName){
                stringProfileConfigurationName = stringProfilePac['string-profile-configuration']['string-value']
            }
        })
    })
        
    if(stringProfileConfigurationName != "undefined" && stringProfileConfigurationName != null)
        return stringProfileConfigurationName
}

exports.getStringNameForPromptForEmbeddingCausesCyclicLoadingOfDeviceListFromController = async function(forwardingName){
    let promptForEmbeddingCausesCyclicLoadingOfDeviceListFromControllerFieldsFilter = forwardingName + ".fieldsFilter"
    let stringProfiles = await ProfileCollection.getProfileListForProfileNameAsync(Profile.profileNameEnum.STRING_PROFILE)
    let stringProfileConfigurationName
    stringProfiles.forEach(stringProfile => {
        let stringProfilePac = stringProfile['string-profile-1-0:string-profile-pac']
        let stringProfileCapabilityName = stringProfilePac['string-profile-capability']['string-name']
        if(stringProfileCapabilityName == promptForEmbeddingCausesCyclicLoadingOfDeviceListFromControllerFieldsFilter){
            stringProfileConfigurationName = stringProfilePac['string-profile-configuration']['string-value']
        }
    })

    if(stringProfileConfigurationName != "undefined" && stringProfileConfigurationName != null)
        return stringProfileConfigurationName
}