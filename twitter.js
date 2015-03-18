//TODO: Add promises to replace setTimeouts
//      Modularize code
//      Set up cron jobs to generate some funny tweets
//          See if there are verb lists/ regexes out there

var Twit = require('twit');
var keys = require('./config.js');
var request = require('request');
var Promise = require('bluebird');


var T = new Twit({
    consumer_key:         keys.consumer_key
  , consumer_secret:      keys.consumer_secret
  , access_token:         keys.access_token
  , access_token_secret:  keys.access_token_secret
})

var topArticles;

request('http://api.nytimes.com/svc/topstories/v1/home.json?api-key=febb5d95a9a6c1462b9ef9e253ee2f04:18:71602642', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    topArticles = JSON.parse(body);
  }
});

var message;

setTimeout(function(){
  var title = JSON.stringify(topArticles.results[0].title);
  //remove the beginning and ending quotes
  var title = title.replace(/(['"])/g, "")
  message = title;
  console.log(message)
}, 1000)



var tweet = function(){
  T.post('statuses/update', { status: message + " in bed" }, function(err, data, response) {
  if(err){console.log(err)}
  console.log('Posted!')
  })
}

setTimeout(tweet, 1500)