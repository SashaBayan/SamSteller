var Promise = require('bluebird');

var redis = require("redis"),
  client = redis.createClient();
// if you'd like to select database 3, instead of 0 (default), call
// client.select(3, function() { /* ... */ });
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
  // var lpop = Promise.promisify(client.lpop);
  // return lpop(queueName);
}

module.exports = {
  push: push,
  pop: pop
}


////////////////////////EXAMPLE of how to push and pop from Queue//////////////
// client.rpush("queue1", "string 1", redis.print);
// client.rpush("queue1", "string 2", redis.print);
// client.rpush("queue1", "string 3", redis.print);
// client.lpop("queue1", redis.print);