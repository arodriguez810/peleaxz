exports.createTable = function (model, object, params) {
    var tsql = params.util.format("CREATE TABLE IF NOT EXISTS `%s` (", model);
    for (var property in object) {
        if (property[0] === "$")
            tsql += params.util.format("\n%s %s,", property.replace("$", ""), object[property]);
        else
            tsql += params.util.format("\n`%s` %s,", property, object[property]);
    }
    tsql += "*";
    tsql = tsql.replace(",*", "");
    tsql += ");";
    return tsql;
};
exports.alterBlackList = [];
exports.addColumns = function (model, object, params) {
    var tsql = [];
    for (var property in object)
        tsql.push("ALTER TABLE `" + params.CONFIG.mysql.database + "`.`" + model + "` ADD COLUMN `" + property + "` " + object[property] + ";");
    return tsql;
};
exports.alterColumns = function (model, object, params) {
    var tsql = [];
    for (var property in object)
        tsql.push("ALTER TABLE `" + params.CONFIG.mysql.database + "`.`" + model + "` MODIFY COLUMN `" + property + "` " + object[property] + ";");
    return tsql;
};

exports.deleteColumns = function (model, object, params) {
    var deleteColumns = [];
    exports.data("select COLUMN_NAME from information_schema.`COLUMNS` where TABLE_NAME='" + model + "' and TABLE_SCHEMA='" + params.CONFIG.mysql.database + "'", params, function (data) {
        var onlynames = [];
        var onlyNamesObjects = [];
        for (var i in data.data)
            onlynames.push(data.data[i].COLUMN_NAME);

        for (var property in object)
            onlyNamesObjects.push(property);
        for (var i in onlynames) {
            if (!onlyNamesObjects.includes(onlynames[i])) {
                deleteColumns.push(onlynames[i]);
            }
        }
        for (var i in deleteColumns)
            exports.executeNonQuery(params.format("ALTER TABLE {0} DROP COLUMN {1};\n", model, deleteColumns[i]), params, function (data) {
                console.log(data);
            });
    });
};

