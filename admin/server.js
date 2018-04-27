//******* Load Modules********//
var lines = process.stdout.getWindowSize()[1];
for (var i = 0; i < lines; i++)  console.log('\r\n');
var fs = require("fs");
var CONFIG = eval("(" + fs.readFileSync('config.json') + ")");
var modules = {}, localjs = [], localModules = [], modulesList = [];
for (var i in CONFIG.modules) {
    var module = CONFIG.modules[i];
    localModules.push(module.module);
    eval("var " + module.var + " = require('" + module.module + "');")
}


//******* Load Custom Modules********//
fs.readdir('./custommodules/', function (err, files) {
    for (var i in files) {
        var file = files[i];
        modulesList.push(file.replace(".js", ""));
        eval("modules." + file.replace(".js", "") + " = require('./custommodules/" + file + "');");
    }
});
var getFiles = function (dir, filelist, prefix) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    prefix = prefix || "";
    files.forEach(function (file) {
        if (fs.statSync(dir + '/' + file).isDirectory()) {
            filelist = getFiles(dir + '/' + file, filelist, file + "/");
        }
        else {
            filelist.push(prefix + file);
        }
    });
    return filelist;
};
localjs = getFiles('./js/');
//******* Load Custom Modules********//

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

colors.setTheme({
    pxz: ['red', 'bgYellow'],
    error: ['red', 'underline'],
    success: ['green', 'bgWhite'],
    info: ['cyan', 'bgBlue'],
    warning: ['yellow', 'bgRed']
});
//******* App Configuration ********//

//******* Params To Services********//
var allparams = "{";
allparams += "      app: app,";
allparams += "      dir: __dirname,";
allparams += "      collections: collections,";
allparams += "      modelName: '@model@',";
allparams += "      util:util,";
allparams += "      modules:modules,";
allparams += "      fs:fs,";
allparams += "      S:S,";
allparams += "      localjs:localjs,";
allparams += "      models:models,";
allparams += "      session:session";
allparams += "}";

//******* Load Models********//
var models = [];
var collections = {};
var session = {
    name: 'Angel',
    lastName: 'Rodriguez',
    id: '1',
    fullName: function () {
        return this.name + " " + this.lastName;
    }
};
var sessions = [];
sessions.push(session);
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
    console.log("******************Pelea XZ Server*************************************".pxz);
    console.log("Server : ".pxz + CONFIG.port);
    console.log("MongoDB: ".pxz + CONFIG.mongo);
    console.log("Models : ".pxz + models);
    console.log("Custom : ".pxz + modulesList);
    console.log("Modules: ".pxz + localModules);
    console.log("**********************************************************************".pxz);

});
