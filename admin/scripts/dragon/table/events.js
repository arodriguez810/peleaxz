TABLEEVENT = {
    run: function ($scope, $http, $compile) {
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
                "                    $http: $http,\n" +
                "                    $compile: $compile,\n" +
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
            data.column = eval("$scope.table.crud.table.columns." + data.column);
            if (data.column.link && data.column.reference !== false) {
                if (!DSON.oseaX(data.value)) {
                    var mylink = data.column.link;
                    var id = data.value;
                    SWEETALERT.loading({message: mylink.modal.content.loadingContentText});
                    var linkCrud = eval("CRUD_" + mylink.table);
                    BASEAPI.list(mylink.table,
                        {
                            limit: 1,
                            page: 1,
                            orderby: linkCrud.table.key || "id",
                            order: "asc",
                            join: linkCrud.table.single,
                            where: [
                                {
                                    field: linkCrud.table.key,
                                    value: id
                                }
                            ]
                        }
                        , function (info) {
                            SWEETALERT.stop();
                            baseController.viewData = {
                                from: $scope.modelName,
                                to: mylink.table,
                                data: [
                                    {
                                        field: linkCrud.table.key,
                                        value: id
                                    }
                                ],
                                onedata: info.data,
                                crud: linkCrud
                            };
                            mylink.modal.content.sameController = true;
                            var oldTitle = mylink.modal.header.title;
                            mylink.modal.header.title = `Quick ${$scope.columnLabel(data.column, data.field)} view`;
                            $scope.modal.modalView(String.format("{0}", mylink.table), mylink.modal);
                            mylink.modal.header.title = oldTitle;
                        });
                }
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
                var oldTitle = data.column.files.modal.header.title;
                data.column.files.modal.header.title = DSON.template(data.column.files.modal.header.title, data.row)
                $scope.modal.modalView("../templates/components/gallery", data.column.files.modal);
                data.column.files.modal.header.title = oldTitle;
                return;
            }

            if (data.column.multilink && data.column.reference !== false) {
                var mylink = data.column.multilink;
                var id = eval("data.row." + mylink.from);
                SWEETALERT.loading({message: DSON.template(mylink.modal.content.loadingContentText, data.row)});
                var linkCrud = eval("CRUD_" + mylink.table);
                BASEAPI.list(mylink.table,
                    {
                        limit: 0,
                        page: 1,
                        orderby: linkCrud.table.key || "id",
                        order: "asc",
                        join: linkCrud.table.single,
                        where: [
                            {
                                field: mylink.to,
                                value: id
                            }
                        ]
                    }
                    , function (info) {
                        SWEETALERT.stop();
                        multiarray = [];
                        info.data.forEach(function (item) {
                            multiarray.push(eval("item." + mylink.getList));
                        });
                        var oldTitle = mylink.modal.header.title;
                        mylink.modal.header.title = DSON.template(mylink.modal.header.title, data.row);
                        baseController.viewData = {
                            from: $scope.modelName,
                            to: mylink.list,
                            data: [
                                {
                                    field: mylink.wherelist,
                                    value: multiarray
                                }
                            ],
                            crud: linkCrud
                        };

                        baseController.viewData.readonly = eval(`({${mylink.to}:'${id}'})`);
                        baseController.viewData.fieldKey = mylink.to;
                        $scope.modal.modalView(String.format("{0}", mylink.list), mylink.modal);
                        mylink.modal.header.title = oldTitle;
                    });
                return;
            }
            if (data.column.link && data.column.reference !== false) {
                if (!DSON.oseaX(data.value)) {
                    var mylink = data.column.link;
                    var id = eval("data.row." + mylink.from);
                    SWEETALERT.loading({message: mylink.modal.content.loadingContentText});
                    var linkCrud = eval("CRUD_" + mylink.table);
                    BASEAPI.list(mylink.table,
                        {
                            limit: 1,
                            page: 1,
                            orderby: linkCrud.table.key || "id",
                            order: "asc",
                            join: linkCrud.table.single,
                            where: [
                                {
                                    field: linkCrud.table.key,
                                    value: id
                                }
                            ]
                        }
                        , function (info) {
                            SWEETALERT.stop();
                            baseController.viewData = {
                                from: $scope.modelName,
                                to: mylink.table,
                                data: [
                                    {
                                        field: linkCrud.table.key,
                                        value: id
                                    }
                                ],
                                onedata: info.data,
                                crud: linkCrud
                            };
                            mylink.modal.content.sameController = true;
                            var oldTitle = mylink.modal.header.title;
                            mylink.modal.header.title = DSON.template(mylink.modal.header.title, data.row);
                            $scope.modal.modalView(String.format("{0}", mylink.table), mylink.modal);
                            mylink.modal.header.title = oldTitle;
                        });
                    return;
                }
            }

            if (data.column.shorttext) {
                var shorttext = data.value;
                if (!DSON.oseaX(shorttext))
                    if (shorttext.length > data.column.shorttext) {
                        $scope.modal.simpleModal(data.value, {
                            header: {title: "Full text of " + data.column.label}
                        });
                    }
            } else {
                if (!DSON.oseaX(data.column.formattype)) {
                    if (data.column.formattype.indexOf("html") !== -1) {
                        $scope.modal.simpleModal(data.value || "", {
                            header: {title: "HTML content of " + data.column.label}
                        });
                    } else if (data.column.formattype.indexOf("color") !== -1) {
                        LOAD.template('templates/components/color', {color: data.value}, function (html) {
                            $scope.modal.simpleModal(html, {header: {title: 'Color Detail'}});
                        });
                    } else if (data.column.formattype.indexOf("location") !== -1) {
                        if (!DSON.oseaX(data.value)) {
                            var location = data.value.split(';');
                            if (location.length > 1) {
                                var lat = parseFloat(location[0]);
                                var lng = parseFloat(location[1]);
                                var name = data.column.formattype.split(':');
                                name = name.length > 1 ? (eval("data.row." + name[1]) + " location") : "Map View";
                                $scope.modal.map({lat: lat, lng: lng}, name, {header: {title: name}});
                            }
                        }
                    } else if (data.column.formattype.indexOf("file") !== -1) {
                        var format = data.column.formattype.split(":");
                        format = format.length > 1 ? format[1] : "";
                        var fileUrl = HTTP.path([CONFIG.filePath, data.value]);


                        if (!DSON.oseaX(data.value)) {
                            switch (format) {
                                case "image": {
                                    LOAD.template('templates/components/crop', {src: fileUrl}, function (html) {
                                        $scope.modal.simpleModal(html, {header: {title: 'Image Full Preview'}});
                                    });
                                    break;
                                }
                                case "all": {
                                    if (FILE.noSupport(data.value)) {
                                        return;
                                    }
                                    if (FILE.isImage(data.value)) {
                                        LOAD.template('templates/components/crop', {src: fileUrl}, function (html) {
                                            $scope.modal.simpleModal(html, {header: {title: 'Image Full Preview'}});
                                        });
                                    } else {
                                        $scope.modal.simpleModal("<object style='width: 100%;height: 100%' data=\"" + fileUrl + "\"></object>", {header: {title: 'Preview'}});
                                    }
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        };
        $scope.cell.dblColumnSelect = function (event) {
            var dataColumn = $(event.currentTarget).data('column');
            $("[data-column=" + dataColumn + "]:not(th)").each(function () {
                var control = $(this);
                if (control.hasClass("alpha-" + COLOR.info))
                    control.removeClass("alpha-" + COLOR.info);
                else {
                    control.addClass("alpha-" + COLOR.info);
                }
            });

        };
        $scope.cell.select = function (event, row) {
            $("tr").removeClass("alpha-" + COLOR.info);
            $("td").removeClass("alpha-" + COLOR.info);
            var classElement = "bg-" + COLOR.info;
            if (!$(event.currentTarget).parent().hasClass(classElement))
                if (row.selected !== true)
                    if ($scope.activeSET(row) !== false)
                        $(event.currentTarget).parent().addClass("alpha-" + COLOR.info);
        };
        $scope.cell.dblselect = function (row) {
            if (!DSON.oseaX(row)) {
                $scope.dataForView = row;
                $scope.modal.modalView(String.format("{0}/view", $scope.modelName), {
                    header: {
                        title: "View of " + $scope.plural,
                        icon: ICON.classes.list
                    },
                    footer: {
                        cancelButton: true
                    },
                    content: {
                        loadingContentText: "Loading...",
                        sameController: true
                    },
                });
            }
        };
        $scope.beforeDelete = function (data) {

        };
        $scope.afterDelete = function (data) {

        };
        $scope.deleteRow = async function (row) {
            var where = [];
            for (const deletekey of $scope.table.crud.table.deletekeys)
                where.push({field: deletekey, value: eval("row." + deletekey)});
            $scope.beforeDelete(row);
            $scope.delete(where, function (result) {
                if (result.data.error === false) {
                    $scope.afterDelete(row);
                    $scope.procesingRow++;
                    if ($scope.procesingRowFor !== 0)
                        SWEETALERT.loading({
                            message: `Deleting Multiple Rows ${$scope.procesingRow} of ${$scope.procesingRowFor}`
                        }, false);

                    if ($scope.procesingRow === $scope.procesingRowFor || $scope.procesingRowFor === 0) {
                        $scope.procesingRow = 0;
                        $scope.procesingRowFor = 0;
                        SWEETALERT.stop();
                    }
                    $scope.records.data = $scope.records.data.filter(function (item) {
                        var goOut = 0;
                        for (const deletekey of $scope.table.crud.table.deletekeys) {
                            if (eval("item." + deletekey) === eval("row." + deletekey))
                                goOut++;
                        }
                        if (goOut === $scope.table.crud.table.deletekeys.length) {
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
                        SWEETALERT.stop();
                        ERROR.multiAlert($scope.procesingRowErrors, ERROR.category.database);
                    }
                }

            });
        };
        $scope.deleteSelected = function () {
            var forDelte = $scope.records.data.filter(function (item) {
                return item.selected === true;
            });
            if (forDelte.length === 0) {
                SWEETALERT.show({message: "You must select any row for delete."});
                return;
            }
            SWEETALERT.confirm({
                message: "¿Are you sure you want delete this records?",
                confirm: async function () {

                    $scope.procesingRow = 0;
                    $scope.procesingRowFor = forDelte.length;
                    SWEETALERT.loading({message: `Deleting Multiple Rows ${$scope.procesingRow} of ${$scope.procesingRowFor}`});
                    $scope.deleteRows(forDelte);
                }
            });
        };
        $scope.deleteRows = function (forDelte) {
            for (const item of forDelte) {
                $scope.deleteRow(item);
            }
        };
        $scope.activeRow = async function (row, active) {
            $("tr").removeClass("alpha-" + COLOR.info);
            $("td").removeClass("alpha-" + COLOR.info);
            var where = [];
            for (const deletekey of $scope.table.crud.table.deletekeys)
                where.push({field: deletekey, value: eval("row." + deletekey)});
            var data = {};
            eval(`data.${$scope.activeColumn()} = ${active}`);
            data.where = where;
            var actionText = active ? 'Activing' : 'Disabling';
            $scope.update(data, function (result) {
                if (result.data.error === false) {
                    $scope.procesingRow++;
                    if ($scope.procesingRowFor !== 0)
                        SWEETALERT.loading({
                            message: `${actionText} Multiple Rows ${$scope.procesingRow} of ${$scope.procesingRowFor}`
                        }, false);

                    if ($scope.procesingRow === $scope.procesingRowFor || $scope.procesingRowFor === 0) {
                        $scope.procesingRow = 0;
                        $scope.procesingRowFor = 0;
                        SWEETALERT.stop();
                    }
                    $scope.records.data = $scope.records.data.filter(function (item) {
                        var goOut = 0;
                        for (const deletekey of $scope.table.crud.table.deletekeys) {
                            if (eval("item." + deletekey) === eval("row." + deletekey))
                                goOut++;
                        }
                        if (goOut === $scope.table.crud.table.deletekeys.length) {
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
                        SWEETALERT.stop();
                        ERROR.multiAlert($scope.procesingRowErrors, ERROR.category.database);
                    }
                }
            });
        };
        $scope.activeRows = function (forDelte, active) {
            for (const item of forDelte) {
                $scope.activeRow(item, active);
            }
        };
        $scope.activeSelected = function (active) {
            var forDelte = $scope.records.data.filter(function (item) {
                return item.selected === true;
            });
            var actionText = active ? 'active' : 'disable';
            var actionTextMultiple = active ? 'Activing' : 'Disabling';
            var value = active ? 1 : 0;
            if (forDelte.length === 0) {
                SWEETALERT.show({message: "You must select any row for " + actionText});
                return;
            }
            SWEETALERT.confirm({
                message: "¿Are you sure you want " + actionText + " this records?",
                confirm: async function () {
                    $scope.procesingRow = 0;
                    $scope.procesingRowFor = forDelte.length;
                    SWEETALERT.loading({message: `${actionTextMultiple} Multiple Rows ${$scope.procesingRow} of ${$scope.procesingRowFor}`});
                    STEP.register({
                        scope: $scope.modelName, action: `Active ${forDelte.length} Rows`
                    });
                    $scope.activeRows(forDelte, value);
                }
            });
        };
        $scope.importing = function (data) {
            $scope.procesingRow = 0;
            $scope.procesingRowFor = data.length;
            SWEETALERT.loading({message: `Importing Multiple Rows ${$scope.procesingRow} of ${$scope.procesingRowFor}`});
            $scope.procesingRowErrors = [];
            STEP.register({
                scope: $scope.modelName, action: `Importing ${data.length} Rows`
            });
            for (const item of data) {
                $scope.importRow(item);
            }
        };
        $scope.importRow = async function (item) {
            $scope.insertID(item.row, '', '', function (result) {
                if (result.data.error === false) {
                    var savedRow = result.data.data[0];
                    $scope.procesingRow++;
                    if ($scope.procesingRowFor !== 0)
                        SWEETALERT.loading({
                            message: `Importing Multiple Rows ${$scope.procesingRow} of ${$scope.procesingRowFor}`
                        }, false);

                    if ($scope.procesingRow === $scope.procesingRowFor || $scope.procesingRowFor === 0) {
                        $scope.procesingRow = 0;
                        $scope.procesingRowFor = 0;
                        SWEETALERT.stop();
                        SWEETALERT.show({message: "All files was imported successfully, please close this window and refresh the list to see the imported records."});
                    }
                    for (const relation of item.relations) {
                        for (const value of relation.values) {
                            var relaRow = {};
                            eval(`relaRow.${relation.to} = '${savedRow.id}';`);
                            eval(`relaRow.${relation.from} = '${value}';`);
                            $scope.insertFrom(relation.table, relaRow, function (relResult) {

                            });
                        }
                    }
                    return true;
                } else {
                    $scope.procesingRow++;
                    $scope.procesingRowErrors.push(result.data, ERROR.category.database);
                    if ($scope.procesingRow === $scope.procesingRowFor || $scope.procesingRowFor === 0) {
                        $scope.procesingRow = 0;
                        $scope.procesingRowFor = 0;
                        SWEETALERT.stop();
                        ERROR.multiAlert($scope.procesingRowErrors, ERROR.category.database);
                    }
                }
            });
        };
        $scope.copyMultiple = async function () {

            var forCopy = $scope.records.data.filter(function (item) {
                return item.selected === true;
            });
            if (forCopy.length === 0) {
                SWEETALERT.show({message: "You must select any row for copy."});
                return;
            }

            var formatRows = [];

            forCopy.forEach(function (data) {
                var formatRow = {};
                for (var i in $scope.table.crud.table.columns) {
                    var column = $scope.table.crud.table.columns[i];
                    var key = i;
                    var alter = column.exportKey !== undefined ? column.exportKey : i;
                    if ($scope.table.crud.table.columns[key].exportExample !== false) {
                        var exampleText = $scope.table.crud.table.columns[key].exportExample;
                        exampleText = exampleText === undefined ? "[string]" : exampleText;
                        var realValue = eval(`data.${key};`);
                        if (!DSON.oseaX(realValue)) {
                            if (column.link !== undefined) {
                                realValue = eval(`data.${key.split('_')[0]}_${key.split('_')[1]}_id;`);
                            }
                            eval(`formatRow.${alter} = '${realValue}';`);
                        }
                    }
                }
                formatRows.push(formatRow);
            });

            SWEETALERT.confirm({
                title: 'Copy Records',
                message: "This option copy all record selected without relations and paste in news rows with last ID. <br> ¿Are you sure you want copy selected records?",
                confirm: function () {
                    SWEETALERT.loading({message: "Copyng Records..."});
                    var records = formatRows;
                    var columns = $scope.table.crud.table.columns;
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
                                eval(`row.${key} = '${value}';`);
                                break;
                            }
                        }
                        inserts.push({row: row, relations: []});
                    }
                    STEP.register({
                        scope: $scope.modelName, action: `Copy ${inserts.length} Rows`
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
                    title: `Import files of ${$scope.modelName}`,
                    icon: ICON.classes.file_excel
                },
                footer: {
                    cancelButton: true
                },
                content: {
                    loadingContentText: "Loading Files.."
                },
            });
        };
    }
};
