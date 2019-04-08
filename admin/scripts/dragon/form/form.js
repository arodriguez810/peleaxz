FORM = {
    modes: {
        new: "new",
        edit: "edit",
        view: "view"
    },
    config: {
        password: '[Encrypted]'
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
        location: "location",
        password: "password",
    },
    targets: {
        modal: "modal",
        selft: "selft"
    },
    run: function ($scope, $http) {
        if (eval(`typeof CRUD_${$scope.modelName} !=='undefined'`)) {
            $scope.tableOrView = eval(`CRUD_${$scope.modelName}`).table.view || $scope.modelName;
            $scope.tableOrMethod = eval(`CRUD_${$scope.modelName}`).table.method || $scope.modelName;
        }
        $scope.form = {};
        $scope.selectQueries = [];
        $scope.form.target = FORM.targets.modal;
        $scope.form.hasChanged = false;
        $scope.form.modalWidth = undefined;
        $scope.form.titles = undefined;
        $scope.form.modalIcon = undefined;
        $scope.open = {};
        $scope.defaultColor = TAG.table + '-600';
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
        $scope.form.before = {};
        $scope.form.after = {};
        $scope.form.before.insert = function (data) {
            return false;
        };
        $scope.form.before.update = function (data) {
            return false;
        };
        $scope.form.after.insert = function (data) {
            return false;
        };
        $scope.form.after.update = function (data) {
            return false;
        };
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
            if (typeof func === "function") {
                func();
            }
        };
        $scope.form.registerField = function (name, properties, alterval) {
            var nameclean = name.replace(/\./g, '_');
            $scope.form.fileds.push(name);
            var references = name.split('.');
            if ($scope.form === undefined) {
                $scope.form = {};
                $scope.form.options = {};
            }
            if ($scope.form.options === undefined)
                $scope.form.options = {};

            var sequece = [];
            for (var ref of references) {
                var base = $scope.form.options;
                for (var seq of sequece)
                    base = base[seq];
                if (!base.hasOwnProperty(ref)) {
                    base[ref] = {};
                }
                sequece.push(ref);
            }

            eval(`$scope.form.options.${name} = ${properties.replaceAll("&#34;", '"').replaceAll("&#39", "'")}`);
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
                        $('[name="' + $scope.modelName + "_" + nameclean + '"]').val(dvalue);
                    }
                }
            }
        };
        $scope.form.runSelectRule = function (name, value, rule, properties) {
            var nameclean = name.replace(/\./g, '_');
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
                    newValue = numeral(newValue).format('0,0.00');
                    return newValue;
                }
                case FORM.schemasType.password: {
                    var newValue = value;
                    if (DSON.oseaX(newValue))
                        return newValue;
                    newValue = FORM.config.password;
                    return newValue;
                }
                case FORM.schemasType.location: {
                    var newValue = value;
                    if (DSON.oseaX(newValue))
                        return newValue;
                    var info = newValue.split(';');
                    eval(`$scope.${name}_DragonLat = info[0];`);
                    eval(`$scope.${name}_DragonLon = info[1];`);


                    $('[name="' + $scope.modelName + "_" + nameclean + '_DragonLat"]').val(info[0]);
                    $('[name="' + $scope.modelName + "_" + nameclean + '_DragonLon"]').val(info[1]);
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
            SWEETALERT.loading({message: MESSAGE.ic('mono.saving')});
            if ($scope.form.mode === FORM.modes.new) {
                for (var i in CONFIG.audit.insert) {
                    var audit = CONFIG.audit.insert[i];
                    if (eval(`CRUD_${$scope.modelName}`).table.columns[i] !== undefined)
                        eval(`$scope.form.inserting.${i} = '${eval(audit)}';`);
                }
                if ($scope.form.before.insert({
                    inserting: $scope.form.inserting,
                    uploading: $scope.form.uploading,
                    multipleRelations: $scope.form.multipleRelations,
                    relations: $scope.form.relations,
                }))
                    return;
                BASEAPI.insertID($scope.tableOrMethod, $scope.form.inserting, $scope.form.fieldExGET, $scope.form.valueExGET, function (result) {
                    if (result.data.error === false) {
                        SWEETALERT.loading({message: MESSAGE.i('mono.Preparingfilesandrelations')});
                        var savedRow = result.data.data[0];
                        $scope.form.after.insert({
                            inserted: savedRow,
                            inserting: $scope.form.inserting,
                            uploading: $scope.form.uploading,
                            multipleRelations: $scope.form.multipleRelations,
                            relations: $scope.form.relations,
                        });


                        var firstColumn = eval(`CRUD_${$scope.modelName}`).table.key || "id";
                        var DRAGONID = eval(`savedRow.${firstColumn}`);
                        $scope.form.mode = FORM.modes.edit;
                        $scope.pages.form.subRequestCompleteVar = 0;
                        $scope.pages.form.subRequestCompleteProgress = 0;
                        $scope.pages.form.subRequestCompleteVar =
                            ($scope.form.uploading.length > 0 ? 1 : 0)
                            + $scope.form.multipleRelations.length
                            + $scope.form.relations.length;

                        if ($scope.pages !== null)
                            if ($scope.pages.form.subRequestCompleteVar === 0) {
                                $scope.pages.form.close();
                                SWEETALERT.stop();
                            }
                        if ($scope.form !== null)
                            if ($scope.form.uploading !== undefined)
                                if ($scope.form.uploading.length > 0) {
                                    for (var file of $scope.form.uploading)
                                        file.to = file.to.replace('$id', DRAGONID);
                                    BASEAPI.ajax.post(new HTTP().path(["files", "api", "move"]), {moves: $scope.form.uploading}, function (data) {
                                        $scope.pages.form.subRequestComplete();
                                    });
                                }
                        if ($scope.form !== null)
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
                        if ($scope.form !== null)
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
                var firstColumn = eval(`CRUD_${$scope.modelName}`).table.key || "id";
                var dataToWhere = [{field: firstColumn, value: eval(`$scope.${firstColumn}`)}];
                var dataToUpdate = $scope.form.inserting;
                dataToUpdate.where = dataToWhere;
                for (var i in CONFIG.audit.update) {
                    var audit = CONFIG.audit.update[i];
                    if (eval(`CRUD_${$scope.modelName}`).table.columns[i] !== undefined)
                        eval(`$scope.form.inserting.${i} = '${eval(audit)}';`);
                }
                if ($scope.form.before.update({
                    updating: $scope.form.inserting,
                    uploading: $scope.form.uploading,
                    multipleRelations: $scope.form.multipleRelations,
                    relations: $scope.form.relations,
                })) return;
                BASEAPI.updateall($scope.tableOrMethod, dataToUpdate, function (result) {
                    if (result.data.error === false) {
                        $scope.form.after.update({
                            updating: $scope.form.inserting,
                            uploading: $scope.form.uploading,
                            multipleRelations: $scope.form.multipleRelations,
                            relations: $scope.form.relations,
                        });
                        SWEETALERT.loading({message: MESSAGE.i('mono.Preparingfilesandrelations')});
                        var firstColumn = eval(`CRUD_${$scope.modelName}`).table.key || "id";
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
                            var prop = eval(`$scope.form.options.${field}`);
                            var config = {
                                toTable: prop.get.table,
                                text: "Inserting multiples...",
                                fields: {},
                                fieldsUpdate: {}
                            };
                            config.fields = {};
                            eval(`config.fields.${prop.get.fieldTo} = '$id';`);
                            eval(`config.fields.${prop.get.field} = '$item';`);
                            eval(`config.fieldsUpdate.field = '${prop.get.fieldTo}';`);
                            eval(`config.fieldsUpdate.value = '$id';`);

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
                            var tempID = eval(`$scope.form.lastPrepare.${field}`);
                            var prop = eval(`$scope.form.options.${field}`);
                            var config = {
                                toTable: prop.table,
                                update: {all: "$id", tempid: "$NULL"},
                                where: [{field: "tempid", value: "$id"}]
                            };
                            eval(`config.update = {${prop.field}: "$id", tempid: "$NULL"};`);
                            eval(`config.where = [{field: "tempid", value: "$id"}];`);
                            $scope.form.multipleRelations.push({
                                config: config,
                                tempID: tempID
                            });
                            break;
                        }
                        case FORM.schemasType.password: {
                            if (eval(`$scope.form.lastPrepare.${field}`) !== FORM.config.password)
                                eval(`$scope.form.inserting.${field} = '#${eval(`$scope.form.lastPrepare.${field}`)}'`);
                            break;
                        }
                    }
                }
            }
        };
        $scope.form.masked = function (name, value) {
            var nameclean = name.replace(/\./g, '_');
            if ($scope.pages.form.isOpen)
                if (!DSON.oseaX(value)) {
                    try {
                        return $(`[name="${$scope.modelName}_${nameclean}"]`).masked(value);
                    } catch (e) {
                        return "";
                    }
                }
        };
        $scope.form.loadDropDown = function (name) {
            var animation = new ANIMATION();
            var options = eval(`$scope.form.options.${name}`);
            animation.loading(`#input${$scope.modelName}_${name}`, "", `#icon${name}`, '30');
            if (!options.simple) {
                eval(`var crud = CRUD_${options.table}`);
                if (crud.table.single)
                    options.query.join = crud.table.single;
                var toquery = DSON.merge(options.query, {});
                if ($scope.selectQueries[name]) {
                    var toConsult = $scope.selectQueries[name];
                    if (toConsult.length > 0) {
                        if (!DSON.oseaX(toquery.where)) {
                            for (var optadd in toConsult) {
                                toquery.where.push(toConsult[optadd]);
                            }
                        } else {
                            toquery.where = toConsult;
                        }
                    }
                }

                if (options.parent !== false) {
                    if (DSON.oseaX(toquery.where))
                        toquery.where = [];
                    var exist = toquery.where.filter((item) => {
                        return item.field === options.parent.model;
                    });
                    if (exist.length) {
                        exist[0].value = eval(`$scope.${options.parent.model}`)
                    }
                    else {
                        toquery.where.push({
                            field: options.parent.model,
                            value: eval(`$scope.${options.parent.model}`)
                        });
                    }
                }
                BASEAPI.list(options.table, toquery,
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
                            animation.stoploading(`#input${$scope.modelName}_${name}`, `#icon${name}`);
                        if (options.multiple) {
                            if (eval(`$scope.${name}.length<=0`))
                                eval(`$scope.${name}=[];`);
                            if (!$scope.form.isReadOnly(name)) {
                                var lastWhere = [];
                                if (eval(`$scope.${options.get.fieldFrom}`) !== undefined) {
                                    lastWhere.push({
                                        field: options.get.fieldTo,
                                        value: eval(`$scope.${options.get.fieldFrom}`)
                                    });
                                    BASEAPI.list(options.get.table, {
                                        limit: 99999,
                                        page: 1,
                                        orderby: options.get.fieldTo,
                                        order: "asc",
                                        where: lastWhere
                                    }, function (selectedy) {
                                        if (eval(`$scope.${name} ==='[NULL]'`))
                                            eval(`$scope.${name}=[];`);
                                        if (eval(`$scope.${name}.length<=0`))
                                            selectedy.data.forEach((item) => {
                                                eval(`$scope.${name}.push('${eval(`item.${options.get.field}`)}')`);
                                            });
                                        animation.stoploading(`#input${$scope.modelName}_${name}`, `#icon${name}`);
                                        $scope.form.callSelect2(name, options);
                                    });
                                } else {
                                    animation.stoploading(`#input${$scope.modelName}_${name}`, `#icon${name}`);
                                    $scope.form.callSelect2(name, options);
                                }
                            } else {
                                if (eval(`$scope.${name}.length<=0`))
                                    eval(`$scope.${name}=$scope.form.isReadOnly('${name}');`);
                                animation.stoploading(`#input${$scope.modelName}_${name}`, `#icon${name}`);
                                $scope.form.callSelect2(name, options);
                            }
                        } else {
                            $scope.form.callSelect2(name, options);
                        }
                    });
            } else {
                var info = {};
                info.data = options.data;
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
                animation.stoploading(`#input${$scope.modelName}_${name}`, `#icon${name}`);
                $scope.form.callSelect2(name, options);
            }
        };
        $scope.form.callSelect2 = function (name, options) {
            var nameclean = name.replace(/\./g, '_');
            if (!options.simple) {
                $('[name="' + $scope.modelName + "_" + nameclean + '"]').select2({
                    placeholder:
                        capitalize(MESSAGE.i('mono.select') + ' ' + eval(`${options.table}.${!options.multiple ? 'singular' : 'plural'}`)),
                    templateSelection: DROPDOWN.iformat,
                    templateResult: DROPDOWN.iformat,
                    allowHtml: true
                });
                $('[name="' + $scope.modelName + "_" + nameclean + '"]').on('change', function (e) {
                    if (options.childs !== false) {
                        options.childs.forEach((child) => {
                            if (eval(`$scope.form.options.${child.model}.multiple`))
                                eval(`$scope.${child.model} = []`);
                            else
                                eval(`$scope.${child.model} = '[NULL]'`);
                            $scope.form.loadDropDown(child.model);
                        });
                    }
                    $scope.$scope.$digest();
                });
                $scope.$scope.$digest();
                $('[name="' + $scope.modelName + "_" + nameclean + '"]').trigger('change.select2');
            } else {
                $('[name="' + $scope.modelName + "_" + nameclean + '"]').select2({
                    placeholder:
                        capitalize(MESSAGE.i('mono.select') + ' ' + options.default),
                    templateSelection: DROPDOWN.iformat,
                    templateResult: DROPDOWN.iformat,
                    allowHtml: true
                });
                $('[name="' + $scope.modelName + "_" + nameclean + '"]').on('change', function (e) {
                    if (options.childs !== false) {
                        options.childs.forEach((child) => {
                            if (eval(`$scope.form.options.${child.model}.multiple`))
                                eval(`$scope.${child.model} = []`);
                            else
                                eval(`$scope.${child.model} = '[NULL]'`);
                            $scope.form.loadDropDown(child.model);
                        });
                    }
                    $scope.$scope.$digest();
                });
                $('[name="' + $scope.modelName + "_" + nameclean + '"]').trigger('change.select2');
            }
        };
        $scope.form.loadOutDropDown = function (options, id) {
            var animation = new ANIMATION();
            animation.loading(`#input${name}`, "", `#icon${name}`, '30');
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

                    animation.stoploading(`#input${name}`, `#icon${name}`);
                    $scope.form.callSelect2(name, options);
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
                                MESSAGE.i('alerts.preventClose'),
                            confirm: function () {
                                $scope.form.saveAction();
                            }
                        });
                    } else {
                        SWEETALERT.show({
                            type: "error",
                            message: MESSAGE.i('alerts.ContainsError'),
                            confirm: function () {
                                $scope.pages.form.focusFirstValidation();
                            }
                        });

                    }
                }
            };
            $scope.pages.form.focusFirstValidation = function () {
                setTimeout(function () {
                    var firstFieldWithError = $(".help-block:has('p'):eq(0)").closest('.form-group-material');
                    firstFieldWithError.find('.form-control').focus();
                    var tab = firstFieldWithError.closest('.tab-pane');
                    $(`[href='#${tab.attr('id')}']`).trigger('click');
                    new ANIMATION().playPure(firstFieldWithError, "shake", function () {
                        firstFieldWithError.find('.form-control').focus();
                    });
                }, 500);
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
                if ($scope.form !== null) {
                    $scope.form.destroy();
                    if ($scope.form.hasChanged)
                        if ($scope.refresh !== undefined)
                            $scope.refresh();
                }
            };
            $scope.pages.form.close = function (pre, post) {
                if ($scope.form !== null)
                    if ($scope.form.hasChanged) {

                        if ($scope.refresh !== undefined)
                            $scope.refresh();
                    }
                if (typeof pre === "function") pre();
                if ($scope.form !== null)
                    if ($scope.form.mode === FORM.modes.new) {
                        if ($scope.validation.warningClose())
                            SWEETALERT.confirm({
                                message: MESSAGE.i('alerts.CloseToComplete'),
                                confirm: function () {
                                    if ($scope.form.target === FORM.targets.modal)
                                        MODAL.close($scope);

                                    if ($scope.pages.form)
                                        $scope.pages.form.onClose();
                                }
                            });
                        else {
                            if ($scope.form.target === FORM.targets.modal)
                                MODAL.close($scope);
                            if ($scope.pages.form)
                                $scope.pages.form.onClose();
                        }
                    } else {
                        if ($scope.form.target === FORM.targets.modal)
                            MODAL.close($scope);
                        if ($scope.pages !== null)
                            if ($scope.pages.form)
                                $scope.pages.form.onClose();
                    }
                if (typeof post === "function") post();

            };
            $scope.pages.form.beforeOpen();
            var icon = "";
            var finalTitle = undefined;
            if (mode === FORM.modes.new) {
                if ($scope.form.titles)
                    finalTitle = $scope.form.titles.new;
                icon = "file-plus"
            }
            if (mode === FORM.modes.edit) {
                if ($scope.form.titles)
                    finalTitle = eval($scope.form.titles.edit);
                icon = "pencil7"
            }
            if (mode === FORM.modes.view) {
                if ($scope.form.titles)
                    finalTitle = eval($scope.form.titles.view);
                icon = "file-eye"
            }
            $scope.form.mode = mode;
            if (mode === FORM.modes.new) {
                //eval(`CRUD_${$scope.modelName}.table.key = '';`);
            }
            if ($scope.form.target === FORM.targets.modal) {
                $scope.modal.modalView($scope.modelName + '/form', {
                    width: $scope.form.modalWidth || ENUM.modal.width.full,
                    header: {
                        title: finalTitle || capitalize(`${MESSAGE.i('mono.' + mode)} ${$scope.singular}`),
                        icon: $scope.form.modalIcon || icon,
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
                                        if ($scope.refresh !== undefined)
                                            $scope.refresh();
                                }
                            }
                        }
                    }
                });
            } else {
                new LOAD().loadContentScope(
                    location.href.split('#')[1], "content", MESSAGE.i('actions.Loading'), function () {
                        MESSAGE.run();
                    },undefined,undefined,$scope
                );
            }
        };
        $scope.createForm = function (data, mode, defaultData) {
            $scope.form.mode = mode;
            for (var i in $scope.form.readonly) {
                eval(`$scope.${i} = $scope.form.readonly.${i};`);
                $scope.form.fileds.push(i);
            }

            if (baseController.viewData)
                if (baseController.viewData.readonly) {
                    $scope.form.readonly = DSON.merge(baseController.viewData.readonly, $scope.form.readonly, true);
                    for (var i in $scope.form.readonly) {
                        eval(`$scope.${i} = $scope.form.readonly.${i};`);
                        $scope.form.fileds.push(i);
                    }
                }

            if (RELATIONS.anonymous[$scope.modelName] !== undefined) {
                $scope.form.readonly = DSON.merge(RELATIONS.anonymous[$scope.modelName].readonly, $scope.form.readonly, true);
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
                BASEAPI.first($scope.tableOrMethod, $scope.open.query, function (data) {
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