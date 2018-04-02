var app = angular.module('app', []);

function basicMethods($scope, $http, modelName) {
    $scope.formData = {};
    $scope.rootPath = '/api/' + modelName;
    eval("$scope." + modelName + " ={}");

    var func = function (callBack) {
        $http.get($scope.rootPath + '/list').then(function (data) {
            callBack(data.data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    };
    eval("$scope." + modelName + ".list = func;");
    var func = function (id, callBack) {
        $http.get($scope.rootPath + '/get/' + id).then(function (data) {
            callBack(data.data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    };
    eval("$scope." + modelName + ".get = func;");
    var func = function (dataToInsert, callback) {
        $http.post($scope.rootPath + '/insert', dataToInsert).then(function (data) {
            if (callback != undefined)
                callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    };
    eval("$scope." + modelName + ".create = func;");
    var func = function (id, dataToUpdate, callback) {
        $http.post($scope.rootPath + '/update/' + id, dataToUpdate).then(function (data) {
            if (callback != undefined)
                callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    };
    eval("$scope." + modelName + ".update = func;");
    var func = function (id, callback) {
        $http.delete($scope.rootPath + '/delete/' + id).then(function (data) {
            if (callback != undefined)
                callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    };
    eval("$scope." + modelName + ".delete = func;");
}