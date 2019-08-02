TABLEOPTIONS = {
    run: function ($scope) {
        if (eval(`typeof CRUD_${$scope.modelName} !=='undefined'`)) {
            $scope.options = eval(`CRUD_${$scope.modelName}`).table.options;
            $scope.option = {};
            $scope.option.data = "{$scope:$scope.modelName,column:value,key:key,row:row}";
            $scope.lastMenu = 0;
            $scope.getOptions = function (isModal) {
                if (isModal === true) {
                    if (!DSON.oseaX(ARRAY.last(MODAL.historyObject)))
                        return eval(`CRUD_${$scope.modelName}`).table.options;
                }
                else return $scope.options;
            };
            $scope.firstCountOption = function (isModal) {
                if (isModal === true) {
                    if (!DSON.oseaX(ARRAY.last(MODAL.historyObject))) {
                        if (eval(`CRUD_${$scope.modelName}`).table.options !== null) {
                            return eval(`CRUD_${$scope.modelName}`).table.options[0].menus.length
                        }
                    }
                }
                else {
                    if ($scope.options !== null)
                        return $scope.options[0].menus.length;
                }
                return 0;
            };
            $scope.currentOptionsContext = function () {
                if (!DSON.oseaX($scope.options)) {
                    if (!DSON.oseaX($scope.options[$scope.lastMenu])) {
                        if (DSON.oseaX($scope.options[$scope.lastMenu].menus)) {
                            menus = [];
                            var count = 0;
                            for (const option of $scope.options) {
                                if (DSON.oseaX(option.menus)) {
                                    menus.push(option);
                                    count++;
                                }
                            }
                            return {menus: menus, count: count};
                        }
                        return {menus: $scope.options[$scope.lastMenu].menus, count: 1};
                    }
                }
            };
            $scope.option.text = (option, row, last, isModal) => {
                if (DSON.oseaX(isModal))
                    if (last === true) row = $scope.lastRow;
                if (DSON.oseaX(option.text))
                    return 'No text set';
                if (typeof option.text === "function")
                    return option.text({$scope: $scope, row: row});
                else
                    return option.text;
            };
            $scope.option.replaceAction = function (text) {
                var replacesValues = [" "];
                var newText = text;
                for (const argument of replacesValues) {
                    newText = newText.replaceAll(argument, "");
                }
                return newText;
            };
            $scope.option.action = (option, row, last, isModal) => {
                if (DSON.oseaX(isModal))
                    if (last === true) row = $scope.lastRow;
                if (DSON.oseaX(option.text))
                    return 'noaction';
                if (typeof option.text === "function")
                    return $scope.option.replaceAction(option.text({$scope: $scope, row: row}));
                else
                    return $scope.option.replaceAction(option.text);
            };
            $scope.option.title = (option, row, last, isModal) => {
                if (last === true) row = $scope.lastRow;
                if (DSON.oseaX(option.title))
                    return 'No title set';
                if (typeof option.title === "function")
                    return option.title({$scope: $scope, row: row});
                else
                    return option.title;
            };
            $scope.option.icon = (option, row, last, isModal) => {
                if (DSON.oseaX(isModal))
                    if (last === true) row = $scope.lastRow;
                if (DSON.oseaX(option.icon))
                    return 'icon-x';
                if (typeof option.icon === "function")
                    return option.icon({$scope: $scope, row: row});
                else
                    return option.icon;
            };
            $scope.option.permission = (option, row, last, isModal) => {

                if (DSON.oseaX(isModal))
                    if (last === true) row = $scope.lastRow;
                if (DSON.oseaX(option.permission))
                    return '';
                if (typeof option.permission === "function")
                    return option.permission({$scope: $scope, row: row});
                else
                    return option.permission;
            };
            $scope.option.characterist = (option, row, last, isModal) => {
                if (DSON.oseaX(isModal))
                    if (last === true) row = $scope.lastRow;
                if (DSON.oseaX(option.characterist))
                    return '';
                if (typeof option.characterist === "function")
                    return option.characterist({$scope: $scope, row: row});
                else
                    return option.characterist;
            };
            $scope.option.click = function (option, row, alerty, last, isModal) {
                if (DSON.oseaX(isModal))
                    if (last === true) row = $scope.lastRow;
                alerty = DSON.ifundefined(alerty, true);
                if (DSON.oseaX(option.click)) {
                    if (alerty)
                        alert('No Options Yet');
                    return;
                }
                if (typeof option.click === "function")
                    return option.click({$scope: $scope, row: row});
                else
                    return option.click;
            };
            $scope.option.show = function (option, row, last, isModal) {
                if (DSON.oseaX(isModal))
                    if (last === true) row = $scope.lastRow;
                if (DSON.oseaX(option.show))
                    return true;
                if (typeof option.show === "function")
                    return option.show({$scope: $scope, row: row});
                else
                    return option.show;
            };
        }
    },
};