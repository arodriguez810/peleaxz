var lines = process.stdout.getWindowSize()[1];
for (var i = 0; i < lines; i++) console.log("\r\n");
var folders = {
    models: "1-models",
    service: "2-service",
    controllers: "3-controllers",
    crud: "4-crud",
    views: "5-views",
    master: "views/master",
    language: "6-language",
    scripts: "scripts",
    modules: "modules",
    config: "0-config",
    styles: "styles",
    server: "server",
    files: "files",
    themes: "styles/colors",
};
var modules = {}, localjs = [], localModules = [], localModulesVars = [], modulesList = [], developer = {}, themes = [];
//var modules = {}, localjs = [], localModules = [], localModulesVars = [], modulesList = [], developer = {},themes=[];
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


var LANGUAGE = {};
languages = getFiles("./" + folders.language + "/");
THEMES = getFiles("./" + folders.themes + "/");
themes = [];
THEMES.forEach(function (theme) {
    themes.push({name: theme.replace('.css', ''), code: theme.replace('.css', ''), css: theme});
});

languages = languages.filter(function (file) {
    return file.indexOf('.disabled') === -1;
});

languages.forEach(function (languages) {
    var lan = eval("(" + fs.readFileSync(folders.language + "/" + languages) + ")");
    var nedted = "";
    for (var lany of languages.split('/')) {
        if (lany.indexOf('.json') === -1)
            eval(`if(LANGUAGE.${nedted + lany}===undefined)LANGUAGE.${nedted + lany}={};`);
        else {
            eval(`LANGUAGE.${nedted.substr(0, nedted.length - 1)}=lan;`);
        }
        nedted += `${lany}.`;
    }
});


SHOWLANGS = [];
SHOWLANGSConsole = [];
for (var lan of CONFIG.languages)
    SHOWLANGSConsole.push(lan.name);
SHOWLANGS = CONFIG.languages;

for (var i in CONFIG.modules) {
    var module = CONFIG.modules[i];
    localModules.push(module.module);
    localModulesVars.push(module.var);
    eval("var " + module.var + " = require('" + module.module + "');");
}

storage.init({
    dir: CONFIG.storage,
    stringify: JSON.stringify,
    parse: JSON.parse,
    encoding: 'utf8',
    logging: false,
    ttl: false,
    expiredInterval: 2 * 60 * 1000,
    forgiveParseErrors: false
});

oracle.autoCommit = true;
var upload = multer({dest: folders.files + '/uploads/'});

var jsoncsv = require('express-json-csv')(express);
localModulesVars.push("jsoncsv");
//******* Load Custom Modules********//

var filesmodules = fs.readdirSync("./" + folders.modules + "/");

for (var i in filesmodules) {
    var file = filesmodules[i];
    modulesList.push(file.replace(".js", "").replace("BASE_", ""));
    eval("modules." + file.replace(".js", "").replace("BASE_", "") + " = require('./" + folders.modules + "/" + file + "');");
}

localStyles = getFiles("./" + folders.styles + "/");
localjs = getFiles("./" + folders.scripts + "/");
localserver = getFiles("./" + folders.server + "/");
controllersjs = getFiles("./" + folders.controllers + "/");
crudjs = getFiles("./" + folders.crud + "/");
//******* Load Custom Modules********//

//******* App Configuration ********//
var app = express();
app.use(compression());
if (CONFIG.mongo !== undefined) mongoose.connect(CONFIG.mongo);
app.use(express.static(__dirname));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({extended: "true", limit: '100mb'}));
app.use(bodyParser.json({limit: '100mb'}));
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
    allparams += "      " + name + ":modules." + name + ",";
}

