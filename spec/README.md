# MicroWaveDeviceGatekeeper Specification

### Diagrams  
- [Collection of Diagrams](./diagrams)

### ServiceList
- [MicroWaveDeviceGatekeeper+services](./MicroWaveDeviceGatekeeper+services.yaml)

### ProfileList and ProfileInstanceList
- [MicroWaveDeviceGatekeeper+profiles](./MicroWaveDeviceGatekeeper+profiles.yaml)
- [MicroWaveDeviceGatekeeper+profileInstances](./MicroWaveDeviceGatekeeper+profileInstances.yaml)

### ForwardingList
- [MicroWaveDeviceGatekeeper+forwardings](./MicroWaveDeviceGatekeeper+forwardings.yaml)

### Open API specification (Swagger)
- [MicroWaveDeviceGatekeeper](./MicroWaveDeviceGatekeeper.yaml)

### CONFIGfile (JSON)
- [MicroWaveDeviceGatekeeper+config](./MicroWaveDeviceGatekeeper+config.json)

### Comments
The following services shall be covered as a minimum in the first release:  

_AIPS:_
- [ ] /core-model-1-4:network-control-domain=live/control-construct={mountName}/logical-termination-point={uuid}/layer-protocol={localId}/air-interface-2-0:air-interface-pac/air-interface-configuration/transmitter-is-on

_MATR:_
- [ ] /mac-fd-1-0:provide-learned-mac-addresses

_LILW:_
- [ ] ?

_Scripts:_
- [ ] /core-model-1-4:control-construct/name=externalLabel/value   {mountpointName}
- [ ] /core-model-1-4:control-construct/logical-termination-point=ltp/name=externalLabel/value   {linkId}
- [ ] /core-model-1-4:control-construct/logical-termination-point=ltp/layer-protocol=layer-protocol/interface-type/interface-configuration/performance-monitoring-is-on   {true}
