var lines = process.stdout.getWindowSize()[1];
for (var i = 0; i < lines; i++) console.log("\r\n");
var folders = {
    models: "1-models",
    service: "2-service",
    controllers: "3-controllers",
    crud: "4-crud",
    views: "5-views",
    master: "views/master",
    systems: "6-systems",
    scripts: "scripts",
    modules: "modules",
    config: "0-config"
};
var modules = {}, localjs = [], localModules = [], localModulesVars = [], modulesList = [], developer = {};
var fs = require("fs");
var getFiles = function (dir, filelist, prefix) {
    var fs = fs || require("fs"),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    prefix = prefix || "";
    files.forEach(function (file) {
        if (fs.statSync(dir + "/" + file).isDirectory()) {
            filelist = getFiles(dir + "/" + file, filelist, prefix + file + "/");
        } else {
            filelist.push(prefix + file);
        }
    });
    return filelist;
};
var CONFIG = {};
configs = getFiles("./" + folders.config + "/");

configs = configs.filter(function (file) {
    return file.indexOf('.disabled') === -1;
});
configs.forEach(function (config) {
    var file = eval("(" + fs.readFileSync(folders.config + "/" + config) + ")");
    Object.assign(CONFIG, file);
});
for (var i in CONFIG.modules) {
    var module = CONFIG.modules[i];
    localModules.push(module.module);
    localModulesVars.push(module.var);
    eval("var " + module.var + " = require('" + module.module + "');");
}

//******* Load Custom Modules********//
fs.readdir("./" + folders.modules + "/", function (err, files) {
    for (var i in files) {
        var file = files[i];
        modulesList.push(file.replace(".js", "").replace("BASE_", ""));
        eval(
            "modules." +
            file.replace(".js", "").replace("BASE_", "") +
            " = require('./" +
            folders.modules +
            "/" +
            file +
            "');"
        );
    }
});


localjs = getFiles("./" + folders.scripts + "/");
crudjs = getFiles("./" + folders.crud + "/");
//******* Load Custom Modules********//

//******* App Configuration ********//
var app = express();
if (CONFIG.mongo !== undefined) mongoose.connect(CONFIG.mongo);
app.use(express.static(__dirname));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: "true"}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(methodOverride());
app.set("view engine", "ejs");
app.set("layouts", "./" + folders.master);

