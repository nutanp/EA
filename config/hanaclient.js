// Copyright 2013 SAP AG.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http: //www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
// either express or implied. See the License for the specific
// language governing permissions and limitations under the License.
'use strict';

var fs = require('fs');
var path = require('path');
var hdb = require('hdb');
const config = require(path.resolve('./config/config'));

var client1 = hdb.createClient({
  host: config.hanaconfig1.host,
  port: config.hanaconfig1.port,
  user: config.hanaconfig1.user,
  password: config.hanaconfig1.password
});
 var client2 = hdb.createClient({
  host: config.hanaconfig2.host,
  port: config.hanaconfig2.port,
  user: config.hanaconfig2.user,
  password: config.hanaconfig2.password
});

function onerror(err) {
  console.error('Network connection error', err);
}
client1.on('error', onerror);
client2.on('error', onerror);
function onclose() {
  console.log('Client closed');
}
client1.on('close', onclose);
client2.on('close', onclose);
function onconnect() {
  console.log('Client connected');
}
client1.on('connect', onconnect);
client2.on('connect', onconnect);
function ondisconnect() {
  console.log('Client disconnected');
}
client1.on('disconnect', ondisconnect);
client2.on('disconnect', ondisconnect);

module.exports = {client1,client2}
