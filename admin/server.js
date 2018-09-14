//******* Load Modules********//
var folders = {
    models: "1-models",
    service: "2-service",
    controllers: "3-controllers",
    crud: "4-crud",
    views: "5-views",
    master: "views/master",
    systems: "6-systems",
    scripts: "scripts",
    modules: 'modules',
    config: 'config.json'
};

var lines = process.stdout.getWindowSize()[1];
for (var i = 0; i < lines; i++) console.log('\r\n');
var fs = require("fs");
var CONFIG = eval("(" + fs.readFileSync(folders.config) + ")");
var modules = {}, localjs = [], localModules = [], localModulesVars = [], modulesList = [];
for (var i in CONFIG.modules) {
    var module = CONFIG.modules[i];
    localModules.push(module.module);
    localModulesVars.push(module.var);
    eval("var " + module.var + " = require('" + module.module + "');")
}


//******* Load Custom Modules********//
fs.readdir('./' + folders.modules + '/', function (err, files) {

    for (var i in files) {
        var file = files[i];
        modulesList.push(file.replace(".js", ""));
        eval("modules." + file.replace(".js", "") + " = require('./" + folders.modules + '/' + file + "');");
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
localjs = getFiles('./' + folders.scripts + '/');
//******* Load Custom Modules********//

//******* App Configuration ********//
var app = express();
if (CONFIG.mongo)
    mongoose.connect(CONFIG.mongo);
app.use(express.static(__dirname));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());
app.set('view engine', 'ejs');
app.set('layouts', './' + folders.master);

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
for (var i in modulesList) {
    var name = modulesList[i];
    allparams += "      " + name + ":" + name + ",";
}


for (var i in localModulesVars) {
    var name = localModulesVars[i];
    allparams += "      " + name + ":" + name + ",";
}
allparams += "      collections: collections,";
allparams += "      modelName: '@model@',";
allparams += "      modules:modules,";
allparams += "      fs:fs,";
allparams += "      localjs:localjs,";
allparams += "      models:models,";
allparams += "      mssql:mssql,";
allparams += "      mysql:mysql,";
allparams += "      CONFIG:CONFIG,";
allparams += "      folders:folders,";
if (CONFIG.mongo)
    allparams += "  mongoose:mongoose,";
if (CONFIG.mssql)
    allparams += "  modelsql:modelsql,";
if (CONFIG.mysql)
    allparams += "  modelmysql:modelmysql,";
allparams += "      session:session";
allparams += "}";

//******* Load Models********//
var models = [], modelsql = [], modelmysql = [];
var collections = {}, collectionsql = {};
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
fs.readdir('./' + folders.models + '/mongo', function (err, files) {

    if (CONFIG.mongo) {
        for (var i in files) {
            var file = files[i];
            models.push(S(file).replaceAll(".json", "").s);
        }
        for (var i in models) {
            var model = models[i];
            var content = fs.readFileSync(util.format('./' + folders.models + "/mongo/%s.json", model));
            eval(util.format("collections.%s = mongoose.model('%s', %s);", model, model, content));
            eval(util.format("%sService = require('" + './' + folders.service + "/%s.js');", model, model));
            var stringModel = S(allparams).replaceAll("@model@", model).s;
            eval(util.format("%sService.init(%s);", model, stringModel));
        }
    }


    fs.readdir('./' + folders.models + '/mssql', function (err, files) {
        if (CONFIG.mssql) {
            for (var i in files) {
                var file = files[i];
                modelsql.push(S(file).replaceAll(".json", "").s);
            }
            for (var i in modelsql) {
                var model = modelsql[i];
                var content = fs.readFileSync(util.format('./' + folders.models + "/mssql/%s.json", model));
                var object = eval("(" + util.format("%s", content) + ")");
                var create = modules.mssql.createTable(model, object, eval("(" + allparams + ")"));
                var add = modules.mssql.addColumns(model, object, eval("(" + allparams + ")"));
                var alter = modules.mssql.alterColumns(model, object, eval("(" + allparams + ")"));
                modules.mssql.deleteColumns(model, object, eval("(" + allparams + ")"));
                modules.mssql.executeNonQuery(create, eval("(" + allparams + ")"));
                modules.mssql.executeNonQuery(alter, eval("(" + allparams + ")"));
                modules.mssql.executeNonQuery(add, eval("(" + allparams + ")"));
                eval(util.format("%sService = require('" + './' + folders.service + "/%s.js');", model, model));
                var stringModel = S(allparams).replaceAll("@model@", model).s;
                eval(util.format("%sService.init(%s);", model, stringModel));
            }
        }
        fs.readdir('./' + folders.models + '/mysql', function (err, files) {
            if (CONFIG.mysql) {
                for (var i in files) {
                    var file = files[i];
                    modelmysql.push(S(file).replaceAll(".json", "").s);
                }
                for (var i in modelmysql) {
                    var model = modelmysql[i];
                    var content = fs.readFileSync(util.format('./' + folders.models + "/mysql/%s.json", model));
                    var object = eval("(" + util.format("%s", content) + ")");
                    var create = modules.mysql.createTable(model, object, eval("(" + allparams + ")"));
                    var add = modules.mysql.addColumns(model, object, eval("(" + allparams + ")"));
                    var alter = modules.mysql.alterColumns(model, object, eval("(" + allparams + ")"));
                    modules.mysql.deleteColumns(model, object, eval("(" + allparams + ")"));
                    modules.mysql.executeNonQuery(create, eval("(" + allparams + ")"));
                    modules.mysql.executeNonQuery(alter, eval("(" + allparams + ")"));
                    modules.mysql.executeNonQuery(add, eval("(" + allparams + ")"));
                    eval(util.format("%sService = require('" + './' + folders.service + "/%s.js');", model, model));
                    var stringModel = S(allparams).replaceAll("@model@", model).s;
                    eval(util.format("%sService.init(%s);", model, stringModel));
                }
            }
            if (CONFIG.mongo)
                for (var i in models) {
                    var model = models[i];
                    var stringModel = S(allparams).replaceAll("@model@", model).s;
                    modules.request.defaultRequests(eval("(" + stringModel + ")"), eval(util.format("collections.%s", model)));
                }
            var MSSQLDB = {};
            if (CONFIG.mssql)
                for (var i in modelsql) {
                    eval("MSSQLDB." + modelsql[i] + " = new modules.mssql.Model('" + modelsql[i] + "'," + allparams + ");");
                    modules.mssql.defaultRequests(eval(util.format("MSSQLDB.%s", modelsql[i])), eval("(" + stringModel + ")"));
                }
            var MYQLDB = {};
            if (CONFIG.mysql)
                for (var i in modelmysql) {
                    eval("MYQLDB." + modelmysql[i] + " = new modules.mysql.Model('" + modelmysql[i] + "'," + allparams + ");");
                    modules.mysql.defaultRequests(eval(util.format("MYQLDB.%s", modelmysql[i])), eval("(" + stringModel + ")"));
                }

            modules.tools.init(eval("(" + allparams + ")"));
            app.listen(CONFIG.port);

            console.log("******************Dragon Server*************************************".pxz);
            console.log("Server : ".pxz + CONFIG.port);
            if (CONFIG.mongo)
                console.log("MongoDB: ".pxz + CONFIG.mongo);
            console.log("Mongo  : ".pxz + models);
            if (CONFIG.mssql)
                console.log("MSSQL  : ".pxz + modelsql);
            if (CONFIG.mysql)
                console.log("MYSQL  : ".pxz + modelmysql);
            console.log("Custom : ".pxz + modulesList);
            console.log("Modules: ".pxz + localModules);
            console.log("**********************************************************************".pxz);
        });
    });
});
