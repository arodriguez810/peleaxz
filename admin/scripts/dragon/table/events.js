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

        $scope.cell.extendclick = function (data) {


            if (data.column.multilink) {
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
                        $scope.viewData = {
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
            if (data.column.link) {
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
                            $scope.viewData = {
                                from: $scope.modelName,
                                to: mylink.table,
                                data: info.data,
                                crud: linkCrud
                            };
                            mylink.modal.content.sameController = true;
                            var oldTitle = mylink.modal.header.title;
                            mylink.modal.header.title = DSON.template(mylink.modal.header.title, data.row);
                            $scope.modal.modalView(String.format("{0}/detail", $scope.modelName), mylink.modal);
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
                    if (data.column.formattype.indexOf("location") !== -1) {
                        console.log(data.column.formattype);
                        if (!DSON.oseaX(data.value)) {
                            var location = data.value.split(',');
                            if (location.length > 1) {
                                var lat = parseFloat(location[0]);
                                var lng = parseFloat(location[1]);
                                var name = data.column.formattype.split(':');
                                name = name.length > 1 ? (eval("data.row." + name[1]) + " location") : "Map View";
                                console.log(name);
                                $scope.modal.map({lat: lat, lng: lng}, name, {header: {title: name}});
                            }
                        }
                    } else if (data.column.formattype.indexOf("file") !== -1) {
                        var format = data.column.formattype.split(":");
                        format = format.length > 1 ? format[1] : "";
                        var fileUrl = String.format("{0}/{1}", CONFIG.filePath, data.value);
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
    }
};
