SESSION = {
    current: function () {
        var obj = STORAGE.get("APPSESSION");
        if (!DSON.oseaX(obj)) {
            obj.fullName = function () {
                return capitalize(this.name + " " + this.lastname);
            };
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
            message: "¿Are you sure you want to close session?",
            confirm: function () {
                SESSION.destroy();
                HTTP.redirecttag('auth/login');
            }
        });
    }
};