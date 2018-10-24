HTTP = {
    objToQuery: function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
        return str.join("&");
    },
    path: function (pathsarray) {
        var formurl = [];
        formurl.push(`http${CONFIG.ssl ? "s" : ""}://${CONFIG.subdomain !== "" ? (CONFIG.subdomain + ".") : ""}${CONFIG.domain}:${CONFIG.port === 80 ? "" : CONFIG.port}`);
        return formurl.concat(pathsarray).join("/");
    }
};
$(document).ready(function () {

    $(window).bind('hashchange', function () { //detect hash change
        FIXELEMENT.elements = [];
        ANGULARJS.get('baseController').base();
    });
});