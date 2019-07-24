var lines = process.stdout.getWindowSize()[1];
for (var i = 0; i < lines; i++) console.log("\r\n");
var folders = {
    models: "2-procedures",
    service: "1-service",
    controllers: "3-controllers",
    controllersBase: "7-plugins/application/controllers",
    crudBase: "7-plugins/application/cruds",
    crud: "4-crud",
    views: "5-views",
    viewsDragon: "7-plugins",
    endpoints: "9-endpoints",
    fields: "7-plugins/templates/form",
    silents: "7-plugins/templates/system/view",
    master: "7-plugins/master",
    language: "6-language",
    scripts: "scripts",
    modules: "modules",
    sockets: "11-sockets",
    config: "0-config",
    eviroments: "8-enviroments",
    configBase: "7-plugins/application/config",
    styles: "styles",
    server: "server",
    files: "files",
    themesTemplate: "7-plugins/templates/system/color.ejs",
    themes: "files/dragon_configuration/themes",
};

var modules = {}, sockets = {}, controls = [], localjs = [], localModules = [], localModulesVars = [], modulesList = [],
    developer = {}, themes = [], socketsList = [];
var fs = require("fs");

/*FUNCTIONS*/
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
var mergeObject = function (from, to) {
    for (var i in from) {
        if (to.hasOwnProperty(i)) {
            if (typeof to[i] === 'object') {
                mergeObject(from[i], to[i]);
            } else {
                to[i] = from[i];
            }
        } else {
            to[i] = from[i];
        }
    }
};
/*FUNCTIONS*/

/*GOLBAL VARS*/
var CONFIG = {};
var ENDPOINTS = {};
var LANGUAGE = {};
/*GOLBAL VARS*/

//GET ENDPOINTS
endpoints = getFiles("./" + folders.endpoints + "/");
endpoints = endpoints.filter(function (file) {
    return file.indexOf('.disabled') === -1;
});
endpoints.forEach(function (endpoint) {
    var file = eval("(" + fs.readFileSync(folders.endpoints + "/" + endpoint) + ")");
    mergeObject(file, ENDPOINTS);
});

//GET CONFIG
configs = getFiles("./" + folders.configBase + "/");
configs = configs.filter(function (file) {
    return file.indexOf('.disabled') === -1;
});
configs.forEach(function (config) {
    var file = eval("(" + fs.readFileSync(folders.configBase + "/" + config) + ")");
    mergeObject(file, CONFIG);
});
//CONFIG ORIGINAL
configs = getFiles("./" + folders.config + "/");
configs = configs.filter(function (file) {
    return file.indexOf('.disabled') === -1;
});
configs.forEach(function (config) {
    var file = eval("(" + fs.readFileSync(folders.config + "/" + config) + ")");
    mergeObject(file, CONFIG);
});

//CONFIG BY MODE
var configMode = CONFIG.mode === "developer" ? folders.config : `${folders.eviroments}/${CONFIG.mode}`;

var CONFIG = {};
configs = getFiles("./" + folders.configBase + "/");
configs = configs.filter(function (file) {
    return file.indexOf('.disabled') === -1;
});
configs.forEach(function (config) {
    var file = eval("(" + fs.readFileSync(folders.configBase + "/" + config) + ")");
    mergeObject(file, CONFIG);
});

configs = getFiles("./" + configMode + "/");
configs = configs.filter(function (file) {
    return file.indexOf('.disabled') === -1;
});
configs.forEach(function (config) {
    var file = eval("(" + fs.readFileSync(configMode + "/" + config) + ")");
    mergeObject(file, CONFIG);
});

//GET MODULES NODEJS
for (var i in CONFIG.modules) {
    var module = CONFIG.modules[i];
    localModules.push(module.module);
    localModulesVars.push(module.var);
    eval("var " + module.var + " = require('" + module.module + "');");
}

CONFIG.socketsList = socketsList;

//GET LANGUAGES
languages = getFiles("./" + folders.language + "/");
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
            mergeObject(lan, eval(`LANGUAGE.${nedted.substr(0, nedted.length - 1)}`));
        }
        nedted += `${lany}.`;
    }
});

