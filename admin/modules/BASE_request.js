exports.defaultRequests = function (params, Model) {
    params.fs.readdir(params.util.format('./' + params.folders.views + '/%s', params.modelName), function (err, files) {
        params.modules.views.LoadEJS(files, params);
    });
    params.app.get(params.util.format('/api/%s/list', params.modelName), function (req, res) {
        params.secure.check(req, res, function () {
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
    });
    params.app.get(params.util.format('/api/%s/all', params.modelName), function (req, res) {
        params.secure.check(req, res, function () {
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
    });
    params.app.get(params.util.format('/api/%s/get/:id', params.modelName), function (req, res) {
        params.secure.check(req, res, function () {
            Model.findOne({"_id": req.params.id}, function (err, model) {
                if (err) res.send(err);
                res.json({
                    data: model
                });
            });
        });
    });
    params.app.post('/api/' + params.modelName + '/insert', function (req, res) {
        params.secure.check(req, res, function () {
            Model.create(req.body, function (err, model) {
                if (err) res.send(err);
                res.json({
                    data: model
                });
            });
        });
    });
    params.app.put('/api/' + params.modelName + '/update/:id', function (req, res) {
        params.secure.check(req, res, function () {
            Model.findOneAndUpdate({"_id": req.params.id}, req.body, function (err, model) {
                if (err) res.send(err);
                res.json({
                    data: model
                });
            });
        });
    });
    params.app.delete('/api/' + params.modelName + '/delete/:id', function (req, res) {
        params.secure.check(req, res, function () {
            Model.remove({
                _id: req.params.id
            }, function (err, model) {
                if (err) res.send(err);
                res.json({
                    data: model
                });
            });
        });
    });
    params.app.get(params.util.format('/api/%s/crud', params.modelName), function (req, res) {
        params.secure.check(req, res, function () {
            params.fs.readFile(util.format("./" + params.folders.crud + "/mongo/%s.json", params.modelName), function (err, data) {
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
    });
};
