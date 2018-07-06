var app = angular.module('app', []);

function basicMethods($scope, $http, modelName) {
    $scope.formData = {};
    $scope.rootPath = '/api/' + modelName;
    eval("$scope." + modelName + " ={}");


    $scope.checkAll = function () {
        $scope.selected = $scope.checkall;
    };

    $scope.check = function (element) {
        var checkall = true;
        $(".singlecheck").each(function () {
            if ($(this).prop('checked') === false) {
                checkall = false;
                console.log("false");
                return false;
            }
        });
        $scope.checkall = checkall;
    };

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
            callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    };
    eval("$scope." + modelName + ".insert = func;");

    var func = function (id, dataToUpdate, callback) {
        $http.post($scope.rootPath + '/update/' + id, dataToUpdate).then(function (data) {
            callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    };
    eval("$scope." + modelName + ".update = func;");

    var func = function (id, callback) {
        $http.delete($scope.rootPath + '/delete/' + id).then(function (data) {
            callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    };
    eval("$scope." + modelName + ".delete = func;");

    var func = function (callBack) {
        $http.get($scope.rootPath + '/crud/').then(function (data) {
            callBack(data.data.crud);
        }, function (data) {
            console.log('Error: ' + data);
        });
    };
    eval("$scope." + modelName + ".crud = func;");
}