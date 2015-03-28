var db = require('./db.js');
var utils = require('./utils.js');

db.pop(db.queueName)
  .then(function(msg) {
    console.log("message: ", msg);
    utils.tweet(msg);  
  })
  .error(function(err){
    console.log(err)
});