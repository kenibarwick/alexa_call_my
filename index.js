var alexa = require('alexa-app');
var app = new alexa.app('call_my');
var NexmoHelper = require('./nexmo_helper');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

app.launch(function(req,res) {

	// for now just call a number
	var nexmoHelper = new NexmoHelper();
	nexmoHelper.makeCall().then(function(callStatus) {
        console.log(callStatus);
        res.say('Calling your default device').send();
      }).catch(function(err) {
        console.log(err.statusCode);
        var prompt = 'Some thing went wrong whilst trying to call your mobile';
        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
      });
      return false;
 });

app.intent('DeviceIntent', {
		"slots":{"DEVICE":"NUMBER"}
		,"utterances":["device number {1-100|DEVICE}"]
	},function(req,res) {
		// for now just call a number
		var nexmoHelper = new NexmoHelper();
		nexmoHelper.makeCall().then(function(callStatus) {
			console.log(callStatus);
			res.say('Calling your default device').send();
		  }).catch(function(err) {
			console.log(err.statusCode);
			var prompt = 'Some thing went wrong whilst trying to call your mobile';
			res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
		  });
		  return false;
		res.say('Calling device number '+req.slot('DEVICE'));
	}
);
module.exports = app;
