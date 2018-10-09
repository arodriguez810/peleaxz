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
            if (data.column.shorttext) {
                var shorttext = data.value;
                if (!DSON.oseaX(shorttext))
                    if (shorttext.length > data.column.shorttext) {
                        $scope.modal.simpleModal(data.value, {
                            header: {title: "Full text of " + data.column.label}
                        });
                    }
            } else if (data.column.formattype.indexOf("location") !== -1) {
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
                var fileUrl = String.format("{0}/{1}/{2}", CONFIG.filePath, $scope.modelName, data.value);
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
        };

        $scope.cell.select = function (event, row) {
            $("tr").removeClass("alpha-" + COLOR.info);
            var classElement = "bg-" + COLOR.info;
            if (!$(event.currentTarget).parent().hasClass(classElement))
                if (row.selected !== true)
                    $(event.currentTarget).parent().addClass("alpha-" + COLOR.info);
        };

        $scope.cell.dblselect = function (event) {
            var classElement = "bg-" + COLOR.info;
            if ($(event.currentTarget).hasClass(classElement))
                $(event.currentTarget).removeClass("bg-" + COLOR.info);
            else $(event.currentTarget).addClass("bg-" + COLOR.info);
        };
    }
};
