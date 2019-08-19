CURRENT = {
    controller: function () {
        return DRAGON.currentModel.modelName;
    },
    url: function () {
        var url = location.href;
        url = url.split("/#");
        if (url.length > 1) {
            url = url[1].split("/");
            if (url.length > 0)
                return url[0];
        }
        return "";
    },
    baseform: {
        isOpen: function () {
            return eval(`${CURRENT.url()}.form`) !== undefined;
        },
        crud: function () {
            return eval(`CRUD_${CURRENT.url()}`);
        },
        key: function () {
            if (!CURRENT.form.crud())
                return undefined;
            return CURRENT.form.crud().table.key;
        },
        value: function () {
            if (!CURRENT.form.crud())
                return undefined;
            return eval(`${CURRENT.url()}.${CURRENT.form.key()}`);
        },
        mode: function () {
            return eval(`${CURRENT.url()}.form.mode`);
        },
    },
    form: {
        isOpen: function () {
            return eval(`${CURRENT.controller()}.form`) !== undefined;
        },
        crud: function () {
            return eval(`CRUD_${CURRENT.controller()}`);
        },
        key: function () {
            if (!CURRENT.form.crud())
                return undefined;
            return CURRENT.form.crud().table.key;
        },
        value: function () {
            if (!CURRENT.form.crud())
                return undefined;
            return eval(`${CURRENT.controller()}.${CURRENT.form.key()}`);
        },
        mode: function () {
            return DRAGON.currentModel.form.mode !== undefined;
        },
    }
};