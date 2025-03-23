/**
 * v6
 *
 * @url https://github.com/homebridge-plugins/homebridge-tado
 * @author SeydX <seyd55@outlook.de>
 *
 **/

'use strict';

module.exports = function (homebridge) {
  let TadoPlatform = require('./src/platform.js')(homebridge);
  homebridge.registerPlatform('@homebridge-plugins/homebridge-tado', 'TadoPlatform', TadoPlatform, true);
};
