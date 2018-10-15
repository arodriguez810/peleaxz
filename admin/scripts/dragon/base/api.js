API = {
    run: function ($scope, $http) {
        $scope.formData = {};
        $scope.rootPath = '/api/' + $scope.modelName;
        eval("$scope." + $scope.modelName + " ={}");


        var func = function (parameters, callBack) {

            if (parameters.limit === 0) {
                parameters.limit = Number.MAX_SAFE_INTEGER;
            }

            console.log(JSON.stringify(parameters));

            $http.post($scope.rootPath + '/list', parameters).then(function (data) {
                callBack(data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };

        eval("$scope" + "" + ".list = func;");

        var func = function (id, callBack) {
            $http.get($scope.rootPath + '/get/' + id).then(function (data) {
                callBack(data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };

        eval("$scope" + "" + ".get = func;");

        var func = function (dataToInsert, callback) {
            $http.post($scope.rootPath + '/insert', dataToInsert).then(function (data) {
                callback(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".insert = func;");

        var func = function (id, dataToUpdate, callback) {
            $http.post($scope.rootPath + '/update/' + id, dataToUpdate).then(function (data) {
                callback(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".update = func;");

        var func = function (id, callback) {
            $http.delete($scope.rootPath + '/delete/' + id).then(function (data) {
                callback(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".delete = func;");

        var func = function (callBack) {
            $http.get($scope.rootPath + '/crud/').then(function (data) {
                callBack(data.data.crud);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".crud = func;");
    }
};