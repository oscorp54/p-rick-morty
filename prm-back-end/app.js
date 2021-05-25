var express = require('express');
var request = require('request');

var app = express();

// app.set('port', process.env.PORT || 3001);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --------------------
app.get('/list', (requestGet, responseGet) => {

  var params = requestGet.body;
  
  var linkPage = '';
  if (Object.keys(params).length !== 0) {
    var nextPage = params.nextPage;
    var previousPage = params.previousPage;
    linkPage = nextPage ? nextPage : previousPage;

  } else {
    linkPage = 'https://rickandmortyapi.com/api/character';

  }

  request({
      url: linkPage
  }, function(error, response, body){
      if(error) {
          console.log(error);
      } else {
          console.log('response: ' + response.statusCode);
          responseGet.json(JSON.parse(body));
      }
  });
});


app.get('/character/:id', (requestGet, responseGet) => {

  var params = requestGet.body;
  
  // var linkPage = params.characterInfo;
  var linkPage = 'https://rickandmortyapi.com/api/character/' + requestGet.params.id;

  request({
      url: linkPage
  }, function(error, response, body){
      if(error) {
          console.log(error);
      } else {
          console.log('response: ' + response.statusCode);
          responseGet.json(JSON.parse(body));
      }
  });
});

app.listen(app.get('port'), function() { 
  console.log("Hello world, app listening on port " + app.get('port'))
});


// --------------------

module.exports = app;
