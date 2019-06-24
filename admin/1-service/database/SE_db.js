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
        runFunction: async function (request) {
            var functionID = request.id;
            return "gaby";
        },
        generate: async function (request) {

            return {generated: true};
        },
    },
    puts: {},
    deletes: {},
    options: {}
};