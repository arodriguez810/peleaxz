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
                    eval(params.format("var obj = params.mongoose.connection.db.collection('{0}').schema", name));
                    // eval(params.util.format("params.collections.%s = params.mongoose.model('%s', %s);", model, model, content));
                    // eval(params.util.format("var obj = params.collections.%s.findOne();", model, model, content));
                    console.log(obj);
                }
            }
            res.json({message: "reverse success, please restart server", models: names, error: false});
        });
    });

    params.app.get('/api/tools/mssqlreverse', function (req, res) {
        var mssql = params.modules.mssql;
        var models = [];
        mssql.data("SELECT TABLE_NAME from INFORMATION_SCHEMA.TABLES", params, function (data) {
            for (var i in data.data) {
                if (!params.modelsql.includes(data.data[i].TABLE_NAME)) {
                    models.push(data.data[i].TABLE_NAME);

                    mssql.data("SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME='" + data.data[i].TABLE_NAME + "'", params, function (columns) {
                        columns = columns.data;
                        var json = "{";
                        for (var i in columns) {
                            var column = columns[i];
                            json += params.format("\"{0}\": \"{1}{2} {3}\",", column.COLUMN_NAME, column.DATA_TYPE,
                                column.CHARACTER_MAXIMUM_LENGTH !== null ? "(" + column.CHARACTER_MAXIMUM_LENGTH + ")" : "",
                                column.IS_NULLABLE === "YES" ? "NULL" : " NOT NULL",
                            );
                        }
                        json += "}";
                        var obj = eval("(" + json + ")");

                        params.fs.writeFile("models/mssql/" + models[models.length - 1] + ".json", JSON.stringify(obj), function (err) {
                            if (err) {
                                return console.log(err);
                            }
                            res.json({message: "reverse success, please restart server", models: models, error: false});
                        });
                    });
                }
            }
        });
    });
};
