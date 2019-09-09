capitalize = function (str) {
    if (typeof str === 'function')
        str = str();
    str = str.toLowerCase();
    return str.replace(/(^|\s)\S/, function (match) {
        return match.toUpperCase();
    });
};

readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const consoles = async (texts, color, read) => {
    if (!Array.isArray(texts))
        texts = [texts];
    console.clear();

    color = color || 'pxz';

    print(0, "center", "", "═", 1, color, "█╔", "╗█", color, color);
    if (!read)
        print(0, "center", "", "█", read ? 1 : 3, "vacio", "█║", "║█", color, color);
    for (var text of texts)
        print(0, "center", text, " ", 1, "text", "█║", "║█", color, color);

    if (!read)
        print(0, "center", "", "█", read ? 1 : 3, "vacio", "█║", "║█", color, color);

    print(0, "center", "", "═", 1, color, "█╚", "╝█", color, color);
};

read = (text) => new Promise((resolve, reject) => {
    rl.question(text.info, (answer) => {
        resolve(answer);
    });
});


const keypress = async () => {
    process.stdin.setRawMode(true)
    return new Promise(resolve => process.stdin.once('data', () => {
        resolve();
    }))
};
(async () => {
    folders = {
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
        config: "0-config",
        eviroments: "8-enviroments",
        configBase: "7-plugins/application/config",
        styles: "styles",
        server: "server",
        files: "files",
        themesTemplate: "7-plugins/templates/system/color.ejs",
        themes: "files/configuration/themes",
    };
    var fs = fs || require("fs");
    var colors = colors || require("colors");

    var modules = {}, localModules = [], localModulesVars = [], modulesList = [];
    colors.setTheme({
        pxz2: ["red", "bgWhite"],
        text: ["black", "bgWhite"],
        success: ["white", "bgGreen"],
        info: ["white", "bgBlue"],
        pxz: ["white", "bgRed"],
        vacio: ["white", "bgWhite"]
    });
    width = process.stdout.columns;
    drow = 0;
    rows = process.stdout.rows;
    var margin = 40;
    print = function (quit, align, str, prt, rpt, color, begin, end, c1, c2) {

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
    printr = function (quit, align, str, prt, rpt, color, begin, end, c1, c2) {

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
        var result = "";
        for (i = 0; i < rpt; i++) {
            drow++;
            result += (eval(`(begin.${c1}+result+end.${c2}).${color}`));
        }
        return result;
        //console.log(`width:${width}, left:${left}, right:${right}, str:${str.length}, r1:${r1}, result:${result.length},`);
    };
    sp = function (str, length) {
        length = length || 15;
        return `${str}${" ".repeat(length - str.length)}`;
    };
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

    //GET CONFIG
    var CONFIG = {};
    configs = getFiles("./" + folders.configBase + "/");
    configs = configs.filter(function (file) {
        return file.indexOf('.disabled') === -1;
    });
    configs.forEach(function (config) {
        var file = eval("(" + fs.readFileSync(folders.configBase + "/" + config) + ")");
        mergeObject(file, CONFIG);
    });

    //GET MODULES NODEJS
    for (var i in CONFIG.modules) {
        var module = CONFIG.modules[i];
        localModules.push(module.module);
        localModulesVars.push(module.var);
        eval("var " + module.var + " = require('" + module.module + "');");
    }

    delete CONFIG.generate;
    delete CONFIG.modules;
    delete CONFIG.mssql;
    delete CONFIG.mysql;
    delete CONFIG.oracle;
    /*INSTALL*/


    console.clear();
    consoles([
        "Welcome to the Dragon Framework installer",
        "Next you will be filling in some fields necessary for installation",
        "",
        "Please to continue with each instruction press [enter] key"]);
    await keypress();
    consoles("AppName", 'info', true);
    CONFIG.appName = await read('=>');
    CONFIG.logo = CONFIG.appName.toUpperCase();

    consoles("AppKey", 'info', true);
    CONFIG.appKey = await read('=>');
    consoles("Default Language 'en' or 'es'", 'info', true);
    CONFIG.language = await read('=>');
    consoles("Support Email", 'info', true);
    CONFIG.support.email = await read('=>');
    consoles("Support Phone", 'info', true);
    CONFIG.support.phone = await read('=>');
    consoles([
        "Dragon has several modules",
        "Please define which ones you want to activate with Y/N"]);
    await keypress();

    var modules = {
        "fileManager": "It shows you in developer mode a module to handle all the files attached in the application",
        "stepManager": "It shows you in developer mode a module to visualize a temporary log within an option",
        "token": "Allows the application to handle security token on all requests",
        "multilanguage": "it allows you to handle more than one language",
        "configuration": "Allows the administrator to view a configuration for internal parameters of the application",
        "onesignal": "Allows the use of onesignal",
        "customfields": "Declare custom fields for developers",
        "silent": "It allows the framework to load the entities that have not been declared and auto generate it on the fly",
        "sockets": "Open a range of possibilities to the following modules, interactive update, online chat",
        "functions": "It allows to declare functions that execute queries for developers",
        "chat": "Allows users to communicate with each other",
        "user_interactive": "Allows the application to have an interactive update for each option",
        "tasks": "Allows the administrator to provide time control over tasks predefined by the developer"
    };
    for (var i in modules) {
        consoles([capitalize(i), modules[i]]);
        CONFIG.features[i] = await read('=>');
        CONFIG.features[i] = CONFIG.features[i].toLowerCase() === 'y';
    }

    consoles("developerBy name", 'info', true);
    CONFIG.developerBy.name = await read('=>');

    consoles("developerBy profile", 'info', true);
    CONFIG.developerBy.profile = await read('=>');

    consoles("developerBy site", 'info', true);
    CONFIG.developerBy.site = await read('=>');

    consoles([
        "Authentication Settings",
        "These settings will be proportional to the table or view for users."]);
    await keypress();

    consoles("Authentication - Table OR View Name", 'info', true);
    CONFIG.users.model = await read('=>');
    CONFIG.users.path = CONFIG.users.model;
    consoles("Authentication - engine (mssql,mongo,mysql,oracle,postgre,storage)", 'info', true);
    CONFIG.users.engine = await read('=>');

    consoles("Authentication - username field", 'info', true);
    CONFIG.users.fields.username = await read('=>');

    consoles("Authentication - password field", 'info', true);
    CONFIG.users.fields.password = await read('=>');

    consoles("Authentication - id field", 'info', true);
    CONFIG.users.fields.id = await read('=>');

    consoles("Authentication - email field", 'info', true);
    CONFIG.users.fields.email = await read('=>');

    consoles([
        "Network Settings",
        "These settings will be allow run server."]);
    await keypress();

    consoles("Network - domain field", 'info', true);
    CONFIG.domain = await read('=>');
    consoles("Network - subdomain field", 'info', true);
    CONFIG.subdomain = await read('=>');

    consoles("Network - port field", 'info', true);
    CONFIG.port = await read('=>');

    consoles("Network - sockets io field", 'info', true);
    CONFIG.io = await read('=>');


    CONFIG.proxy.domain = CONFIG.domain;
    CONFIG.proxy.subdomain = CONFIG.subdomain;
    CONFIG.proxy.port = CONFIG.port;
    CONFIG.proxy.io = CONFIG.io;

    consoles([
        "SMTP Settings",
        "These settings will be allow send emails."]);
    await keypress();

    consoles("SMTP - host field", 'info', true);
    CONFIG.smtp.host = await read('=>');

    consoles("SMTP - port field", 'info', true);
    CONFIG.smtp.port = await read('=>');

    consoles("SMTP - user field", 'info', true);
    CONFIG.smtp.auth.user = await read('=>');

    consoles("SMTP - password field", 'info', true);
    CONFIG.smtp.auth.pass = await read('=>');

    consoles("SMTP - sender field", 'info', true);
    CONFIG.smptOptions.sender = await read('=>');

    consoles("SMTP - name field", 'info', true);
    CONFIG.smptOptions.name = await read('=>');

    consoles([
        "Confidential information",
        "This information is the most private of the application, be careful and have not looked."]);
    await keypress();

    consoles("Super Admins User", 'info', true);
    CONFIG.users.super = [await read('=>')];


    var path = `10-bootstrap/compiled`;
    rimraf.sync(folders.config);
    rimraf.sync(folders.controllers);
    rimraf.sync(folders.crud);
    rimraf.sync(folders.views);
    rimraf.sync(folders.eviroments);
    rimraf.sync(folders.files);
    ncp(path, __dirname, function (err) {
        if (err) {
            return console.error(err);
        }
        var file = folders.config + '/' + 'aconfig.json';
        var json = JSON.stringify(CONFIG);
        fs.writeFile(file, json, function (err, data) {
            consoles("Install Success", 'success');
            process.exit(1);

        });
    });

})().then();


