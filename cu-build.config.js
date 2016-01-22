/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var name = 'cu-patcher-ui';

var config = {
  type: 'module',
  path: __dirname,
  name: name,
  bundle: {
    copy: [
      'src/**/!(*.js|*.jsx|*.ts|*.tsx|*.ui|*.styl|*.scss)',
      'src/include/**'
    ],
    browserify: true
  },
  server: {
    root: __dirname + "/publish/interface/cu-patcher-ui/"
  }
};

// load user config and merge it with default config if it exists
var extend = require('extend');
var fs = require('fs');
var userConfig = {};
if (fs.existsSync(__dirname + '/user-cu-build.config.js')) {
  userConfig = require(__dirname + '/user-cu-build.config.js');
}
config = extend(true, config, userConfig);

module.exports = config;
