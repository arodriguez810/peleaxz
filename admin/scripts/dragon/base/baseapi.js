BASEAPI = {
    ajax: {
        loading: function (element) {
            if (element)
                ANIMATION.loadingPure(element, "", element, '30');
            else
                SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        },
        stop: function (element) {
            if (element)
                ANIMATION.stoploadingPure(element, element);
            else
                SWEETALERT.stop();
        },
        formpost: function (method, parameters, callBack) {
            BASEAPI.ajax.loading();
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
            BASEAPI.ajax.stop();
            callBack();
        },
        post: function (method, parameters, callBack, element) {
            BASEAPI.ajax.loading(element);
            $http = angular.injector(["ng"]).get("$http");
            HTTP.setToken($http);
            $http.post(method, parameters).then(function (data) {
                HTTP.evaluate(data);
                BASEAPI.ajax.stop(element);
                callBack(data);
            }, function (data) {
                BASEAPI.ajax.stop(element);
                console.log(data);
            });
        },
        get: function (method, parameters, callBack, element) {
            BASEAPI.ajax.loading(element);
            $http = angular.injector(["ng"]).get("$http");
            HTTP.setToken($http);
            var query = HTTP.objToQuery(parameters);
            $http.get(method + "?" + query).then(function (data) {
                HTTP.evaluate(data);
                BASEAPI.ajax.stop(element);
                if (!HTTP.evaluateTokenHTML(data))
                    callBack(data);
            }, function (data) {
                BASEAPI.ajax.stop(element);
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
        HTTP.setToken($http);
        var rootPath = '/api/' + model;
        if (parameters.limit === 0) {
            parameters.limit = Number.MAX_SAFE_INTEGER;
        }
        $http.post(rootPath + '/list', parameters).then(function (data) {
            HTTP.evaluate(data);
            if (!HTTP.evaluateTokenHTML(data))
                callBack(data.data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    first: function (model, parameters, callBack) {
        $http = angular.injector(["ng"]).get("$http");
        HTTP.setToken($http);
        var rootPath = '/api/' + model;
        if (parameters.limit === 0) {
            parameters.limit = Number.MAX_SAFE_INTEGER;
        }
        $http.post(rootPath + '/list', parameters).then(function (data) {
            HTTP.evaluate(data);
            if (!HTTP.evaluateTokenHTML(data))
                callBack(data.data.data[0]);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    get: function (model, id, callBack) {
        $http = angular.injector(["ng"]).get("$http");
        HTTP.setToken($http);
        var rootPath = '/api/' + model;
        $http.get(rootPath + '/get/' + id).then(function (data) {
            HTTP.evaluate(data);
            if (!HTTP.evaluateTokenHTML(data))
                callBack(data.data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    insert: function (model, dataToInsert, callback) {
        $http = angular.injector(["ng"]).get("$http");
        HTTP.setToken($http);
        var rootPath = '/api/' + model;
        $http.post(rootPath + '/insert', dataToInsert).then(function (data) {
            HTTP.evaluate(data);
            if (!HTTP.evaluateTokenHTML(data))
                callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    update: function (model, id, dataToUpdate, callback) {
        $http = angular.injector(["ng"]).get("$http");
        HTTP.setToken($http);
        var rootPath = '/api/' + model;
        $http.post(rootPath + '/update/' + id, dataToUpdate).then(function (data) {
            HTTP.evaluate(data);
            if (!HTTP.evaluateTokenHTML(data))
                callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    updateall: function (model, dataToUpdate, callback) {
        $http = angular.injector(["ng"]).get("$http");
        HTTP.setToken($http);
        var rootPath = '/api/' + model;
        $http.post(rootPath + '/update', dataToUpdate).then(function (data) {
            HTTP.evaluate(data);
            if (!HTTP.evaluateTokenHTML(data))
                callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    deleteall: function (model, dataToDelete, callback) {
        $http = angular.injector(["ng"]).get("$http");
        HTTP.setToken($http);
        var rootPath = '/api/' + model;
        $http.post(rootPath + '/delete', dataToDelete).then(function (data) {
            HTTP.evaluate(data);
            if (!HTTP.evaluateTokenHTML(data))
                callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    delete: function (model, id, callback) {
        $http = angular.injector(["ng"]).get("$http");
        HTTP.setToken($http);
        var rootPath = '/api/' + model;
        $http.delete(rootPath + '/delete/' + id).then(function (data) {
            callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    mail: function (params, callback) {
        $http = angular.injector(["ng"]).get("$http");
        HTTP.setToken($http);
        var rootPath = '/email/send';
        $http.post(rootPath, params).then(function (data) {
            callback(data);
        }, function (data) {
            SWEETALERT.stop();
            console.log('Error: ' + data);
        });
    }
};