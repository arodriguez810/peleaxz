STORAGE = {
    run: function ($scope) {
        $scope.saveModel = function (name, value) {
            return STORAGE.basesaveModel($scope, name, value);
        };
        $scope.saveModelObject = function (name, value) {
            return STORAGE.basesaveModelObject($scope, name, JSON.stringify(value));
        };
        $scope.getModel = function (name) {
            return STORAGE.basegetModel($scope, name);
        };
        $scope.getModelObject = function (name) {
            return STORAGE.basegetModelObject($scope, name);
        };
        $scope.getModelSimple = function (name) {
            return STORAGE.basegetModelSimple($scope, name);
        };
        $scope.hasModel = function (name) {
            return STORAGE.basehasModel($scope, name);
        };
        $scope.clearModel = function () {
            for (var key in localStorage) {
                if (key.indexOf($scope.modelName + ".") !== -1) {
                    localStorage.removeItem(key);
                }
            }
        };
        $scope.hasAnyModel = function () {
            for (var key in localStorage) {
                if (key.indexOf($scope.modelName + ".") !== -1) {
                    return true;
                }
            }
            return false;
        };
        $scope.pushModel = function (name, value) {
            var currentHides = [];
            if ($scope.hasModel(name)) currentHides = $scope.getModel(name);
            if (!ARRAY.contains(currentHides, value)) {
                currentHides.push(value);
            }
            STORAGE.add($scope.modelName + "." + name, currentHides);
        };
        $scope.sliceModel = function (name, value) {
            var currentHides = [];
            if ($scope.hasModel(name)) currentHides = $scope.getModel(name);
            if (ARRAY.contains(currentHides, value)) {
                currentHides.push(value);
            }
            STORAGE.add($scope.modelName + "." + name, currentHides);
        };
    },
    clearAll: function () {
        if (localStorage.length)
            SWEETALERT.confirm({
                message:
                    MESSAGE.i('alerts.restoreAll'),
                confirm: function () {
                    var session = new SESSION();
                    var objsession = DSON.OSO(session.current());
                    localStorage.clear();
                    session.register(objsession);
                    location.reload();
                }
            });
        else
            SWEETALERT.show({message: MESSAGE.i('alerts.norestore')});
    },
    delete: function (id) {
        localStorage.removeItem(id);
    },
    add: function (id, object) {
        STORAGE.delete(id);
        localStorage.setItem(id, JSON.stringify(object));
    },
    get: function (id) {
        if (localStorage.getItem(id) === null) return null;
        return eval("(" + localStorage.getItem(id) + ")");
    },
    getSimple: function (id) {
        if (localStorage.getItem(id) === null) return null;
        return localStorage.getItem(id);
    },
    exist: function (id) {
        return localStorage.getItem(id) !== null;
    },
    basesaveModel: function ($scope, name, value) {
        return STORAGE.add($scope.modelName + "." + name, eval("$scope." + value));
    },
    basesaveModelObject: function ($scope, name, value) {
        return STORAGE.add($scope.modelName + "." + name, value);
    },
    basegetModel: function ($scope, name) {
        return STORAGE.get($scope.modelName + "." + name);
    },
    basegetModelObject: function ($scope, name) {
        return eval("(" + STORAGE.get($scope.modelName + "." + name) + ")");
    },
    basegetModelSimple: function ($scope, name) {
        return STORAGE.getSimple($scope.modelName + "." + name);
    },
    basehasModel: function ($scope, name) {
        return STORAGE.get($scope.modelName + "." + name) !== null;
    },
    saveColumns: function (modelName, element) {
        var tableColumns = $(element).find("thead tr");
        var orderColumns = [];
        for (var i = 0; i < tableColumns.children().length; i++) {
            var item = $(tableColumns.children()[i]).data("column");
            if (item !== undefined) orderColumns.push(item);
        }
        STORAGE.add(modelName + ".columns", orderColumns);
    },
    getColumns: function ($scope) {
        return STORAGE.get($scope.modelName + ".columns");
    },
    hasColumns: function ($scope) {
        return STORAGE.get($scope.modelName + ".columns") !== null;
    },
    savePage: function ($scope) {
        if ($scope.characterist('persist'))
            return STORAGE.add($scope.modelName + ".page", $scope.table.currentPage);
    },
    getPage: function ($scope) {
        return parseInt(STORAGE.getSimple($scope.modelName + ".page"));
    },
    hasPage: function ($scope) {
        return STORAGE.get($scope.modelName + ".page") !== null;
    }
};
