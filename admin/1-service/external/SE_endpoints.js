//Example
// method: function (request) {
//     var name = params.CONFIG.appName + " " + (request.name || "Nada");
//     return {name: name};
// }
var params = {};
exports.api = {
    gets: {},
    posts: {},
    puts: {},
    deletes: {},
    options: {}
};


exports.run = async function (_params) {
    params = _params;

};

exports.extra = function () {
    var functions = "";
    for (var ep in params.ENDPOINTS) {
        var endpoint = params.ENDPOINTS[ep];
        for (var m in endpoint) {
            var method = endpoint[m];
            functions += (`${ep}_${m}: async function (request) {
                return await getdata(${JSON.stringify(method)},request);
            },`);
        }
    }
    eval(`exports.api = {
    gets: {},
    posts: {${functions}},
    puts: {},
    deletes: {},
    options: {}
    };`)
};

getdata = (config, request) => new Promise(async (resolve, reject) => {
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
