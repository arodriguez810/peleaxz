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
    gets: {

    },
    posts: {
        login: async function (request) {
            var config = params.CONFIG.users;
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
            ]).then(data => {
                data.query = "[HIDE]";
                if (data.count[0] > 0) {
                    data.data[0].password = "[HIDE]";
                }
                return data;
            });
        }
    },
    puts: {},
    deletes: {},
    options: {}
};