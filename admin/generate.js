async function execute() {
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
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    var modules = {}, localModules = [], localModulesVars = [], modulesList = [];
    colors.setTheme({
        error: ["red", "bgYellow"],
        success: ["green", "bgWhite"],
        info: ["cyan", "bgBlue"],
        warning: ["yellow", "bgRed"]
    });
    var controllerNames = [];
    var controllerName = "";
    var engine = "";

    process.argv.forEach(function (val, index, array) {
        if (index === 2)
            engine = val;
        if (index === 3)
            controllerNames.push(val);
    });

    function compiledHack(str) {
        str = S(str).replaceAll("<%= scope %>", "XXXDDSUsdsdPERGENERATED").s;
        str = S(str).replaceAll("<%= field %>", "DDSUPERGENERATED").s;
        str = S(str).replaceAll("<%= fields %>", "DDSUPERGasdasd__ENERATED").s;
        str = S(str).replaceAll("<%= field.replace('from','to') %>", "fromportoasdasdasd").s;
        str = S(str).replaceAll("<%= field.replace('from','') %>", "frompornadasasdas").s;
        str = S(str).replaceAll("<%= field.replace('_from','to') %>", "fromportoafffsdasdasd").s;
        str = S(str).replaceAll("<%= field.replace('_from','') %>", "frompornadfffasasdas").s;
        str = S(str).replaceAll("<%= field.split('__')[0] %>", "lalalanumero11").s;
        str = S(str).replaceAll("<%= field.split('__')[1] %>", "lalalanumero22").s;
        str = S(str).replaceAll("<%-", "DDOPENSIMPLE").s;
        str = S(str).replaceAll("<%=", "DDOPENCOMPUSE").s;
        str = S(str).replaceAll("%>", "DDCLOSETAG").s;
        str = S(str).replaceAll("DDSUPERGENERATED", "<%= field %>").s;
        str = S(str).replaceAll("XXXDDSUsdsdPERGENERATED", "<%= scope %>").s;
        str = S(str).replaceAll("DDSUPERGasdasd__ENERATED", "<%= fields %>").s;
        str = S(str).replaceAll("fromportoasdasdasd", "<%= field.replace('from','to') %>").s;
        str = S(str).replaceAll("frompornadasasdas", "<%= field.replace('from','') %>").s;
        str = S(str).replaceAll("lalalanumero11", "<%= field.split(\"__\")[0] %>").s;
        str = S(str).replaceAll("lalalanumero22", "<%= field.split(\"__\")[1] %>").s;
        str = S(str).replaceAll("fromportoafffsdasdasd", "<%= field.replace('_from','to') %>").s;
        str = S(str).replaceAll("frompornadfffasasdas", "<%= field.replace('_from','') %>").s;
        return str;
    }

    function compiledHackReturn(str) {
        str = S(str).replaceAll("DDOPENSIMPLE", "<%-").s;
        str = S(str).replaceAll("DDOPENCOMPUSE", "<%=").s;
        str = S(str).replaceAll("DDCLOSETAG", "%>").s;
        return str;
    }

    function cleanHtml(str) {
        str = S(str).replaceAll("&#39;", '"').s;
        str = S(str).replaceAll("&#34;", "'").s;
        str = S(str).replaceAll("&lt;", "<").s;
        str = S(str).replaceAll("&gt;", ">").s;
        return str;
    }

    async function createFiles() {


        folder = "7-plugins/templates/system/generate";
        controller = `${folder}/controller.ejs`;
        controllerEmpty = `${folder}/controllerEmpty.ejs`;
        controllerReport = `${folder}/controllerReport.ejs`;
        crud = `${folder}/crud.ejs`;
        crudReport = `${folder}/crudReport.ejs`;
        filter = `${folder}/view/filter.ejs`;
        form = `${folder}/view/form.ejs`;
        index = `${folder}/view/index.ejs`;
        indexEmpty = `${folder}/view/indexEmpty.ejs`;
        view = `${folder}/view/view.ejs`;
        fs = fs || require("fs");

        var PARAMS = eval("(" + allparams + ")");
        if (engine === "empty") {
            dbtables = {};
            dbtables.data = [];
            dbfields = {};
            dbfields.data = [];
            controller = controllerEmpty;
            index = indexEmpty;
        }
        if (engine === "mysql" || engine === "mysqlreport") {
            dbtables = await modules.mysql.data(`select TABLE_NAME as \`table\` from information_schema.\`TABLES\` where TABLE_SCHEMA='${CONFIG.mysql.database}'`, PARAMS, false);
            dbfields = await modules.mysql.data(`select COLUMN_NAME \`column\`,DATA_TYPE \`type\` from information_schema.\`COLUMNS\` where  TABLE_SCHEMA='${CONFIG.mysql.database}' and TABLE_NAME='${controllerName}'`, PARAMS, false);
        }
        if (engine === "mssql" || engine === "mssqlreport") {
            dbtables = await modules.mssql.data(`select TABLE_NAME as \'table\' from INFORMATION_SCHEMA.TABLES`, PARAMS, false);
            dbfields = await modules.mssql.data(`select COLUMN_NAME \'column\',DATA_TYPE \'type\' from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='${controllerName}'`, PARAMS, false);
        }

        if (engine === "oracle" || engine === "oraclereport") {
            dbtables = await modules.oracle.data(`SELECT TABLE_NAME as "table" FROM all_tables where owner='${CONFIG.oracle.user}'`, PARAMS, false);
            dbfields = await modules.oracle.data(`select COLUMN_NAME as "column" column,DATA_TYPE as "type" from all_tab_columns where TABLE_NAME='${controllerName}'`, PARAMS, false);
        }
        if (engine.indexOf("report") !== -1) {
            controller = controllerReport;
            crud = crudReport;
        }


        var dbtablesArray = [];



        if (dbtables)
            dbtables.data.forEach((table) => {
                dbtablesArray.push(table.table.toLowerCase())
            });


        if (engine !== "empty")
            if (dbtablesArray.indexOf(controllerName) === -1) {
                console.log(`Table ${controllerName} not exist`.error);
                return;
            }
        var dbfieldsArray = [];
        //dbfields.data = [{column: 'time', type: "datetime"}];
        dbfields.data.forEach((field) => {
            var type = (['int'].indexOf(field.type) !== -1 && dbtablesArray.indexOf(field.column) !== -1) ? 'select' : field.type;
            for (var conta in CONFIG.generate.typeByContains) {
                var analize = S(conta);
                var contaClean = S(conta).replaceAll("*", "").s.toLowerCase();
                var lower = field.column.toLowerCase();

                // console.log(`
                // conta:${conta},
                // contaClean:${contaClean}
                // endsWith:${analize.endsWith('*')}
                // startsWith:${analize.startsWith('*')}
                // nameequal:${(field.column == contaClean)}
                // `);

                if ((analize.endsWith('*') || analize.startsWith('*'))) {
                    if ((analize.endsWith('*') && analize.startsWith('*'))) {
                        if ((lower === contaClean)) {
                            type = CONFIG.generate.typeByContains[conta];
                            break;
                        }
                        continue;

                    }
                    if (analize.endsWith('*')) {
                        if (S(lower).endsWith(contaClean)) {
                            type = CONFIG.generate.typeByContains[conta];
                            break;
                        }
                        continue;

                    }
                    if (analize.startsWith('*')) {
                        if (S(lower).startsWith(contaClean)) {
                            type = CONFIG.generate.typeByContains[conta];
                            break;
                        }
                    }
                } else {
                    if (lower.indexOf(contaClean) !== -1) {
                        type = CONFIG.generate.typeByContains[conta];
                        break;
                    }
                }
            }

            dbfieldsArray.push({column: field.column, type: type});
        });
        console.log(dbfieldsArray);
        var crudFields = [];
        var crudRelation = [];
        var formFields = [];
        var controllersFields = [];
        dbfieldsArray.forEach((field) => {
            if (CONFIG.generate.controllerFields.indexOf(field.column) === -1) {
                //controller
                var fileS = folder + `/controller/${field.type}.ejs`;
                var defaultS = folder + `/controller/default.ejs`;
                if (!fs.existsSync(fileS))
                    fileS = defaultS;

                var fileD = fs.readFileSync(fileS).toString();
                fileD = compiledHack(fileD);
                compiled = "";
                compiled = ejs.compile(fileD, {})({field: field.column, scope: controllerName});
                compiled = compiledHackReturn(compiled);
                if (compiled !== "")
                    controllersFields.push(compiled);
            }

            if (CONFIG.generate.crudFields.indexOf(field.column) === -1) {
                //crud
                if (field.type === "select") {
                    crudRelation.push(`
            {
                "table": "${field.column}",
                "base": "${field.column}",
                "field": "id",
                "columns": ["id", "name"]
            }`);
                }
                var fileS = folder + `/crud/${field.type}.ejs`;
                var defaultS = folder + `/crud/default.ejs`;
                if (!fs.existsSync(fileS))
                    fileS = defaultS;

                var fileD = fs.readFileSync(fileS).toString();
                compiled = "";
                compiled = ejs.compile(fileD, {})({field: field.column, scope: controllerName});
                if (compiled !== "")
                    crudFields.push(compiled);

            }

            if (CONFIG.generate.controllerFields.indexOf(field.column) === -1) {
                //form
                var fileS = folder + `/form/${field.type}.ejs`;
                var defaultS = folder + `/form/default.ejs`;
                if (!fs.existsSync(fileS))
                    fileS = defaultS;

                var fileD = fs.readFileSync(fileS).toString();
                fileD = compiledHack(fileD);
                compiled = "";
                compiled = ejs.compile(fileD, {})({field: field.column});
                compiled = compiledHackReturn(compiled);
                if (compiled !== "")
                    formFields.push(compiled);
            }

        });
        if (crudRelation.length > 0) {
            crudRelation = `,
        single: [${crudRelation.join(",\n")}]`;
        } else
            crudRelation = "";
        crudFields = crudFields.join(",\n");
        formFields = formFields.join("\n");
        controllersFields = controllersFields.join("\n");


        fileD = fs.readFileSync(controller).toString();
        compiled = "";
        compiled = ejs.compile(fileD, {})({scope: controllerName, fields: controllersFields});
        compiled = cleanHtml(compiled);
        if (compiled !== "") {
            if (!fs.existsSync(folders.controllers + `/CO_${controllerName}.js`) || override)
                fs.writeFileSync(folders.controllers + `/CO_${controllerName}.js`, compiled);
            else
                console.log(`the controller CO_${controllerName}.js already exist`.warning);
        }

        if (engine !== "empty") {
            fileD = fs.readFileSync(crud).toString();
            compiled = "";
            compiled = ejs.compile(fileD, {})({scope: controllerName, fields: crudFields, relations: crudRelation});
            compiled = cleanHtml(compiled);
            if (compiled !== "") {
                if (!fs.existsSync(folders.crud + `/CRUD_${controllerName}.js`) || override)
                    fs.writeFileSync(folders.crud + `/CRUD_${controllerName}.js`, compiled);
                else
                    console.log(`the controller CRUD_${controllerName}.js already exist`.warning);
            }
        }
        if (!fs.existsSync(folders.views + `/${controllerName}`))
            fs.mkdirSync(folders.views + `/${controllerName}`);

        fileD = fs.readFileSync(filter).toString();
        compiled = "";
        compiled = fileD;
        if (engine !== "empty")
            if (compiled !== "") {
                if (!fs.existsSync(folders.views + `/${controllerName}/filter.ejs`) || override)
                    fs.writeFileSync(folders.views + `/${controllerName}/filter.ejs`, compiled);
                else
                    console.log(`the filter for ${controllerName} already exist`.warning);
            }

        fileD = fs.readFileSync(form).toString();
        fileD = compiledHack(fileD);
        compiled = "";
        compiled = ejs.compile(fileD, {})({scope: controllerName, fields: formFields});
        compiled = compiledHackReturn(compiled);
        compiled = cleanHtml(compiled);
        if (engine !== "empty" && (engine.indexOf("report") === -1))
            if (compiled !== "") {
                if (!fs.existsSync(folders.views + `/${controllerName}/form.ejs`) || override)
                    fs.writeFileSync(folders.views + `/${controllerName}/form.ejs`, compiled);
                else
                    console.log(`the form for ${controllerName} already exist`.warning);
            }

        fileD = fs.readFileSync(index).toString();
        compiled = "";
        compiled = fileD;

        if (compiled !== "") {
            if (!fs.existsSync(folders.views + `/${controllerName}/index.ejs`) || override)
                fs.writeFileSync(folders.views + `/${controllerName}/index.ejs`, compiled);
            else
                console.log(`the index for ${controllerName} already exist`.warning);
        }

        fileD = fs.readFileSync(view).toString();
        compiled = "";
        compiled = fileD;
        if (engine !== "empty")
            if (compiled !== "") {
                if (!fs.existsSync(folders.views + `/${controllerName}/view.ejs`) || override)
                    fs.writeFileSync(folders.views + `/${controllerName}/view.ejs`, compiled);
                else
                    console.log(`the view for ${controllerName} already exist`.warning);
            }

        console.log(`Generated ${controllerName}`.success);
    }

    {
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

//GET MODULES NODEJS
        for (var i in CONFIG.modules) {
            var module = CONFIG.modules[i];
            localModules.push(module.module);
            localModulesVars.push(module.var);
            eval("var " + module.var + " = require('" + module.module + "');");
        }

        var filesmodules = fs.readdirSync("./" + folders.modules + "/");
        for (var i in filesmodules) {
            var file = filesmodules[i];
            modulesList.push(file.replace(".js", "").replace("BASE_", ""));
            eval("modules." + file.replace(".js", "").replace("BASE_", "") + " = require('./" + folders.modules + "/" + file + "');");
        }

        var app = express();
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
            allparams += "      scope: '@model@',";
            allparams += "      modules:modules,";
            allparams += "      storage:storage,";
            allparams += "      http:http,";
            allparams += "      fetch :fetch,";
            allparams += "      fs:fs,";
            allparams += "      jwt:jwt,";
            allparams += "      rimraf:rimraf,";
            allparams += "      controllersjs:controllersjs,";
            allparams += "      crudjs:crudjs,";
            allparams += "      mssql:mssql,";
            allparams += "      mysql:mysql,";
            if (CONFIG.oracle !== undefined)
                allparams += "      oracle:oracle,";
            allparams += "      CONFIG:CONFIG,";
            allparams += "      mail:mail,";
            allparams += "      folders:folders,";
            allparams += "      app:app";
            allparams += "}";
        }

        //BASE CONTROLLERS
        controllersjs = getFiles("./" + folders.controllersBase + "/");
        for (var ctr in controllersjs)
            controllersjs[ctr] = controllersjs[ctr];
        //CUSTOM CONTROLLERS
        controllersjsCustom = getFiles("./" + folders.controllers + "/");
        for (var ctr in controllersjsCustom)
            controllersjsCustom[ctr] = controllersjsCustom[ctr];
        //MERGE CONTROLLERS
        for (var ctr of controllersjsCustom)
            controllersjs.push(ctr);

        //BASE CRUD'S
        crudjs = getFiles("./" + folders.crudBase + "/");
        for (var ctr in crudjs)
            crudjs[ctr] = crudjs[ctr];
        //CUSTOM CURD's
        crudCustom = getFiles("./" + folders.crud + "/");
        for (var ctr in crudCustom)
            crudCustom[ctr] = crudCustom[ctr];
        //MERGE CUSTOM
        for (var ctr of crudCustom)
            crudjs.push(ctr);
    }

    if (controllerNames.length === 1) {
        if (controllerNames[0] === "*") {
            var PARAMS = eval("(" + allparams + ")");
            if (engine === "mysql" || engine === "mysqlreport") {
                dbtables = await modules.mysql.data(`select TABLE_NAME as \`table\` from information_schema.\`TABLES\` where TABLE_SCHEMA='${CONFIG.mysql.database}'`, PARAMS, false);
                dbfields = await modules.mysql.data(`select COLUMN_NAME \`column\`,DATA_TYPE \`type\` from information_schema.\`COLUMNS\` where  TABLE_SCHEMA='${CONFIG.mysql.database}' and TABLE_NAME='${controllerName}'`, PARAMS, false);
            }
            if (engine === "mssql" || engine === "mssqlreport") {
                dbtables = await modules.mssql.data(`select TABLE_NAME \'table\' from INFORMATION_SCHEMA.TABLES`, PARAMS, false);
                dbfields = await modules.mssql.data(`select COLUMN_NAME \'column\',DATA_TYPE \'type\' from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='${controllerName}'`, PARAMS, false);
            }
            if (engine === "oracle" || engine === "oraclereport") {
                dbtables = await modules.oracle.data(`select TABLE_NAME from INFORMATION_SCHEMA.TABLES`, PARAMS, false);
                dbfields = await modules.oracle.data(`select COLUMN_NAME \`column\`,DATA_TYPE \`type\` from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME='${controllerName}'`, PARAMS, false);
            }
            var dbtablesArray = [];
            controllerNames = [];
            dbtables.data.forEach((table) => {
                controllerNames.push(table.table)
            });
        }
    }


    for (var i of controllerNames) {
        var override = false;
        controllerName = i;
        if (controllerName !== "" || engine !== "") {


            var exist = false;
            for (var con of controllersjs) {
                if (con.indexOf(controllerName) !== -1) {
                    exist = true;
                    break;
                }
            }
            if (exist) {
                rl.question(`files for ${controllerName} already exist do you want override Y/N: `.warning, (answer) => {
                    if (answer.toLowerCase() === "y") {
                        override = true;
                        createFiles();
                    } else {
                        console.log("bye".success);
                    }
                    rl.close();
                });
            } else {
                createFiles();
            }


        } else {
            console.log("Please set controllerName and engine: node generate.js exampleName mysql".error);
        }
    }
}

execute();