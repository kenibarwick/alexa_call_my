'use strict';
var Nexmo = require('nexmo');
require('dotenv').config({path: __dirname + '/.env'});
module.exports = NexmoHelper;

function NexmoHelper() { }

NexmoHelper.prototype.makeCall = function(deviceType) {

const privateKey = require('fs').readFileSync(__dirname + '/private.key');

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
  applicationId: process.env.APPLICATION_ID,
  privateKey: privateKey
});

	console.log(process.argv[2]);

	nexmo.calls.create({
	  to: [{
		type: 'phone',
		number: '447795666588'
	  }],
	  from: {
		type: 'phone',
		number: '12345678901'
	  },
	  answer_url: ['https://nexmo-community.github.io/ncco-examples/first_call_talk.json']
	}, (err, res) => {
	  if(err) { console.error(err); }
	  else { console.log(res); }
	});

};