var Promise = require('bluebird');

var redis = require("redis"),
  client = redis.createClient();
  client.on("error", function (err) {
      console.log("Error " + err);
});

var push = function(queueName, value){
  client.rpush(queueName, value, redis.print);
}

var pop = function(queueName){
  return new Promise(function(resolve, reject) {
    client.lpop(queueName, function(err, result){
      resolve(result);
    })
  });
}

module.exports = {
  push: push,
  pop: pop,
  queueName: "sam_steller"
}