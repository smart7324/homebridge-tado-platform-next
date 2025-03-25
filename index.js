/**
 * v7
 *
 * @url https://github.com/smart7324/homebridge-tado-platform-next
 * @author smart7324 <34960772+smart7324@users.noreply.github.com> forked from SeydX <seyd55@outlook.de>
 *
 **/

import TadoPlatformModule from './src/platform.js';

export default function (homebridge) {
  let TadoPlatform = TadoPlatformModule(homebridge);
  homebridge.registerPlatform('homebridge-tado-platform', 'TadoPlatform', TadoPlatform, true);
};