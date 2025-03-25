import Logger from '../helper/logger.js';
import moment from 'moment';

const timeout = (ms) => new Promise((res) => setTimeout(res, ms));

export default class HumidityAccessory {
  constructor(api, accessory, accessories, tado, deviceHandler, FakeGatoHistoryService) {
    this.api = api;
    this.accessory = accessory;
    this.accessories = accessories;
    this.FakeGatoHistoryService = FakeGatoHistoryService;

    this.deviceHandler = deviceHandler;
    this.tado = tado;

    this.getService();
  }

  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
  // Services
  //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

  async getService() {
    let service = this.accessory.getService(this.api.hap.Service.HumiditySensor);

    if (!service) {
      Logger.info('Adding HumiditySensor service', this.accessory.displayName);
      service = this.accessory.addService(
        this.api.hap.Service.HumiditySensor,
        this.accessory.displayName,
        this.accessory.context.config.subtype
      );
    }

    let batteryService = this.accessory.getService(this.api.hap.Service.Battery);

    if (!this.accessory.context.config.noBattery && this.accessory.context.config.type === 'HEATING') {
      if (!batteryService) {
        Logger.info('Adding Battery service', this.accessory.displayName);
        batteryService = this.accessory.addService(this.api.hap.Service.Battery);
      }
      batteryService.setCharacteristic(
        this.api.hap.Characteristic.ChargingState,
        this.api.hap.Characteristic.ChargingState.NOT_CHARGEABLE
      );
    } else {
      if (batteryService) {
        Logger.info('Removing Battery service', this.accessory.displayName);
        this.accessory.removeService(batteryService);
      }
    }

    this.historyService = new this.FakeGatoHistoryService('room', this.accessory, {
      storage: 'fs',
      path: this.api.user.storagePath(),
      disableTimer: true,
    });

    await timeout(250); //wait for historyService to load

    service
      .getCharacteristic(this.api.hap.Characteristic.CurrentRelativeHumidity)
      .on(
        'change',
        this.deviceHandler.changedStates.bind(this, this.accessory, this.historyService, this.accessory.displayName)
      );

    this.refreshHistory(service);
  }

  refreshHistory(service) {
    let state = service.getCharacteristic(this.api.hap.Characteristic.CurrentRelativeHumidity).value;

    this.historyService.addEntry({
      time: moment().unix(),
      temp: 0,
      humidity: state,
      ppm: 0,
    });

    setTimeout(() => {
      this.refreshHistory(service);
    }, 10 * 60 * 1000);
  }
}
