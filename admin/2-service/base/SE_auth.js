//Example
// method: function (request) {
//     var name = params.CONFIG.appName + " " + (request.name || "Nada");
//     return {name: name};
// }
var params = {};
exports.run = function (_params) {
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
            var users = new module.Model(config.model, params);
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

                    data.data[0].super = config.super.indexOf(request.username.toLowerCase()) !== -1;
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
    },
    puts: {},
    deletes: {},
    options: {}
};