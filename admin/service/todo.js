exports.init = function (params) {
    params.modules.request.defaultRequests(params);

    params.app.get('/' + params.modelName, function (req, res) {
        res.render('../views/' + params.modelName + '/index');
    });
};