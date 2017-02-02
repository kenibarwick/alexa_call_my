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

NexmoHelper.prototype.makeCall = function(deviceType) {

	const privateKey = require('fs').readFileSync(__dirname + '/private.key');

	const nexmo = new Nexmo({
	  apiKey: process.env.NEXMO_API_KEY,
	  apiSecret: process.env.NEXMO_API_SECRET,
	  applicationId: process.env.APPLICATION_ID,
	  privateKey: privateKey
	});

	console.log('Attempting to call: ' + deviceType);
	
	
	nexmo.calls.create({
	  to: [{
		type: 'phone',
		number: '447795666588'
	  }],
	  from: {
		type: 'phone',
		number: '12345678901'
	  },
	  answer_url: ['https://raw.githubusercontent.com/kenibarwick/alexa_call_my/master/response.json']
	}, (err, res) => {
	  if(err) { console.error(err); }
	  else { 
	  console.log(res); 
	  }
	});
};
