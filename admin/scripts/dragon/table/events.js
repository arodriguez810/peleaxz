TABLEEVENT = {
    run: function ($scope, $http, $compile) {
        $scope.cell = {};
        $scope.cell.selected = [];
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
                        $scope.modal.simpleModal(data.value||"", {
                            header: {title: "HTML content of " + data.column.label}
                        });
                    } else if (data.column.formattype.indexOf("color") !== -1) {
                        LOAD.template('templates/components/color', {color: data.value}, function (html) {
                            $scope.modal.simpleModal(html, {header: {title: 'Color Detail'}});
                        });
                    } else if (data.column.formattype.indexOf("location") !== -1) {
                        if (!DSON.oseaX(data.value)) {
                            var location = data.value.split(',');
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
                    $(event.currentTarget).parent().addClass("alpha-" + COLOR.info);
        };
        $scope.cell.dblselect = function (event) {
            $("td").removeClass("alpha-" + COLOR.info);
            var classElement = "bg-" + COLOR.info;
            if ($(event.currentTarget).hasClass(classElement))
                $(event.currentTarget).removeClass("bg-" + COLOR.info);
            else $(event.currentTarget).addClass("bg-" + COLOR.info);
        };

        $scope.procesingRow = 0;
        $scope.procesingRowFor = 0;
        $scope.deleteRow = async function (row) {
            var where = [];
            for (const deletekey of $scope.table.crud.table.deletekeys)
                where.push({field: deletekey, value: eval("row." + deletekey)});
            $scope.delete(where, function (result) {
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
            var where = [];
            for (const deletekey of $scope.table.crud.table.deletekeys)
                where.push({field: deletekey, value: eval("row." + deletekey)});
            var data = {};
            eval(`data.${$scope.activeColumn()} = ${active}`);
            data.where = where;
            var actionText = active ? 'Activing' : 'Disabling';
            $scope.update(data, function (result) {
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
                    $scope.activeRows(forDelte, value);
                }
            });
        };

        $scope.importing = function (data) {

            $scope.procesingRow = 0;
            $scope.procesingRowFor = data.length;
            SWEETALERT.loading({message: `Importing Multiple Rows ${$scope.procesingRow} of ${$scope.procesingRowFor}`});
            for (const item of data) {
                $scope.importRow(item);
            }
        };


        $scope.importRow = async function (item) {
            $scope.insertID(item.row, function (result) {
                if(result.data.error===false) {
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
                    }
                    for (const relation of item.relations) {
                        for (const value of relation.values) {
                            var relaRow = {};
                            eval(`relaRow.${relation.to} = '${savedRow.id}';`);
                            eval(`relaRow.${relation.from} = '${value}';`);
                            console.log(relaRow);
                            $scope.insertFrom(relation.table, relaRow, function (relResult) {

                            });
                        }
                    }
                    return true;
                }else{

                }
            });
        };

    }
};
