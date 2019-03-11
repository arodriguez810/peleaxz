SESSION = {
    current: function () {
        var obj = STORAGE.get("APPSESSION");
        if (!DSON.oseaX(obj)) {
            for (var i in CONFIG.users.addFields) {
                var calc = CONFIG.users.addFields[i];
                eval(`obj.${i} = function () { return ${calc};}`);
            }
        }
        return obj;
    },
    register: function (data) {
        return STORAGE.add("APPSESSION", data);
    },
    isLogged: function () {
        return !DSON.oseaX(STORAGE.get("APPSESSION"));
    },
    destroy: function () {
        STORAGE.delete("APPSESSION");
    },
    ifLogoffRedirec: function (view) {
        var href = view || location.href;
        if (href.indexOf('auth/login') === -1) {
            if (!SESSION.isLogged()) {
                MODAL.closeAll();
                HTTP.redirecttag('auth/login');
                return true;
            }
        }
        return false;
    },
    logoff: function () {
        SWEETALERT.confirm({
            message: MESSAGE.i('alerts.AYSCloseSession'),
            confirm: function () {
                SESSION.destroy();
                HTTP.redirecttag('auth/login');
            }
        });
    },
    terminated: function () {
        SWEETALERT.show({
            type: ENUM.modal.type.warning,
            title: MESSAGE.ic('mono.session'),
            message: MESSAGE.i('alerts.SessionEnd'),
            confirm: function () {
                MODAL.closeAll();
                SESSION.destroy();
                HTTP.redirecttag('auth/login');
            }
        });
    }
};