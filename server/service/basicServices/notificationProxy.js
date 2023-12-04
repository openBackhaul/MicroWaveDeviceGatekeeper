const ForwardingDomain = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingDomain')
const ForwardingConstruct = require('onf-core-model-ap/applicationPattern/onfModel/models/ForwardingConstruct')
const onfAttributes = require('onf-core-model-ap/applicationPattern/onfModel/constants/OnfAttributes')
const OperationClientInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationClientInterface')
const HttpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/HttpServerInterface')
const TcpServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/TcpServerInterface')
const layerProtocol = require('onf-core-model-ap/applicationPattern/onfModel/models/LayerProtocol')
const ControlConstruct = require('onf-core-model-ap/applicationPattern/onfModel/models/ControlConstruct')
const OperationServerInterface = require('onf-core-model-ap/applicationPattern/onfModel/models/layerProtocols/OperationServerInterface')

exports.getLtpInfo = async function (forwardingName) {
    let forwardingConstructForTheForwardingName = await ForwardingDomain.getForwardingConstructForTheForwardingNameAsync(forwardingName)
    let forwardingConstructUuid = forwardingConstructForTheForwardingName[onfAttributes.GLOBAL_CLASS.UUID]
    let fcPortLists = await ForwardingConstruct.getOutputFcPortsAsync(forwardingConstructUuid)

    let fcPortOutputUUID
    fcPortLists.forEach((fcPortList) => {
        fcPortOutputUUID = fcPortList['logical-termination-point']
    })

    if (fcPortOutputUUID != "undefined" && fcPortOutputUUID != null) {
        let operationName = await OperationClientInterface.getOperationNameAsync(fcPortOutputUUID)
        let operationKey = await OperationClientInterface.getOperationKeyAsync(fcPortOutputUUID)

        return {
            "operation-name": operationName,
            "operation-key": operationKey,
            "op-c-uuid": fcPortOutputUUID
        }
    }
}

exports.buildRequstBody = async function () {
    let applicatioName = await HttpServerInterface.getApplicationNameAsync()
    let applicationRelease = await HttpServerInterface.getReleaseNumberAsync()
    let applicationProtocol = await TcpServerInterface.getLocalProtocol()
    let applicationAddress = await TcpServerInterface.getLocalAddress()
    let applicationPort = await TcpServerInterface.getLocalPort()
    let getHttpServerClientLtpUuid

    let logicalTerminationPointList = await ControlConstruct.getLogicalTerminationPointListAsync(layerProtocol.layerProtocolNameEnum.HTTP_SERVER)
    let httpServerClientLtpUuidList = logicalTerminationPointList[0]["client-ltp"]
    httpServerClientLtpUuidList.forEach(httpServerClientLtpUuid => {
        let apiSegment = getApiSegmentOfOperationClient(httpServerClientLtpUuid)

        if (apiSegment == "is") {
            if (httpServerClientLtpUuid.endsWith("000")) {
                getHttpServerClientLtpUuid = httpServerClientLtpUuid
            }
        }
    })

    let receivingOperation = await OperationServerInterface.getOperationNameAsync(getHttpServerClientLtpUuid)

    let requestBody = {
        "subscribing-application-name": applicatioName,
        "subscribing-application-release": applicationRelease,
        "subscribing-application-protocol": applicationProtocol,
        "subscribing-application-address": {
            "ip-address": applicationAddress
        },
        "subscribing-application-port": applicationPort,
        "notifications-receiving-operation": receivingOperation
    }

    return requestBody
}

function getApiSegmentOfOperationClient(operationClientUuid) {
    let APISegment
    try {
        APISegment = operationClientUuid.split("-")[6]
    } catch (error) {
        console.log("error in extracting the APISegment")
    }
    return APISegment
}