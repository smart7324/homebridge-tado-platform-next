/**
 * v7
 *
 * @url https://github.com/smart7324/homebridge-tado-platform-next
 * @author smart7324 <34960772+smart7324@users.noreply.github.com> forked from SeydX <seyd55@outlook.de>
 *
 **/

'use strict';

module.exports = function (homebridge) {
  let TadoPlatform = require('./src/platform.js')(homebridge);
  homebridge.registerPlatform('homebridge-tado-platform', 'TadoPlatform', TadoPlatform, true);
};
