app.controller("language", function ($scope, $http, $compile) {
    language = this;
    language.LANGUAGE = LANGUAGE;
    RUNCONTROLLER("language", language, $scope, $http, $compile);
    RUN_B("language", language, $scope, $http, $compile);
    language.langText = "";
    language.sectText = "";
    language.fieldText = "";
    language.descText = "";
    language.addLanguage = function () {
        language.LANGUAGE[language.langText] = {};
        language.langText = "";
        MODAL.close(language);
        SWEETALERT.show({message: "Saved"});
    };
    language.addsection = function (key) {
        language.key = key;
        language.LANGUAGE[language.key][language.sectText] = {};
        language.sectText = "";
        MODAL.close(language);
        SWEETALERT.show({message: "Saved"});
    };
    language.addfield = function (key1, key2) {
        language.key1 = key1;
        language.key2 = key2;
        language.LANGUAGE[language.key1][language.key2][language.fieldText] = language.descText;
        language.fieldText = "";
        language.descText = "";
        MODAL.close(language);
        SWEETALERT.show({message: "Saved"});
    };
    language.openmodalLanguage = function () {
        language.modal.modalView("language/langform", {
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
    language.openmodalSection = function (variable) {
        language.variable = variable;
        language.modal.modalView("language/sectform", {
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
    language.openmodalField = function (variable1, variable2) {
        language.variable1 = variable1;
        language.variable2 = variable2;
        language.modal.modalView("language/fieldform", {
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
    language.savelanguage = function () {
        SWEETALERT.loading({message: MESSAGE.ic('mono.saving')});
        BASEAPI.deleteall('language', {
            "where": [
                {
                    "value": `language`
                }
            ]
        }, function (deleted) {
            BASEAPI.insert('language', {
                "insertData": {
                    "id": `language`,
                    "object": JSON.stringify(language.LANGUAGE)
                }
            }, function (insert) {
                SWEETALERT.stop();
                SWEETALERT.show({message: "Saved"});
            });
        });
    };
});