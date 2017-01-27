var alexa = require('alexa-app');
var app = new alexa.app('call_my');
var NexmoHelper = require('./nexmo_helper');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

app.launch(function(req,res) {

	// for now just call a number
	var nexmoHelper = new NexmoHelper();
	nexmoHelper.requestCallStatus('IAD').then(function(callStatus) {
        console.log(callStatus);
        res.say(nexmoHelper.formatCallStatus(callStatus)).send();
      }).catch(function(err) {
        console.log(err.statusCode);
        var prompt = 'Some thing went wrong whilst trying to call your mobile';
        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
      });
      return false;
 });

app.intent('AgeIntent', {
		"slots":{"AGE":"NUMBER"}
		,"utterances":["My age is {1-100|AGE}"]
	},function(req,res) {
		res.say('Your age is '+req.slot('AGE'));
	}
);
module.exports = app;
