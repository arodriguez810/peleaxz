MESSAGE = {
    i: function (section, key) {
        return eval(`LANGUAGE.${CONFIG.language}.${section}.${key}`);
    }
};