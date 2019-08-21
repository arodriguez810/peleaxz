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
            var config = params.CONFIG.users;
            var array = [];
            var querys = await params.storage.getItem("dragon_query");
            querys = querys.filter((d) => {
                return d.function == request.id;
            });
            querys.sort(function (a, b) {
                var x = a.num;
                var y = b.num;
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            for (const query of querys) {
                eval(`module = params.modules.${config.engine};`);
                for (var par in request.params)
                    eval(`var ${par} =request.params[par]`);
                var Query = params.S(query.query).replaceAll("@", "$").s;
                Query = eval("`" + Query + "`");
                var result = await module.executeNonQuery(Query, params);
                array.push(result);
            }
            return array;
        },
    },
    puts: {},
    deletes: {},
    options: {}
};