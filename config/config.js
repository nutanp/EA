'use strict';

const path = require('path');
const _ = require('lodash');
const fs = require('fs');


var initGlobalConfig = function () {
  var config = {};
  if (!process.env.NODE_ENV) {
    config = _.merge(config, (fs.existsSync(path.join(process.cwd(), 'config/env/local.js')) && require(path.join(process.cwd(), 'config/env/local.js'))) || {});
  }
  else {
    config = require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};
  }

  return config;
};


module.exports = initGlobalConfig();
