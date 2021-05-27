var dbFunctions = require('./model/db');

var cors = require('cors')
var express = require('express');
var request = require('request');

// import models, { connectDB } from './model/dbAtlas';


var app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/list', (requestGet, responseGet) => {

  var page = requestGet.query.page;
  
  var linkPage = `https://rickandmortyapi.com/api/character/?page=${page}`;

  request({
      url: linkPage
  }, function(error, response, body){
      if(error) {
          console.log(error);
      } else {
          console.log('response: ' + response.statusCode);
          let jsonData = JSON.parse(body);
          
          // Cambiar codigo, no esta devolviendo los datos de forma sincrona
          // jsonData.results = dbFunctions.findCharFavorites(jsonData.results);

          console.log('favoritesss', typeof getFavorites);
          responseGet.json(jsonData)
      }
  });
});


app.get('/character/:id', (requestGet, responseGet) => {

  var params = requestGet.body;
  
  var linkPage = 'https://rickandmortyapi.com/api/character/' + requestGet.params.id;

  request({
      url: linkPage
  }, function(error, response, body){
      if(error) {
          console.log(error);
          
      } else {
          responseGet.json(JSON.parse(body));

      }
  });
});

app.listen(app.get('port'), function() { 
  console.log("Hello world!!! ===> " + app.get('port'))
});

module.exports = app;
