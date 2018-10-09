PERMISSIONS = {
    run: function ($scope) {
        $scope.allow = function (permisionName, or) {
            if ($scope.table.crud.table.allow !== undefined && permisionName !== "") {
                or = DSON.ifundefined(or, true);
                if (Array.isArray(permisionName)) {
                    for (const permisionNameElement of permisionName) {
                        if (or) {
                            if (eval("$scope.table.crud.table.allow." + permisionNameElement + " !== false;") === true)
                                return true;
                        } else {
                            if (eval("$scope.table.crud.table.allow." + permisionNameElement + " !== false;") === false)
                                return false;
                        }
                    }
                }
                else
                    return eval("$scope.table.crud.table.allow." + permisionName + " !== false;");
                return !or;
            }
            return true;
        };
        $scope.characterist = function (characterist, or) {
            if ($scope.table.crud.table !== undefined && characterist !== "") {
                or = DSON.ifundefined(or, true);
                if (Array.isArray(characterist)) {
                    for (const permisionNameElement of characterist) {
                        if (or) {
                            if (eval("$scope.table.crud.table." + permisionNameElement + " !== false;") === true)
                                return true;
                        } else {
                            if (eval("$scope.table.crud.table." + permisionNameElement + " !== false;") === false)
                                return false;
                        }
                    }
                }
                else
                    return eval("$scope.table.crud.table." + characterist + " !== false;");
                return !or;
            }
            return true;
        };
    }
};