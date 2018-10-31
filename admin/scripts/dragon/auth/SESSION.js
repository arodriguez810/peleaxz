SESSION = {
    current: function () {
        var obj = STORAGE.get("APPSESSION");
        obj.fullName = function () {
            return capitalize(this.name + " " + this.lastname);
        };
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
    redirectToLogin: function () {
        STORAGE.delete("APPSESSION");
    }
};