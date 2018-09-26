exports.LoadEJS = function (files, params) {
    for (var i in files) {
        var file = files[i];
        var viewName = params.S(file).contains("index.ejs") ? "" : file.replace(".ejs", "");
        params.app.get(params.util.format('/%s/%s', (params.modelName === 'home' ? '' : params.modelName), viewName), function (req, res) {
            var path = req.originalUrl;
            var realPath = path.split('?');
            var query = "";
            if (realPath.length > 1) {
                query = realPath[1];
                realPath = realPath[0];
            } else {
                if (realPath[0] === '/')
                    realPath = realPath[0] + '/home';
                else {
                    if (realPath[0].split('/').length > 1)
                        realPath = realPath[0];
                    else
                        realPath = realPath[0] + '/index';
                }
            }
            var models = params.models.concat(params.modelsql).concat(params.modelmysql);
            var tags = params.CONFIG.ui.colors.tag;
            var newtags = {};
            for (var tag in tags) {
                var itag = tags[tag];
                var largeVar = "params.CONFIG.ui.colors." + tags[tag];
                eval('newtags.' + tag + ' = ' + largeVar + '===undefined ? "' + itag + '" : ' + largeVar + ';');
            }

            console.log(models);
            var send = {
                modelName: params.modelName,
                session: params.session,
                localjs: params.localjs,
                crudjs: params.crudjs,
                CONFIG: params.CONFIG,
                COLOR: params.CONFIG.ui.colors,
                TAG: newtags,
                models: models,
                FOLDERS: params.folders
            };

            if (query !== "") {
                var nodos = query.split('&');
                for (var i in nodos) {
                    var nodo = nodos[i].split('=');
                    var key = nodo[0];
                    var value = nodo[1];
                    eval("send." + key + " = '" + value + "'");
                }
            }

            res.render('../' + params.folders.views + '/' + realPath, send);
        });
    }
};
exports.loadEJSSimple = function (folder, prefix, params) {
    params.fs.readdir(folder, function (err, files) {
        for (var i in files) {
            var file = files[i];
            var viewName = params.S(file).contains("index.ejs") ? "" : file.replace(".ejs", "");
            params.app.get(params.util.format('/%s/%s/', prefix, viewName), function (req, res) {
                var path = req.originalUrl;
                var realPath = path.split('?');
                var viewN = realPath[0].split('/');
                console.log(req.url);
                res.render('.' + folder + "/" + viewN[viewN.length - 1], {});
            });
        }
    });
};

exports.init = function (params) {
    params.modelName = "home";
    params.fs.readdir(params.util.format('./' + params.folders.views + '/%s', params.modelName), function (err, files) {
        params.modelName = "home";
        exports.LoadEJS(files, params);
    });
    exports.loadEJSSimple('./' + params.folders.views + '/master/error', 'error', params);
};
