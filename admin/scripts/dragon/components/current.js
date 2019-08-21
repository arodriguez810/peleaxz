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
            if (eval(`${CURRENT.url()}`))
                if (eval(`${CURRENT.url()}.form`))
                    return eval(`${CURRENT.url()}.form.mode`);
            return undefined;
        },
        getValue: function (row) {
            if (!CURRENT.form.crud())
                return undefined;
            return eval(`row.${CURRENT.form.key()}`);
        }
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
            if (DRAGON.currentModel)
                if (DRAGON.currentModel.form)
                    return DRAGON.currentModel.form.mode || undefined;
            return undefined;
        },
        getValue: function (row) {
            if (!CURRENT.form.crud())
                return undefined;
            return eval(`row.${CURRENT.form.key()}`);
        }
    }
};