SESSION = function () {
    this.myprofile = function () {
        //MENUMODAL = true;
        DRAGON.modal.edit(this.current().path ? this.current().path() : CONFIG.users.path, this.current().getID());
    };
    this.current = function () {
        var obj = STORAGE.get("APPSESSION");
        if (!DSON.oseaX(obj)) {
            for (var i in CONFIG.users.addFields) {
                var calc = CONFIG.users.addFields[i];
                eval(`obj.${i} = function () { return ${calc.replaceAll("&#34;", '"').replaceAll("&#39;", "'")};}`);
            }
        }
        return obj;
    };
    this.prepare = (user) => new Promise(async (resolve, reject) => {
        var User = new SESSION().runFunction(user);
        if (User) {
            User.image = await new SESSION().getProfileImage(User.getID());
            if (User.image) {
                if (User.image.length > 0)
                    User.image = User.image[0].url;
            }
            resolve(User);
        }
        resolve(undefined);
    });
    this.update = function (obj) {
        var session = STORAGE.get("APPSESSION");
        if (session) {
            for (var i in obj)
                session[i] = obj[i];
            STORAGE.add("APPSESSION", session);
        }
        return session;
    };
    this.profileImage = async function () {
        if (this.isLogged())
            return await FILE.serverp(`${this.current().path ? this.current().path() : CONFIG.users.path}/profileimage/${this.current().getID()}`, "assets/images/placeholder.jpg", "no");
        return null;
    };
    this.getProfileImage = async function (id) {
        if (this.isLogged())
            return await FILE.serverp(`${this.current().path ? this.current().path() : CONFIG.users.path}/profileimage/${id}`, "assets/images/placeholder.jpg", "no");
        return null;
    };
    this.runFunction = function (obj) {
        if (!DSON.oseaX(obj)) {
            for (var i in CONFIG.users.addFields) {
                var calc = CONFIG.users.addFields[i];
                eval(`obj.${i} = function () { return ${calc.replaceAll("&#34;", '"').replaceAll("&#39;", "'")};}`);
            }
        }
        return obj;
    };
    this.register = function (data) {
        STORAGE.add("APPSESSION", data);
        if (CONFIG.features.user_interactive)
            SOCKETS.tunel({channel: "login", data: data});
    };
    this.isLogged = function () {
        return !DSON.oseaX(STORAGE.get("APPSESSION"));
    };
    this.destroy = function () {
        STORAGE.delete("APPSESSION");
    };
    this.ifLogoffRedirec = function (view) {
        var href = view || location.href;

        if (href.indexOf('auth/login') === -1) {
            if (href.indexOf('auth/forgot') === -1) {
                if (href.indexOf('auth/restore') === -1) {
                    if (!this.isLogged()) {
                        MODAL.closeAll();
                        var http = new HTTP();
                        http.redirecttag('auth/login');
                        return true;
                    }
                }
            }
        }
        return false;
    };
    this.logoff = function () {
        SWEETALERT.confirm({
            message: MESSAGE.i('alerts.AYSCloseSession'),
            confirm: function () {
                if (CONFIG.features.user_interactive)
                    SOCKETS.tunel({channel: "logoff", data: new SESSION().current()});
                new SESSION().destroy();
                location.reload();
            }
        });
    };
    this.terminated = function () {
        SWEETALERT.show({
            type: ENUM.modal.type.warning,
            title: MESSAGE.ic('mono.session'),
            message: MESSAGE.i('alerts.SessionEnd'),
            confirm: function () {
                MODAL.closeAll();
                new SESSION().destroy();
                location.reload();
            }
        });
    }
};