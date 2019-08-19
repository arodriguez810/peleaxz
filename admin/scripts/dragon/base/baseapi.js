DRAGONAPI = {
    ajax: {
        loading: function (element) {
            if (element)
                new ANIMATION().loadingPure(element, "", element, '30');
            else
                SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
        },
        speech: function (text, element) {
            var http = new HTTP();
            DRAGONAPI.ajax.get(http.path(["cognitiveservices", "api"]), {
                text: text,
                lan: MESSAGE.current().code,
            }, function (data) {
                var audio = new Audio(http.path(["preview.wav?cache=" + new Date().getTime()]));
                audio.play();
            }, element);
        },
        stop: function (element) {
            if (element)
                new ANIMATION().stoploadingPure(element, element);
            else
                SWEETALERT.stop();
        },
        formpost: function (method, parameters, callBack) {
            DRAGONAPI.ajax.loading();
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
            DRAGONAPI.ajax.stop();
            callBack();
        },
        post: function (method, parameters, callBack, element) {
            DRAGONAPI.ajax.loading(element);
            $http = angular.injector(["ng"]).get("$http");
            var http = new HTTP();
            http.setToken($http);
            $http.post(method, parameters).then(function (data) {
                http.evaluate(data);
                DRAGONAPI.ajax.stop(element);
                callBack(data);
            }, function (data) {
                DRAGONAPI.ajax.stop(element);
                console.log(data);
            });
        },
        postp: (method, parameters, element) => new Promise((resolve, reject) => {
            DRAGONAPI.ajax.post(method, parameters, function (result) {
                resolve(result);
            }, element);
        }),
        get: function (method, parameters, callBack, element) {
            DRAGONAPI.ajax.loading(element);
            $http = angular.injector(["ng"]).get("$http");
            var http = new HTTP();
            http.setToken($http);
            var query = http.objToQuery(parameters);
            $http.get(method + "?" + query).then(function (data) {
                http.evaluate(data);
                DRAGONAPI.ajax.stop(element);
                if (!http.evaluateTokenHTML(data))
                    callBack(data);
            }, function (data) {
                DRAGONAPI.ajax.stop(element);
                console.log(data);
            });
        },
    },
    csv: function (engine, tableName, paramenters) {
        var rootPath = '/api/' + model;
        DRAGONAPI.ajax.post(`${engine}_csv`, {
            "tableName": tableName
        }, function (data) {
            console.log(data);
        });
    },
    list: function (model, parameters, callBack) {
        $http = angular.injector(["ng"]).get("$http");
        var http = new HTTP();
        http.setToken($http);
        var rootPath = '/api/' + model;
        if (parameters.limit === 0) {
            parameters.limit = Number.MAX_SAFE_INTEGER;
        }
        $http.post(rootPath + '/list', parameters).then(function (data) {
            http.evaluate(data);
            if (!http.evaluateTokenHTML(data)) {
                if (callBack !== undefined)
                    callBack(data.data);
                else {
                    return new Promise(function (resolve, reject) {
                        resolve(data.data);
                    });
                }
            }
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    listp: (model, parameters) => new Promise((resolve, reject) => {
        DRAGONAPI.list(model, parameters, function (result) {
            resolve(result);
        });
    }),
    first: function (model, parameters, callBack) {
        $http = angular.injector(["ng"]).get("$http");
        var http = new HTTP();
        http.setToken($http);
        var rootPath = '/api/' + model;
        if (parameters.limit === 0) {
            parameters.limit = Number.MAX_SAFE_INTEGER;
        }
        $http.post(rootPath + '/list', parameters).then(function (data) {
            http.evaluate(data);
            if (!http.evaluateTokenHTML(data))
                if (data.data.data !== undefined)
                    callBack(data.data.data[0]);
                else
                    callBack(null);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    firstp: (model, parameters) => new Promise((resolve, reject) => {
        DRAGONAPI.first(model, parameters, function (result) {
            resolve(result);
        });
    }),
    get: function (model, id, callBack) {
        $http = angular.injector(["ng"]).get("$http");
        var http = new HTTP();
        http.setToken($http);
        var rootPath = '/api/' + model;
        $http.get(rootPath + '/get/' + id).then(function (data) {
            http.evaluate(data);
            if (!http.evaluateTokenHTML(data))
                callBack(data.data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    getp: (model, id) => new Promise((resolve, reject) => {
        DRAGONAPI.get(model, id, function (result) {
            resolve(result);
        });
    }),
    insert: function (model, dataToInsert, callback) {
        $http = angular.injector(["ng"]).get("$http");
        var http = new HTTP();
        http.setToken($http);
        var rootPath = '/api/' + model;
        $http.post(rootPath + '/insert', dataToInsert).then(function (data) {
            http.evaluate(data);
            if (!http.evaluateTokenHTML(data))
                callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    insertp: (model, dataToInsert) => new Promise((resolve, reject) => {
        DRAGONAPI.insert(model, dataToInsert, function (result) {
            resolve(result);
        });
    }),
    insertID: function (model, dataToInsert, field, value, callback) {
        $http = angular.injector(["ng"]).get("$http");
        var http = new HTTP();
        http.setToken($http);
        var rootPath = '/api/' + model;
        var postData = {};
        postData.insertData = dataToInsert;
        postData.field = field;
        postData.value = value;
        $http.post(rootPath + '/insertID', postData).then(function (data) {
            http.evaluate(data);
            if (!http.evaluateTokenHTML(data))
                callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    insertIDp: (model, dataToInsert, field, value) => new Promise((resolve, reject) => {
        DRAGONAPI.insertID(model, dataToInsert, field, value, function (result) {
            resolve(result);
        });
    }),
    update: function (model, id, dataToUpdate, callback) {
        $http = angular.injector(["ng"]).get("$http");
        var http = new HTTP();
        http.setToken($http);
        var rootPath = '/api/' + model;
        $http.post(rootPath + '/update/' + id, dataToUpdate).then(function (data) {
            http.evaluate(data);
            if (!http.evaluateTokenHTML(data))
                callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    updatep: (model, id, dataToUpdate) => new Promise((resolve, reject) => {
        DRAGONAPI.update(model, id, dataToUpdate, function (result) {
            resolve(result);
        });
    }),
    updateall: function (model, dataToUpdate, callback) {
        $http = angular.injector(["ng"]).get("$http");
        var http = new HTTP();
        http.setToken($http);
        var rootPath = '/api/' + model;
        $http.post(rootPath + '/update', dataToUpdate).then(function (data) {
            http.evaluate(data);
            if (!http.evaluateTokenHTML(data))
                callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    updateallp: (model, dataToUpdate) => new Promise((resolve, reject) => {
        DRAGONAPI.updateall(model, dataToUpdate, function (result) {
            resolve(result);
        });
    }),
    deleteall: function (model, dataToDelete, callback) {
        $http = angular.injector(["ng"]).get("$http");
        var http = new HTTP();
        http.setToken($http);
        var rootPath = '/api/' + model;
        $http.post(rootPath + '/delete', dataToDelete).then(function (data) {
            http.evaluate(data);
            if (!http.evaluateTokenHTML(data))
                callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    deleteallp: (model, dataToDelete) => new Promise((resolve, reject) => {
        DRAGONAPI.deleteall(model, dataToDelete, function (result) {
            resolve(result);
        });
    }),
    delete: function (model, id, callback) {
        $http = angular.injector(["ng"]).get("$http");
        var http = new HTTP();
        http.setToken($http);
        var rootPath = '/api/' + model;
        $http.delete(rootPath + '/delete/' + id).then(function (data) {
            callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    deletep: (model, id) => new Promise((resolve, reject) => {
        DRAGONAPI.delete(model, id, function (result) {
            resolve(result);
        });
    }),
    truncate: function (model, callback) {
        $http = angular.injector(["ng"]).get("$http");
        var http = new HTTP();
        http.setToken($http);
        var rootPath = '/api/' + model;
        $http.post(rootPath + '/truncate').then(function (data) {
            callback(data);
        }, function (data) {
            console.log('Error: ' + data);
        });
    },
    truncatep: (model) => new Promise((resolve, reject) => {
        DRAGONAPI.truncate(model, function (result) {
            resolve(result);
        });
    }),
    mail: function (params, callback) {
        $http = angular.injector(["ng"]).get("$http");
        new HTTP().setToken($http);
        var rootPath = '/email/send';
        $http.post(rootPath, params).then(function (data) {
            callback(data);
        }, function (data) {
            SWEETALERT.stop();
            console.log('Error: ' + data);
        });
    },
    mailp: (params) => new Promise((resolve, reject) => {
        DRAGONAPI.mail(params, function (result) {
            resolve(result);
        });
    }),
};