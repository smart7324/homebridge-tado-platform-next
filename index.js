/**
 * v7
 *
 * @url https://github.com/SeydX/homebridge-tado-platform
 * @author SeydX <seyd55@outlook.de> and smart7324 <34960772+smart7324@users.noreply.github.com>
 *
 **/

'use strict';

module.exports = function (homebridge) {
  let TadoPlatform = require('./src/platform.js')(homebridge);
  homebridge.registerPlatform('homebridge-tado-platform', 'TadoPlatform', TadoPlatform, true);
};
