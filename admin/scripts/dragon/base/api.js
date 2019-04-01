API = {
    run: function ($scope, $http) {
        $scope.formData = {};
        $scope.rootPath = '/api/' + $scope.modelName;
        eval("$scope." + $scope.modelName + " ={}");
        var func = function (parameters, callBack, view) {
            if (parameters.limit === 0) {
                parameters.limit = Number.MAX_SAFE_INTEGER;
            }
            var rootPath = $scope.rootPath;
            if (view) {
                var rootPath = '/api/' + view;
            }
            $http.post(rootPath + '/list', parameters).then(function (data) {
                HTTP.evaluate(data);
                if (!HTTP.evaluateTokenHTML(data))
                    callBack(data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".list = func;");
        var func = function (id, callBack) {
            $http.get($scope.rootPath + '/get/' + id).then(function (data) {
                HTTP.evaluate(data);
                if (!HTTP.evaluateTokenHTML(data))
                    callBack(data.data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".get = func;");
        var func = function (dataToInsert, callback) {
            $http.post($scope.rootPath + '/insert/', dataToInsert).then(function (data) {
                HTTP.evaluate(data);
                if (!HTTP.evaluateTokenHTML(data))
                    callback(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".insert = func;");
        var func = function (table, dataToInsert, callback) {
            $http.post('/api/' + table + '/insert/', dataToInsert).then(function (data) {
                HTTP.evaluate(data);
                if (!HTTP.evaluateTokenHTML(data))
                    callback(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".insertFrom = func;");
        var func = function (dataToInsert, field, value, callback) {
            var postData = {};
            postData.insertData = dataToInsert;
            postData.field = field;
            postData.value = value;
            $http.post($scope.rootPath + '/insertID/', postData).then(function (data) {
                HTTP.evaluate(data);
                if (!HTTP.evaluateTokenHTML(data))
                    callback(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".insertID = func;");
        var func = function (dataToUpdate, callback) {
            $http.post($scope.rootPath + '/update/', dataToUpdate).then(function (data) {
                HTTP.evaluate(data);
                if (!HTTP.evaluateTokenHTML(data))
                    callback(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".update = func;");
        var func = function (where, callback) {
            $http.post($scope.rootPath + '/delete', where).then(function (data) {
                HTTP.evaluate(data);
                if (!HTTP.evaluateTokenHTML(data))
                    callback(data);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".delete = func;");
        var func = function (callBack) {
            $http.get($scope.rootPath + '/crud/').then(function (data) {
                HTTP.evaluate(data);
                if (!HTTP.evaluateTokenHTML(data))
                    callBack(data.data.crud);
            }, function (data) {
                console.log('Error: ' + data);
            });
        };
        eval("$scope" + "" + ".crud = func;");
    }
};