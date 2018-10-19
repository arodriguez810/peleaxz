PERMISSIONS = {
    run: function ($scope) {
        $scope.allow = function (permisionName, or, isModal) {
            var finalCrud = $scope.table.crud;
            if (isModal)
                if (!DSON.oseaX(ARRAY.last(MODAL.historyObject)))
                    finalCrud = ARRAY.last(MODAL.historyObject).viewData.crud;
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
            var finalCrud = $scope.table.crud;
            if (isModal)
                if (!DSON.oseaX(ARRAY.last(MODAL.historyObject)))
                    finalCrud = ARRAY.last(MODAL.historyObject).viewData.crud;
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
    }
};