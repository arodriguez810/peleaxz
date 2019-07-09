exports.open = "\"";
exports.close = "\"";
exports.executeNonQuery = async function (query, params, show, c, fields, tablename) {
    if (c) {
        console.log(query.success);
        query = c(query, fields, tablename);
    }
    if (show === undefined)
        console.log(query.pxz);
    var connection = await params.oracle.getConnection(params.CONFIG.oracle);
    var options = {autoCommit: true};
    try {
        var result = await connection.execute(query, [], options);
        await connection.release();
        return {query: query, error: false, recordset: result};
    } catch (err) {
        console.log({query: query, error: err});
        await connection.release();
        return {query: query, error: err};
    }
};
exports.executeNonQueryArray = async function (queries, params, show, c, fields, tablename) {
    var result;
    for (var query of queries)
        result = await exports.executeNonQuery(query, params, show, c, fields, tablename);
    return result;
};
exports.insertQuery = async function (table, data, params, get, getvalue) {

    var datas = (Array.isArray(data)) ? data : [data];
    var queries = [];
    for (var m in datas) {
        var row = datas[m];
        var columns = [];
        var values = [];
        for (var property in row) {
            var value = row[property];
            if (property[0] === "$")
                columns.push(property.replace('$', ''));
            else
                columns.push(exports.open + property + exports.close);

            if (value[0] === "$")
                values.push(value.replace('$', ''));
            else if (value[0] === "#")
                values.push(`HASH_MD5('${params.CONFIG.appKey}${value.replace('#', '')}')`);
            else
                values.push((value === "true" ? "1" : value === "false" ? "0" : ("'" + value.replace("'", "''") + "'")));
        }
        if (get !== undefined) {
            queries.push(params.format(`INSERT INTO ${exports.open}{0}${exports.close}({1}) VALUES({2}); SELECT * FROM ${exports.open}{0}${exports.close} where ${exports.open}` + get + `${exports.close}=` + getvalue, table, columns.join(", "), values.join(", ")));
            break;
        }
        else
            queries.push(params.format(`INSERT INTO ${exports.open}{0}${exports.close}({1}) VALUES({2})`, table, columns.join(", "), values.join(", ")));
    }
    return queries;
};
exports.update = async function (table, data, params) {

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
                    columns = (exports.open + property + exports.open);
                if (value[0] === "$")
                    values = (value.replace('$', ''));
                else if (value[0] === "#")
                    values = (`HASH_MD5('${params.CONFIG.appKey}${value.replace('#', '')}')`);
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
                            field = field[0] === '$' ? field.replace('$', '') : exports.open + field + exports.close;
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
        queries.push(params.format(`UPDATE ${exports.open}{0}${exports.close} SET {1} {2}`, table, sets.join(", "), where));
    }
    return queries;
};
exports.delete = function (table, data, params) {
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
                columns.push(exports.open + property + exports.close);
            if (value[0] === "$")
                values.push(value.replace('$', ''));
            else
                values.push("'" + value + "'");
        }
        queries.push(params.format(`DELETE FROM ${exports.open}{0}${exports.close} WHERE`, table, columns.join(", "), values.join(", ")));
    }
    return queries;
};
exports.data = async function (query, params, index, c, fields, tablename) {
    var connection = await params.oracle.getConnection(params.CONFIG.oracle);
    if (c) {
        console.log(query.success);
        query = c(query, fields, tablename);
    }
    console.log(query.pxz);

    try {
        var result = await connection.execute(query);
        await connection.release();
        var createjson = [];
        for (var row of result.rows) {
            var object = {};
            for (var cell in row) {
                eval(`object.${result.metaData[cell].name.toLowerCase()} = row[cell];`);
            }
            createjson.push(object);
        }

        return {
            query: query,
            error: false,
            data: createjson,
            count: [result.rows.length],
            index: index
        };
    } catch (err) {
        await connection.release();
        return {query: query, error: err};
    }
};
exports.dataNoShow = async function (query, params, index, c, fields, tablename) {

    var connection = await params.oracle.getConnection(params.CONFIG.oracle);
    if (c)
        query = c(query, fields, tablename);

    try {
        var result = await connection.execute(query);
        await connection.release();
        var createjson = [];
        for (var row of result.rows) {
            var object = {};
            for (var cell in row) {
                eval(`object.${result.metaData[cell].name.toLowerCase()} = row[cell];`);
            }
            createjson.push(object);
        }

        return {
            query: query,
            error: false,
            data: createjson,
            count: [result.rows.length],
            index: index
        };
    } catch (err) {
        await connection.release();
        return {query: query, error: err};
    }
};
exports.defaultRequests = function (Model, params) {
    params.modelName = Model.tableName.toLowerCase();

    params.fs.readdir(params.util.format('./' + params.folders.views + '/%s', params.modelName), function (err, files) {
        params.modules.views.LoadEJS(files, params);
    });
    params.app.post('/api/oc_list', function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            if (req.query.limit === undefined)
                req.query.limit = 10;
            if (req.query.page === undefined)
                req.query.page = 1;
            if (req.query.orderby === undefined)
                req.query.orderby = "id";

            Model.all(req.query).then((data) => {
                if (data.error !== false) res.send(data.error);
                res.json(data);
            }).catch(err => {
                res.json(err);
            });
        }).catch(function () {

        });
    });
    params.app.post(params.util.format('/api/%s/list', Model.tableName), function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            if (req.body.limit === undefined)
                req.body.limit = 10;
            if (req.body.page === undefined)
                req.body.page = 1;
            if (req.body.orderby === undefined)
                req.body.orderby = "id";

            Model.all(req.body).then((data) => {
                if (data.error !== false) res.send(data.error);
                res.json(data);
            }).catch(err => {
                res.json(err);
            });
        }).catch(function () {

        });
    });
    params.app.get(params.util.format('/api/%s/all', Model.tableName), function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            if (req.query.limit === undefined)
                req.query.limit = 10;
            if (req.query.page === undefined)
                req.query.page = 1;
            if (req.query.orderby === undefined)
                req.query.orderby = "id";

            Model.all(req.query).then((data) => {
                if (data.error !== false) res.send(data.error);
                res.json(data);
            }).catch(err => {
                res.json(err);
            });
        }).catch(function () {

        });
    });
    params.app.get(params.util.format('/api/%s/get/:id', Model.tableName), function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            Model.find(req.params.id).then((data) => {
                if (data.error !== false) res.send(data.error);
                res.json(data);
            });
        }).catch(function () {

        });
    });
    params.app.post('/api/' + Model.tableName + '/insert', function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            Model.insert(req.body).then((data) => {
                if (data.error !== false) res.send(data.error);
                res.json(data);
            }).catch(err => {
                res.json(err);
            });
        }).catch(function () {

        });
    });
    params.app.post('/api/' + Model.tableName + '/insertID', function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            Model.insertID(req.body.insertData, req.body.field, req.body.value).then((data) => {
                if (data.error !== false) res.send(data.error);
                res.json(data);
            });
        }).catch(function () {

        });
    });
    params.app.post('/api/' + Model.tableName + '/update/', function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            Model.update(req.body).then((data) => {
                if (data.error !== false) res.send(data.error);
                res.json(data);
            }).catch(err => {
                res.json(err);
            });
        }).catch(function () {

        });
    });
    params.app.post('/api/' + Model.tableName + '/delete', function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            Model.delete(req.body).then((data) => {
                if (data.error !== false) res.send(data.error);
                res.json(data);
            }).catch(err => {
                res.json(err);
            });
        }).catch(function () {

        });
    });
};
exports.Model = function (tableName, params, fields, tables) {
    this.tableName = tableName;
    this.mssql = params.mssql;
    this.config = params.config;
    this.fields = fields;
    this.tables = tables;
    this.c = function (query, fs, tbs) {
        var newQuery = query;
        for (var i in fs) {
            var field = fs[i];
            newQuery = params.S(newQuery).replaceAll(`"${field.toLowerCase()}"`, `"${field}"`).s;
            newQuery = params.S(newQuery).replaceAll(`"${field.toUpperCase()}"`, `"${field}"`).s;
        }
        for (var i in tbs) {
            var table = tbs[i];
            newQuery = params.S(newQuery).replaceAll(`"${table.toUpperCase()}"`, `"${table}"`).s;
            newQuery = params.S(newQuery).replaceAll(`"${table.toLowerCase()}"`, `"${table}"`).s;

            newQuery = params.S(newQuery).replaceAll(`${table.toUpperCase()}.`, `"${table}".`).s;
            newQuery = params.S(newQuery).replaceAll(`${table.toLowerCase()}.`, `"${table}".`).s;
        }
        return newQuery;
    };
    //search
    this.all = async function (options) {
        return await this.search(options);
    };
    this.find = async function (id) {
        return await this.search({where: [{value: id}]});
    };
    this.where = async function (where) {
        return await this.search({where: where});
    };
    //update
    this.update = async function (data) {
        return await exports.executeNonQueryArray(await exports.update(tableName, data, params), params, undefined, this.c, this.fields, this.tables).then(result => {
            return result;
        });
    };
    this.updateAll = async function (data) {
        return await exports.executeNonQueryArray(await exports.update(tableName, data, params), params, undefined, this.c, this.fields, this.tables).then(result => {
            return result;
        });
    };
    this.updateWhere = async function (where, data) {
        var finalwhere = [];
        for (var property in where) {
            finalwhere.push({value: eval("where." + property), field: property});
        }
        data.where = finalwhere;
        return await exports.executeNonQueryArray(await exports.update(tableName, data, params), params, undefined, this.c, this.fields, this.tables).then((result) => {
            return result;
        });
    };
    //insert
    this.insert = async function (data) {
        return await exports.executeNonQueryArray(await exports.insertQuery(tableName, data, params), params, undefined, this.c, this.fields, this.tables).then((result) => {
            return result;
        });
    };
    this.insertID = async function (data, field, value) {
        return await exports.executeNonQueryArray(await exports.insertQuery(tableName, data, params), params, undefined, this.c, this.fields, this.tables)
            .then(async (insert) => {
                var retroID = field || "id";
                var retroValue = value !== '' ? ("'" + value + "'") : (`(select MAX(${exports.open}` + (field || "id") + `${exports.close}) from ${exports.open}` + tableName + `${exports.close})`);
                var retroQuery = `SELECT * FROM "${tableName}" where "${retroID}"= ${retroValue}`;
                return await exports.data(retroQuery, params, undefined, this.c, this.fields, this.tables).then((result) => {
                    return result;
                });
            });
    };
    //delete
    this.deleteAll = async function () {
        return await this.search({}, 'DELETE');
    };
    this.delete = async function (where) {
        return await this.search({where: where}, "DELETE");
    };
    this.deleteWhere = async function (where) {
        var finalwhere = [];
        for (var property in where) {
            finalwhere.push({value: eval("where." + property), field: property});
        }
        return await this.search({where: finalwhere}, "DELETE");
    };
    this.searchAndDelete = async function (options) {
        return await this.search(options, 'DELETE');
    };
    //functions
    this.clearQuotes = function (data) {
        var newstr = params.S(data).replaceAll(exports.open, "").s;
        newstr = params.S(newstr).replaceAll(exports.close, "").s;
        return newstr;
    };
    this.colPointer = function (column, base) {
        base = base === undefined ? false : true;
        var spliter = column.split(".");
        if (spliter.length > 1) {
            var pointer = spliter[0];
            column = spliter[1];
            if (!base) {
                if (column[0] === exports.open)
                    return params.format("{0}.{1}", pointer, column);
                else
                    return params.format(`{0}.${exports.open}{1}${exports.close}`, pointer, column);
            } else {
                if (column[0] === exports.open)
                    return params.format("{0}.{1} as {2}_{3}", pointer, column, this.clearQuotes(pointer), this.clearQuotes(column));
                else
                    return params.format(`{0}.${exports.open}{1}${exports.close} as {2}_{3}`, pointer, column, this.clearQuotes(pointer), this.clearQuotes(column));
            }
        } else {
            var pointer = "BASE";
            if (!base) {
                if (column[0] === exports.open)
                    return params.format("{0}.{1}", pointer, column);
                else
                    return params.format(`{0}.${exports.open}{1}${exports.close}`, pointer, column);
            } else {
                if (column[0] === exports.open)
                    return params.format("{0}.{1} as {2}_{3}", pointer, column, this.clearQuotes(pointer), this.clearQuotes(column));
                else
                    return params.format(`{0}.${exports.open}{1}${exports.open} as {2}_{3}`, pointer, column, this.clearQuotes(pointer), this.clearQuotes(column));
            }
        }
    };
    this.makeWhere = function (where, whereWord, prefix) {
        whereWord = whereWord === undefined ? true : whereWord;
        prefix = prefix === undefined ? "BASE" : "";
        var options = {};
        options.where = where;
        if (options.where !== undefined) {
            var connectors = [];
            if (options.where.length > 0) {
                where = [];
                for (var i in options.where) {
                    var obj = options.where[i];
                    var field = obj.field !== undefined ? obj.field : "id";
                    field = field[0] === '$' ? field.replace('$', '') : this.colPointer(field);
                    var operator = obj.operator !== undefined ? obj.operator : "=";
                    var connector = obj.connector !== undefined ? obj.connector : "AND";
                    var open = obj.open !== undefined ? obj.open : "";
                    var close = obj.close !== undefined ? obj.close : "";
                    if (Array.isArray(obj.value)) {
                        operator = obj.operator !== undefined ? obj.operator : "in";
                        where.push(params.format(open + " {0} {1} ('{2}') {4} {3}", field, operator, obj.value.join("','"), connector, close));
                        connectors.push(connector);
                    } else {
                        if (obj.value !== undefined) {
                            obj.value = obj.value.toString();
                            where.push(params.format(open + " {0} {1} {2} {4} {3}", field, operator, obj.value[0] === '$' ? obj.value.replace('$', '') : "'" + obj.value + "'", connector, close));
                            connectors.push(connector);
                        }
                    }
                }
                where = (whereWord ? "WHERE " : "") + where.join(" ") + "<<**>>";
                for (var i in connectors) {
                    var strtoreplace = connectors[i] + "<<**>>";
                    where = params.S(where).replaceAll(strtoreplace, "").s;
                }
                return prefix === "" ? params.S(where).replaceAll('BASE.', '').s : where;
            }
        }
        return "";
    };
    //master
    this.search = async function (options, prefix) {
        var offTableName = options.tableName || tableName;
        var sentence = prefix || "SELECT";
        var where = this.makeWhere(options.where, true, prefix);

        var join = "";
        var joinColumns = [];
        if (options.join !== undefined) {
            if (Array.isArray(options.join)) {
                if (options.join.length > 0) {
                    join = [];
                    for (var i in options.join) {
                        var obj = options.join[i];
                        if (obj.table !== undefined) {
                            var field = obj.field !== undefined ? obj.field : `${exports.open}id${exports.close}`;
                            field = this.colPointer(obj.table + "." + field);
                            var baseField = obj.base !== undefined ? obj.base : `${exports.open}id${exports.close}`;
                            baseField = this.colPointer(baseField);
                            var type = obj.type !== undefined ? obj.type : "LEFT";
                            var operator = obj.operator !== undefined ? obj.operator : "=";
                            var connector = obj.connector !== undefined ? obj.connector : "AND";
                            var Jcolumns = obj.columns !== undefined ? obj.columns : this.colPointer(exports.open + obj.table + `${exports.close}.${exports.open}name${exports.close}`, true);
                            var subwhere = this.makeWhere(options.join.where, false);
                            if (Array.isArray(Jcolumns))
                                for (const jco of Jcolumns)
                                    joinColumns.push(this.colPointer(obj.table + "." + jco, true));
                            else
                                joinColumns.push(Jcolumns);

                            if (subwhere === "")
                                join.push(params.format(` {0} JOIN ${exports.open}{1}${exports.close} ON {2} {3} {4}`, type, obj.table, this.colPointer(baseField), operator, field));
                            else
                                join.push(params.format(` {0} JOIN ${exports.open}{1}${exports.close} ON {2} {3} {4} {5} ({6})`, type, obj.table, this.colPointer(baseField), operator, field, connector, subwhere));
                        } else {
                            var spliter = obj.split(':');
                            var type = spliter[0];
                            var inner = spliter[1];
                            var baseField = spliter[2];
                            var Jcolumns = this.colPointer(exports.close + inner + `${exports.close}.${exports.open}name${exports.close}`, true);
                            if (spliter.length > 3) {
                                Jcolumns = spliter[3].split(',');
                                for (const jco of Jcolumns)
                                    joinColumns.push(this.colPointer(inner + "." + jco, true));
                            } else {
                                joinColumns.push(Jcolumns);
                            }
                            join.push(params.format(` {0} JOIN ${exports.open}{1}${exports.close} ON {2} {3} ${exports.open}{1}${exports.close}.${exports.open}{4}${exports.close}`, type, inner, this.colPointer(baseField), "=", "id"));
                        }
                    }
                    join = join.join(" ");
                } else {
                    var spliter = options.join.split(':');
                    var type = spliter[0];
                    var inner = spliter[1];
                    var baseField = spliter[2];
                    var Jcolumns = this.colPointer(exports.open + inner + `${exports.close}.${exports.open}name${exports.close}`, true);
                    if (spliter.length > 3) {
                        Jcolumns = spliter[3].split(',');
                        for (const jco of Jcolumns)
                            joinColumns.push(jco);
                    } else {
                        joinColumns.push(Jcolumns);
                    }
                    join = (params.format(` {0} JOIN ${exports.open}{1}${exports.close} ON {2} {3} ${exports.open}{1}${exports.close}.${exports.open}{4}${exports.close}`, type, inner, this.colPointer(baseField), "=", "id"));
                }
            }
        }
        var selectfinal = sentence === "SELECT" ? "BASE.*" : "";
        var nickName = sentence === "SELECT" ? "BASE" : "";
        if (options.columns !== undefined) {
            if (options.columns.length > 0) {
                selectfinal = [];
                for (var i in options.columns) {
                    var column = options.columns[i];
                    if (column[0] === "$")
                        selectfinal.push(column.replace('$', ''));
                    else
                        selectfinal.push(this.colPointer(column));
                }
                selectfinal = selectfinal.join(", ");
            }
        }
        selectfinal = joinColumns.length > 0 ? (selectfinal + ("," + joinColumns.join(","))) : selectfinal;
        var groupby = "";
        if (options.groupby) {
            if (Array.isArray(options.groupby)) {
                groupbyarray = [];
                for (const grby of options.groupby) {
                    groupbyarray.push(grby);
                }
                groupby = " GROUP BY " + groupbyarray.join(",");
            }
            else
                groupby = " GROUP BY " + options.groupby;
        }
        var order = "";
        var orderby = "";
        if (options.orderby) {
            if (Array.isArray(options.orderby)) {
                orderbyarray = [];
                for (var i in options.orderby) {
                    var column = options.orderby[i];
                    if (column[0] === "$")
                        orderbyarray.push(column.replace('$', ''));
                    else {
                        if (options.orderby.indexOf('_') !== -1)
                            orderbyarray.push(params.format(`{0}`, options.orderby));
                        else
                            orderbyarray.push(params.format(`{0}`, this.colPointer(options.orderby)));
                    }

                }
                orderby = " ORDER BY " + orderbyarray.join(",");
            }
            else {
                if (options.orderby[0] === "$")
                    orderby = " ORDER BY " + options.orderby.replace('$', '');
                else {
                    if (options.orderby.indexOf('_') !== -1)
                        orderby = " ORDER BY " + params.format(`{0}`, options.orderby);
                    else
                        orderby = " ORDER BY " + params.format(`{0}`, this.colPointer(options.orderby));

                }
            }
            if (options.order) {
                order = options.order;
            } else {
                order = "asc"
            }
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
                    if (where !== '')
                        $page = params.format(" where (rnum >= {0} and rnum <= {1})", $value, $value + $limitvalue);
                    else
                        $page = params.format(" where (rnum >= {0} and rnum <= {1})", $value + 1, $value + $limitvalue);
                }
            }
        }

        if (sentence === "SELECT")
            var query = params.format(`select * from ({sentence} {distinct} {selectfinal},rownum as rnum FROM ${exports.open}{table}${exports.close} ` + nickName + " {join} {where} {limit} {groupby} {orderby} {order}) {page}",
                {
                    sentence: sentence,
                    distinct: distinct,
                    selectfinal: selectfinal,
                    joinColumns: joinColumns,
                    table: offTableName,
                    join: join,
                    where: where,
                    groupby: groupby,
                    orderby: orderby,
                    order: order,
                    limite: $limit,
                    page: $page
                }
            );
        else
            var query = params.format(`{sentence} {distinct} {selectfinal} FROM ${exports.open}{table}${exports.close} ` + nickName + " {join} {where} {page} {limit} {groupby} {orderby} {order}  ",
                {
                    sentence: sentence,
                    distinct: distinct,
                    selectfinal: selectfinal,
                    joinColumns: joinColumns,
                    table: offTableName,
                    join: join,
                    where: where,
                    groupby: groupby,
                    orderby: orderby,
                    order: order,
                    limite: $limit,
                    page: $page
                }
            );

        var queryCount = params.format(`SELECT count(*) ${exports.open}count${exports.close} FROM ${exports.open}{table}${exports.close} ` + nickName + " {join} {where} {groupby}",
            {
                table: offTableName,
                join: join,
                where: where,
                groupby: groupby
            }
        );
        if (sentence !== "DELETE")
            return await exports.data(queryCount, params, undefined, this.c, this.fields, this.tables).then(async countData => {
                return await exports.data(query, params, {
                    limitvalue: $limitvalue,
                    pagec: $pagec,
                    limit: options.limit
                }, this.c, this.fields, this.tables).then((data) => {
                    if (options.limit !== undefined)
                        if (data.index !== undefined) {
                            data.totalPage = Math.ceil(countData.data[0].count / data.index.limitvalue);
                            data.totalCount = countData.data[0].count;
                            data.currentPage = data.index.pagec;
                        }
                        else
                            data.index = {};
                    else
                        data.index = {};
                    return data;
                });
            });
        else
            return await exports.executeNonQuery(query, params, undefined, this.c, this.fields, this.tables).then((data) => {
                return data;
            });
    };
};