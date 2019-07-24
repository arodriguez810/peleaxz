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
            var array = [];
            var querys = await params.storage.getItem("dragon_function_query");
            querys = querys.filter((d) => {
                return d.dragon_function == request.id;
            });
            querys.sort(function (a, b) {
                var x = a.num;
                var y = b.num;
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            querys.forEach(async function (query) {
                eval(`module = params.modules.${query.engine};`);
                var result = await module.executeNonQuery(query.query);
                array.push(result);
            });
            return result;
        },
    },
    puts: {},
    deletes: {},
    options: {}
};