exports.getdata = (config, request,params) => new Promise(async (resolve, reject) => {
    var component = {};
    component.method = config.method || "GET";
    if (config.body)
        component.body = JSON.stringify(eval(`\`${config.body}\``));
    if (config.headers)
        component.headers = eval(`\`${config.headers}\``);
    var response = await params.fetch(eval(`\`${config.url}\``), component);
    var json = await response.json();
    resolve(json);
});
exports.last = function (arr) {
    return arr[arr.length - 1];
};
exports.insertQuery = async function (table, data, params, where, index) {

    var records = await params.storage.getItem(table) || [];
    var backup = await params.storage.getItem(table) || [];
    var indexKey = table + "_index";
    var lastIndex = await params.storage.getItem(indexKey) || 1;
    var indexBackup = await params.storage.getItem(indexKey) || 1;
    var entity = eval(`params.CONFIG.storageEntities.${table}`);
    if (!entity)
        entity = eval(`params.CONFIG.appEntities.${table}`);
    var datas = (Array.isArray(data)) ? data : [data];
    try {
        var rowinserting = 1;
        for (var m in datas) {
            var row = datas[m];
            for (var property in row) {
                if (entity.type === 'one' && entity.open !== true) {
                    if (entity.fields.indexOf(property) === -1) {
                        await params.storage.setItem(indexKey, indexBackup);
                        await params.storage.setItem(table, backup);
                        return {
                            query: "",
                            error: {message: `Invalid Property ${property}`, metadata: entity, recordset: datas}
                        };
                    }
                }
                var value = row[property];
                if (row[property][0] === "#")
                    row[property] = params.md5(params.CONFIG.appKey + value.replace('#', ''));
            }
            if (entity.type === 'one') {
                if (entity.key !== undefined) {
                    eval(`row.${entity.key} = lastIndex;`);
                    lastIndex++;
                }
            }
            records.push(row);
            rowinserting++;
        }
        await params.storage.setItem(indexKey, lastIndex);
        await params.storage.setItem(table, records);
        if (where !== undefined) {
            return await exports.data(table, params, where, index);
        }
        return {query: where, error: false, recordset: datas, metadata: entity};
    } catch (e) {
        await params.storage.setItem(indexKey, indexBackup);
        await params.storage.setItem(table, backup);
        return {query: where, error: {message: e, metadata: entity, recordset: datas}};
    }

};
exports.update = async function (table, data, where, params) {

    var wherefinal = where;
    if (Array.isArray(where)) {
        wherefinal = exports.makeWhere(where, params);
    }
    var entity = eval(`params.CONFIG.storageEntities.${table}`);
    if (!entity)
        entity = eval(`params.CONFIG.appEntities.${table}`);
    var records = await params.storage.getItem(table) || [];
    var backup = await params.storage.getItem(table) || [];
    var datas = (Array.isArray(data)) ? data : [data];
    try {
        var updated = [];
        var causeInvalid = false;
        records.forEach(async function (row) {
            datas.forEach(async function (update) {
                if (eval(wherefinal)) {
                    for (var property in update) {
                        if (entity.type === 'one' && entity.open !== true) {
                            if (entity.fields.indexOf(property) === -1) {
                                causeInvalid = property;
                                return;
                            }
                        }
                        console.log(`row.${property} = update.${property}`);
                        eval(`row.${property} = update.${property}`);
                    }
                    updated.push(row);
                }
            });
            if (causeInvalid !== false)
                return;
        });

        if (causeInvalid !== false && entity.open !== true) {
            await params.storage.setItem(table, backup);
            return {
                query: wherefinal,
                error: {message: `Invalid Property ${causeInvalid}`, metadata: entity, recordset: datas}
            };
        }

        await params.storage.setItem(table, records);
        return {query: wherefinal, error: false, recordset: datas, updated: updated, metadata: entity};
    } catch (e) {
        await params.storage.setItem(table, backup);
        return {query: wherefinal, error: {message: e, metadata: entity, recordset: datas}};
    }
};
exports.delete = async function (table, params, where) {

    var wherefinal = where;
    if (Array.isArray(where)) {
        wherefinal = exports.makeWhere(where, params);
    }
    var entity = eval(`params.CONFIG.storageEntities.${table}`);
    if (!entity)
        entity = eval(`params.CONFIG.appEntities.${table}`);
    var records = await params.storage.getItem(table) || [];
    var backup = await params.storage.getItem(table) || [];
    try {
        var deleteds = records.filter(function (row) {
            return eval(wherefinal);
        });
        records = records.filter(function (row) {
            return !eval(wherefinal);
        });

        await params.storage.setItem(table, records);
        return {query: wherefinal, error: false, deleted: deleteds, metadata: entity};
    } catch (e) {
        await params.storage.setItem(table, backup);
        return {query: wherefinal, error: {message: e, metadata: entity, recordset: datas}};
    }
};
exports.truncate = async function (table, params) {

    var entity = eval(`params.CONFIG.storageEntities.${table}`);
    if (!entity)
        entity = eval(`params.CONFIG.appEntities.${table}`);
    var indexKey = table + "_index";
    await params.storage.removeItem(indexKey);
    await params.storage.removeItem(table);
    return true;
};
exports.makeWhere = function (where, params) {
    var whereprepare = [];
    var connectors = [];
    for (var obj of where) {
        var field = obj.field !== undefined ? obj.field : "id";
        var operator = obj.operator !== undefined ? obj.operator : " == ";
        var connector = obj.connector !== undefined ? obj.connector : " && ";
        var open = obj.open !== undefined ? obj.open : "";
        var close = obj.close !== undefined ? obj.close : "";

        if (Array.isArray(obj.value)) {
            operator = obj.operator !== undefined ? obj.operator : "indexOf";
            var menosuno = "!==-1";
            if (operator.indexOf('not') !== -1)
                menosuno = "===-1";
            if (operator.indexOf('null') !== -1)
                whereprepare.push(params.format(open + " (row.{0}===null||row.{0}===undefined) {4} {3}", field, operator, obj.value.join("','"), connector, close));
            else
                whereprepare.push(params.format(open + " ('{2}').{1}(row.{0})" + menosuno + " {4} {3}", field, operator, obj.value.join("','"), connector, close));
            connectors.push(connector);
        } else {
            var addi = "";
            if (isNaN(obj.value)) {
                if (typeof obj.value !== 'object') {
                    if (obj.value !== undefined) {
                        obj.value = obj.value.toLowerCase();
                        addi = ".toLowerCase()";
                    } else {
                        obj.value = "undefined";
                    }
                }
            }
            var condown = true;
            switch (operator) {
                case "=": {
                    operator = "==";
                    break;
                }
                case "!=": {
                    operator = "!=";
                    break;
                }
                case "= '1'": {
                    operator = "== 1";
                    break;
                }
                case "= '0'": {
                    operator = "== 0";
                    break;
                }
                case "LIKE": {
                    condown = false;
                    if (obj.value[0] === '%' && obj.value[obj.value.length - 1] === '%') {
                        obj.value = params.S(obj.value).replaceAll("%", "").s;
                        whereprepare.push(params.format(open + " row.{0}" + addi + ".indexOf({2})!==-1 {4} {3}", field, operator, obj.value[0] === '$' ? obj.value.replace('$', '') : "'" + obj.value + "'", connector, close));
                    }
                    else if (obj.value[0] !== '%' && obj.value[obj.value.length - 1] === '%') {
                        obj.value = params.S(obj.value).replaceAll("%", "").s;
                        whereprepare.push(params.format(open + " params.S(row.{0}" + addi + ").startsWith({2})  {4} {3}", field, operator, obj.value[0] === '$' ? obj.value.replace('$', '') : "'" + obj.value + "'", connector, close));
                    } else {
                        obj.value = params.S(obj.value).replaceAll("%", "").s;
                        whereprepare.push(params.format(open + " params.S(row.{0}" + addi + ").endsWith({2})  {4} {3}", field, operator, obj.value[0] === '$' ? obj.value.replace('$', '') : "'" + obj.value + "'", connector, close));
                    }
                    break;
                }
                case "NOT LIKE": {
                    condown = false;
                    if (obj.value[0] === '%' && obj.value[obj.value.length - 1] === '%') {
                        obj.value = params.S(obj.value).replaceAll("%", "").s;
                        whereprepare.push(params.format(open + " row.{0}" + addi + ".indexOf({2})===-1 {4} {3}", field, operator, obj.value[0] === '$' ? obj.value.replace('$', '') : "'" + obj.value + "'", connector, close));
                    } else if (obj.value[0] !== '%' && obj.value[obj.value.length - 1] === '%') {
                        obj.value = params.S(obj.value).replaceAll("%", "").s;
                        whereprepare.push(params.format(open + " !params.S(row.{0}" + addi + ").startsWith({2})  {4} {3}", field, operator, obj.value[0] === '$' ? obj.value.replace('$', '') : "'" + obj.value + "'", connector, close));
                    } else {
                        obj.value = params.S(obj.value).replaceAll("%", "").s;
                        whereprepare.push(params.format(open + " !params.S(row.{0}" + addi + ").endsWith({2})  {4} {3}", field, operator, obj.value[0] === '$' ? obj.value.replace('$', '') : "'" + obj.value + "'", connector, close));
                    }
                    break;
                }
            }
            if (condown)
                whereprepare.push(params.format(open + " row.{0}" + addi + " {1} {2} {4} {3}", field, operator, obj.value[0] === '$' ? obj.value.replace('$', '') : "'" + obj.value + "'", connector, close));
            connectors.push(connector);
        }
    }

    whereprepare = whereprepare.join(" ") + "<<**>>";
    for (var i in connectors) {
        var strtoreplace = connectors[i] + "<<**>>";
        whereprepare = params.S(whereprepare).replaceAll(strtoreplace, "").s;
    }
    console.log(whereprepare.pxz);
    return whereprepare;
};
exports.sortByKey = function (array, key, order) {
    return array.sort(function (a, b) {
        var x = a[key];
        var y = b[key];
        if (order === 'asc')
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        else
            return ((x < y) ? -1 : ((x > y) ? 1 : 0)) * -1;
    });
};
exports.data = async function (table, params, where, index) {


    var wherefinal = where;

    if (Array.isArray(where)) {
        if (where.length > 0) {

            wherefinal = exports.makeWhere(where, params);
        }
        else
            wherefinal = '';
    }
    if (wherefinal !== undefined)
        wherefinal = wherefinal.replace('AND', '&&').replace('OR', '||');
    var entity = eval(`params.CONFIG.storageEntities.${table}`);
    if (!entity)
        entity = eval(`params.CONFIG.appEntities.${table}`);


    if (entity.type === "endpoint") {
        var records = await params.storage.getItem(table) || [];

        if (records.length === 0) {
            var response = await exports.getdata(eval(`params.ENDPOINTS.${entity.methods.list}`), index,params);
            await params.storage.setItem(table, eval(`${entity.object}`), {ttl: entity.expire * 60000});
            records = eval(`${entity.object}`);
        }
        try {
            if (wherefinal !== '' && wherefinal !== undefined) {
                records = records.filter(function (row) {
                    return eval(wherefinal);
                });
            }
            if (index.order !== undefined) {
                if (index.orderby !== undefined) {
                    records = exports.sortByKey(records, index.orderby, index.order);
                }
            }
            var count = records.length;
            if (index.limit !== undefined) {
                if (index.page !== undefined) {
                    records = records.slice((index.page - 1) * (index.limit), index.limit * index.page);
                }
            }


            return {
                query: wherefinal,
                error: false,
                data: records,
                count: count,
                index: {limitvalue: index.limit, pagec: index.page, limit: index.limit},
                totalPage: Math.ceil(count / index.limit),
                totalCount: count,
                currentPage: index.page,
                metadata: entity
            };
        } catch (e) {
            return {query: wherefinal, error: e, recordset: [], metadata: entity};
        }

    } else {
        var indexKey = table + "_index";
        var lastID = await params.storage.getItem(indexKey) || 1;
        lastID = lastID - 1;
        var records = await params.storage.getItem(table) || [];
        try {

            if (wherefinal !== '' && wherefinal !== undefined) {
                records = records.filter(function (row) {
                    return eval(wherefinal);
                });
            }

            if (index.order !== undefined) {
                if (index.orderby !== undefined) {
                    records = exports.sortByKey(records, index.orderby, index.order);
                }
            }

            var count = records.length;
            if (index.limit !== undefined) {
                if (index.page !== undefined) {
                    records = records.slice((index.page - 1) * (index.limit), index.limit * index.page);
                }
            }


            return {
                query: wherefinal,
                error: false,
                data: records,
                count: count,
                index: {limitvalue: index.limit, pagec: index.page, limit: index.limit},
                totalPage: Math.ceil(count / index.limit),
                totalCount: count,
                currentPage: index.page,
                metadata: entity
            };
        } catch (e) {
            return {query: wherefinal, error: e, recordset: [], metadata: entity};
        }
    }
};
exports.defaultRequests = function (Model, params, folder) {
    params.modelName = Model.tableName;
    params.fs.readdir(params.util.format('./' + (folder || params.folders.views) + '/%s', params.modelName), function (err, files) {
        params.modules.views.LoadEJSDragon(files, params, folder);
    });
    params.app.post('/api/st_list', function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
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

            if (req.query.limit === undefined)
                req.query.limit = 10;
            if (req.query.page === undefined)
                req.query.page = 1;
            if (req.query.orderby === undefined)
                req.query.orderby = "id";

            Model.data(req.body).then((data) => {
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

            Model.data(req.query).then((data) => {
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
            }).catch(err => {
                res.json(err);
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
            if (req.body.limit === undefined)
                req.body.limit = 99999999;
            if (req.body.page === undefined)
                req.body.page = 1;
            if (req.body.orderby === undefined)
                req.body.orderby = "id";

            Model.insertID(req.body).then((data) => {
                if (data.error !== false) res.send(data.error);
                res.json(data);
            }).catch(err => {
                res.json(err);
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
    params.app.post('/api/' + Model.tableName + '/truncate', function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            Model.truncate().then((data) => {
                if (data.error !== false) res.send(data.error);
                res.json(data);
            }).catch(err => {
                res.json(err);
            });
        }).catch(function () {

        });
    });
};
exports.Model = function (tableName, params) {

    this.tableName = tableName;
    this.config = params.config;
    this.data = async function (options) {
        return await exports.data(this.tableName, params, options.where, options).then(result => {
            return result;
        });
    };
    this.delete = async function (options) {
        var where = options.where || options;
        return await exports.delete(this.tableName, params, where).then(result => {
            return result;
        });
    };
    this.truncate = async function () {
        return await exports.truncate(this.tableName, params).then(result => {
            return result;
        });
    };
    this.find = async function (id) {
        var where = `row.id==${id}`;
        return await exports.data(this.tableName, params, where).then(result => {
            return result;
        });
    };
    this.insert = async function (options) {
        var toInsert = {};
        if (options.insertData !== undefined)
            toInsert = options.insertData;
        else if (options.data !== undefined)
            toInsert = options.data;
        else
            toInsert = options;
        return await exports.insertQuery(this.tableName, toInsert, params).then(result => {
            return result;
        });
    };
    this.insertID = async function (options) {
        if (options.insertData !== undefined)
            options.data = options.insertData;
        options.where = "row.id==lastID";
        return await exports.insertQuery(this.tableName, options.data, params, options.where, options).then(result => {
            return result;
        });
    };
    this.update = async function (options) {
        var data = {};
        if (options.data === undefined) {
            for (var i in options)
                if (i !== "where")
                    eval(`data.${i} = options[i];`);
        } else {
            data = options.data;
        }
        return await exports.update(this.tableName, data, options.where, params).then(result => {
            return result;
        });
    };

};