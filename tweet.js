var db = require('./db.js');
var utils = require('./utils.js');

db.pop("titles")
  .then(function(msg) {
    db.pop("urls")
      .then(function(url){
        console.log("message: ", msg);
        console.log("url: ", url);
        if(!msg || !url){
          console.log("no items in the queue!")
        } else{
          utils.tweet(msg, url);  
        }
      })
  })
  .error(function(err){
    console.log(err)
});