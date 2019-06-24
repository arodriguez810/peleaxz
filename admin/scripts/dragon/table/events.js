TABLEEVENT = {
    run: function ($scope) {
        $scope.cell = {};
        $scope.cell.selected = [];
        $scope.procesingRow = 0;
        $scope.procesingRowFor = 0;
        $scope.events = ["click", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup"];
        $scope.events.forEach(function (obj) {
            eval(
                " $scope.cell." +
                obj +
                " = function (key, column, row, element) {\n" +
                '            var value = eval("row." + key);\n' +
                "                var data  = {\n" +
                "                    value: value,\n" +
                "                    $scope: $scope,\n" +
                "                    key: key,\n" +
                "                    column: column,\n" +
                "                    element: element,\n" +
                "                    row: row\n" +
                "                };\n" +
                "            if (typeof column." + obj + ' === "function") \n' +
                "                column." + obj + "(data);" +
                "            if(typeof $scope.cell.extend" + obj + '==="function") ' +
                "                $scope.cell.extend" + obj + "(data);" +
                "            " +
                "        };"
            );
        });
        $scope.cell.openLink = function (data) {
            if (!DSON.oseaX(data.value)) {
                var mylink = data.column.link;
                $scope.modalAction(mylink.table, MESSAGE.ic(`columns.${mylink.table}`), 'archive', 'edit', data.value);
            }
        };
        $scope.cell.extendclick = function (data) {
            if (data.column.folder) {
                var root = DSON.template(data.column.folder, data.row);
                baseController.viewData = {
                    root: root,
                    scope: $scope,
                    maxsize: data.column.files.maxsize_mb,
                    maxfiles: data.column.files.maxfiles,
                    acceptedFiles: data.column.files.acceptedFiles,
                    columns: data.column.files.columns,
                };

                data.column.files.modal = {
                    width: 'modal-full',
                        header: {
                        title: MESSAGE.ic("mono.files"),
                            icon: "file-eye"
                    },
                    footer: {
                        cancelButton: true
                    },
                    content: {
                        loadingContentText: MESSAGE.i('actions.Loading')
                    },
                };
                $scope.modal.modalView("../templates/components/gallery", data.column.files.modal);
                return;
            }
            if (data.column.multilink && data.column.reference !== false) {
                var mylink = data.column.multilink;
                mylink.from = eval(`CRUD_${$scope.modelName}`).table.key;
                var id = eval("data.row." + mylink.from);

                mylink.modal = {
                    header: {
                        title: "Link Detail",
                        icon: "archive"
                    },
                    footer: {
                        cancelButton: true
                    },
                    content: {
                        loadingContentText: MESSAGE.i('actions.Loading'),
                        sameController: mylink.table
                    },
                };

                var linkCrud = eval("CRUD_" + mylink.table);
                mylink.modal.header.title = MESSAGE.ic(`columns.${mylink.table}`);
                RELATIONS.anonymous[mylink.table] =
                    {
                        readonly: eval(`({${mylink.to}:\`${id}\`})`),
                        fieldKey: mylink.to,
                        where: [
                            {
                                field: mylink.to,
                                value: id
                            }
                        ]
                    };
                $scope.modal.modalView(String.format("{0}", mylink.table), mylink.modal);
                return;
            }
            if (data.column.link && data.column.reference !== false) {
                if (!DSON.oseaX(data.value)) {
                    var mylink = data.column.link;
                    if (!DSON.oseaX(data.value)) {
                        $scope.modalAction(mylink.table, MESSAGE.ic(`columns.${mylink.table}`), 'archive', 'edit', eval("data.row." + mylink.from));
                    }
                    return;
                }
            }
            if (data.column.shorttext) {
                var shorttext = data.value;
                if (!DSON.oseaX(shorttext))
                    if (shorttext.length > data.column.shorttext) {
                        $scope.modal.simpleModal(data.value, {
                            header: {title: `${MESSAGE.ic('mono.completetext')} ${MESSAGE.i('mono.of')} ` + data.column.label}
                        });
                    }
            } else {
                var load = new LOAD();
                if (!DSON.oseaX(data.column.formattype)) {
                    if (data.column.formattype.indexOf("html") !== -1) {
                        $scope.modal.simpleModal(data.value || "", {
                            header: {title: "HTML " + MESSAGE.i('mono.of') + " " + data.column.label}
                        });
                    }
                    else if (data.column.formattype.indexOf("color") !== -1) {

                        load.template('templates/components/color', {color: data.value}, function (html) {
                            $scope.modal.simpleModal(html, {header: {title: MESSAGE.ic('mono.color')}});
                        });
                    }
                    else if (data.column.formattype.indexOf("location") !== -1) {
                        if (!DSON.oseaX(data.value)) {
                            var location = data.value.split(';');
                            if (location.length > 1) {
                                var lat = parseFloat(location[0]);
                                var lng = parseFloat(location[1]);
                                var name = data.column.formattype.split(':');
                                name = name.length > 1 ? (eval("data.row." + name[1]) + MESSAGE.i('mono.location')) : MESSAGE.i('mono.MapView');
                                $scope.modal.map({lat: lat, lng: lng}, name, {header: {title: name}});
                            }
                        }
                    }
                    else if (data.column.formattype.indexOf("file") !== -1) {
                        var format = data.column.formattype.split(":");
                        format = format.length > 1 ? format[1] : "";
                        var fileUrl = new HTTP().path([CONFIG.filePath, data.value]);
                        if (!DSON.oseaX(data.value)) {
                            switch (format) {
                                case "image": {
                                    load.template('templates/components/crop', {src: fileUrl}, function (html) {
                                        $scope.modal.simpleModal(html, {header: {title: MESSAGE.i('mono.preview')}});
                                    });
                                    break;
                                }
                                case "all": {
                                    if (FILE.noSupport(data.value)) {
                                        return;
                                    }
                                    if (FILE.isImage(data.value)) {
                                        load.template('templates/components/crop', {src: fileUrl}, function (html) {
                                            $scope.modal.simpleModal(html, {header: {title: MESSAGE.i('mono.preview')}});
                                        });
                                    } else {
                                        $scope.modal.simpleModal("<object style='width: 100%;height: 100%' data=\"" + fileUrl + "\"></object>", {header: {title: MESSAGE.i('mono.preview')}});
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    else if (data.column.formattype.indexOf(ENUM.FORMAT.externalimage) !== -1) {
                        var fileUrl = data.value;
                        if (!DSON.oseaX(data.value)) {
                            load.template('templates/components/crop', {src: fileUrl}, function (html) {
                                $scope.modal.simpleModal(html, {header: {title: MESSAGE.i('mono.preview')}});
                            });
                        }
                    }
                }
            }
        };
        $scope.cell.dblColumnSelect = function (event) {
            var dataColumn = $(event.currentTarget).data('column');
            $("[data-column=" + dataColumn + "]:not(th)").each(function () {
                var control = $(this);
                if (control.hasClass("alpha-" + COLOR.secundary))
                    control.removeClass("alpha-" + COLOR.secundary);
                else {
                    control.addClass("alpha-" + COLOR.secundary);
                }
            });

        };
        $scope.cell.select = function (event, row) {
            $("tr").removeClass("alpha-" + COLOR.secundary);
            $("td").removeClass("alpha-" + COLOR.secundary);
            var classElement = "bg-" + COLOR.secundary;
            if (!$(event.currentTarget).parent().hasClass(classElement))
                if (row.selected !== true)
                    if ($scope.activeSET(row) !== false)
                        $(event.currentTarget).parent().addClass("alpha-" + COLOR.secundary);
        };
        $scope.cell.dblselect = function (row) {
            if (!DSON.oseaX(row) && eval(`CRUD_${$scope.modelName}`).table.allow.view) {
                $scope.dataForView = row;
                $scope.modal.modalView(String.format("{0}/view", $scope.modelName), {
                    header: {
                        title: MESSAGE.i('mono.Viewof') + " " + $scope.plural,
                        icon: "list"
                    },
                    footer: {
                        cancelButton: true
                    },
                    content: {
                        loadingContentText: MESSAGE.i('actions.Loading'),
                        sameController: true
                    },
                });
            }
        };
        if (!$scope.beforeDelete)
            $scope.beforeDelete = function (data) {
                return false;
            };
        if (!$scope.afterDelete)
            $scope.afterDelete = function (data) {

            };
        $scope.deleteRow = async function (row) {
            var multiple = false;
            if (row === undefined) {
                row = ARRAY.last($scope.forDelte);
                ARRAY.removeLast($scope.forDelte);
                multiple = true;
            }
            var where = [];

            for (const deletekey of eval(`CRUD_${$scope.modelName}`).table.deletekeys) {
                if (row !== undefined)
                    where.push({field: deletekey, value: eval("row." + deletekey)});
            }
            if ($scope.beforeDelete(row)) return;
            $scope.procesingRowErrors = [];
            BASEAPI.deleteall($scope.tableOrMethod, where, async function (result) {
                if (result.data.error === false) {

                    $scope.afterDelete(row);
                    $scope.procesingRow++;
                    if ($scope.procesingRowFor !== 0)
                        SWEETALERT.loading({
                            message: `${MESSAGE.ic('mono.DeletingMultipleRows')} ${$scope.procesingRow} ${MESSAGE.i('mono.of')} ${$scope.procesingRowFor}`
                        }, false);

                    if ($scope.procesingRow === $scope.procesingRowFor || $scope.procesingRowFor === 0) {
                        $scope.procesingRow = 0;
                        $scope.procesingRowFor = 0;
                        $scope.refresh();
                        SWEETALERT.stop();
                        $scope.reorderItems();
                        NOTIFY.success(`${$scope.singular} ${MESSAGE.i('mono.deleted')}`);
                        $scope.backPage();
                    } else {
                        if (multiple) {
                            $scope.deleteRow();
                        }
                    }
                    $scope.records.data = $scope.records.data.filter(function (item) {
                        var goOut = 0;
                        for (const deletekey of eval(`CRUD_${$scope.modelName}`).table.deletekeys) {
                            if (row !== undefined) {
                                if (eval("item." + deletekey) === eval("row." + deletekey))
                                    goOut++;
                            }
                        }
                        if (goOut === eval(`CRUD_${$scope.modelName}`).table.deletekeys.length) {
                            item.rowdeleted = true;
                            return true;
                        }
                        return true;
                    });
                } else {
                    $scope.procesingRow++;
                    $scope.procesingRowErrors.push(result.data, ERROR.category.database);
                    if ($scope.procesingRow === $scope.procesingRowFor || $scope.procesingRowFor === 0) {
                        $scope.procesingRow = 0;
                        $scope.procesingRowFor = 0;
                        $scope.refresh();
                        SWEETALERT.stop();
                        $scope.reorderItems();
                        ERROR.multiAlert($scope.procesingRowErrors, ERROR.category.database);
                    }
                }

            });


        };
        $scope.reorderItems = async function () {
            //drag
            if ($scope.dragrow !== false) {
                var nextrecords = await BASEAPI.listp($scope.tableOrView, {
                    limit: 0,
                    orderby: $scope.dragrow,
                    order: "asc",
                    where: $scope.fixFilters
                });
                if (nextrecords.data) {
                    if (nextrecords.data.length > 0) {
                        var order = 1;
                        for (var item of nextrecords.data) {
                            var numCurrent = eval(`item.${$scope.dragrow}`);
                            var dataTOUpdate = {
                                where: [
                                    {
                                        field: $scope.dragrow,
                                        value: numCurrent
                                    }
                                ]
                            };
                            dataTOUpdate[$scope.dragrow] = order;
                            await BASEAPI.updateallp($scope.modelName, dataTOUpdate);
                            order++;
                        }
                        NOTIFY.success(`${$scope.plural} ${MESSAGE.i('mono.ordered')}`);
                        $scope.refresh();
                    }
                }

            }
            //drag
        };
        $scope.deleteSelected = function () {
            $scope.forDelte = $scope.records.data.filter(function (item) {
                return item.selected === true;
            });
            if ($scope.forDelte.length === 0) {
                SWEETALERT.show({message: MESSAGE.i('alerts.YMDelete')});
                return;
            }
            SWEETALERT.confirm({
                message: MESSAGE.i('alerts.AYSDeletes'),
                confirm: async function () {

                    $scope.procesingRow = 0;
                    $scope.procesingRowFor = $scope.forDelte.length;
                    SWEETALERT.loading({message: `${MESSAGE.ic('mono.DeletingMultipleRows')} ${$scope.procesingRow} ${MESSAGE.i('mono.of')} ${$scope.procesingRowFor}`});
                    $scope.deleteRows();
                }
            });
        };
        $scope.deleteRows = function () {
            $scope.deleteRow(undefined);
        };
        $scope.activeRow = async function (row, active) {
            var multiple = false;
            if (row === undefined) {
                row = ARRAY.last($scope.forDelte);
                ARRAY.removeLast($scope.forDelte);
                multiple = true;
            }
            $("tr").removeClass("alpha-" + COLOR.secundary);
            $("td").removeClass("alpha-" + COLOR.secundary);
            var where = [];
            for (const deletekey of eval(`CRUD_${$scope.modelName}`).table.deletekeys)
                where.push({field: deletekey, value: eval("row." + deletekey)});
            var data = {};
            eval(`data.${$scope.activeColumn()} = ${active}`);
            data.where = where;
            var actionText = active ? MESSAGE.i('mono.activing') : MESSAGE.i('mono.disabling');
            $scope.procesingRowErrors = [];
            BASEAPI.updateall($scope.tableOrMethod, data, function (result) {
                if (result.data.error === false) {
                    $scope.procesingRow++;
                    if ($scope.procesingRowFor !== 0)
                        SWEETALERT.loading({
                            message: `${actionText} ${MESSAGE.i('mono.multiple')} ${MESSAGE.ic('mono.rows')} ${$scope.procesingRow} ${MESSAGE.i('mono.of')} ${$scope.procesingRowFor}`
                        }, false);

                    if ($scope.procesingRow === $scope.procesingRowFor || $scope.procesingRowFor === 0) {
                        $scope.procesingRow = 0;
                        $scope.procesingRowFor = 0;
                        $scope.refresh();
                        SWEETALERT.stop();
                    } else {
                        if (multiple) {
                            $scope.activeRow(undefined, active);
                        }
                    }
                    $scope.records.data = $scope.records.data.filter(function (item) {
                        var goOut = 0;
                        for (const deletekey of eval(`CRUD_${$scope.modelName}`).table.deletekeys) {
                            if (eval("item." + deletekey) === eval("row." + deletekey))
                                goOut++;
                        }
                        if (goOut === eval(`CRUD_${$scope.modelName}`).table.deletekeys.length) {
                            eval(`item.${$scope.activeColumn()} = ${active}`);
                            return true;
                        }
                        return true;
                    });
                } else {
                    $scope.procesingRow++;
                    $scope.procesingRowErrors.push(result.data, ERROR.category.database);
                    if ($scope.procesingRow === $scope.procesingRowFor || $scope.procesingRowFor === 0) {
                        $scope.procesingRow = 0;
                        $scope.procesingRowFor = 0;
                        $scope.refresh();
                        SWEETALERT.stop();
                        ERROR.multiAlert($scope.procesingRowErrors, ERROR.category.database);
                    }
                }

            });
        };
        $scope.activeRows = function (active) {
            $scope.activeRow(undefined, active);
        };
        $scope.activeSelected = function (active) {
            $scope.forDelte = $scope.records.data.filter(function (item) {
                return item.selected === true;
            });
            var actionTextMultiple = active ? MESSAGE.i('mono.activing') : MESSAGE.i('mono.disabling');
            var value = active ? 1 : 0;
            if ($scope.forDelte.length === 0) {
                if (active)
                    SWEETALERT.show({message: MESSAGE.i('alerts.YMEnable')});
                else
                    SWEETALERT.show({message: MESSAGE.i('alerts.YMDisable')});
                return;
            }
            SWEETALERT.confirm({
                message: active ? MESSAGE.i('alerts.AYSEnables') : MESSAGE.i('alerts.AYSDisables'),
                confirm: async function () {
                    $scope.procesingRow = 0;
                    $scope.procesingRowFor = $scope.forDelte.length;
                    SWEETALERT.loading({message: `${actionTextMultiple}  ${MESSAGE.ic('mono.multiple')}  ${MESSAGE.ic('mono.rows')} ${$scope.procesingRow}  ${MESSAGE.i('mono.of')} ${$scope.procesingRowFor}`});
                    STEP.register({
                        scope: $scope.modelName,
                        action: ` ${MESSAGE.ic('mono.active')} ${ $scope.forDelte.length}  ${MESSAGE.ic('mono.rows')}`
                    });
                    $scope.activeRows(value);
                }
            });
        };
        $scope.importing = function (data) {
            $scope.importData = data;
            $scope.procesingRow = 0;
            $scope.procesingRowFor = data.length;
            SWEETALERT.loading({message: ` ${MESSAGE.ic('mono.importing')}  ${MESSAGE.ic('mono.multiple')}  ${MESSAGE.ic('mono.rows')} ${$scope.procesingRow}  ${MESSAGE.i('mono.of')} ${$scope.procesingRowFor}`});
            $scope.procesingRowErrors = [];
            STEP.register({
                scope: $scope.modelName,
                action: ` ${MESSAGE.ic('mono.importing')} ${data.length}  ${MESSAGE.i('mono.rows')}`
            });
            $scope.importRow();
        };
        $scope.importRow = function () {
            if ($scope.importData.length > 0) {
                var row = ARRAY.last($scope.importData);
                ARRAY.removeLast($scope.importData);

                for (var i in CONFIG.audit.insert) {
                    var audit = CONFIG.audit.insert[i];
                    if (eval(`CRUD_${$scope.modelName}`).table.columns[i] !== undefined)
                        eval(`row.row.${i} = \`${eval(audit)}\`;`);
                }
                $scope.procesingRowErrors = [];
                BASEAPI.insertID($scope.tableOrMethod, row.row, '', '', function (result) {
                    if (result.data.error === false) {
                        var savedRow = result.data.data[0];
                        $scope.procesingRow++;
                        if ($scope.procesingRowFor !== 0)
                            SWEETALERT.loading({
                                message: `${MESSAGE.ic('mono.importing')} ${MESSAGE.ic('mono.multiple')} ${MESSAGE.ic('mono.rows')} ${$scope.procesingRow} ${MESSAGE.i('mono.of')} ${$scope.procesingRowFor}`
                            }, false);

                        if ($scope.procesingRow === $scope.procesingRowFor || $scope.procesingRowFor === 0) {
                            $scope.procesingRow = 0;
                            $scope.procesingRowFor = 0;
                            SWEETALERT.stop();
                            $scope.refresh();
                            SWEETALERT.show({message: MESSAGE.i('alerts.ALLFILEIMPORT')});
                        }
                        for (const relation of row.relations) {
                            for (const value of relation.values) {
                                var relaRow = {};
                                eval(`relaRow.${relation.to} = \`${savedRow.id}\`;`);
                                eval(`relaRow.${relation.from} = \`${value}\`;`);
                                BASEAPI.insert(relation.table, relaRow, function (relResult) {

                                });
                            }
                        }
                    } else {
                        $scope.procesingRow++;
                        $scope.procesingRowErrors.push(result.data, ERROR.category.database);
                        if ($scope.procesingRow === $scope.procesingRowFor || $scope.procesingRowFor === 0) {
                            $scope.procesingRow = 0;
                            $scope.procesingRowFor = 0;
                            $scope.refresh();
                            SWEETALERT.stop();
                            ERROR.multiAlert($scope.procesingRowErrors, ERROR.category.database);
                        }
                    }
                    $scope.importRow();
                });
            }
        };
        $scope.copyMultiple = async function () {

            var forCopy = $scope.records.data.filter(function (item) {
                return item.selected === true;
            });
            if (forCopy.length === 0) {
                SWEETALERT.show({message: MESSAGE.i('alerts.YMCopys')});
                return;
            }

            var formatRows = [];

            forCopy.forEach(function (data) {
                var formatRow = {};
                for (var i in eval(`CRUD_${$scope.modelName}`).table.columns) {
                    var column = eval(`CRUD_${$scope.modelName}`).table.columns[i];
                    var key = i;
                    var alter = column.exportKey !== undefined ? column.exportKey : i;
                    if (eval(`CRUD_${$scope.modelName}`).table.columns[key].exportExample !== false) {
                        var exampleText = eval(`CRUD_${$scope.modelName}`).table.columns[key].exportExample;
                        exampleText = exampleText === undefined ? "[string]" : exampleText;
                        var realValue = eval(`data.${key};`);
                        if (!DSON.oseaX(realValue)) {
                            if (column.link !== undefined) {
                                realValue = eval(`data.${key.split('_')[0]}_${key.split('_')[1]}_id;`);
                            }
                            eval(`formatRow.${alter} = \`${realValue}\`;`);
                        }
                    }
                }
                formatRows.push(formatRow);
            });

            SWEETALERT.confirm({
                title: MESSAGE.i('mono.CopyRecords'),
                message: MESSAGE.i('alerts.Copys'),
                confirm: function () {
                    SWEETALERT.loading({message: MESSAGE.ic('mono.copyng')});
                    var records = formatRows;
                    var columns = eval(`CRUD_${$scope.modelName}`).table.columns;
                    var inserts = [];
                    for (var i in records) {
                        var record = records[i];
                        var row = {};
                        for (var i in record) {
                            var key = i;
                            var value = record[i];
                            for (var c in columns) {
                                var column = false;
                                if (c === key || key === columns[c].exportKey)
                                    column = columns[c];
                                if (column === false) continue;
                                eval(`row.${key} = \`${value}\`;`);
                                break;
                            }
                        }
                        inserts.push({row: row, relations: []});
                    }
                    STEP.register({
                        scope: $scope.modelName,
                        action: `${MESSAGE.ic('mono.copy')} ${inserts.length} ${MESSAGE.ic('mono.rows')}`
                    });
                    $scope.importing(inserts);
                }
            });
            return false;
        };
        $scope.fileManager = function () {
            var root = `${$scope.modelName}/imports_files/`;
            baseController.viewData = {
                root: root,
                scope: $scope,
                maxfiles: 8,
                acceptedFiles: 'text/csv,application/vnd.ms-excel',
                columns: 4,
            };
            $scope.modal.modalView("../templates/components/import", {
                width: 'modal-full',
                header: {
                    title: `${MESSAGE.i('export.Importfilesof')} ${$scope.modelName}`,
                    icon: "file-excel"
                },
                footer: {
                    cancelButton: true
                },
                content: {
                    loadingContentText: MESSAGE.i('actions.Loading')
                },
            });
        };
    }
};
