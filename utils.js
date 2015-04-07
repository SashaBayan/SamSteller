var T = require('./twit.js').T;
var Promise = require('bluebird');
var request = require('request');

var getArticles = function(url) {
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

var stringifyMessage = function(article){
  var title = JSON.stringify(article);
  //remove the beginning and ending quotes
  title = title.replace(/(['"])/g, "");
  return title;
}

var hashtags = ["newyorktimes", "nyt", "news", "breakingnews", "important"];

var randomElement = function(array){
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

var randomHashTag = function(){return randomElement(hashtags);}

var tweet = function(message, url, hashtag){
  T.post("statuses/update", { status: message + " in Bed " + "#" + randomHashTag() + " " + url  }, function(err, data, response) {
    if(err){console.log(err)}
    else{
      console.log("Posted!");
    }
  })
}


module.exports = {
  stringifyMessage: stringifyMessage,
  tweet: tweet,
  getArticles: getArticles,
  randomHashTag: randomHashTag
}