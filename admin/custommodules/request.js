exports.defaultRequests = function (params) {
    var Model = eval("params.collections." + params.modelName);

    params.fs.readdir(params.util.format('./views/%s', params.modelName), function (err, files) {
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
                var send = {
                    modelName: params.modelName,
                    session: params.session,
                    localjs: params.localjs,
                    models: params.models
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
    });

    params.app.get(params.util.format('/api/%s/list', params.modelName), function (req, res) {
        Model.find(req.query, function (err, model) {
            if (err) res.send(err);
            res.json(model);
        });
    });
    params.app.get(params.util.format('/api/%s/get/:id', params.modelName), function (req, res) {
        Model.findOne({"_id": req.params.id}, function (err, model) {
            if (err) res.send(err);
            res.json(model);
        });
    });
    params.app.post('/api/' + params.modelName + '/insert', function (req, res) {
        Model.create(req.body, function (err, model) {
            if (err) res.send(err);
            res.json(model);
        });
    });
    params.app.put('/api/' + params.modelName + '/update/:id', function (req, res) {
        Model.findOneAndUpdate({"_id": req.params.id}, req.body, function (err, model) {
            if (err) res.send(err);
            res.json(model);
        });
    });
    params.app.delete('/api/' + params.modelName + '/delete/:id', function (req, res) {
        Model.remove({
            _id: req.params.id
        }, function (err, model) {
            if (err) res.send(err);
            res.json(model);
        });
    });
};
