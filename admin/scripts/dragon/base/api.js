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
            $http.post($scope.rootPath + '/insert/', dataToInsert).then(function (data) {
                callback(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".insert = func;");

        var func = function (table, dataToInsert, callback) {
            $http.post('/api/' + table + '/insert/', dataToInsert).then(function (data) {
                callback(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".insertFrom = func;");

        var func = function (dataToInsert, callback) {
            $http.post($scope.rootPath + '/insertID/', dataToInsert).then(function (data) {
                callback(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".insertID = func;");

        var func = function (dataToUpdate, callback) {
            $http.post($scope.rootPath + '/update/', dataToUpdate).then(function (data) {
                callback(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".update = func;");


        var func = function (where, callback) {
            $http.post($scope.rootPath + '/delete', where).then(function (data) {
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