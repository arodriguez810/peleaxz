var port = 8090;
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/pxz');
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());

var Todo = mongoose.model('player', {
    text: String
});

var todoController = require('./service/todo.js');
todoController.init({
    app: app,
    dir: __dirname,
    Model: Todo
});


app.listen(port);
console.log("App listening on port " + port);