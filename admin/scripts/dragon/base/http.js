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
    },
    evaluateTokenHTML: function (data) {
        if (SESSION.isLogged()) {
            if (data.data.apptoken !== undefined) {
                SESSION.terminated();
                return true;
            }
        }
        return false;
    },
    setToken: function ($http) {
        if (SESSION.isLogged())
            $http.defaults.headers.common['x-access-token'] = SESSION.current().token;
    },
    evaluate: function (data) {
        if (STORAGE.exist('warningRequests')) {
            WARNINGREQUESTS = STORAGE.get('warningRequests');
        }
        if (DSON.oseaX(WARNINGREQUESTS))
            WARNINGREQUESTS = [];
        var analize = {
            url: data.config.url,
            method: data.config.method,
            time: data.config.responseTimestamp - data.config.requestTimestamp,
            date: new Date(),
            params: data.config.paramSerializer()
        };
        if (analize.method === "GET") {
            if (analize.time > CONFIG.performance.http.get) {
                WARNINGREQUESTS.push(analize);
            }
        }
        if (analize.method === "POST") {
            if (analize.time > CONFIG.performance.http.post) {
                WARNINGREQUESTS.push(analize);
            }
        }
        STORAGE.add('warningRequests', WARNINGREQUESTS);
        baseController.WARNINGREQUESTS = WARNINGREQUESTS;
    },
    openManager: function () {
        baseController.viewData = {
            staticdata: WARNINGREQUESTS
        };
        var modal = {
            header: {
                title: "Request Manager",
                icon: ICON.classes.stack_text
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        };
        baseController.currentModel.modal.modalView("../templates/components/requestManager", modal);
    },
    resetManager: function () {
        if (WARNINGREQUESTS.length)
            SWEETALERT.confirm({
                message:
                    "This option reset all persisted data for Request Manager system, are you sure?",
                confirm: function () {
                    STORAGE.delete('warningRequests');
                    WARNINGREQUESTS = [];
                    MODAL.close(baseController.currentModel);
                }
            });
        else
            SWEETALERT.show({message: "There is not persisted data to restore in Request Manager."});
    }
};
$(document).ready(function () {
    $(window).bind('hashchange', function () { //detect hash change
        $("body").removeClass("sidebar-mobile-main");
        FIXELEMENT.elements = [];
        ANIMATION.playPure($('#content'), LOAD.outanimation, function () {
            ANGULARJS.get('baseController').base();
        });
    });
});