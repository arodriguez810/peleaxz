var port = 8090;
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var S = require('string');
var util = require('util');

mongoose.connect('mongodb://localhost:27017/pxz');
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

var models = ['admin', 'todo'];
var admins = mongoose.model('admin', {username: String, password: String});
var todo = mongoose.model('todo', {text: String});

var allparams = "{app: app, dir: __dirname, Model: @model@}";
for (var i in models) {
    var model = models[i];
    eval(util.format("var %sService = require('./service/%s.js');", model, model));
    eval(util.format("todoService.init($s);", S(allparams).replaceAll("@model@", model)));
}
app.listen(port);
console.log("App listening on port " + port);