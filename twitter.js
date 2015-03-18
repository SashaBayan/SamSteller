//TODO: Sanitize articles so they are not related to sensitive topics (esp, killing)
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

var url = 'http://api.nytimes.com/svc/topstories/v1/home.json?api-key=febb5d95a9a6c1462b9ef9e253ee2f04:18:71602642'

var getArticles = function(user) {
  return new Promise(function(resolve, reject) {
    request(url, function (error, response, body) {
      if (error) { reject(error); }
      else{
        var topArticles = JSON.parse(body);
        resolve(topArticles);
      }
    })
  });
};

getArticles().then(function(articles){
  for (var i = 0; i < articles.results.length; i++) {
    var title = stringifyMessage(articles.results[0].title);
    var url = stringifyMessage(articles.results[0].url);
    tweet(title, url);
  };
})

var stringifyMessage = function(article){
  var title = JSON.stringify(article);
  //remove the beginning and ending quotes
  title = title.replace(/(['"])/g, "");
  return title;
}

var tweet = function(message, url){
  T.post('statuses/update', { status: message + " in bed " + url }, function(err, data, response) {
    if(err){console.log(err)}
    else{
      console.log('Posted!');
    }
  })
}