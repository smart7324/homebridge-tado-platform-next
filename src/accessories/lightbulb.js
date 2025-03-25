
import Logger from '../helper/logger.js';

export default class SolarLightbulbAccessory {
  constructor(api, accessory, accessories, tado) {
    this.api = api;
    this.accessory = accessory;
    this.accessories = accessories;

    this.tado = tado;

    this.getService();
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  // Services
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  getService() {
    let service = this.accessory.getService(this.api.hap.Service.Lightbulb);
    let serviceOld = this.accessory.getService(this.api.hap.Service.LightSensor);

    if (serviceOld) {
      Logger.info('Removing LightSensor service', this.accessory.displayName);
      this.accessory.removeService(serviceOld);
    }

    if (!service) {
      Logger.info('Adding Lightbulb service', this.accessory.displayName);
      service = this.accessory.addService(
        this.api.hap.Service.Lightbulb,
        this.accessory.displayName,
        this.accessory.context.config.subtype
      );
    }

    if (!service.testCharacteristic(this.api.hap.Characteristic.Brightness))
      service.addCharacteristic(this.api.hap.Characteristic.Brightness);

    service.getCharacteristic(this.api.hap.Characteristic.On).onSet(() => {
      setTimeout(() => {
        service
          .getCharacteristic(this.api.hap.Characteristic.On)
          .updateValue(this.accessory.context.lightBulbState || false);
      }, 500);
    });

    service.getCharacteristic(this.api.hap.Characteristic.Brightness).onSet(() => {
      setTimeout(() => {
        service
          .getCharacteristic(this.api.hap.Characteristic.Brightness)
          .updateValue(this.accessory.context.lightBulbBrightness || 0);
      }, 500);
    });
  }
}