//THEMES
THEMES = getFiles("./" + folders.themes + "/");
themes = [];
THEMES.forEach(function (theme) {
    themes.push({name: theme.replace('.css', ''), code: theme.replace('.css', ''), css: theme});
});
var ThemeTemplate = fs.readFileSync(folders.themesTemplate).toString();
shadesMonochrome = function (color, name, shadesBlocks) {
    var colors = [];
    var hsl = tinycolor(color).toHsl();
    var index = 1;
    for (var i = 9.5; i >= 0.5; i -= 1) {
        hsl.l = 0.1 * i;
        colors[index] = tinycolor(hsl).toHexString();
        index++;
    }
    var shades = {};
    shades.text1 = CONFIG.ui.theme.text1;
    shades.text2 = CONFIG.ui.theme.text2;
    shades.text3 = CONFIG.ui.theme.text3;
    shades.name = name;
    var shadesArray = shadesBlocks.split(',');
    eval(`shades.color0 = '${color}';`);
    for (var i in shadesArray) {
        if (shadesArray[i] == 0) {
            eval(`shades.color${parseInt(i) + 1} = '${color}';`);
        } else {
            eval(`shades.color${parseInt(i) + 1} = colors[${shadesArray[i]}];`);
        }
    }
    return shades;
};
var onerandom = tinycolor.random().toHexString();
var onerandom2 = tinycolor.random().toHexString();
if (CONFIG.ui.theme.primary === "random")
    CONFIG.ui.theme.primary = onerandom;
if (CONFIG.ui.theme.secundary === "random")
    CONFIG.ui.theme.secundary = onerandom;
if (CONFIG.ui.theme.extra === "random")
    CONFIG.ui.theme.extra = onerandom;

if (CONFIG.ui.theme.primary === "random2")
    CONFIG.ui.theme.primary = onerandom2;
if (CONFIG.ui.theme.secundary === "random2")
    CONFIG.ui.theme.secundary = onerandom2;
if (CONFIG.ui.theme.extra === "random2")
    CONFIG.ui.theme.extra = onerandom2;
primary = ejs.compile(ThemeTemplate, {})({DATA: shadesMonochrome(CONFIG.ui.theme.primary, 'primary', CONFIG.ui.shadows[CONFIG.ui.theme.primaryShades])});
secundary = ejs.compile(ThemeTemplate, {})({DATA: shadesMonochrome(CONFIG.ui.theme.secundary, 'secundary', CONFIG.ui.shadows[CONFIG.ui.theme.secundaryShades])});
extra = ejs.compile(ThemeTemplate, {})({DATA: shadesMonochrome(CONFIG.ui.theme.extra, 'extra', CONFIG.ui.shadows[CONFIG.ui.theme.extraShades])});
fs.writeFileSync(folders.themes + "/primary.css", primary);
fs.writeFileSync(folders.themes + "/secundary.css", secundary);
fs.writeFileSync(folders.themes + "/extra.css", extra);
if (CONFIG.domain === true) {
    var ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (ifname) {
        var alias = 0;
        ifaces[ifname].forEach(function (iface) {
            if ('IPv4' !== iface.family || iface.internal !== false) {
                return;
            }
            if (alias >= 1) {
                CONFIG.domain = iface.address;
            } else {
                CONFIG.domain = iface.address;
            }
            ++alias;
        });
    });
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


//Show language Variable
SHOWLANGS = [];
SHOWLANGSConsole = [];
for (var lan of CONFIG.languages)
    SHOWLANGSConsole.push(lan.name);
SHOWLANGS = CONFIG.languages;

//*SYSTEM FILES**//
if (CONFIG.oracle !== undefined)
    oracle.autoCommit = true;
var upload = multer({dest: folders.files + '/uploads/'});
var jsoncsv = require('express-json-csv')(express);
localModulesVars.push("jsoncsv");
var filesmodules = fs.readdirSync("./" + folders.modules + "/");
for (var i in filesmodules) {
    var file = filesmodules[i];
    modulesList.push(file.replace(".js", "").replace("BASE_", ""));
    eval("modules." + file.replace(".js", "").replace("BASE_", "") + " = require('./" + folders.modules + "/" + file + "');");
}

var filessockets = fs.readdirSync("./" + folders.sockets + "/");
for (var i in filessockets) {
    var file = filessockets[i];
    socketsList.push(file.replace(".js", "").replace("", ""));
    eval("sockets." + file.replace(".js", "").replace("", "") + " = require('./" + folders.sockets + "/" + file + "');");
}


localStyles = getFiles("./" + folders.styles + "/");
localjs = getFiles("./" + folders.scripts + "/");
controls = getFiles("./" + folders.fields + "/");
localserver = getFiles("./" + folders.server + "/");

//BASE CONTROLLERS
controllersjs = getFiles("./" + folders.controllersBase + "/");
for (var ctr in controllersjs)
    controllersjs[ctr] = folders.controllersBase + "/" + controllersjs[ctr];
