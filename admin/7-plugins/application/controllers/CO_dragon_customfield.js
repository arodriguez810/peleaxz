app.controller("dragon_customfield", function ($scope, $http, $compile) {
        dragon_customfield = this;
        RUNCONTROLLER("dragon_customfield", dragon_customfield, $scope, $http, $compile);
        RUN_B("dragon_customfield", dragon_customfield, $scope, $http, $compile);

        dragon_customfield.triggers.table.after.load = async function (records) {
            dragon_customfield.runMagicColum('type', 'dragon_fieldtype');
        };
        dragon_customfield.triggers.table.after.control = async function (control) {
            if (control === 'parent') {
                if (dragon_customfield.form) {
                    var selected = dragon_customfield.form.selected('parent');
                    dragon_customfield.buildsSubElements(selected);
                }
            }
        };
        dragon_customfield.buildsSubElements = async function (selected) {
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
                        dragon_customfield.control.tags("#" + id, id, {});
                    }
                }
            }
        };
        dragon_customfield.formulary = function (data, mode, defaultData) {
            if (dragon_customfield !== undefined) {
                RUN_B("dragon_customfield", dragon_customfield, $scope, $http, $compile);
                dragon_customfield.form.readonly = {};
                dragon_customfield.selectQueries["parent"] = [
                    {
                        field: "type",
                        operator: "=",
                        value: 3
                    }
                ];
                dragon_customfield.createForm(data, mode, defaultData);
                dragon_customfield.$scope.$watch('dragon_customfield.name', function (value) {
                    var rules = [];
                    rules.push(VALIDATION.general.required(value));
                    VALIDATION.validate(dragon_customfield, "name", rules);
                });
                dragon_customfield.$scope.$watch('dragon_customfield.parent', function (value) {
                    if (dragon_customfield.form) {
                        if (dragon_customfield.form.selected) {
                            var selected = dragon_customfield.form.selected('parent');
                            dragon_customfield.buildsSubElements(selected);
                        }
                    }
                });
            }
        };
    }
);