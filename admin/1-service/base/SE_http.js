var params = {};
exports.run = async function (_params) {
    params = _params;
    params.CONFIG = await params.storage.getItem("configuration") || params.CONFIG;
    if (typeof params.CONFIG === 'string') params.CONFIG = eval("(" + params.CONFIG + ")");
};
exports.api = {
    gets: {},
    posts: {
        comments: async function (request) {
            var response = await params.fetch('https://fast-wildwood-40490.herokuapp.com/api/comments');
            var json = await response.json();
            console.log(json);
            return json;
        },
        blogs: async function (request) {
            const response = await params.fetch('https://fast-wildwood-40490.herokuapp.com/api/blogs');
            const json = await response.json();
            return json;
        },
    },
    puts: {},
    deletes: {},
    options: {}
};