//CUSTOM CONTROLLERS
controllersjsCustom = getFiles("./" + folders.controllers + "/");
for (var ctr in controllersjsCustom)
    controllersjsCustom[ctr] = folders.controllers + "/" + controllersjsCustom[ctr];
//MERGE CONTROLLERS
for (var ctr of controllersjsCustom)
    controllersjs.push(ctr);

//BASE CRUD'S
crudjs = getFiles("./" + folders.crudBase + "/");
for (var ctr in crudjs)
    crudjs[ctr] = folders.crudBase + "/" + crudjs[ctr];
//CUSTOM CURD's
crudCustom = getFiles("./" + folders.crud + "/");
for (var ctr in crudCustom)
    crudCustom[ctr] = folders.crud + "/" + crudCustom[ctr];
//MERGE CUSTOM
for (var ctr of crudCustom)
    crudjs.push(ctr);
//*SYSTEM FILES**//

//******* App Configuration ********//
var app = express();
var sio = require('socket.io')(CONFIG.io);
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
var textbg = CONFIG.ui.console.bg.replace("bg", "").toLowerCase();
colors.setTheme({
    pxz: [CONFIG.ui.console.text, CONFIG.ui.console.bg],
    pxz2: ["white", CONFIG.ui.console.bg],
    pxz3: [CONFIG.ui.console.text, "bgWhite"],
    normal1: ["white", "bgBlack"],
    normal2: [CONFIG.ui.console.text, "bgBlack"],
    vacio: [textbg, CONFIG.ui.console.bg],
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
for (var i in localModulesVars) {
    var name = localModulesVars[i];
    allparams += "      " + name + ":" + name + ",";
}
{
    allparams += "      collections: collections,";
    allparams += "      scope: '@model@',";
    allparams += "      modules:modules,";
    allparams += "      sockets:sockets,";
    allparams += "      socketlist:sockets,";
    allparams += "      socketsList:socketsList,";
    allparams += "      sio:sio,";
    allparams += "      storage:storage,";
    allparams += "      http:http,";
    allparams += "      fetch :fetch,";
    allparams += "      secure:secure,";
    allparams += "      themes:themes,";
    allparams += "      fs:fs,";
    allparams += "      jwt:jwt,";
    allparams += "      rimraf:rimraf,";
    allparams += "      localjs:localjs,";
    allparams += "      controls:controls,";
    allparams += "      localStyles:localStyles,";
    allparams += "      controllersjs:controllersjs,";
    allparams += "      localserver:localserver,";
    allparams += "      upload:upload,";
    allparams += "      crudjs:crudjs,";
    allparams += "      models:models,";
    allparams += "      mssql:mssql,";
    allparams += "      mysql:mysql,";
    if (CONFIG.oracle !== undefined)
        allparams += "      oracle:oracle,";
    allparams += "      CONFIG:CONFIG,";
    allparams += "      ENDPOINTS:ENDPOINTS,";
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
}

var secure = {};
secure.check = (req, res) => new Promise((resolve, reject) => {
    if (!CONFIG.features.token) {
        resolve({
            apptoken: true,
            message: 'valid',
            code: "3"
        });
    }
    var path = req.originalUrl;
    var realPath = path.split("?")[0];
    if (CONFIG.routes.notoken.indexOf(realPath) !== -1) {
        resolve({
            apptoken: true,
            message: 'valid',
            code: "3"
        });
    }
    let token = req.headers['x-access-token'] || req.headers['authorization'] || "";
    if (token) {
        jwt.verify(token, CONFIG.appKey, (err, decoded) => {
            if (err) {
                resolve({
                    apptoken: false,
                    message: 'Token is not valid',
                    url: realPath,
                    code: "2"
                });
            } else {
                req.decoded = decoded;
                resolve({
                    apptoken: true,
                    message: 'valid',
                    code: "3"
                });
            }
        });
    } else {
        resolve({
            apptoken: false,
            message: 'Auth token is not supplied',
            url: realPath,
            code: "1"
        });
    }
});
//******* Params To Services********//

//******* Load Models********//
var models = [],
    modelsql = [],
    modelmysql = [],
    modeloracle = [],
    modelstorage = [];
var collections = {},
    collectionsql = {};
loadedMotors = 0;
console.log(CONFIG.appName.pxz + " Server Engine's:".pxz);
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
    modelsql = [];
    modules.mssql.data(`select TABLE_NAME from INFORMATION_SCHEMA.TABLES`, PARAMS, false).then(x => {
        console.log('loaded mssql models');
        for (var row of x.data) {
            modelsql.push(row.TABLE_NAME);
        }
        var MSSQLDB = {};
        for (var i in modelsql) {
            var stringModel = S(allparams).replaceAll("@model@", modelsql[i]).s;
            eval("MSSQLDB." + modelsql[i] + " = new modules.mssql.Model('" + modelsql[i] + "'," + allparams + ");");
            modules.mssql.defaultRequests(
                eval(util.format("MSSQLDB.%s", modelsql[i])),
                eval("(" + stringModel + ")")
            );
        }
        loadedMotors++
        fs.readdir("./" + folders.models + "/mssql", function (err, sentences) {
            var queries = [];
            for (var i in sentences) {
                var sentence = sentences[i];
                var query = fs.readFileSync(`./${folders.models}/mssql/${sentence}`);
                queries.push(util.format("%s", query));
            }
            modules.mssql.executeNonQueryArray(queries, PARAMS, false).then((data) => {
                //console.log('-mssql');
            });
        });
    }).catch((err) => {
        console.log("mssql database error");
    });
} else loadedMotors++;
if (CONFIG.mysql !== undefined) {
    modelmysql = [];
    modules.mysql.data(`select TABLE_NAME from information_schema.\`TABLES\` where TABLE_SCHEMA='${CONFIG.mysql.database}'`, PARAMS, false).then(x => {
        console.log('loaded mysql models');
        for (var row of x.data) {
            modelmysql.push(row.TABLE_NAME);
        }
        var MYQLDB = {};
        for (var i in modelmysql) {
            var stringModel = S(allparams).replaceAll("@model@", modelmysql[i]).s;
            eval("MYQLDB." + modelmysql[i] + " = new modules.mysql.Model('" + modelmysql[i] + "'," + allparams + ");");
            modules.mysql.defaultRequests(
                eval(util.format("MYQLDB.%s", modelmysql[i])),
                eval("(" + stringModel + ")")
            );
        }
        loadedMotors++
        fs.readdir("./" + folders.models + "/mysql", function (err, sentences) {
            var queries = [];
            for (var i in sentences) {
                var sentence = sentences[i];
                var query = fs.readFileSync(`./${folders.models}/mysql/${sentence}`);
                queries.push(util.format("%s", query));
            }
            modules.mysql.executeNonQueryArray(queries, PARAMS, false).then((data) => {
                //console.log('-mysql');
            });
        });
    }).catch((err) => {
        console.log("mysql database error");
    });
} else loadedMotors++;
if (CONFIG.oracle !== undefined) {
    modeloracle = [];
    modeloracleReal = [];
    modules.oracle.data(`SELECT TABLE_NAME FROM all_tables where owner='${CONFIG.oracle.user}'`, PARAMS, false).then(async x => {
        modules.oracle.data(`SELECT VIEW_NAME as TABLE_NAME FROM all_views where owner='${CONFIG.oracle.user}'`, PARAMS, false).then(async y => {
            console.log('loaded oracle models');
            var myfields = [];
            for (var row of x.data) {
                modeloracle.push(row.table_name.toLowerCase());
                modeloracleReal.push(row.table_name);
                dbfields = await modules.oracle.dataNoShow(`select COLUMN_NAME as "column",DATA_TYPE as "type" from all_tab_columns where TABLE_NAME='${row.table_name}'`, PARAMS, false);
                dbfields.data.forEach((field) => {
                    if (myfields.indexOf(field.column) === -1)
                        myfields.push(field.column);
                });
            }
            for (var row of y.data) {
                modeloracle.push(row.table_name.toLowerCase());
                modeloracleReal.push(row.table_name);
                dbfields = await modules.oracle.dataNoShow(`select COLUMN_NAME as "column",DATA_TYPE as "type" from all_tab_columns where TABLE_NAME='${row.table_name}'`, PARAMS, false);
                dbfields.data.forEach((field) => {
                    if (myfields.indexOf(field.column) === -1)
                        myfields.push(field.column);
                });
            }

            console.log(modeloracleReal);

            var ORACLEDB = {};
            for (var i in modeloracleReal) {
                var stringModel = S(allparams).replaceAll("@model@", modeloracleReal[i]).s;
                eval("ORACLEDB." + modeloracleReal[i] + " = new modules.oracle.Model('" + modeloracleReal[i] + "'," + allparams + ",myfields,modeloracleReal);");
                modules.oracle.defaultRequests(
                    eval(util.format("ORACLEDB.%s", modeloracleReal[i])),
                    eval("(" + stringModel + ")")
                );
            }
            loadedMotors++
            fs.readdir("./" + folders.models + "/oracle", function (err, sentences) {
                var queries = [];
                for (var i in sentences) {
                    var sentence = sentences[i];
                    var query = fs.readFileSync(`./${folders.models}/oracle/${sentence}`);
                    queries.push(util.format("%s", query));
                }
                modules.oracle.executeNonQueryArray(queries, PARAMS, false).then((data) => {
                    //console.log('-oracle');
                });
            });
        }).catch((err) => {
            console.log("oracle database error ");
            console.log(err);
        });
    }).catch((err) => {
        console.log("oracle database error ");
        console.log(err);
    });
} else loadedMotors++;
if (true) {

    for (var i in CONFIG.appEntities) {
        modelstorage.push(i);
    }
    console.log('loaded storage models');
    var STORAGEDB = {};
    for (var i in modelstorage) {
        var stringModel = S(allparams).replaceAll("@model@", modelstorage[i]).s;
        eval("STORAGEDB." + modelstorage[i] + " = new modules.storage.Model('" + modelstorage[i] + "'," + allparams + ");");
        modules.storage.defaultRequests(eval(util.format("STORAGEDB.%s", modelstorage[i])), eval("(" + stringModel + ")"), folders.views);
    }
    console.log('loaded storage queries');
    loadedMotors++;
} else loadedMotors++;
if (true) {
    for (var i in CONFIG.storageEntities) {
        modelstorage.push(i);
    }
    var FIXA = [];
    for (var i in CONFIG.storageEntities) {
        FIXA.push(i);
    }
    console.log('loaded storage app models');
    for (var i in FIXA) {
        var stringModel = S(allparams).replaceAll("@model@", FIXA[i]).s;
        eval("STORAGEDB." + FIXA[i] + " = new modules.storage.Model('" + FIXA[i] + "'," + allparams + ");");
        modules.storage.defaultRequests(eval(util.format("STORAGEDB.%s", FIXA[i])), eval("(" + stringModel + ")"), folders.viewsDragon);
    }
    console.log('loaded storage app queries');
    loadedMotors++;
} else loadedMotors++;
while (loadedMotors < 6) sleep(1);
//******* Load Models********//
//return;
//******* Load Services********//
servicesFiles = getFiles("./" + folders.service + "/");
var catalogs = [];
var servicesFunctions = [];

servicesFiles.forEach(function (item) {
    var model = item.replace(".js", "").replace("SE_", "");
    model = S(model).replaceAll('/', '_').s;
    eval(util.format("%sService = require('" + "./" + folders.service + "/%s');", model, item));
    var stringModel = S(allparams).replaceAll("@model@", model).s;
    eval(model + "Service.run(" + stringModel + ");");
    eval(`if(${model}Service.extra) ${model}Service.extra();`);
    eval("services = " + model + "Service.api");
    servicesFunctions[model] = services;
    var c = modules.views.runServices(services, model, eval("(" + stringModel + ")"));
    c.forEach(function (item) {
        catalogs.push(item);
    });
});
//******* Load Services********//

//******* Load Custom Modules********//
modules.tools.init(eval("(" + allparams + ")"));
modules.views.init(eval("(" + allparams + ")"));
//******* Load Custom Modules********//
//******* Run Application********//
app.listen(CONFIG.port);
sockets.connection.init(eval("(" + allparams + ")"));
console.clear();
console.log("");
console.log(CONFIG.appName.pxz + " Server Models:".pxz);
console.log(modelsql + "," + modelmysql + "," + modeloracle);
console.log("");
console.log(CONFIG.appName.pxz + " Server Modules:".pxz);
console.log(localModules + "," + modulesList);
console.log("");
console.log("");
console.clear();
//******* Run Application********//

//******* Draw Console********//
var width = process.stdout.columns;
var drow = 0;
var rows = process.stdout.rows;
var print = function (quit, align, str, prt, rpt, color, begin, end, c1, c2) {

    quit = quit || 0;
    color = color || "pxz";
    c1 = c1 || "pxz";
    c2 = c2 || "pxz";
    begin = begin || "";
    end = end || "";
    str = str || "";
    align = align || "center";
    prt = prt || "*";
    rpt = rpt || 1;
    var left = 0;
    var right = 0;
    var result = "";
    var half = Math.floor((width - str.length) / 2);
    switch (align) {
        case "center" : {
            right = half - quit;
            left = half - quit;
            break;
        }
        case "left" : {
            right = (width - str.length) - quit;
            break;
        }
        case "right" : {
            left = (width - str.length) - quit;
            break;
        }
    }

    if (begin !== "") {
        if (left !== 0) left -= begin.length;
        if (right !== 0) right -= begin.length;
    }
    if (end !== "") {
        if (left !== 0) left -= begin.length;
        if (right !== 0) right -= begin.length;
    }

    result = `${prt.repeat(left)}${" ".repeat(quit)}${str}${" ".repeat(quit)}${prt.repeat(right)}`;
    var widttorest = width;
    var r1 = result.length;
    if (result.length < widttorest)
        result += prt.repeat(widttorest - result.length - (end !== "" ? (end.length * 2) : 0));
    if (result.length > widttorest)
        result = result.substring(widttorest, result.length - widttorest);
    for (i = 0; i < rpt; i++) {
        drow++;
        console.log(eval(`(begin.${c1}+result+end.${c2}).${color}`));
    }
    //console.log(`width:${width}, left:${left}, right:${right}, str:${str.length}, r1:${r1}, result:${result.length},`);
};
var sp = function (str, length) {
    length = length || 15;
    return `${str}${" ".repeat(length - str.length)}`;
};
var urlsha = `${CONFIG.proxy.ssl === true ? 'https://' : 'http://'}${CONFIG.proxy.subdomain !== '' ? CONFIG.proxy.subdomain + '.' : ''}${CONFIG.proxy.domain}${(CONFIG.proxy.port === 80 || CONFIG.proxy.port === 443 || CONFIG.proxy.port === 443) ? '' : (":" + CONFIG.proxy.port) }`;
var urlshahome = `${CONFIG.ssl === true ? 'https://' : 'http://'}${CONFIG.subdomain !== '' ? CONFIG.subdomain + '.' : ''}${CONFIG.domain}${(CONFIG.port === 80 || CONFIG.port === 443 || CONFIG.port === 443) ? '' : (":" + CONFIG.port) }`;


print(0, "center", "", "█", 1, "pxz", "█", "█");
print(0, "center", "", "═", 1, "pxz", "█╔", "╗█");
print(0, "center", "Dragon Framework " + CONFIG.version.base, " ", 1, "pxz2", "█║", "║█");
print(0, "center", "", "█", 2, "vacio", "█║", "║█");
print(0, "center", `${sp("APPLICATION")}: ${sp(CONFIG.appName + " " + CONFIG.version.app, 40)}`, " ", 1, "pxz2", "█║", "║█");
print(0, "center", `${sp("HOME")}: ${sp(urlshahome, 40)}`, " ", 1, "pxz2", "█║", "║█");
print(0, "center", `${sp("PROXY")}: ${sp(urlsha, 40)}`, " ", 1, "pxz2", "█║", "║█");
print(0, "center", `${sp("MODE")}: ${sp(CONFIG.mode, 40)}`, " ", 1, "pxz2", "█║", "║█");
print(0, "center", `${sp("CONFIGURATION")}: ${sp(('By Developer'), 40)}`, " ", 1, "pxz2", "█║", "║█");
print(0, "center", `${sp("LANGUAGE")}: ${sp(CONFIG.language, 40)}`, " ", 1, "pxz2", "█║", "║█");
if (CONFIG.mssql)
    print(0, "center", `${sp("MSSQL")}: ${sp(CONFIG.mssql.server, 40)}`, " ", 1, "pxz2", "█║", "║█");
if (CONFIG.mysql)
    print(0, "center", `${sp("MYSQL")}: ${sp(CONFIG.mysql.host, 40)}`, " ", 1, "pxz2", "█║", "║█");
if (CONFIG.oracle)
    print(0, "center", `${sp("ORACLE")}: ${sp(CONFIG.oracle.connectString, 40)}`, " ", 1, "pxz2", "█║", "║█");
print(0, "center", "", "█", (rows - drow) - 8, "vacio", "█║", "║█");
print(0, "center", `${new Date().toString()}`, " ", 1, "pxz2", "█║", "║█");
print(0, "center", "", "█", 3, "vacio", "█║", "║█");
print(0, "right", `DEVELOPED BY: ${CONFIG.developerBy.name}`, " ", 1, "pxz2", "█║", "║█");
print(0, "center", "", "═", 1, "pxz", "█╚", "╝█");
print(0, "center", "", "█", 1, "pxz", "█", "█");
//******* Draw Console********//
