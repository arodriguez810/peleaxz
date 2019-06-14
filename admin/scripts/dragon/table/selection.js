TABLESELECTION = {
    run: function ($scope) {
        $scope.checkall = false;
        $scope.drawCheck = function (key, row) {
            if (row !== undefined) {

                if ($scope.characterist('batch')) {
                    return "<i  class=\"dragoncheck text-" + COLOR.primary + "-900 " + $scope.checkIcon(row.selected) + " \"></i>";
                }

            } else {

                if ($scope.characterist('batch')) {
                    return "<i   class=\"dragoncheck " + $scope.checkAllIcon($scope.checkall) + "\"></i>";
                }
            }
            return "";
        };

        $scope.drawHandler = function () {
            return "<i class=\"draganddroghandler text-black-300 " + "icon-sort" + " \"></i>";
        };

        $scope.columnToSelect = function () {
            var columns = $scope.columns();
            for (var key in columns) {
                if (columns[key].visible !== false) {
                    return key;
                }
            }
            return "";
        };
        $scope.checkIcon = function (value) {
            return (value === true ? 'icon-checkmark4' : "icon-checkbox-unchecked");
        };
        $scope.checkAllIcon = function (value) {
            var icon = "icon-checkbox-unchecked";
            if ($scope.atLeastOneCheck()) {
                icon = "icon-checkbox-partial";
            }
            return (value === true ? "icon-checkmark4" : icon);
        };
        $scope.checkAll = function () {
            $("tr").removeClass("alpha-" + COLOR.secundary);
            if ($scope.stopInteraction()) return false;
            $scope.checkall = !$scope.checkall;
            for (const row of $scope.records.data) {
                $scope.check(row, $scope.checkall);
            }
        };
        $scope.unCheckAll = function () {
            $("tr").removeClass("alpha-" + COLOR.secundary);
            for (const row of $scope.records.data) {
                $scope.check(row, false);
            }
        };
        $scope.trCheck = function (row) {
            return row.selected === true ? ("bg-" + COLOR.secundary + "-300 text-black") : '';
        };
        $scope.check = function (row, realvalue) {
            if (row.selected === undefined)
                row.selected = realvalue !== undefined ? realvalue : true;
            else
                row.selected = realvalue !== undefined ? realvalue : (!row.selected);

            if (realvalue === undefined) {
                if (!$scope.isAllChecked()) {
                    $scope.checkall = false;
                } else
                    $scope.checkall = true;
            }
        };
        $scope.atLeastOneCheck = function () {
            if ($scope.records.data !== undefined)
                for (const row of $scope.records.data) {
                    if (row.selected === true) {
                        return true;
                    }
                }
            return false;
        };
        $scope.isAllChecked = function () {
            for (const row of $scope.records.data) {
                if (row.selected !== true)
                    return false;
            }
            return true;
        };
    }
};