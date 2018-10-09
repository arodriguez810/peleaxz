exports.LoadEJS = function (files, params) {
    for (var i in files) {
        var file = files[i];
        var viewName = params.S(file).contains("index.ejs")
            ? ""
            : file.replace(".ejs", "");
        params.app.get(
            params.util.format(
                "/%s%s",
                params.modelName === "base" ? "" : params.modelName + "/",
                viewName
            ),
            function (req, res) {
                var path = req.originalUrl;
                var realPath = path.split("?");
                var query = "";
                if (realPath.length > 1) {
                    query = realPath[1];
                    realPath = realPath[0];
                } else {
                    if (realPath[0] === "/") realPath = realPath[0] + "/base";
                    else {
                        if (realPath[0].split("/").length > 1) realPath = realPath[0];
                        else realPath = realPath[0] + "/index";
                    }
                }

                var models = params.models
                    .concat(params.modelsql)
                    .concat(params.modelmysql);
                var tags = params.CONFIG.ui.colors.tag;
                var newtags = {};
                for (var tag in tags) {
                    var itag = tags[tag];
                    var largeVar = "params.CONFIG.ui.colors." + tags[tag];
                    eval("newtags." + tag + " = " + largeVar + '===undefined ? "' + itag + '" : ' + largeVar + ";");
                }

                var send = {
                    modelName: params.modelName,
                    session: params.session,
                    localjs: params.localjs,
                    crudjs: params.crudjs,
                    CONFIG: params.CONFIG,
                    COLOR: params.CONFIG.ui.colors,
                    TAG: newtags,
                    models: models,
                    FOLDERS: params.folders,
                    DATA: req.query,
                    SERVICES: params.catalogs
                };
                res.render("../" + params.folders.views + "/" + realPath, send);
            }
        );
    }
};
exports.runServices = function (services, prefix, params) {
    var catalogs = [];
    for (var i in services.gets) {
        var func = services.gets[i];
        catalogs.push("get*" + prefix + "." + func.name);
        params.app.get(params.util.format("/service/%s/%s", prefix, i), function (req, res) {
            res.json(func(req.query));
        });
    }
    for (var i in services.posts) {
        var func = services.posts[i];
        catalogs.push("post*" + prefix + "." + func.name);
        params.app.post(params.util.format("/service/%s/%s", prefix, i), function (req, res) {
            res.json(func(req.body));
        });
    }
    for (var i in services.puts) {
        var func = services.puts[i];
        catalogs.push("put*" + prefix + "." + func.name);
        params.app.post(params.util.format("/service/%s/%s", prefix, i), function (req, res) {
            res.json(func(req.body));
        });
    }
    for (var i in services.deletes) {
        var func = services.deletes[i];
        catalogs.push("delete*" + prefix + "." + func.name);
        params.app.post(params.util.format("/service/%s/%s", prefix, i), function (req, res) {
            res.json(func(req.body));
        });
    }
    return catalogs;
};
exports.loadEJSSimple = function (folder, prefix, params) {
    params.fs.readdir(folder, function (err, files) {
        for (var i in files) {
            var file = files[i];
            var viewName = params.S(file).contains("index.ejs")
                ? ""
                : file.replace(".ejs", "");

            params.app.get(params.util.format("/%s/%s/", prefix, viewName), function (
                req,
                res
            ) {
                var path = req.originalUrl;
                var realPath = path.split("?");
                var viewN = realPath[0].split("/");

                var models = params.models
                    .concat(params.modelsql)
                    .concat(params.modelmysql);
                var tags = params.CONFIG.ui.colors.tag;
                var newtags = {};
                for (var tag in tags) {
                    var itag = tags[tag];
                    var largeVar = "params.CONFIG.ui.colors." + tags[tag];
                    eval(
                        "newtags." + tag + " = " + largeVar + '===undefined ? "' + itag + '" : ' + largeVar + ";"
                    );
                }

                var send = {
                    modelName: params.modelName,
                    session: params.session,
                    localjs: params.localjs,
                    crudjs: params.crudjs,
                    CONFIG: params.CONFIG,
                    COLOR: params.CONFIG.ui.colors,
                    TAG: newtags,
                    models: models,
                    FOLDERS: params.folders,
                    DATA: req.query
                };
                console.log('send.DATA :', send.DATA);

                res.render("." + folder + "/" + viewN[viewN.length - 1], send);
            });
        }
    });
};

exports.init = function (params) {
    var excludes = [
        params.folders.views + "//base",
        params.folders.views + "//master"
    ];
    var models = params.models.concat(params.modelsql).concat(params.modelmysql);
    models.forEach(element => {
        excludes.push(params.folders.views + "//" + element);
    });
    params.modelName = "base";
    params.fs.readdir(
        params.util.format("./" + params.folders.views + "/%s", params.modelName),
        function (err, files) {
            params.modelName = "base";
            exports.LoadEJS(files, params);
        }
    );

    var getFiles = function (exclude, dir, filelist, prefix) {
        var fs = params.fs || require("fs"),
            files = fs.readdirSync(dir);
        filelist = filelist || [];
        prefix = prefix || "";
        files.forEach(function (file) {
            if (fs.statSync(dir + "/" + file).isDirectory()) {
                if (exclude.indexOf(dir + "/" + file) === -1) {
                    filelist.push(prefix + file);
                    filelist = getFiles(
                        exclude,
                        dir + "/" + file,
                        filelist,
                        prefix + file + "/"
                    );
                }
            } else {
            }
        });
        return filelist;
    };

    var autroute = getFiles(excludes, params.folders.views + "/");
    autroute.forEach(element => {
        exports.loadEJSSimple(
            "./" + params.folders.views + "/" + element.replace(".ejs", ""),
            element.replace(".ejs", ""),
            params
        );
    });
    exports.loadEJSSimple(
        "./" + params.folders.views + "/master/error",
        "error",
        params
    );
};
