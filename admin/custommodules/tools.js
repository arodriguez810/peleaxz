exports.init = function (params) {
    function execFile(file, parameters, res) {
        child = params.child_process.execFile(file, parameters, (error, stdout, stderr) => {
            if (error) {
                res.json({message: error, error: true});
            }
            else {
                res.json({message: stdout, error: false});
            }
        });
    }

    params.app.post('/api/tools/ganerateModels', function (req, res) {
        if (req.body.params !== undefined) {
            execFile('defaults\\generator.exe', req.body.params, res);
        }
    });

    params.app.get('/api/tools/mongoreverse', function (req, res) {
        params.mongoose.connection.db.listCollections().toArray(function (err, names) {
            for (var i in names) {
                var name = names[i].name;
                var model = params.pluralize.singular(name);
                if (params.models.indexOf(model) === -1) {
                    console.log(params.pluralize(name));
                    eval("var obj = params.mongoose.connection.db.pxz");//0." + params.pluralize(name) + ".findOne();");
                    // eval(params.util.format("params.collections.%s = params.mongoose.model('%s', %s);", model, model, content));
                    // eval(params.util.format("var obj = params.collections.%s.findOne();", model, model, content));
                    console.log(obj);
                }
            }
            res.json({message: "reverse success, please restart server", models: names, error: false});
        });
    });
};
