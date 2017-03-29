'use strict';
var Nexmo = require('nexmo');
require('dotenv').config({path: __dirname + '/.env'});
var fs = require('fs');
var request = require('request');
var uuid = require('node-uuid');
var jwt = require('jsonwebtoken');
const privateKey = require('fs').readFileSync(__dirname + '/private.key');

module.exports = NexmoHelper;
// saved
function NexmoHelper() { }

NexmoHelper.prototype.requestCallStatus = function(deviceType) {
  return this.makeCall(deviceType).then(
    function(res) {
      console.log('success - calling ' + deviceType);
      return res;
    }
  );
};
