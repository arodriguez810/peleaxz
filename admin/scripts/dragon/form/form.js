FORM = {
    modes: {
        new: "new",
        edit: "edit",
        view: "view"
    },
    schemasType: {
        upload: "upload",
        selectMultiple: "selectMultiple",
        relation: "relation",
        calculated: "calculated",
        time: "time",
        date: "date",
        datetime: "datetime",
        decimal: "decimal",
        location: "location"
    },
    run: function ($scope, $http) {
        $scope.form = {};
        $scope.form.hasChanged = false;
        $scope.open = {};
        $scope.pages = {};
        $scope.open.default = {};
        $scope.form.readonly = {};
        $scope.form.fileds = [];
        $scope.form.options = {};
        $scope.form.rules = {};
        $scope.form.schemas = {
            insert: {},
            update: {},
            delete: {},
            select: {}
        };
        $scope.form.inserting = null;
        $scope.form.updating = null;
        $scope.form.deleting = null;
        $scope.form.uploading = [];
        $scope.form.relations = [];
        $scope.form.multipleRelations = [];
        $scope.form.serverRules = {};
        $scope.form.events = {};
        $scope.form.pages = {};
        $scope.pages.form = {};
        $scope.form.lastPrepare = {};
        $scope.form.beginFunctions = [];
        $scope.form.isReadOnly = function (name) {
            if ($scope.form.readonly !== undefined) {
                if ($scope.form.readonly.hasOwnProperty(name)) {
                    return eval(`$scope.form.readonly.${name}`);
                }
            }
            return false;
        };
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
        $scope.form.registerField = function (name, properties, alterval) {
            $scope.form.fileds.push(name);
            eval(`$scope.form.options.${name} = ${properties.replaceAll("&#34;", '"')}`);
            if ($scope.form.mode === FORM.modes.new) {
                eval(`$scope.${name}=${alterval || 'null'};`);
            } else {
                if ($scope.open.default.hasOwnProperty(name)) {
                    var dvalue = eval(`$scope.open.default.${name}`);
                    if (dvalue !== 'null' && dvalue !== undefined) {
                        var hasRule = eval(`$scope.form.schemas.select.${name}`);
                        if (hasRule !== undefined) {
                            dvalue = $scope.form.runSelectRule(name, dvalue, hasRule, eval(`$scope.form.options.${name}`));
                        }
                        eval(`$scope.${name} = dvalue;`);
                        $('[name="' + $scope.modelName + "_" + name + '"]').val(dvalue);
                    }
                }
            }
        };
        $scope.form.runSelectRule = function (name, value, rule, properties) {
            switch (rule) {
                case FORM.schemasType.datetime: {
                    var newValue = value.replace('Z', '');
                    if (DSON.oseaX(newValue))
                        return '';
                    var date = new Date(newValue);
                    if (properties.datepicker === false) {
                        eval(`$scope.${name}_DragonClean = moment(date).format("HH:mm")`);
                    } else if (properties.timepicker === false) {
                        eval(`$scope.${name}_DragonClean = moment(date).format("YYYY-MM-DD")`);
                    } else {
                        eval(`$scope.${name}_DragonClean = moment(date).format("YYYY-MM-DD HH:mm a")`);
                    }
                    newValue = moment(date).format(properties.callformat);
                    return newValue;
                }
                case FORM.schemasType.decimal: {
                    var newValue = value;
                    if (DSON.oseaX(newValue))
                        return newValue;
                    newValue = Number(newValue).toFixed(2);
                    return newValue;
                }
                case FORM.schemasType.location: {
                    var newValue = value;
                    if (DSON.oseaX(newValue))
                        return newValue;
                    var info = newValue.split(';');
                    eval(`$scope.${name}_DragonLat = info[0];`);
                    eval(`$scope.${name}_DragonLon = info[1];`);
                    eval(`$scope.${name}_DragonAddress = info[2];`);

                    $('[name="' + name + '_DragonLat"]').val(info[0]);
                    $('[name="' + name + '_DragonLon"]').val(info[1]);
                    $('[name="' + name + '_DragonAddress"]').val(info[2]);
                    $('[name="' + name + '_DragonAddressFilter"]').typeahead('val', info[2]);
                    return newValue;
                }
            }
        };
        $scope.form.pushInsert = function (name) {
            if ($scope.form.fileds.indexOf(name) !== -1) {
                var finalValue = eval(`$scope.${name}`);
                if (finalValue !== undefined)
                    if (finalValue != null && finalValue !== undefined && finalValue !== '[NULL]') {
                        if ($scope.form.fileds.indexOf(name + '_DragonClean') !== -1) {
                            finalValue = eval(`$scope.${name}_DragonClean`);
                        }
                        eval(`$scope.form.lastPrepare.${name} = '${finalValue}'`);
                    }
            }
        };
        $scope.form.saveAction = function () {
            $scope.form.hasChanged = true;
            $scope.form.makeInsert();
            SWEETALERT.loading({message: `Saving...`});
            if ($scope.form.mode === FORM.modes.new) {
                $scope.insertID($scope.form.inserting, $scope.form.fieldExGET, $scope.form.valueExGET, function (result) {
                    if (result.data.error === false) {
                        SWEETALERT.loading({message: `Preparing files and relations...`});
                        var savedRow = result.data.data[0];
                        var firstColumn = $scope.table.crud.table.key || "id";
                        var DRAGONID = eval(`savedRow.${firstColumn}`);
                        $scope.form.mode = FORM.modes.edit;
                        $scope.pages.form.subRequestCompleteVar = 0;
                        $scope.pages.form.subRequestCompleteProgress = 0;
                        $scope.pages.form.subRequestCompleteVar =
                            ($scope.form.uploading.length > 0 ? 1 : 0)
                            + $scope.form.multipleRelations.length
                            + $scope.form.relations.length;

                        if ($scope.pages.form.subRequestCompleteVar === 0) {
                            $scope.pages.form.close();
                            SWEETALERT.stop();
                        }
                        if ($scope.form.uploading !== undefined)
                            if ($scope.form.uploading.length > 0) {
                                for (var file of $scope.form.uploading)
                                    file.to = file.to.replace('$id', DRAGONID);
                                BASEAPI.ajax.post(HTTP.path(["files", "api", "move"]), {moves: $scope.form.uploading}, function (data) {
                                    $scope.pages.form.subRequestComplete();
                                });
                            }
                        if ($scope.form.relations !== undefined)
                            if ($scope.form.relations.length > 0) {
                                for (var relation of $scope.form.relations) {
                                    for (var frel of relation.data) {
                                        for (var i in frel) {
                                            var vi = frel[i].replace('$id', DRAGONID);
                                            eval(`frel.${i} = vi`);
                                        }
                                    }
                                    BASEAPI.insert(relation.config.toTable, relation.data, function (data) {
                                        $scope.pages.form.subRequestComplete();
                                    });
                                }
                            }
                        if ($scope.form.multipleRelations !== undefined)
                            if ($scope.form.multipleRelations.length > 0) {
                                for (var relation of $scope.form.multipleRelations) {
                                    var dataToUpdate = {};
                                    var dataToWhere = [];
                                    for (var frel of relation.config.where) {
                                        for (var i in frel) {
                                            var vi = frel[i].replace('$id', relation.tempID);
                                            eval(`frel.${i} = vi`);
                                        }
                                        dataToWhere.push(frel);
                                    }

                                    for (var i in relation.config.update) {
                                        var vi = relation.config.update[i].replace('$id', DRAGONID);
                                        eval(`dataToUpdate.${i} = vi`);
                                    }
                                    dataToUpdate.where = dataToWhere;
                                    BASEAPI.updateall(relation.config.toTable, dataToUpdate, function (udata) {
                                        $scope.pages.form.subRequestComplete();
                                    });
                                }
                            }
                    } else {
                        SWEETALERT.stop();
                        ERROR.alert(result.data, ERROR.category.database);
                    }
                });
            }
            if ($scope.form.mode === FORM.modes.edit) {
                var firstColumn = $scope.table.crud.table.key || "id";
                var dataToWhere = [{field: firstColumn, value: eval(`$scope.${firstColumn}`)}];
                var dataToUpdate = $scope.form.inserting;
                dataToUpdate.where = dataToWhere;
                BASEAPI.updateall($scope.modelName, dataToUpdate, function (result) {
                    if (result.data.error === false) {
                        SWEETALERT.loading({message: `Preparing files and relations...`});
                        var firstColumn = $scope.table.crud.table.key || "id";
                        var DRAGONID = eval(`$scope.${firstColumn}`);
                        $scope.form.mode = FORM.modes.edit;
                        $scope.pages.form.subRequestCompleteVar = 0;
                        $scope.pages.form.subRequestCompleteProgress = 0;
                        $scope.pages.form.subRequestCompleteVar = $scope.form.relations.length;
                        if ($scope.pages.form.subRequestCompleteVar === 0) {
                            $scope.pages.form.close();
                            SWEETALERT.stop();
                        }
                        if ($scope.form.relations !== undefined) {
                            if ($scope.form.relations.length > 0) {
                                for (var relation of $scope.form.relations) {
                                    for (var frel of relation.data) {
                                        for (var i in frel) {
                                            var vi = frel[i].replace('$id', DRAGONID);
                                            eval(`frel.${i} = vi`);
                                        }
                                    }
                                    for (var i in  relation.config.fieldsUpdate) {
                                        var vi = relation.config.fieldsUpdate[i].replace('$id', DRAGONID);
                                        eval(`relation.config.fieldsUpdate.${i} = vi`);
                                    }
                                    var whereDelete = [];
                                    whereDelete.push(relation.config.fieldsUpdate)
                                    BASEAPI.deleteall(relation.config.toTable, whereDelete, function (ddata) {
                                        BASEAPI.insert(relation.config.toTable, relation.data, function (data) {
                                            $scope.pages.form.subRequestComplete();
                                        });
                                    });
                                }
                            }
                        }
                    } else {
                        SWEETALERT.stop();
                        ERROR.alert(result.data, ERROR.category.database);
                    }
                });
            }
        };
        $scope.form.makeInsert = function (exclude) {
            $scope.form.inserting = {};
            $scope.form.uploading = [];
            $scope.form.relations = [];
            $scope.form.multipleRelations = [];
            $scope.form.fieldExGET = '';
            $scope.form.valueExGET = '';
            if ($scope.form.getfilter) {
                $scope.form.fieldExGET = $scope.form.getfilter.field;
                $scope.form.valueExGET = eval(`$scope.${$scope.form.fieldExGET}`);

            }
            $scope.form.prepareInsert(exclude);
        };
        $scope.form.prepareInsert = function (exclude) {
            $scope.form.lastPrepare = {};
            exclude = DSON.oseaX(exclude) ? [] : exclude;
            for (const fieldy of $scope.form.fileds) {
                var field = fieldy.replace('_DragonClean', '');
                if (exclude.indexOf(field) === -1)
                    $scope.form.pushInsert(field);
            }

            for (const fieldy of $scope.form.fileds) {
                var field = fieldy;
                var badwords = [
                    '_DragonCountFile',
                    '_DragonLat',
                    '_DragonLon',
                    '_DragonAddress',
                    '_DragonFilter',
                    '_DragonClean',
                ];
                badwords.forEach((item) => {
                    field = field.replace(item, '');
                });
                if (eval(`$scope.form.schemas.insert.${field}`) === undefined) {
                    if (exclude.indexOf(field) === -1) {
                        if (eval(`$scope.form.lastPrepare.${field}`) !== undefined) {
                            if (eval(`$scope.form.lastPrepare.${field}_DragonClean`) !== undefined)
                                eval(`$scope.form.inserting.${field} = $scope.form.lastPrepare.${field}_DragonClean;`);
                            else
                                eval(`$scope.form.inserting.${field} = $scope.form.lastPrepare.${field};`);
                        }
                    }
                }
                else {
                    var typeField = eval(`$scope.form.schemas.insert.${field}`);
                    switch (typeField) {
                        case FORM.schemasType.upload: {
                            $scope.form.uploading.push({
                                from: `${FOLDERS.files}/${eval(`$scope.${field}`).replace('upload:', '')}`,
                                to: `${FOLDERS.files}/${$scope.modelName}/${field}/$id`
                            });
                            break;
                        }
                        case FORM.schemasType.selectMultiple: {
                            var config = eval(`$scope.form.schemas.insert.${field}_config`);
                            if (eval(`$scope.form.lastPrepare.${field}`) !== undefined) {
                                var arrayField = eval(`$scope.form.lastPrepare.${field}`).split(',');
                                var dataarray = [];
                                for (var item of arrayField) {
                                    var newObj = {};
                                    for (var field in config.fields) {
                                        var valued = config.fields[field].replace('$item', item);
                                        eval(`newObj.${field} = "${valued}"`);
                                    }
                                    dataarray.push(newObj);
                                }
                                $scope.form.relations.push({
                                    config: config,
                                    data: dataarray
                                });
                            }
                            break;
                        }
                        case FORM.schemasType.relation: {
                            var config = eval(`$scope.form.schemas.insert.${field}_config`);
                            var tempID = eval(`$scope.form.lastPrepare.${field}`);

                            $scope.form.multipleRelations.push({
                                config: config,
                                tempID: tempID
                            });
                            break;
                        }
                    }
                }
            }
        };
        $scope.form.masked = function (name, value) {
            if ($scope.pages.form.isOpen)
                if (!DSON.oseaX(value)) {
                    try {
                        return $(`[name="${name}"]`).masked(value);
                    } catch (e) {
                        return "";
                    }
                }
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

                    if (!options.multiple)
                        ANIMATION.stoploading(`#input${name}`, `#icon${name}`);
                    if (options.multiple) {
                        eval(`$scope.${name}=[];`);
                        if (!$scope.form.isReadOnly(name)) {
                            BASEAPI.list(options.get.table, {
                                limit: 99999,
                                page: 1,
                                orderby: options.get.fieldTo,
                                order: "asc",
                                where: [
                                    {
                                        field: options.get.fieldTo,
                                        value: eval(`$scope.${options.get.fieldFrom}`)
                                    }
                                ]
                            }, function (selectedy) {
                                selectedy.data.forEach((item) => {
                                    eval(`$scope.${name}.push('${eval(`item.${options.get.field}`)}')`);
                                });
                                ANIMATION.stoploading(`#input${name}`, `#icon${name}`);
                                $('[name="' + $scope.modelName + "_" + name + '"]').select2({
                                    placeholder:
                                        capitalize('Select ' + eval(`${options.table}.${!options.multiple ? 'singular' : 'plural'}`)),
                                    templateSelection: DROPDOWN.iformat,
                                    templateResult: DROPDOWN.iformat,
                                    allowHtml: true
                                });
                                $('[name="' + $scope.modelName + "_" + name + '"]').on('change', function (e) {
                                    $scope.$scope.$digest();
                                });
                                $scope.$scope.$digest();
                                $('[name="' + $scope.modelName + "_" + name + '"]').trigger('change.select2');
                            });
                        } else {
                            eval(`$scope.${name}=$scope.form.isReadOnly('${name}');`);
                            ANIMATION.stoploading(`#input${name}`, `#icon${name}`);
                            $('[name="' + $scope.modelName + "_" + name + '"]').select2({
                                placeholder:
                                    capitalize('Select ' + eval(`${options.table}.${!options.multiple ? 'singular' : 'plural'}`)),
                                templateSelection: DROPDOWN.iformat,
                                templateResult: DROPDOWN.iformat,
                                allowHtml: true
                            });
                            $('[name="' + $scope.modelName + "_" + name + '"]').on('change', function (e) {
                                $scope.$scope.$digest();
                            });
                            $scope.$scope.$digest();
                            $('[name="' + $scope.modelName + "_" + name + '"]').trigger('change.select2');
                        }
                    } else {
                        $('[name="' + $scope.modelName + "_" + name + '"]').select2({
                            placeholder:
                                capitalize('Select ' + eval(`${options.table}.${!options.multiple ? 'singular' : 'plural'}`)),
                            templateSelection: DROPDOWN.iformat,
                            templateResult: DROPDOWN.iformat,
                            allowHtml: true
                        });
                        $('[name="' + $scope.modelName + "_" + name + '"]').on('change', function (e) {
                            $scope.$scope.$digest();
                        });
                        $scope.$scope.$digest();
                    }


                });
        };
        $scope.form.loadOutDropDown = function (options, id) {
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
                    $('[name="' + $scope.modelName + "_" + name + '"]').select2({
                        placeholder:
                            capitalize('Select ' + eval(`${options.table}.${!options.multiple ? 'singular' : 'plural'}`)),
                        templateSelection: DROPDOWN.iformat,
                        templateResult: DROPDOWN.iformat,
                        allowHtml: true
                    });
                    $('[name="' + $scope.modelName + "_" + name + '"]').on('change', function (e) {
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
        $scope.form.destroy = function () {
            $scope.form.fileds.forEach((field) => {
                eval(`delete $scope.${field}`);
            });
            $scope.form = {};
            $scope.open = {};
            $scope.pages = {};
            $scope.validation.destroy();
        };
        $scope.openForm = function (mode) {
            $scope.pages.form.isOpen = true;
            $scope.pages.form.subRequestCompleteVar = 0;
            $scope.pages.form.subRequestCompleteProgress = 0;
            $scope.pages.form.save = function (pre, post) {
                var newRecord = {};
                var state = $scope.validation.statePure();
                if (state === VALIDATION.types.success) {
                    $scope.form.saveAction();
                } else {
                    if (state === VALIDATION.types.warning) {
                        SWEETALERT.confirm({
                            message:
                                "This form contains warnings but you can still save it, are you sure?",
                            confirm: function () {
                                $scope.form.saveAction();
                            }
                        });
                    } else {
                        SWEETALERT.show({
                            type: "error",
                            message: "this form contains errors so it will not allow you to save."
                        });
                    }
                }
            };
            $scope.pages.form.subRequestComplete = function () {
                $scope.pages.form.subRequestCompleteProgress++;
                if ($scope.pages.form.subRequestCompleteProgress === $scope.pages.form.subRequestCompleteVar) {
                    $scope.pages.form.close();
                    SWEETALERT.stop();
                } else {

                }
            };
            $scope.pages.form.beforeOpen = function () {

            };
            $scope.pages.form.onClose = function () {
                $scope.pages.form.isOpen = false;
                $scope.form.destroy();
                if ($scope.form.hasChanged)
                    $scope.refresh();
            };
            $scope.pages.form.close = function (pre, post) {
                if ($scope.form.hasChanged) {
                    console.log("must refresh");
                    $scope.refresh();
                }
                if (DSON.iffunction(pre)) pre();
                if ($scope.form.mode === FORM.modes.new) {
                    if ($scope.validation.warningClose())
                        SWEETALERT.confirm({
                            message: "¿You are close to completing the form, are you sure you want to close it?",
                            confirm: function () {
                                MODAL.close($scope);
                                if ($scope.pages.form)
                                    $scope.pages.form.onClose();
                            }
                        });
                    else {
                        MODAL.close($scope);
                        if ($scope.pages.form)
                            $scope.pages.form.onClose();
                    }
                } else {
                    MODAL.close($scope);
                    if ($scope.pages.form)
                        $scope.pages.form.onClose();
                }
                if (DSON.iffunction(post)) post();

            };
            $scope.pages.form.beforeOpen();

            var icon = "";
            if (mode === FORM.modes.new) icon = "file-plus";
            if (mode === FORM.modes.edit) icon = "pencil7";
            if (mode === FORM.modes.view) icon = "file-eye";
            $scope.form.mode = mode;
            if (mode === FORM.modes.new) {
                eval(`$scope.${$scope.table.crud.table.key} = '';`);
            }

            $scope.modal.modalView($scope.modelName + '/form', {
                width: ENUM.modal.width.full,
                header: {
                    title: capitalize(`${mode} ${$scope.singular}`),
                    icon: icon,
                    bg: mode !== FORM.modes.view ? COLOR.primary + '-600' : `alpha-${COLOR.primary}-600`,
                    closeButton: true,
                    h: "h6"
                },
                footer: {
                    cancelButton: false
                },
                event: {
                    show: {
                        begin: function (datam) {
                            for (const func of  $scope.form.beginFunctions) {
                                eval(func);
                            }
                        },
                        end: function (datam) {

                        }
                    },
                    hide: {
                        begin: function (datam) {
                            if (MODAL.history.length === 0) {
                                $scope.pages.form.isOpen = false;
                                $scope.form.destroy();
                                if ($scope.form.hasChanged)
                                    $scope.refresh();
                            }
                        }
                    }
                }
            });
        };
        $scope.createForm = function (data, mode, defaultData) {
            if (baseController.viewData)
                if (baseController.viewData.readonly) {
                    $scope.form.readonly = DSON.merge(baseController.viewData.readonly, $scope.form.readonly, true);
                    for (var i in $scope.form.readonly) {
                        eval(`$scope.${i} = $scope.form.readonly.${i};`);
                        $scope.form.fileds.push(i);
                    }
                }
            $scope.open = {};
            $scope.open.default = {};
            if (!DSON.oseaX(defaultData)) {
                $scope.open.default = defaultData;
            }
            if (data !== null) {
                $scope.open.query = data;
                BASEAPI.first($scope.modelName, $scope.open.query, function (data) {
                    for (var i in data) {
                        var item = eval(`'${eval(`data.${i}`)}'`);
                        eval(`$scope.open.default.${i} = '${item}';`);
                        if (item !== 'null' && item !== undefined)
                            eval(`$scope.${i} = '${item}';`);
                    }
                    $scope.openForm(mode);
                });
            } else {
                $scope.openForm(mode);
            }
        };
    }
};