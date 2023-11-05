# MicroWaveDeviceGatekeeper
Proxy for PUTting to the devices

### Location  
The MicroWaveDeviceGatekeeper is part of the HighPerformanceNetworkInterface.  

### Description  
The MicroWaveDeviceGatekeeper supports PUTting configuration changes to the devices.  

The purpose of the MicroWaveDeviceGatekeeper is limiting access to the controller to a single application, which is participating in the OperationKey management.
It is complementing the MicroWaveDeviceInventory as it is providing the PUT method in the "live" network control domain.  
In divergence to the MicroWaveDeviceInventory, the MicroWaveDeviceGatekeeper's paths are addressing concrete attributes, instead of complete classes only.  
This is for facilitating precise management of the writing access rights of individual applications.  

Obviously, the MicroWaveDeviceGatekeeper exclusively supports attributes located in the Configurations sections of the technology specific modelings.  

Access is limited to devices that are currently connected to the controller.  
By purpose, there is no storing of configuration intends for later configuration (no planing, but exclusively immediate configuration).

The MicroWaveDeviceGatekeeper does not support GET method on the same paths it offers PUTting.  
It is wished that reading is done via the MicroWaveDeviceInventory, because GET operations on its "live" paths are supporting keeping its cache in synch with the device data.  

### Relevance
The MicroWaveDeviceGatekeeper represents the single point of contact for configuring from within the MW SDN domain.  
As such, it is more close to be a component of the controller than of the application layer.  
It is a precondition for many applications.  

### Resources
- [Specification](./spec/)
- [TestSuite](./testing/)
- [Implementation](./server/)

### Comments
./.
