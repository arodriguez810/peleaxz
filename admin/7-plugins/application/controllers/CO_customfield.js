app.controller("customfield", function ($scope, $http, $compile) {
        customfield = this;
        RUNCONTROLLER("customfield", customfield, $scope, $http, $compile);
        RUN_B("customfield", customfield, $scope, $http, $compile);

        customfield.triggers.table.after.load = async function (records) {
            customfield.runMagicColum('type', 'fieldtype');
        };
        customfield.triggers.table.after.control = async function (control) {
            if (control === 'parent') {
                if (customfield.form) {
                    var selected = customfield.form.selected('parent');
                    customfield.buildsSubElements(selected);
                }
            }
        };
        customfield.buildsSubElements = async function (selected) {
            if (selected) {
                var elements = selected.elements.split(',');
                if (elements.length > 0) {
                    $("#subelements").html("");
                    for (var element of elements) {
                        var id = DSON.cleanSpace(element);
                        $("#subelements").append(`<div id="${id}"></div>`)
                    }
                    for (var element of elements) {
                        var id = DSON.cleanSpace(element);
                        customfield.control.tags("#" + id, id, {});
                    }
                }
            }
        };
        customfield.formulary = function (data, mode, defaultData) {
            if (customfield !== undefined) {
                RUN_B("customfield", customfield, $scope, $http, $compile);
                customfield.form.readonly = {};
                customfield.selectQueries["parent"] = [
                    {
                        field: "type",
                        operator: "=",
                        value: 3
                    }
                ];
                customfield.createForm(data, mode, defaultData);
                customfield.$scope.$watch('customfield.name', function (value) {
                    var rules = [];
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(customfield, "name", rules);
                });
                customfield.$scope.$watch('customfield.parent', function (value) {
                    if (customfield.form) {
                        if (customfield.form.selected) {
                            var selected = customfield.form.selected('parent');
                            customfield.buildsSubElements(selected);
                        }
                    }
                });
            }
        };
    }
);