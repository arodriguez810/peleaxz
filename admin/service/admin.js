exports.init = function (params) {

    params.app.get('/todo', function (req, res) {
        res.sendFile('views/todo/index.html', {root: params.dir}); // load the single view file (angular will handle the page changes on the front-end)
    });

    params.app.get('/api/todos', function (req, res) {
        params.Model.find(function (err, model) {
            if (err)
                res.send(err);
            res.json(model);
        });
    });

    params.app.post('/api/todos', function (req, res) {
        params.Model.create({
            text: req.body.text,
            done: false
        }, function (err, model) {
            if (err)
                res.send(err);
            params.Model.find(function (err, list) {
                if (err)
                    res.send(err);
                res.json(list);
            });
        });
    });

    params.app.delete('/api/todos/:todo_id', function (req, res) {
        params.Model.remove({
            _id: req.params.todo_id
        }, function (err, model) {
            if (err)
                res.send(err);
            params.Model.find(function (err, list) {
                if (err)
                    res.send(err);
                res.json(list);
            });
        });
    });

};