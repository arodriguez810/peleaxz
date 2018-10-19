BASEAPI = {
    ajax: {
        post: function (method, parameters, callBack) {
            SWEETALERT.loading({message: "Loading..."});
            $http = angular.injector(["ng"]).get("$http");
            $http.post(method, parameters).then(function (data) {
                SWEETALERT.stop();
                callBack(data);
            }, function (data) {
                SWEETALERT.stop();
                console.log('Error: ' + data);
            });
        },
        get: function (method, parameters, callBack) {
            SWEETALERT.loading({message: "Loading..."});
            $http = angular.injector(["ng"]).get("$http");
            $http.get(method).then(function (data) {
                SWEETALERT.stop();
                callBack(data);
            }, function (data) {
                SWEETALERT.stop();
                console.log('Error: ' + data);
            });
        },
    },
    msCsv:function(method,tableName, paramenters){
        var rootPath = '/api/' + model;
        BASEAPI.ajax.post()
    },
    list: function (model, parameters, callBack) {
        $http = angular.injector(["ng"]).get("$http");
        var rootPath = '/api/' + model;
        if (parameters.limit === 0) {
            parameters.limit = Number.MAX_SAFE_INTEGER;
        }

        $http.post(rootPath + '/list', parameters).then(function (data) {
            callBack(data.data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    get: function (model, id, callBack) {
        $http = angular.injector(["ng"]).get("$http");
        var rootPath = '/api/' + model;
        $http.get(rootPath + '/get/' + id).then(function (data) {
            callBack(data.data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    insert: function (model, dataToInsert, callback) {
        $http = angular.injector(["ng"]).get("$http");
        var rootPath = '/api/' + model;
        $http.post(rootPath + '/insert', dataToInsert).then(function (data) {
            callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    update: function (model, id, dataToUpdate, callback) {
        $http = angular.injector(["ng"]).get("$http");
        var rootPath = '/api/' + model;
        $http.post(rootPath + '/update/' + id, dataToUpdate).then(function (data) {
            callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    delete: function (model, id, callback) {
        $http = angular.injector(["ng"]).get("$http");
        var rootPath = '/api/' + model;
        $http.delete(rootPath + '/delete/' + id).then(function (data) {
            callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    }
};