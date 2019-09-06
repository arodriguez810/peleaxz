//Example
// method: function (request) {
//     var name = params.CONFIG.appName + " " + (request.name || "Nada");
//     return {name: name};
// }
var params = {};
exports.run = async function (_params) {
    params = _params;

};
exports.api = {
    gets: {},
    posts: {
        login: async function (request) {
            var config = params.CONFIG.users;
            var key = `${config.engine}-${request.username}`;
            var attemps = await params.storage.getItem(key);
            if (attemps >= config.attempts) {
                return {error: "Account is Locked"};
            }
            eval(`module = params.modules.${config.engine};`);
            var sendPassword = request.password;
            sendPassword = params.md5(params.CONFIG.appKey + sendPassword);
            var users = null;
            if (config.engine === "oracle") {
                myfields = [];
                dbfields = await module.dataNoShow(`select COLUMN_NAME as "column",DATA_TYPE as "type" from all_tab_columns where TABLE_NAME='${config.model}'`, params, false);
                dbfields.data.forEach((field) => {
                    myfields.push(field.column);
                });
                users = new module.Model(config.model, params, myfields);
            } else {
                users = new module.Model(config.model, params);
            }

            return await users.where([
                {
                    field: config.fields.username,
                    value: request.username
                },
                {
                    field: config.fields.password,
                    value: sendPassword
                }
            ]).then(async data => {
                data.query = "[HIDE]";
                if (data.count[0] > 0) {
                    await params.storage.removeItem(key);
                    eval(`data.data[0].${config.fields.password} = "[HIDE]"`);
                    if (params.CONFIG.features.onesignal)
                        var APPID = await params.storage.getItem('onesignalAPPID') || 0;
                    if (APPID !== params.CONFIG.onesignal.app.appId) {
                        await params.storage.removeItem("onesignalUsers");
                        await params.storage.setItem("onesignalAPPID", params.CONFIG.onesignal.app.appId);
                    }
                    if (request.playerID !== null) {
                        var onesignalUsers = await params.storage.getItem('onesignalUsers') || [];
                        var exist = false;
                        var players = [];
                        onesignalUsers.forEach(function (row) {
                            if (row.id == eval(`data.data[0].${config.fields.id}`)) {
                                if (row.players.indexOf(request.playerID) === -1) {
                                    row.players.push(request.playerID);
                                }
                                exist = true;
                                players = row.players;
                            } else {
                                if (row.players.indexOf(request.playerID) !== -1) {
                                    var index = row.players.indexOf(request.playerID);
                                    if (index > -1)
                                        row.players.splice(index, 1);
                                }
                            }
                        });
                        if (!exist) {
                            onesignalUsers.push({
                                id: eval(`data.data[0].${config.fields.id}`),
                                data: data.data[0],
                                players: [request.playerID]
                            });
                            players = [request.playerID];
                        }
                        await params.storage.setItem('onesignalUsers', onesignalUsers);
                        data.data[0].players = players;
                    }

                    data.data[0].ip = await params.publicIp.v4();
                    data.data[0].super = config.super.indexOf(request.username.toLowerCase()) !== -1;

                    data.data[0].groups = [];
                    data.data[0].onlygroups = [];
                    data.data[0].homePage = undefined;
                    for (var term of params.CONFIG.permissions.terms) {
                        var groups = await params.storage.getItem(term.name) || [];
                        var user_groups = await params.storage.getItem(term.relation) || [];
                        user_groups = user_groups.filter((user_group) => {
                            return user_group.user == eval(`data.data[0].${config.fields.id}`);
                        });
                        data.data[0].groupadmin = false;
                        user_groups.forEach((ug) => {
                            var group = groups.filter((g) => {
                                return g.id == eval(`ug.${term.name}`);
                            });
                            if (group.length > 0) {
                                ug.groupinfo = group[0];
                                if (group[0].isAdmin == "1")
                                    data.data[0].groupadmin = true;
                                data.data[0].homePage = group[0].homePage;
                            }
                        });
                        for (var x of user_groups)
                            data.data[0].groups.push(x);
                        var groups = [];
                        for (var item of user_groups) {
                            groups.push(`${term.name}-${item[term.name]}`);
                        }
                        for (var w of groups)
                            data.data[0].onlygroups.push(w);
                    }
                    if (config.fields.profile !== undefined) {
                        var groups = await params.storage.getItem(config.fields.profile.table) || [];
                        if (!data.data[0].groupadmin)
                            data.data[0].groupadmin = false;
                        var group = groups.filter((g) => {
                            return g.id == eval(`data.data[0].${config.fields.profile.key}`);
                        });
                        if (group.length > 0) {
                            if (group[0].isAdmin == "1")
                                data.data[0].groupadmin = true;
                            data.data[0].homePage = group[0].homePage;
                            data.data[0].groups.push(group[0]);
                            data.data[0].onlygroups.push(`${config.fields.profile.table}-${group[0].id}`);
                        }
                    }
                    data.data[0].token = params.jwt.sign(
                        {
                            username: eval(`data.data[0].${config.fields.username}`),
                        },
                        params.CONFIG.appKey,
                        {
                            expiresIn: config.expire
                        }
                    );

                } else {
                    data.attemps = ((attemps || 0) + 1);
                    await params.storage.setItem(`${config.engine}-${request.username}`, data.attemps, {ttl: config.unlockTime * 60000});
                }
                return data;
            });
        },
        ip: async function (request) {
            return {ip: await params.publicIp.v4()};
        },
        md5: async function (request) {
            var mdf5 = params.md5(params.CONFIG.appKey + request.value);
            return {md5: mdf5};
        },
        matchtoken: async function (request) {
            var config = params.CONFIG.users;
            var user = false;
            eval(`module = params.modules.${config.engine};`);
            var users = new module.Model(config.model, params);
            return await users.where({field: "$1", value: "$1"}).then(result => {
                for (var usr of result.data) {
                    var date = new Date();
                    var generate = `${date.getFullYear()}${date.getMonth()}${date.getDay()}${usr[config.fields.id]}`;
                    var mdf5 = params.md5(params.CONFIG.appKey + generate);
                    if (mdf5 === request.restore) {
                        user = usr;
                        break;
                    }
                }
                return {user: user};
            }).catch(err => {
                console.log(err);
                return {user: user};
            });
        },
        changePassword: async function (request) {
            var config = params.CONFIG.users;
            eval(`module = params.modules.${config.engine};`);
            var users = new module.Model(config.model, params);
            return await users.where({field: "$1", value: "$1"}).then(async result => {
                for (var usr of result.data) {
                    var date = new Date();
                    var generate = `${date.getFullYear()}${date.getMonth()}${date.getDay()}${usr[config.fields.id]}`;
                    var mdf5 = params.md5(params.CONFIG.appKey + generate);
                    if (mdf5 === request.restore) {
                        user = usr;
                        var newpassword = params.md5(params.CONFIG.appKey + request.newpassword);
                        return await users.update({
                            password: newpassword,
                            where: [{field: config.fields.id, value: usr[config.fields.id]}]
                        }).then(upda => {
                            return {success: true};
                        });
                        break;
                    }
                }
                return {success: false};
            }).catch(err => {
                console.log(err);
                return {success: false};
            });
        },
    },
    puts: {},
    deletes: {},
    options: {}
};