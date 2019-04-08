PERMISSIONS = {
    run: function ($scope) {
        $scope.allow = function (permisionName, or, isModal) {
            var finalCrud = eval(`CRUD_${$scope.modelName}`);
            if (isModal)
                if (!DSON.oseaX(ARRAY.last(MODAL.historyObject)))
                    finalCrud = eval(`CRUD_${$scope.modelName}`);
            if (finalCrud.table.allow !== undefined && permisionName !== "") {
                or = DSON.ifundefined(or, true);
                if (Array.isArray(permisionName)) {
                    for (const permisionNameElement of permisionName) {
                        if (or) {
                            if (eval("finalCrud.table.allow." + permisionNameElement + " !== false;") === true)
                                return true;
                        } else {
                            if (eval("finalCrud.table.allow." + permisionNameElement + " !== false;") === false)
                                return false;
                        }
                    }
                }
                else
                    return eval("finalCrud.table.allow." + permisionName + " !== false;");
                return !or;
            }
            return true;
        };
        $scope.characterist = function (characterist, or, isModal) {
            var finalCrud = eval(`CRUD_${$scope.modelName}`);
            if (isModal)
                if (!DSON.oseaX(ARRAY.last(MODAL.historyObject)))
                    finalCrud = eval(`CRUD_${$scope.modelName}`);
            if (finalCrud.table !== undefined && characterist !== "") {
                or = DSON.ifundefined(or, true);
                if (Array.isArray(characterist)) {
                    for (const permisionNameElement of characterist) {
                        if (or) {
                            if (eval("finalCrud.table." + permisionNameElement + " !== false;") === true)
                                return true;
                        } else {
                            if (eval("finalCrud.table." + permisionNameElement + " !== false;") === false)
                                return false;
                        }
                    }
                }
                else
                    return eval("finalCrud.table." + characterist + " !== false;");
                return !or;
            }
            return true;
        };
        $scope.moduleColor = function (actions) {
            var search = JSON.stringify(actions);
            if (search.indexOf('false') !== -1)
                if (search.indexOf('true') !== -1)
                    return "orange";
            if (search.indexOf('false') === -1)
                return "success";
            if (search.indexOf('true') === -1)
                return "danger";
        };
        $scope.moduleName = function (name) {
            if (MESSAGE.exist('permissions.' + name)) {
                return MESSAGE.i('permissions.' + name);
            } else {
                return capitalize(name.replaceAll('_', ' '));
            }
        };
        $scope.boolIcon = function (value) {
            return value === true ? ' icon-checkbox-checked' : ' icon-checkbox-unchecked';
        };
        $scope.isObject = function (obj) {
            return typeof obj === 'object';
        };
        $scope.savePermission = function () {
            SWEETALERT.loading({message: MESSAGE.ic('mono.saving')});
            BASEAPI.deleteall('permission', {
                "where": [
                    {
                        "value": `${$scope.idPermission}`
                    }
                ]
            }, function (deleted) {
                BASEAPI.insert('permission', {
                    "insertData": {
                        "id": `${$scope.idPermission}`,
                        "object": JSON.stringify($scope.permissions)
                    }
                }, function (insert) {
                    SWEETALERT.stop();
                    location.reload();
                });
            });
        };
    }
};