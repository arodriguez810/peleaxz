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
        ;
        if (req.body.params !== undefined) {
            execFile('defaults\\generator.exe', req.body.params, res);
        }
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
                        child = params.child_process.execFile('defaults\\generatorNON.exe', models, (error, stdout, stderr) => {
                            if (error) {
                                params.fs.writeFile("models/mssql/" + models[models.length - 1] + ".json", JSON.stringify(obj), function (err) {
                                    if (err) {
                                        res.json({message: err, error: true});
                                    }
                                    res.json({
                                        message: "reverse success, please restart server",
                                        models: models,
                                        error: false
                                    });
                                });
                            }
                            else {
                                res.json({message: "llego", error: true});
                            }
                        });
                    });
                }
            }
        });
    });

    params.app.get('/api/tools/mysqlreverse', function (req, res) {
        var mysql = params.modules.mysql;
        var models = [];
        mysql.data("SELECT TABLE_NAME from information_schema.TABLES WHERE TABLE_SCHEMA='" + params.CONFIG.mysql.database + "'", params, function (data) {
            for (var i in data.data) {
                if (!params.modelmysql.includes(data.data[i].TABLE_NAME)) {
                    models.push(data.data[i].TABLE_NAME);

                    mysql.data("SELECT * FROM information_schema.`COLUMNS` WHERE TABLE_NAME='" + data.data[i].TABLE_NAME + "' AND TABLE_SCHEMA = '" + params.CONFIG.mysql.database + "'", params, function (columns) {
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
                            child = params.child_process.execFile('defaults\\generatorNON.exe', models, (error, stdout, stderr) => {
                                if (error) {
                                    params.fs.writeFile("models/mysql/" + models[models.length - 1] + ".json", JSON.stringify(obj), function (err) {
                                        if (err) {
                                            res.json({message: err, error: true});
                                        }
                                        res.json({
                                            message: "reverse success, please restart server",
                                            models: models,
                                            error: false
                                        });
                                    });
                                }
                                else {
                                    res.json({message: "error", error: true});
                                }
                            });
                        }
                    );
                }
            }
        })
        ;
    })
    ;
}
;
