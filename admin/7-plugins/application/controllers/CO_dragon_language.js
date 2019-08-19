app.controller("dragon_language", function ($scope, $http, $compile) {
    dragon_language = this;
    RUNCONTROLLER("dragon_language", dragon_language, $scope, $http, $compile);
    RUN_B("dragon_language", dragon_language, $scope, $http, $compile);
    dragon_language.LANGUAGE = LANGUAGE;
    dragon_language.langText = "";
    dragon_language.sectText = "";
    dragon_language.fieldText = "";
    dragon_language.descText = "";
    dragon_language.addLanguage = function () {
        dragon_language.LANGUAGE[dragon_language.langText] = {};
        dragon_language.langText = "";
        MODAL.close(language);
        SWEETALERT.show({message: "Saved"});
    };
    dragon_language.addsection = function (key) {
        dragon_language.key = key;
        dragon_language.LANGUAGE[dragon_language.key][dragon_language.sectText] = {};
        dragon_language.sectText = "";
        MODAL.close(language);
        SWEETALERT.show({message: "Saved"});
    };
    dragon_language.addfield = function (key1, key2) {
        dragon_language.key1 = key1;
        dragon_language.key2 = key2;
        dragon_language.LANGUAGE[dragon_language.key1][dragon_language.key2][dragon_language.fieldText] = dragon_language.descText;
        dragon_language.fieldText = "";
        dragon_language.descText = "";
        MODAL.close(language);
        SWEETALERT.show({message: "Saved"});
    };
    dragon_language.addfield = function (key1, key2) {
        dragon_language.key1 = key1;
        dragon_language.key2 = key2;
        dragon_language.LANGUAGE[dragon_language.key1][dragon_language.key2][dragon_language.fieldText] = dragon_language.descText;
        dragon_language.fieldText = "";
        dragon_language.descText = "";
        MODAL.close(language);
        SWEETALERT.show({message: "Saved"});
    };
    dragon_language.openmodalLanguage = function () {
        dragon_language.modal.modalView("language/langform", {
            width: 'modal-full',
            header: {
                title: "Add Language",
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    };
    dragon_language.openmodalSection = function (variable) {
        dragon_language.variable = variable;
        dragon_language.modal.modalView("language/sectform", {
            width: 'modal-full',
            header: {
                title: "Add section",
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    };
    dragon_language.openmodalField = function (variable1, variable2) {
        dragon_language.variable1 = variable1;
        dragon_language.variable2 = variable2;
        dragon_language.modal.modalView("language/fieldform", {
            width: 'modal-full',
            header: {
                title: "Add field",
                icon: "ICON.classes.file_excel"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    };
    dragon_language.savelanguage = function () {
        VALIDATION.save(language, function () {
            SWEETALERT.confirm({
                message:
                    MESSAGE.i('alerts.saveConfigSuperLanguage'),
                confirm: function () {
                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
                    DRAGONAPI.ajax.post('dragon/api/saveLanguages', {json: JSON.stringify(dragon_language.LANGUAGE)}, function () {
                        SWEETALERT.loading({message: MESSAGE.ic('mono.restarting')});
                        setTimeout(() => {
                            location.reload();
                        }, 15000);
                    });
                }
            });
        });
    };
});