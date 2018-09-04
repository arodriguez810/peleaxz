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

            var send = {
                modelName: params.modelName,
                session: params.session,
                localjs: params.localjs,
                CONFIG: params.CONFIG,
                models: models
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

            res.render('../views/' + realPath, send);
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

exports.defaultRequests = function (params, Model) {
    params.fs.readdir(params.util.format('./views/%s', params.modelName), function (err, files) {
        exports.LoadEJS(files, params);
    });
    exports.loadEJSSimple('./views/master/error', 'error', params);


    params.app.get(params.util.format('/api/%s/list', params.modelName), function (req, res) {
        var index = {};
        if (req.query.limit === undefined)
            index.limit = 10;
        else
            index.limit = parseInt(req.query.limit);
        if (req.query.page === undefined)
            index.page = 1;
        else
            index.page = parseInt(req.query.page);
        req.query.limit = undefined;
        req.query.page = undefined;

        Model.count(req.query, function (err2, countModel) {
            var query = Model.find(req.query).skip(index.limit * (index.page - 1)).limit(index.limit);
            query.exec(function (err, model) {
                if (err) res.send(err);
                res.json({
                    query: req.query,
                    error: false,
                    data: model,
                    count: [countModel],
                    index: {
                        limit: index.limit,
                        pagec: index.page
                    },
                    totalPage: Math.ceil(countModel / index.limit),
                    currentPage: index.page
                });
            });
        });

    });
    params.app.get(params.util.format('/api/%s/all', params.modelName), function (req, res) {
        var query = Model.find(req.query);
        query.exec(function (err, model) {
            if (err) res.send(err);
            res.json({
                query: req.query,
                error: false,
                data: model
            });
        });
    });
    params.app.get(params.util.format('/api/%s/get/:id', params.modelName), function (req, res) {
        Model.findOne({"_id": req.params.id}, function (err, model) {
            if (err) res.send(err);
            res.json({
                data: model
            });
        });
    });
    params.app.post('/api/' + params.modelName + '/insert', function (req, res) {
        Model.create(req.body, function (err, model) {
            if (err) res.send(err);
            res.json({
                data: model
            });
        });
    });
    params.app.put('/api/' + params.modelName + '/update/:id', function (req, res) {
        Model.findOneAndUpdate({"_id": req.params.id}, req.body, function (err, model) {
            if (err) res.send(err);
            res.json({
                data: model
            });
        });
    });
    params.app.delete('/api/' + params.modelName + '/delete/:id', function (req, res) {
        Model.remove({
            _id: req.params.id
        }, function (err, model) {
            if (err) res.send(err);
            res.json({
                data: model
            });
        });
    });


    params.app.get(params.util.format('/api/%s/crud', params.modelName), function (req, res) {
        params.fs.readFile(util.format("./crud/mongo/%s.json", params.modelName), function (err, data) {
            if (err) {
                res.json({message: err, error: true});
            }
            res.json({
                message: "Success",
                crud: data,
                error: false
            });
        });
    });
};
