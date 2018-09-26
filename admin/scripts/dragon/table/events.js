TABLEEVENT = {
    run: function ($scope, $http, $compile) {
        $scope.cell = {};
        $scope.cell.selected = [];
        $scope.events = ['click', 'dblclick', 'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseup'];
        $scope.events.forEach(function (obj) {
            eval(" $scope.cell." + obj + " = function (key, column, row, element) {\n" +
                "            var value = eval(\"row.\" + key);\n" +
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
                "            if (typeof column." + obj + " === \"function\") \n" +
                "                column." + obj + "(data);" +
                "            if(typeof $scope.cell.extend" + obj + "===\"function\") " +
                "                $scope.cell.extend" + obj + "(data);" +
                "            " +
                "        };");
        });

        $scope.cell.extendclick = function (data) {
            if (data.column.shorttext) {
                var shorttext = data.value;
                if (shorttext.length > data.column.shorttext) {
                    $scope.modal.simpleModal(data.value, {
                        header: {title: 'Full text of ' + data.column.label},
                    });
                }
            }
        };

        $scope.cell.select = function (event) {
            $("tr").removeClass('alpha-' + COLOR.info);
            var classElement = 'bg-' + COLOR.info;
            if (!$(event.currentTarget).parent().hasClass(classElement))
                $(event.currentTarget).parent().addClass('alpha-' + COLOR.info);
        };

        $scope.cell.dblselect = function (event) {
            var classElement = 'bg-' + COLOR.info;
            if ($(event.currentTarget).hasClass(classElement))
                $(event.currentTarget).removeClass('bg-' + COLOR.info);
            else
                $(event.currentTarget).addClass('bg-' + COLOR.info);
        };


    }
};