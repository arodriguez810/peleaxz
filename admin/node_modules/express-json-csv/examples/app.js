/**
 * Module dependencies.
 */
var express = require('express'),
  http = require('http'),
  jsoncsv = require('../lib/express-json-csv')(express);

/** Main app */  

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);  
  app.use(express.urlencoded());
  app.use(express.json());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));  
});

app.get('/', function(req, res) {
  res.csv(
    [{field: {test: 'test'}, field2: 'zou' }, {field: {test: 'test'} , field2: 'zoubi' }, {field: {test: 'test'} , field2: 'zoubida' }, {field: {test: 'test'} }, {field: {test: 'test'} }],

    {fields:['field', 'field2']});
});

app.get('/err1', function(req, res) {
  res.csv();
});

app.get('/err2', function(req, res) {
  res.csv('', {});
});

app.get('/err3', function(req, res) {
  res.csv('', {fields: 'titi'});
});

app.get('/err4', function(req, res) {
  res.csv('', {fields: ['titi']});
});

// Server started
http.createServer(app).listen(app.get('port'), function(){
  console.log('info', 'Express server listening on port 3000');
});