var secure = {};
secure.check = (req, res, next) => {
    if (!CONFIG.features.token) {
        next();
        return;
    }
    var path = req.originalUrl;
    var realPath = path.split("?")[0];
    if (CONFIG.routes.notoken.indexOf(realPath) !== -1) {
        next();
        return;
    }
    let token = req.headers['x-access-token'] || req.headers['authorization'] || "";
    if (token) {
        jwt.verify(token, CONFIG.appKey, (err, decoded) => {
            if (err) {
                return res.json({
                    apptoken: false,
                    message: 'Token is not valid',
                    url: realPath,
                    code: "2"
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            apptoken: false,
            message: 'Auth token is not supplied',
            url: realPath,
            code: "1"
        });
    }
};

for (var i in localModulesVars) {
    var name = localModulesVars[i];
    allparams += "      " + name + ":" + name + ",";
}
allparams += "      collections: collections,";
allparams += "      scope: '@model@',";
allparams += "      modules:modules,";
allparams += "      storage:storage,";
allparams += "      secure:secure,";
allparams += "      themes:themes,";
allparams += "      fs:fs,";
allparams += "      jwt:jwt,";
allparams += "      rimraf:rimraf,";
allparams += "      localjs:localjs,";
allparams += "      localStyles:localStyles,";
allparams += "      controllersjs:controllersjs,";
allparams += "      localserver:localserver,";
allparams += "      upload:upload,";
allparams += "      crudjs:crudjs,";
allparams += "      models:models,";
allparams += "      mssql:mssql,";
allparams += "      mysql:mysql,";
allparams += "      oracle:oracle,";
allparams += "      CONFIG:CONFIG,";
allparams += "      LANGUAGE:LANGUAGE,";
allparams += "      SHOWLANGS:SHOWLANGS,";
allparams += "      OneSignal:OneSignal,";
allparams += "      catalogs:catalogs,";
allparams += "      mail:mail,";
allparams += "      folders:folders,";
allparams += "      servicesFunctions:servicesFunctions,";
allparams += "      app:app,";
if (CONFIG.mongo) allparams += "  mongoose:mongoose,";
if (CONFIG.mssql) allparams += "  modelsql:modelsql,";
if (CONFIG.mysql) allparams += "  modelmysql:modelmysql,";
if (CONFIG.oracle) allparams += "  modeloracle:modeloracle,";
if (true) allparams += "  modelstorage:modelstorage,";

allparams += "}";

//******* Load Models********//
var models = [],
    modelsql = [],
    modelmysql = [],
    modeloracle = [],
    modelstorage = [];
var collections = {},
    collectionsql = {};

loadedMotors = 0;

var PARAMS = eval("(" + allparams + ")");

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
} else loadedMotors++;
if (CONFIG.mssql !== undefined) {
    var msfiles = fs.readdirSync("./" + folders.models + "/mssql");

    for (var i in msfiles) {
        var file = msfiles[i];
        modelsql.push(S(file).replaceAll(".sql", "").replaceAll("MO_", "").s);
    }

    var queries = [];
    for (var i in msfiles) {
        var sentence = msfiles[i];
        var query = fs.readFileSync(`./${folders.models}/mssql/${sentence}`);
        queries.push(util.format("%s", query));
    }
    modules.mssql.executeNonQueryArray(queries, PARAMS, false).then(x => {
        console.log('loaded mssql models');
        fs.readdir("./" + folders.models + "/scripts/mssql", function (err, mssentences) {
            var queries = [];
            for (var i in mssentences) {
                var sentence = mssentences[i];
                var query = fs.readFileSync(`./${folders.models}/scripts/mssql/${sentence}`);

                queries.push(util.format("%s", query));
            }
            modules.mssql.executeNonQueryArray(queries, PARAMS, false).then((data) => {
                console.log('loaded mssql queries');
                loadedMotors++;
            });
        });
    });

    var MSSQLDB = {};
    for (var i in modelsql) {

        var stringModel = S(allparams).replaceAll("@model@", modelsql[i]).s;
        eval("MSSQLDB." + modelsql[i] + " = new modules.mssql.Model('" + modelsql[i] + "'," + allparams + ");");
        modules.mssql.defaultRequests(
            eval(util.format("MSSQLDB.%s", modelsql[i])),
            eval("(" + stringModel + ")")
        );
    }
} else loadedMotors++;
if (CONFIG.mysql !== undefined) {
    var myfiles = fs.readdirSync("./" + folders.models + "/mysql");

    for (var i in myfiles) {
        var file = myfiles[i];
        modelmysql.push(S(file).replaceAll(".sql", "").replaceAll("MO_", "").s);
    }


    var queries = [];
    for (var i in myfiles) {
        var sentence = myfiles[i];
        var query = fs.readFileSync(`./${folders.models}/mysql/${sentence}`);
        queries.push(util.format("%s", query));
    }

    modules.mysql.executeNonQueryArray(queries, PARAMS, false).then(x => {
        console.log('loaded mysql models');
        fs.readdir("./" + folders.models + "/scripts/mysql", function (err, mysentences) {
            var queries = [];
            for (var i in mysentences) {
                var sentence = mysentences[i];
                var query = fs.readFileSync(`./${folders.models}/scripts/mysql/${sentence}`);

                queries.push(util.format("%s", query));
            }
            modules.mysql.executeNonQueryArray(queries, PARAMS, false).then((data) => {
                console.log('loaded mysql queries');
                loadedMotors++;
            });
        });
    });


    var MYQLDB = {};
    for (var i in modelmysql) {
        var stringModel = S(allparams).replaceAll("@model@", modelmysql[i]).s;
        eval("MYQLDB." + modelmysql[i] + " = new modules.mysql.Model('" + modelmysql[i] + "'," + allparams + ");");
        modules.mysql.defaultRequests(
            eval(util.format("MYQLDB.%s", modelmysql[i])),
            eval("(" + stringModel + ")")
        );
    }
} else loadedMotors++;
if (CONFIG.oracle !== undefined) {

    var orafiles = fs.readdirSync("./" + folders.models + "/oracle");


    for (var i in orafiles) {
        var file = orafiles[i];
        modeloracle.push(S(file).replaceAll(".sql", "").replaceAll("MO_", "").s);
    }

    var queries = [];
    for (var i in orafiles) {
        var sentence = orafiles[i];
        var query = fs.readFileSync(`./${folders.models}/oracle/${sentence}`);
        queries.push(util.format("%s", query));
    }
    modules.oracle.executeNonQueryArray(queries, PARAMS, false).then(x => {
        console.log('loaded oracle models');
        fs.readdir("./" + folders.models + "/scripts/oracle", function (err, orasentences) {
            var queries = [];
            for (var i in orasentences) {
                var sentence = orasentences[i];
                var query = fs.readFileSync(`./${folders.models}/scripts/oracle/${sentence}`);

                queries.push(util.format("%s", query));
            }
            modules.oracle.executeNonQueryArray(queries, PARAMS, false).then((data) => {
                console.log('loaded oracle queries');
                loadedMotors++;
            });
        });
    });


    var ORACLEDB = {};
    for (var i in modeloracle) {
        var stringModel = S(allparams).replaceAll("@model@", modeloracle[i]).s;
        eval("ORACLEDB." + modeloracle[i] + " = new modules.oracle.Model('" + modeloracle[i] + "'," + allparams + ");");
        modules.oracle.defaultRequests(
            eval(util.format("ORACLEDB.%s", modeloracle[i])),
            eval("(" + stringModel + ")")
        );
    }

} else loadedMotors++;
if (true) {

    for (var i in CONFIG.storageEntities) {
        modelstorage.push(i);
    }
    console.log('loaded storage models');
    var STORAGEDB = {};
    for (var i in modelstorage) {
        var stringModel = S(allparams).replaceAll("@model@", modelstorage[i]).s;
        eval("STORAGEDB." + modelstorage[i] + " = new modules.storage.Model('" + modelstorage[i] + "'," + allparams + ");");
        modules.storage.defaultRequests(eval(util.format("STORAGEDB.%s", modelstorage[i])), eval("(" + stringModel + ")"));
    }
    console.log('loaded storage queries');
    loadedMotors++;
} else loadedMotors++;
while (loadedMotors < 5) sleep(1);

servicesFiles = getFiles("./" + folders.service + "/");
var catalogs = [];
var servicesFunctions = [];
servicesFiles.forEach(function (item) {
    var model = item.replace(".js", "").replace("SE_", "");
    model = S(model).replaceAll('/', '_').s;
    eval(util.format("%sService = require('" + "./" + folders.service + "/%s');", model, item));
    var stringModel = S(allparams).replaceAll("@model@", model).s;
    eval(model + "Service.run(" + stringModel + ");");
    eval("services = " + model + "Service.api");
    servicesFunctions[model] = services;
});

servicesFiles.forEach(function (item) {
    var model = item.replace(".js", "").replace("SE_", "");
    model = S(model).replaceAll('/', '_').s;
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
console.log("******************".pxz + CONFIG.appName.pxz + " Server*************************************".pxz);
console.log("Server : ".pxz + `${CONFIG.ssl === true ? 'https://' : 'http://'}${CONFIG.subdomain !== '' ? CONFIG.subdomain + '.' : ''}${CONFIG.domain}:${CONFIG.port === 80 ? '' : CONFIG.port}`);
console.log("LAGs   : ".pxz + SHOWLANGSConsole.join(','));
if (CONFIG.mongo !== undefined) console.log("Mongo  : ".pxz + models);
if (CONFIG.mssql !== undefined) console.log("MSSQL  : ".pxz + modelsql);
if (CONFIG.mysql !== undefined) console.log("MYSQL  : ".pxz + modelmysql);
if (CONFIG.mysql !== undefined) console.log("ORACLE : ".pxz + modeloracle);
console.log("Custom : ".pxz + modulesList);
console.log("Modules: ".pxz + localModules);
console.log("**********************************************************************".pxz);
