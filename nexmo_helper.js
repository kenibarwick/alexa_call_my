'use strict';
var _ = require('lodash');
var rp = require('request-promise');
var ENDPOINT = 'http://services.faa.gov/airport/status/';

function NexmoHelper() { }

NexmoHelper.prototype.requestCallStatus = function(deviceType) {
  return this.getCallStatus(deviceType).then(
    function(response) {
      console.log('success - received airport info for ' + deviceType);
      return response.body;
    }
  );
};

NexmoHelper.prototype.getCallStatus = function(deviceType) {
  var options = {
    method: 'GET',
    uri: ENDPOINT + deviceType,
    resolveWithFullResponse: true,
    json: true
  };
  return rp(options);
};
module.exports = NexmoHelper;

NexmoHelper.prototype.formatCallStatus = function(airportStatus) {
  var weather = _.template('The current weather conditions are ${weather}, ${temp} and wind ${wind}.')({
    weather: airportStatus.weather.weather,
    temp: airportStatus.weather.temp,
    wind: airportStatus.weather.wind
  });
  if (airportStatus.delay === 'true') {
    var template = _.template('There is currently a delay for ${airport}. ' +
      'The average delay time is ${delay_time}. ' +
      'Delay is because of the following: ${delay_reason}. ${weather}');
    return template({
      airport: airportStatus.name,
      delay_time: airportStatus.status.avgDelay,
      delay_reason: airportStatus.status.reason,
      weather: weather
    });
  } else {
    //    no delay
    return _.template('There is currently no delay at ${airport}. ${weather}')({
      airport: airportStatus.name,
      weather: weather
    });
  }
};