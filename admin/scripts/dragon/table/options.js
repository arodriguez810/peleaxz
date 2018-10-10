TABLEOPTIONS = {
    run: function ($scope) {
        $scope.options = $scope.table.crud.table.options;
        $scope.option = {};
        $scope.option.data = "{$scope:$scope.modelName,column:value,key:key,row:row}";
        $scope.option.text = (option, key, row, last) => {
            if (last === true) row = $scope.lastRow;
            if (DSON.oseaX(option.text))
                return '';
            if (typeof option.text === "function")
                return option.text({$scope: $scope, key: key, row: row});
            else
                return option.text;
        };
        $scope.option.icon = (option, key, row, last) => {
            if (last === true) row = $scope.lastRow;
            if (DSON.oseaX(option.icon))
                return '';
            if (typeof option.icon === "function")
                return option.icon({$scope: $scope, key: key, row: row});
            else
                return option.icon;
        };
        $scope.option.permission = (option, key, row, last) => {
            if (last === true) row = $scope.lastRow;
            if (DSON.oseaX(option.permission))
                return '';
            if (typeof option.permission === "function")
                return option.permission({$scope: $scope, key: key, row: row});
            else
                return option.permission;
        };
        $scope.option.characterist = (option, key, row, last) => {
            if (last === true) row = $scope.lastRow;
            if (DSON.oseaX(option.characterist))
                return '';
            if (typeof option.characterist === "function")
                return option.characterist({$scope: $scope, key: key, row: row});
            else
                return option.characterist;
        };
        $scope.option.click = function (option, key, row, alerty, last) {
            if (last === true) row = $scope.lastRow;
            alerty = DSON.ifundefined(alerty, true);
            if (DSON.oseaX(option.click)) {
                if (alerty)
                    alert('No Options Yet');
                return;
            }
            if (typeof option.click === "function")
                return option.click({$scope: $scope, key: key, row: row});
            else
                return option.click;
        };
        $scope.option.show = function (option, key, row, last) {
            if (last === true) row = $scope.lastRow;
            if (DSON.oseaX(option.show))
                return true;
            if (typeof option.show === "function")
                return option.show({$scope: $scope, key: key, row: row});
            else
                return option.show;
        };
    },

};