exports.executeNonQuery = function (queries, params, callback) {
    if (!(Array.isArray(queries)))
        queries = [queries];
    for (var i in queries) {
        var query = queries[i];
        var connection = params.mysql.createConnection(params.CONFIG.mysql);
        connection.connect();
        connection.query(query, function (error, results, fields) {
            if (error)
                if (callback) {
                    callback({query: query, error: error.sqlMessage});
                    return;
                }
            if (callback)
                callback({query: query, error: false, recordset: results});
        });
        connection.end();
    }
};
exports.insert = function (table, data, params) {
    var datas = (Array.isArray(data)) ? data : [data];
    var queries = [];
    for (var m in datas) {
        var data = datas[m];
        var columns = [];
        var values = [];
        for (var property in data) {
            var value = data[property];
            if (property[0] === "$")
                columns.push(property.replace('$', ''));
            else
                columns.push("`" + property + "`");
            if (value[0] === "$")
                values.push(value.replace('$', ''));
            else
                values.push("'" + value + "'");
        }
        values = values.replace("'", "''");
        queries.push(params.format("INSERT INTO `{0}` ({1}) VALUES({2});\n", table, columns.join(", "), values.join(", ")));
    }
    return queries;
};
exports.update = function (table, data, params) {
    var datas = (Array.isArray(data)) ? data : [data];
    var queries = [];
    for (var m in datas) {
        var data = datas[m];
        var columns = "";
        var values = "";
        var sets = [];
        var where = "";
        for (var property in data) {
            if (property !== "where") {
                var value = data[property];
                if (property[0] === "$")
                    columns = (property.replace('$', ''));
                else
                    columns = ("`" + property + "`");
                if (value[0] === "$")
                    values = (value.replace('$', ''));
                else
                    values = ("'" + value + "'");
                sets.push(params.format("{0}={1}", columns, values))
            } else {
                var options = {where: data[property]};
                if (options.where === undefined)
                    options.where = [{id: data.id}];
                if (true) {
                    var connectors = [];
                    if (options.where.length > 0) {
                        where = [];
                        for (var i in options.where) {
                            var obj = options.where[i];
                            var field = obj.field !== undefined ? obj.field : "id";
                            field = field[0] === '$' ? field.replace('$', '') : "`" + field + "`";
                            var operator = obj.operator !== undefined ? obj.operator : "=";
                            var connector = obj.connector !== undefined ? obj.connector : "AND";
                            if (Array.isArray(obj.value)) {
                                operator = obj.operator !== undefined ? obj.operator : "in";
                                where.push(params.format(" {0} {1} ('{2}') {3}", field, operator, obj.value.join("','"), connector));
                                connectors.push(connector);
                            } else {
                                where.push(params.format(" {0} {1} {2} {3}", field, operator, obj.value[0] === '$' ? obj.value.replace('$', '') : "'" + obj.value + "'", connector));
                                connectors.push(connector);
                            }
                        }
                        where = "WHERE " + where.join(" ") + "<<**>>";
                        for (var i in connectors) {
                            var strtoreplace = connectors[i] + "<<**>>";
                            where = params.S(where).replaceAll(strtoreplace, "").s;
                        }
                    }
                }
            }
        }
        queries.push(params.format("UPDATE `{0}` SET {1} {2};\n", table, sets.join(", "), where));
    }
    return queries;
};
exports.delete = function (table, data, params) {
    var datas = (Array.isArray(data)) ? data : [data];
    var queries = "";
    for (var m in datas) {
        var data = datas[m];
        var columns = [];
        var values = [];
        for (var property in data) {
            var value = data[property];
            if (property[0] === "$")
                columns.push(property.replace('$', ''));
            else
                columns.push("`" + property + "`");
            if (value[0] === "$")
                values.push(value.replace('$', ''));
            else
                values.push("'" + value + "'");
        }
        queries += params.format("DELETE FROM `{0}` WHERE \n", table, columns.join(", "), values.join(", "));
    }
    return queries;
};
exports.data = function (query, params, callback, index) {
    var connection = params.mysql.createConnection(params.CONFIG.mysql);
    connection.connect();
    connection.query(query, function (error, results, fields) {
        if (error)
            if (callback) {
                callback({query: query, error: error.sqlMessage});
                return;
            }
        if (callback)
            callback({
                query: query,
                error: false,
                data: results,
                index: index
            });
    });
    connection.end();
};
exports.defaultRequests = function (Model, params) {
    params.modelName = Model.tableName;
    params.fs.readdir(params.util.format('./' + params.folders.views + '/%s', params.modelName), function (err, files) {
        params.modules.request.LoadEJS(files, params);
    });
    params.app.get(params.util.format('/api/%s/list', Model.tableName), function (req, res) {
        if (req.query.limit === undefined)
            req.query.limit = 10;
        if (req.query.page === undefined)
            req.query.page = 1;
        if (req.query.orderby === undefined)
            req.query.orderby = "id";

        Model.all(req.query, function (data) {
            if (data.error !== false) res.send(data.error);
            res.json(data);
        });
    });
    params.app.get(params.util.format('/api/%s/all', Model.tableName), function (req, res) {
        Model.all(req.query, function (data) {
            if (data.error !== false) res.send(data.error);
            res.json(data);
        });
    });
    params.app.get(params.util.format('/api/%s/get/:id', Model.tableName), function (req, res) {
        Model.find(req.params.id, function (data) {
            if (data.error !== false) res.send(data.error);
            res.json(data);
        });
    });
    params.app.post('/api/' + Model.tableName + '/insert', function (req, res) {
        Model.insert(req.body, function (data) {
            if (data.error !== false) res.send(data.error);
            res.json(data);
        });
    });
    params.app.put('/api/' + Model.tableName + '/update/:id', function (req, res) {
        Model.update(req.params.id, req.body, function (data) {
            if (data.error !== false) res.send(data.error);
            res.json(data);
        });
    });
    params.app.delete('/api/' + Model.tableName + '/delete/:id', function (req, res) {
        Model.delete(req.params.id, function (data) {
            if (data.error !== false) res.send(data.error);
            res.json(data);
        });
    });

    params.app.get(params.util.format('/api/%s/crud', params.modelName), function (req, res) {
        params.fs.readFile(params.util.format("./" + params.folders.crud + "/mysql/%s.json", params.modelName), "utf8", function (err, data) {
            if (err) {
                res.json({message: err, error: true});
            }
            res.json({
                message: "Success",
                crud: eval("(" + data + ")"),
                error: false
            });
        });
    });
};
exports.Model = function (tableName, params) {
    this.tableName = tableName;
    this.mysql = params.mysql;
    this.config = params.config;
    //search
    this.all = function (options, callback) {
        this.search(options, callback);
    };
    this.find = function (id, callback) {
        this.search({where: [{value: id}]}, callback);
    };
    this.where = function (where, callback) {
        var finalwhere = [];
        for (var property in where) {
            finalwhere.push({value: eval("where." + property), field: property});
        }
        this.search({where: finalwhere}, callback);
    };
    //update
    this.update = function (id, data, callback) {
        data.where = [{value: id}];
        exports.executeNonQuery(exports.update(tableName, data, params), params, function (data) {
            callback(data);
        });
    };
    this.updateAll = function (data, callback) {
        exports.executeNonQuery(exports.update(tableName, data, params), params, function (data) {
            callback(data);
        });
    };
    this.updateWhere = function (where, data, callback) {
        var finalwhere = [];
        for (var property in where) {
            finalwhere.push({value: eval("where." + property), field: property});
        }
        data.where = finalwhere;
        exports.executeNonQuery(exports.update(tableName, data, params), params, function (data) {
            callback(data);
        });
    };
    //insert
    this.insert = function (data, callback) {
        exports.executeNonQuery(exports.insert(tableName, data, params), params, function (data) {
            callback(data);
        });
    };
    //delete
    this.deleteAll = function (callback) {
        this.search({}, callback, 'DELETE');
    };
    this.delete = function (id, callback) {
        this.search({where: [{value: id}]}, callback, "DELETE");
    };
    this.deleteWhere = function (where, callback) {
        var finalwhere = [];
        for (var property in where) {
            finalwhere.push({value: eval("where." + property), field: property});
        }
        this.search({where: finalwhere}, callback, "DELETE");
    };
    this.searchAndDelete = function (options, callback) {
        this.search(options, callback, 'DELETE');
    };
    //core
    this.search = function (options, callback, prefix) {
        var sentence = prefix || "SELECT";
        var where = "";
        if (options.where !== undefined) {
            var connectors = [];
            if (options.where.length > 0) {
                where = [];
                for (var i in options.where) {
                    var obj = options.where[i];
                    var field = obj.field !== undefined ? obj.field : "id";
                    field = field[0] === '$' ? field.replace('$', '') : "`" + field + "`";
                    var operator = obj.operator !== undefined ? obj.operator : "=";
                    var connector = obj.connector !== undefined ? obj.connector : "AND";
                    if (Array.isArray(obj.value)) {
                        operator = obj.operator !== undefined ? obj.operator : "in";
                        where.push(params.format(" {0} {1} ('{2}') {3}", field, operator, obj.value.join("','"), connector));
                        connectors.push(connector);
                    } else {
                        where.push(params.format(" {0} {1} {2} {3}", field, operator, obj.value[0] === '$' ? obj.value.replace('$', '') : "'" + obj.value + "'", connector));
                        connectors.push(connector);
                    }
                }
                where = "WHERE " + where.join(" ") + "<<**>>";
                for (var i in connectors) {
                    var strtoreplace = connectors[i] + "<<**>>";
                    where = params.S(where).replaceAll(strtoreplace, "").s;
                }
            }
        }
        var selectfinal = sentence === "SELECT" ? "*" : "";
        if (options.columns !== undefined) {
            if (options.columns.length > 0) {
                selectfinal = [];
                for (var i in options.columns) {
                    var column = options.columns[i];
                    if (column[0] === "$")
                        selectfinal.push(column.replace('$', ''));
                    else
                        selectfinal.push("`" + column + "`");
                }
                selectfinal = selectfinal.join(", ");
            }
        }
        var groupby = "";
        if (options.groupby) {
            if (Array.isArray(options.groupby))
                groupby = " GROUP BY " + "`" + options.groupby.join("`,`") + "`";
            else
                groupby = " GROUP BY " + "`" + options.groupby + "`";
        }

        var order = "";
        if (options.order) {
            order = options.order;
        } else {
            order = "asc"
        }

        var orderby = "";
        if (options.orderby) {
            if (Array.isArray(options.orderby))
                orderby = " ORDER BY " + "`" + options.orderby.join("`,`") + "`";
            else
                orderby = " ORDER BY " + "`" + options.orderby + "`";
        }

        var distinct = '';
        if (options.distinct !== undefined) {
            if (options.distinct) {
                distinct = "distinct";
            }
        }

        var $limit = '';
        var $limitvalue = 10;
        var $pagec = 1;
        var $page = '';
        if (options.orderby) {
            if (options.limit !== undefined) {
                $limitvalue = options.limit;
                if (options.page !== undefined) {
                    $pagec = options.page;
                    var $value = $limitvalue * ($pagec - 1);
                    $page = params.format("limit  {1} OFFSET {0}", $value, $limitvalue);
                }
            }
        }
        var query = params.format("{sentence} {distinct} {selectfinal} FROM `{table}` {where} {groupby} {orderby} {order} {limit} {page}",
            {
                sentence: sentence,
                distinct: distinct,
                selectfinal: selectfinal,
                table: tableName,
                where: where,
                groupby: groupby,
                orderby: orderby,
                order: order,
                limite: $limit,
                page: $page
            }
        );
        var queryCount = params.format("SELECT count(*) count FROM `{table}` {where} {groupby}",
            {
                table: tableName,
                where: where,
                groupby: groupby
            }
        );

        exports.data(queryCount, params, function (countData) {
            exports.data(query, params, function (data) {
                if (options.limit !== undefined)
                    if (data.index !== undefined) {
                        data.totalPage = Math.ceil(countData.data[0].count / data.index.limitvalue);
                        data.currentPage = data.index.pagec;
                    }
                    else
                        data.index = {};
                else
                    data.index = {};
                callback(data);
            }, {
                limitvalue: $limitvalue,
                pagec: $pagec,
                limit: options.limit
            });
        });


    };
};

