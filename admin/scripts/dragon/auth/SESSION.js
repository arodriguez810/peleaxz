SESSION = {
    current: function () {
        return STORAGE.get("APPSESSION");
    },
    isLogged: function () {
        return !DSON.oseaX(STORAGE.get("APPSESSION"));
    },
    destroy: function () {
        STORAGE.delete("APPSESSION");
    }
};