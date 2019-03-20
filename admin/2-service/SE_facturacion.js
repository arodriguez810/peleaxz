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
        getAppName: async function (request) {
            var name = params.CONFIG.appName + " " + (request.name || "Nada");
            return {name: name};
        }
    },
    posts: {
        post: async function (request) {
            var name = params.CONFIG.appName + " " + (request.name || "Nada");
            return {name: name};
        }
    },
    puts: {},
    deletes: {},
    options: {}
};