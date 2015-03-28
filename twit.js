var Twit = require('twit');
var keys = require('./config.js');

var T = new Twit({
    consumer_key:         keys.consumer_key
  , consumer_secret:      keys.consumer_secret
  , access_token:         keys.access_token
  , access_token_secret:  keys.access_token_secret
});

module.exports = {
  T: T
}