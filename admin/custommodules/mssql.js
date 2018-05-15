exports.createTable = function (model, object, params) {
    var tsql = params.util.format("IF NOT EXISTS(SELECT [name] FROM sys.tables WHERE [name] = '%s') CREATE TABLE [%s] (", model, model);
    for (var property in object) {
        tsql += params.util.format("\n[%s] %s,", property, object[property]);
    }
    tsql += "*";
    tsql = tsql.replace(",*", "");
    tsql += ");";
    return tsql;
};

exports.alterBlackList = ["DEFAULT", "GETDATE()", "IDENTITY(1,1)", "IDENTITY", "1"];
exports.addColumns = function (model, object, params) {
    var tsql = "";
    for (var property in object)
        tsql += params.util.format("IF NOT EXISTS (SELECT * FROM   sys.columns WHERE  object_id = OBJECT_ID(N'[dbo].[" + model + "]') AND name = '" + property + "') ALTER TABLE [%s] ADD [%s] %s;\n", model, property, object[property]);
    for (var black in exports.alterBlackList)
        tsql = params.S(tsql).replaceAll(exports.alterBlackList[black], '').s;
    return tsql;
};

exports.alterColumns = function (model, object, params) {
    var tsql = "";
    for (var property in object)
        tsql += params.util.format("ALTER TABLE [%s] ALTER COLUMN [%s] %s;\n", model, property, object[property]);
    for (var black in exports.alterBlackList)
        tsql = params.S(tsql).replaceAll(exports.alterBlackList[black], '').s;
    return tsql;
};

exports.executeNonQuery = function (query, params, callback) {
    var connection = new params.mssql.ConnectionPool(params.CONFIG.mssql);
    connection.connect().then(function () {
        var request = new params.mssql.Request(connection);
        request.query(query).then(function (recordset) {
            if (callback)
                callback({query: query, error: false, recordset: recordset});
        }).catch(function (err) {
            console.log(err.originalError.message.error);
            if (callback)
                callback({query: query, error: err.originalError.message});
        });
    }).catch(function (err) {
        console.log(err.originalError.message.error);
        if (callback)
            callback({query: query, error: err.originalError.message});
    });
};

exports.insert = function (table, data, params) {
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
                columns.push("[" + property + "]");
            if (value[0] === "$")
                values.push(value.replace('$', ''));
            else
                values.push("'" + value + "'");
        }
        queries += params.format("INSERT INTO [{0}]({1}) VALUES({2});\n", table, columns.join(", "), values.join(", "));
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
                columns.push("[" + property + "]");
            if (value[0] === "$")
                values.push(value.replace('$', ''));
            else
                values.push("'" + value + "'");
        }
        queries += params.format("DELETE FROM [{0}] WHERE \n", table, columns.join(", "), values.join(", "));
    }
    return queries;
};

exports.data = function (query, params, callback) {
    var connection = new params.mssql.ConnectionPool(params.CONFIG.mssql);
    connection.connect().then(function () {
        var request = new params.mssql.Request(connection);
        request.query(query).then(function (recordset) {
            if (callback)
                callback({query: query, error: false, data: recordset.recordset, count: recordset.rowsAffected});
        }).catch(function (err) {
            console.log(err.originalError.message.error);
            if (callback)
                callback({query: query, error: err.originalError.message});
        });
    }).catch(function (err) {
        console.log(err.originalError.message.error);
        if (callback)
            callback({query: query, error: err.originalError.message});
    });
};

exports.MSSQLDB = function (models, params) {
    this.models = models;
    this.Model = function (tableName) {
        this.tableName = tableName;
        this.mssql = params.mssql;
        this.config = params.config;
        this.all = function (callback) {
            this.search({}, callback);
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
        this.insert = function (data, callback) {
            exports.data(exports.insert(tableName, data, params), params, function (data) {
                callback(data);
            });
        };
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
                        field = field[0] === '$' ? field.replace('$', '') : "[" + field + "]";
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
            var selectfinal = prefix === "SELECT" ? "*" : "";
            if (options.columns !== undefined) {
                if (options.columns.length > 0) {
                    selectfinal = [];
                    for (var i in options.columns) {
                        var column = options.columns[i];
                        if (column[0] === "$")
                            selectfinal.push(column.replace('$', ''));
                        else
                            selectfinal.push("[" + column + "]");
                    }
                    selectfinal = selectfinal.join(", ");
                }
            }
            var groupby = "";
            if (options.groupby) {
                if (Array.isArray(options.groupby))
                    groupby = " GROUP BY " + "[" + options.groupby.join("],[") + "]";
                else
                    groupby = " GROUP BY " + "[" + options.groupby + "]";
            }

            var orderby = "";
            if (options.orderby) {
                if (Array.isArray(options.orderby))
                    orderby = " ORDER BY " + "[" + options.orderby.join("],[") + "]";
                else
                    orderby = " ORDER BY " + "[" + options.orderby + "]";
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
            if (options.limit !== undefined) {
                $limit = " limit " + options.limit + " ";
                if (options.page !== undefined) {
                    $pagec = options.page;
                    var $value = $limitvalue * ($pagec - 1);
                    $page = " OFFSET " + $value + " ";
                }
            }
            var query = params.format("{sentence} {distinct} {selectfinal} FROM [{table}] {where} {groupby} {orderby} {limit} {page}",
                {
                    sentence: sentence,
                    distinct: distinct,
                    selectfinal: selectfinal,
                    table: tableName,
                    where: where,
                    groupby: groupby,
                    orderby: orderby,
                    limite: $limit,
                    page: $page
                }
            );
            exports.data(query, params, function (data) {
                callback(data);
            });
        };
    };
    for (var i in models)
        eval("this." + models[i] + " = new this.Model('" + models[i] + "')");
}
;