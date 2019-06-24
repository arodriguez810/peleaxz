MESSAGE = {
    missingLanguage: {},
    OPEN: function () {
        baseController.viewData = {
            staticdata: MESSAGE.missingLanguage
        };
        var modal = {
            header: {
                title: "Missing Messages",
                icon: "stack-text"
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        };
        baseController.currentModel.modal.modalView("../templates/components/messageManager", modal);
    },
    register: function (lan, folder, key) {
        if (MESSAGE.missingLanguage[lan + '-' + folder] === undefined) {
            MESSAGE.missingLanguage[lan + '-' + folder] = {lan: "en", folder: folder, messages: []};
            MESSAGE.missingLanguage[lan + '-' + folder].messages.push(key);
        }
        else {
            if (!ARRAY.contains(MESSAGE.missingLanguage[lan + '-' + folder].messages, key))
                MESSAGE.missingLanguage[lan + '-' + folder].messages.push(key);
        }
    },
    characterize: function (str) {
        var charac = [];
        var newstr = str;
        charac["@ENTER@"] = "<br>";
        charac["@SPACE@"] = " ";
        charac["@MINUS@"] = "<";
        charac["@MAYOR@"] = ">";
        charac["@QUOTE@"] = "'";
        charac["@DOBLEQUOTE@"] = "\"";
        for (var i in charac) {
            newstr = newstr.replaceAll(i, charac[i]);
        }
        return newstr;
    },
    i: function (key, defaulttext) {
        var lan = STORAGE.get('LANGUAGE') || CONFIG.language;
        var toreturn = key;
        if (MESSAGE.exist(key)) {
            return MESSAGE.characterize(eval(`LANGUAGE.${lan}.${key}`));
        } else {
            for (var i in LANGUAGE) {
                if (MESSAGE.existOther(key, i)) {
                    if (CONFIG.mode === "developer") {
                        var strict = key.split('.');
                        if (strict.length > 1)
                            MESSAGE.register(lan, strict[0], strict[1]);
                        else {
                            SWEETALERT.show(`The langage key ${key} don't have folder, please change`);
                        }
                    }
                    return MESSAGE.characterize(eval(`LANGUAGE.${i}.${key}`));
                }
            }
            if (CONFIG.mode === "developer") {
                var strict = key.split('.');
                if (strict.length > 1)
                    MESSAGE.register(lan, strict[0], strict[1]);
                else {
                    SWEETALERT.show({message: `The langage key ${key} don't have folder, please change`});
                }
            }
            return defaulttext || `[${lan}.${key}]`;
        }
    },
    ieval: function (key, vars) {
        for (var i in vars) {
            eval(`var ${i} =vars[i]`);
        }
        return eval("`" + MESSAGE.i(key) + "`");
    },
    ic: function (key, defaulttext) {
        return capitalize(MESSAGE.i(key, defaulttext));
    },
    ispace: function (key, defaulttext) {
        return MESSAGE.i(key.replaceAll(' ', ''), defaulttext);
    },
    icspace: function (key, defaulttext) {
        return MESSAGE.ic(key.replaceAll(' ', ''), defaulttext);
    },
    exist: function (key) {
        var lan = STORAGE.get('LANGUAGE') || CONFIG.language;
        if (!eval(`LANGUAGE.${lan}.hasOwnProperty('${key.split('.')[0]}')`))
            return false;
        var exist = eval(`LANGUAGE.${lan}.${key.split('.')[0]}.hasOwnProperty('${key.split('.')[1]}')`);
        if (!exist) {
            MESSAGE.register(lan, key.split('.')[0], key.split('.')[1]);
        }
        return exist;
    },
    existOther: function (key, lan) {
        if (!eval(`LANGUAGE.${lan}.hasOwnProperty('${key.split('.')[0]}')`))
            return false;
        return eval(`LANGUAGE.${lan}.${key.split('.')[0]}.hasOwnProperty('${key.split('.')[1]}')`);
    },
    current: function () {
        return SHOWLANGS.filter(function (lang) {
            return lang.code === (STORAGE.get('LANGUAGE') || CONFIG.language);
        })[0];
    },
    select: function (code) {
        return SHOWLANGS.filter(function (lang) {
            return lang.code === code;
        })[0];
    },
    change: function (lang) {
        SWEETALERT.confirm({
            type: ENUM.modal.type.warning,
            title: "Language",
            message: MESSAGE.ieval('alerts.ChangeLanguage', {lang: lang}),
            confirm: function () {
                STORAGE.add('LANGUAGE', lang.code);
                location.reload();
            }
        });
    },
    run: function () {
        $('[dragonlanguage]').each(function () {
            $me = $(this);
            if (!DSON.oseaX($me.attr('title')))
                if ($me.attr('title').indexOf('MESSAGE.') !== -1)
                    $me.attr('title', eval($me.attr('title')));
            if (!DSON.oseaX($me.attr('placeholder')))
                if ($me.attr('placeholder').indexOf('MESSAGE.') !== -1)
                    $me.attr('placeholder', eval($me.attr('placeholder')));

            if (!DSON.oseaX($me.attr('data-original-title')))
                if ($me.attr('data-original-title').indexOf('MESSAGE.') !== -1)
                    $me.attr('data-original-title', eval($me.attr('data-original-title')));
            if (!DSON.oseaX($me.attr('value')))
                if ($me.attr('value').indexOf('MESSAGE.') !== -1)
                    $me.attr('value', eval($me.attr('value')));
            $me.find('language').each(function () {
                if ($(this).html().indexOf('MESSAGE.') !== -1) {
                    $(this).html(eval($(this).html()));
                }
            });
            $me.removeAttr('dragonlanguage');
        });
    }
};