colors.setTheme({
    pxz: ["red", "bgYellow"],
    error: ["red", "underline"],
    success: ["green", "bgWhite"],
    info: ["cyan", "bgBlue"],
    warning: ["yellow", "bgRed"]
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
allparams += "      crudjs:crudjs,";
allparams += "      models:models,";
allparams += "      mssql:mssql,";
allparams += "      mysql:mysql,";
allparams += "      CONFIG:CONFIG,";
allparams += "      catalogs:catalogs,";
allparams += "      folders:folders,";
if (CONFIG.mongo) allparams += "  mongoose:mongoose,";
if (CONFIG.mssql) allparams += "  modelsql:modelsql,";
if (CONFIG.mysql) allparams += "  modelmysql:modelmysql,";
allparams += "      session:session";
allparams += "}";

//******* Load Models********//
var models = [],
    modelsql = [],
    modelmysql = [];
var collections = {},
    collectionsql = {};
var session = {
    name: "Angel",
    lastName: "Rodriguez",
    id: "1",
    fullName: function () {
        return this.name + " " + this.lastName;
    }
};
var sessions = [];
sessions.push(session);


loadedMotors = 0;
if (CONFIG.mongo !== undefined) {
    fs.readdir("./" + folders.models + "/mongo", function (err, files) {
        for (var i in files) {
            var file = files[i];
            models.push(
                S(file)
                    .replaceAll(".json", "")
                    .replaceAll("MO_", "").s
            );
        }
        for (var i in models) {
            var model = models[i];
            var content = fs.readFileSync(
                util.format("./" + folders.models + "/mongo/MO_%s.json", model)
            );
            eval(
                util.format(
                    "collections.%s = mongoose.model('%s', %s);",
                    model,
                    model,
                    content
                )
            );
        }
        if (CONFIG.mongo)
            for (var i in models) {
                var model = models[i];
                var stringModel = S(allparams).replaceAll("@model@", model).s;
                modules.request.defaultRequests(
                    eval("(" + stringModel + ")"),
                    eval(util.format("collections.%s", model))
                );
            }
        loadedMotors++;
    });
} else {
    loadedMotors++;
}

if (CONFIG.mssql !== undefined) {
    fs.readdir("./" + folders.models + "/mssql", function (err, files) {
        for (var i in files) {
            var file = files[i];
            modelsql.push(
                S(file)
                    .replaceAll(".json", "")
                    .replaceAll("MO_", "").s
            );
        }

        for (var i in modelsql) {
            var model = modelsql[i];
            var content = fs.readFileSync(
                util.format("./" + folders.models + "/mssql/MO_%s.json", model)
            );
            var object = eval("(" + util.format("%s", content) + ")");
            var create = modules.mssql.createTable(model, object, eval("(" + allparams + ")"));
            var add = modules.mssql.addColumns(model, object, eval("(" + allparams + ")"));
            var alter = modules.mssql.alterColumns(model, object, eval("(" + allparams + ")"));


            var removes = modules.mssql.deleteColumns(model, object, eval("(" + allparams + ")"));
            removes.forEach(function (item) {
                console.log(item.error);
            });
            modules.mssql.executeNonQuery(create, eval("(" + allparams + ")"));
            modules.mssql.executeNonQuery(alter, eval("(" + allparams + ")"));
            modules.mssql.executeNonQuery(add, eval("(" + allparams + ")"));
            var stringModel = S(allparams).replaceAll("@model@", model).s;
        }
        var MSSQLDB = {};
        for (var i in modelsql) {
            eval("MSSQLDB." + modelsql[i] + " = new modules.mssql.Model('" + modelsql[i] + "'," + allparams + ");");
            modules.mssql.defaultRequests(
                eval(util.format("MSSQLDB.%s", modelsql[i])),
                eval("(" + stringModel + ")")
            );
        }
        loadedMotors++;

    });
} else {
    loadedMotors++;
}

if (CONFIG.mysql !== undefined) {
    fs.readdir("./" + folders.models + "/mysql", function (err, files) {
        for (var i in files) {
            var file = files[i];
            modelmysql.push(
                S(file)
                    .replaceAll(".json", "")
                    .replaceAll("MO_", "").s
            );
        }
        for (var i in modelmysql) {
            var model = modelmysql[i];
            var content = fs.readFileSync(
                util.format("./" + folders.models + "/mysql/MO_%s.json", model)
            );
            var object = eval("(" + util.format("%s", content) + ")");
            var create = modules.mysql.createTable(model, object, eval("(" + allparams + ")"));
            var add = modules.mysql.addColumns(model, object, eval("(" + allparams + ")"));
            var alter = modules.mysql.alterColumns(model, object, eval("(" + allparams + ")"));

            modules.mysql.deleteColumns(model, object, eval("(" + allparams + ")"));
            modules.mysql.executeNonQuery(create, eval("(" + allparams + ")"));
            modules.mysql.executeNonQuery(alter, eval("(" + allparams + ")"));
            modules.mysql.executeNonQuery(add, eval("(" + allparams + ")"));
            var stringModel = S(allparams).replaceAll("@model@", model).s;
        }

        var MYQLDB = {};
        for (var i in modelmysql) {
            eval(
                "MYQLDB." + modelmysql[i] + " = new modules.mysql.Model('" + modelmysql[i] + "'," + allparams + ");");
            modules.mysql.defaultRequests(
                eval(util.format("MYQLDB.%s", modelmysql[i])),
                eval("(" + stringModel + ")")
            );
        }
        loadedMotors++;
    });
} else loadedMotors++;


while (loadedMotors < 3) {
    sleep(1);
}
services = getFiles("./" + folders.service + "/");
var catalogs = [];
services.forEach(function (item) {
    var model = item.replace(".js", "").replace("SE_", "");
    eval(util.format("%sService = require('" + "./" + folders.service + "/%s');", model, item));
    var stringModel = S(allparams).replaceAll("@model@", model).s;
    eval(model + "Service.run(" + stringModel + ");");
    eval("services = " + model + "Service.api");
    var c = modules.views.runServices(services, model, eval("(" + stringModel + ")"));
    c.forEach(function (item) {
        catalogs.push(item);
    });
});

modules.tools.init(eval("(" + allparams + ")"));
modules.views.init(eval("(" + allparams + ")"));
app.listen(CONFIG.port);
console.log(
    "******************Dragon Server*************************************".pxz
);
console.log("Server : ".pxz + CONFIG.port);
if (CONFIG.mongo !== undefined) console.log("Mongo  : ".pxz + models);
if (CONFIG.mssql !== undefined) console.log("MSSQL  : ".pxz + modelsql);
if (CONFIG.mysql !== undefined) console.log("MYSQL  : ".pxz + modelmysql);
console.log("Custom : ".pxz + modulesList);
console.log("Modules: ".pxz + localModules);
console.log(
    "**********************************************************************".pxz
);
