var alexa = require('alexa-app');
var app = new alexa.app('call_my');
var NexmoHelper = require('./nexmo_helper');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

app.launch(function(req,res) {

	// for now just call a number
	var callStatus = 'Calling your default device';
	var nexmoHelper = new NexmoHelper();
	var deviceType = 'default';
	var balance = '1.97';
	
	res.card({
			  type: 'Standard',
			  title: 'Call my', // this is not required for type Simple or Standard
			  text: 'Your phone was called. Also to let you know, you have a current balance of: ' + balance
			  // image: { // image is optional
						// smallImageUrl: 'http://emojipedia-us.s3.amazonaws.com/cache/a0/fd/a0fdd5f25f789e95237d508d4a5c8280.png', // required
						// largeImageUrl: 'http://emojipedia-us.s3.amazonaws.com/cache/a0/fd/a0fdd5f25f789e95237d508d4a5c8280.png'
					// }
});
	
	res.say('Calling your phone. I also thought you should know that your balance is below £2').send();
	
	nexmoHelper.requestCallStatus(deviceType).then(function(callStatus) 
		{
			console.log(res.callStatus);
			res.say(callStatus).send();
		}).catch(function(err) {
        console.log(err.statusCode);
        var prompt = 'Some thing went wrong whilst trying to call your mobile';
        res.say(prompt).reprompt(reprompt).shouldEndSession(false).send();
      });
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
		res.say('Calling device number '+req.slot('DEVICE'));
	}
);
module.exports = app;
