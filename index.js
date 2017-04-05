var alexa = require('alexa-app');
var app = new alexa.app('my_phone');

var Nexmo = require('nexmo');
require('dotenv').config({path: __dirname + '/.env'});
var fs = require('fs');

const privateKey = require('fs').readFileSync(__dirname + '/private.key');
var rp = require('request-promise');
require('promise');
var ENDPOINT = 'https://rest.nexmo.com/account/get-balance/7459bbc0/5fab57423962f954';
var deviceType='default';
// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;
var res = '';
app.launch(function(request, response) {
	
	// for now just call a number
	var callStatus = 'Calling your default device';
	var deviceType = 'default';
	var value = '';
	var options = {
		uri: ENDPOINT,
		transform: function (body, res, resolveWithFullResponse) {
			return JSON.parse(body);
		}
	};
	
	response.say(callStatus);
	
	rp(options)
		.then(function (accountBalanceObj) 
		{
			return accountBalanceObj.value;
		})		
		.then(function (value)
		{
			// showCard(response , value);
			console.log('balance: £' + value);
		})
		.then(function ()
		{
			console.log('try make call');
			makeCall();
		}
		);
});	

function makeCall(number) {
		const nexmo = new Nexmo({
		apiKey: process.env.NEXMO_API_KEY,
		apiSecret: process.env.NEXMO_API_SECRET,
		applicationId: process.env.APPLICATION_ID,
		privateKey: privateKey
		});
		var deviceNumber='';
		switch(number) {
			case '1':
				deviceNumber = '447876616568';
				break;
			case '2':
				deviceNumber = '447553432577';
				break;
			case '3':
				deviceNumber = '447711388882';
				break;				
			default:
				deviceNumber = '447795666588'; 
				number='0';
		}
		console.log('Calling device: #' + number + ' which is ' + deviceNumber);
		
		nexmo.calls.create({
			  to: [{
				type: 'phone',
				number: deviceNumber
			  }],
			  from: {
				type: 'phone',
				number: '447520635364'
			  },
			  answer_url: ['https://raw.githubusercontent.com/kenibarwick/my_phone/master/response.json']
			}, (err, nexmoResult) => {
			  if(err) { console.error(err); }
			  else { 
			  console.log(nexmoResult); 
			  }
			});

}


function showCard (response, value){		
			console.log('try make card');
			response.card({
			  type: 'Standard',
			  title: 'Call My Phone', // this is not required for type Simple or Standard
			  text: 'I have called your ' + deviceType + ' phone.\nYour currect balance is: £' + value
			});
			console.log('card shown value: £' + value);
		};

		
app.intent('DeviceIntent', {
		"slots":{"DEVICE":"NUMBER"}
		,"utterances":["device number {1-100|DEVICE}"]
	},function(req,res) {
		// for now just call a number
		makeCall(req.slot('DEVICE'));
		res.say('Calling device number '+req.slot('DEVICE'));
	}
);

module.exports = app;