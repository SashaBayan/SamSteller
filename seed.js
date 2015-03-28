var utils = require('./utils.js');
var keys = require('./config.js');
var utils = require('./utils.js')
var db = require('./db.js')
var nyt_url = keys.nyt_url + keys.api_key;

utils.getArticles(nyt_url).then(function(articles){
  for (var i = 0; i < articles.results.length; i++) {
    var title = utils.stringifyMessage(articles.results[i].title);
    var url = utils.stringifyMessage(articles.results[i].url);
    db.push(db.queueName, title)
  };
})