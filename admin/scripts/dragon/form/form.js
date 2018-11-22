FORM = {
    modes: {
        new: "new",
        edit: "edit",
        view: "view"
    },
    run: function ($scope, $http) {
        $scope.form = {};
        $scope.form.fileds = [];
        $scope.form.options = {};
        $scope.form.rules = {};
        $scope.form.serverRules = {};
        $scope.form.events = {};
        $scope.form.getOption = function (name, option) {
            var property = eval(`$scope.form.options.${name}.${option}`);
            if (!DSON.oseaX(property))
                return property;
            return "";
        };
        $scope.form.setOption = function (name, option, value) {
            var property = eval(`$scope.form.options.${name}.${option}`);
            if (!DSON.oseaX(property))
                eval(`$scope.form.options.${name}.${option} = ${value}`);
        };
        $scope.form.event = function (name) {
            var func = eval(`$scope.form.events.${name}`);
            if (DSON.iffunction(func)) {
                func();
            }
        };
        $scope.form.registerField = function (name, properties) {
            $scope.form.fileds.push(name);
            eval(`$scope.form.options.${name} = ${properties.replaceAll("&#34;", '"')}`);
        };

        $scope.form.masked = function (name, value) {
            if (!DSON.oseaX(value))
                return $(`[name="${name}"]`).masked(value);
        };

        $scope.form.loadDropDown = function (name) {
            var options = eval(`$scope.form.options.${name}`);
            ANIMATION.loading(`#input${name}`, "", `#icon${name}`, '30');
            eval(`var crud = CRUD_${options.table}`);
            if (crud.table.single)
                options.query.join = crud.table.single;
            BASEAPI.list(options.table, options.query,
                function (info) {
                    if (!DSON.oseaX(options.groupby)) {
                        var newData = {};
                        for (const i in info.data) {
                            var item = info.data[i];
                            var groupbyValue = eval(`item.${options.groupby}`);
                            if (DSON.oseaX(eval(`newData.${groupbyValue}`))) {
                                eval(`newData.${groupbyValue} = [];`);
                            }
                            eval(`newData.${groupbyValue}.push(item)`);
                        }
                        eval(`$scope.form.options.${name}.groupbydata = newData`);
                    }
                    eval(`$scope.form.options.${name}.data = info.data`);

                    ANIMATION.stoploading(`#input${name}`, `#icon${name}`);
                    $('[name="' + name + '"]').select2({
                        placeholder:
                            capitalize('Select ' + eval(`${options.table}.${!options.multiple ? 'singular' : 'plural'}`)),
                        templateSelection: DROPDOWN.iformat,
                        templateResult: DROPDOWN.iformat,
                        allowHtml: true
                    });
                    $('[name="' + name + '"]').on('change', function (e) {
                        $scope.$scope.$digest();
                    });
                    $scope.$scope.$digest();
                });
        };

        $scope.form.loadOutDropDown = function (options,id) {
            ANIMATION.loading(`#input${name}`, "", `#icon${name}`, '30');
            BASEAPI.list(options.table, options.query,
                function (info) {
                    if (!DSON.oseaX(options.groupby)) {
                        var newData = {};
                        for (const i in info.data) {
                            var item = info.data[i];
                            var groupbyValue = eval(`item.${options.groupby}`);
                            if (DSON.oseaX(eval(`newData.${groupbyValue}`))) {
                                eval(`newData.${groupbyValue} = [];`);
                            }
                            eval(`newData.${groupbyValue}.push(item)`);
                        }
                        eval(`options.groupbydata = newData`);
                    }
                    eval(`options.data = info.data`);

                    ANIMATION.stoploading(`#input${name}`, `#icon${name}`);
                    $('[name="' + name + '"]').select2({
                        placeholder:
                            capitalize('Select ' + eval(`${options.table}.${!options.multiple ? 'singular' : 'plural'}`)),
                        templateSelection: DROPDOWN.iformat,
                        templateResult: DROPDOWN.iformat,
                        allowHtml: true
                    });
                    $('[name="' + name + '"]').on('change', function (e) {
                        $scope.$scope.$digest();
                    });
                    $scope.$scope.$digest();
                });
        };
        $scope.form.LabelVisible = function (name) {
            var value = eval("$scope." + name);
            return !DSON.oseaX(value);
        };
        $scope.form.validate = function (validations) {

        };
        $scope.createForm = function (data, mode) {
            $scope.pages.form.beforeOpen = function () {

            };
            $scope.pages.form.onClose = function () {

            };
            $scope.pages.form.close = function (pre, post) {
                if (DSON.iffunction(pre)) pre();
                if ($scope.form.mode === "new") {
                    if ($scope.validation.warningClose())
                        SWEETALERT.confirm({
                            message: "¿You are close to completing the form, are you sure you want to close it?",
                            confirm: function () {
                                MODAL.close($scope);
                                $scope.pages.form.onClose();
                            }
                        });
                    else {
                        MODAL.close($scope);
                        $scope.pages.form.onClose();
                    }
                }
                if (DSON.iffunction(post)) post();
            };


            $scope.pages.form.save = function (pre, post) {

            };

            $scope.pages.form.beforeOpen();
            var icon = "";
            if (mode === FORM.modes.new) icon = "file-plus";
            if (mode === FORM.modes.edit) icon = "pencil7";
            if (mode === FORM.modes.view) icon = "file-eye";
            $scope.form.mode = mode;
            $scope.form.beginFunctions = [];
            $scope.modal.modalView($scope.modelName + '/form', {
                width: ENUM.modal.width.full,
                header: {
                    title: capitalize(`${mode} ${$scope.singular}`),
                    icon: icon,
                    bg: mode !== FORM.modes.view ? TAG.table : `alpha-${TAG.table}`,
                    closeButton: true,
                    h: "h6"
                },
                footer: {
                    cancelButton: false

                },
                event: {
                    show: {
                        begin: function (data) {
                            for (const func of  $scope.form.beginFunctions) {
                                eval(func);
                            }
                        },
                        end: function (data) {

                        }
                    },
                }
            });
        };
    }
};