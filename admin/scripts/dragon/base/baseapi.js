BASEAPI = {
    ajax: {
        formpost: function (method, parameters, callBack) {
            SWEETALERT.loading({message: "Loading..."});
            var newForm = $('<form>', {
                'action': method,
                'method': 'post'
            });

            for (var i in parameters) {
                newForm.append($('<input>', {
                    'name': i,
                    'value': parameters[i],
                    'type': 'hidden'
                }));
            }
            newForm.appendTo(document.body).submit();
            newForm.remove();
            SWEETALERT.stop();
            callBack();
        },
        post: function (method, parameters, callBack) {
            SWEETALERT.loading({message: "Loading..."});
            $http = angular.injector(["ng"]).get("$http");
            $http.post(method, parameters).then(function (data) {
                SWEETALERT.stop();
                callBack(data);
            }, function (data) {
                SWEETALERT.stop();
                console.log(data);
            });
        },
        get: function (method, parameters, callBack) {
            SWEETALERT.loading({message: "Loading..."});
            $http = angular.injector(["ng"]).get("$http");
            var query = HTTP.objToQuery(parameters);
            $http.get(method + "?" + query).then(function (data) {
                SWEETALERT.stop();
                callBack(data);
            }, function (data) {
                SWEETALERT.stop();
                console.log(data);
            });
        },
    },
    csv: function (engine, tableName, paramenters) {
        var rootPath = '/api/' + model;
        BASEAPI.ajax.post(`${engine}_csv`, {
            "tableName": tableName
        }, function (data) {
            console.log(data);
        });
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