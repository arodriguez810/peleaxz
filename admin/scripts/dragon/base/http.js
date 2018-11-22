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
    },
    cleanRoot: function (path) {
        return path.replaceAll(HTTP.path([]), "");
    },
    tagpath: function (pathsarray) {
        var formurl = [];
        pathsarray[0] = "#" + pathsarray[0];
        formurl.push(`http${CONFIG.ssl ? "s" : ""}://${CONFIG.subdomain !== "" ? (CONFIG.subdomain + ".") : ""}${CONFIG.domain}:${CONFIG.port === 80 ? "" : CONFIG.port}`);
        return formurl.concat(pathsarray).join("/");
    },
    redirect: function (path) {
        document.location.href = HTTP.path(path.split('/'));
    },
    redirecttag: function (path) {
        document.location.href = HTTP.tagpath(path.split('/'));
    }
};
$(document).ready(function () {

    $(window).bind('hashchange', function () { //detect hash change
        FIXELEMENT.elements = [];
        ANGULARJS.get('baseController').base();
    });
});