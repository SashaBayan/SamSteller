$ = require('jquery')
var request = require('request')


var topArticles = [];


// var fetchTopArticles = function(){
//   $.ajax({
//     url: "http://api.nytimes.com/svc/topstories/v1/home.json?api-key=febb5d95a9a6c1462b9ef9e253ee2f04:18:71602642",
//     success: function(data){
//       console.log("Data", data);
//       topArticles = data;
//     },
//     error: function(err){
//       console.log("Error", err);
//     },
//     dataType: "json"
//   });
// }

// fetchTopArticles()

setTimeout(function(){
  for (var i = 0; i < topArticles.results.length; i++) {
    var title = topArticles.results[i].title;
    // var regEx = /\w+/g
    // var firstWord = regEx.exec(title)[0]
    // var newTitle = title.replace(firstWord, "butt");
    var newTitle = title + " in bed"
    topArticles.push(newTitle);
    $('body').append("<h3>" + newTitle + "</h3>");
  };
}, 3000);

module.exports = topArticles;