//******* Load Modules********//
var fs = require("fs");
var CONFIG = eval("(" + fs.readFileSync('config.json') + ")");
var modules = {}, localModules = [], modulesList = [];

for (var i in CONFIG.modules) {
    var module = CONFIG.modules[i];
    localModules.push(module.module);
    eval("var " + module.var + " = require('" + module.module + "');")
}

//******* App Configuration ********//
var app = express();
mongoose.connect(CONFIG.mongo);
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.set('view engine', 'ejs');
app.set('layouts', './views/master');

//******* Load Custom Modules********//
fs.readdir('./custommodules/', function (err, files) {
    for (var i in files) {
        var file = files[i];
        modulesList.push(file.replace(".js", ""));
        eval("modules." + file.replace(".js", "") + " = require('./custommodules/" + file + "');");
    }
});

//******* Params To Services********//
var allparams = "{";
allparams += "app: app,";
allparams += "dir: __dirname,";
allparams += "collections: collections,";
allparams += "modelName: '@model@',";
allparams += "util:util,";
allparams += "modules:modules,";
allparams += "fs:fs";
allparams += "}";

//******* Load Models********//
var models = [];
var collections = {};
fs.readdir('./models', function (err, files) {
    for (var i in files) {
        var file = files[i];
        models.push(S(file).replaceAll(".json", "").s);
    }
    for (var i in models) {
        var model = models[i];
        var content = fs.readFileSync(util.format("./models/%s.json", model));
        eval(util.format("collections.%s = mongoose.model('%s', %s);", model, model, content));
        eval(util.format("%sService = require('./service/%s.js');", model, model));
        var stringModel = S(allparams).replaceAll("@model@", model).s;
        eval(util.format("%sService.init(%s);", model, stringModel));
    }
    app.listen(CONFIG.port);
    var lines = process.stdout.getWindowSize()[1];
    for(var i = 0; i < lines; i++) {
        console.log('\r\n');
    }
    console.log("\x1b[43m\x1b[31m******************Pelea XZ Server*************************************\x1b[0m");
    console.log("\x1b[43m\x1b[31mServer :\x1b[0m " + CONFIG.port);
    console.log("\x1b[43m\x1b[31mMongoDB:\x1b[0m " + CONFIG.mongo);
    console.log("\x1b[43m\x1b[31mModels :\x1b[0m " + models);
    console.log("\x1b[43m\x1b[31mCustom :\x1b[0m " + modulesList);
    console.log("\x1b[43m\x1b[31mModules:\x1b[0m " + localModules);
    console.log("\x1b[43m\x1b[31m**********************************************************************\x1b[0m");
});
