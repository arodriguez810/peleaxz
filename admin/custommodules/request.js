exports.defaultRequests = function (params) {
    var Model = eval("params.collections." + params.modelName);

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
    params.app.delete('/api/' + params.modelName + '/:id', function (req, res) {
        Model.remove({
            _id: req.params.id
        }, function (err, model) {
            if (err) res.send(err);
            res.json(model);
        });
    });
};