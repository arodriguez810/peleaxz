SERVICE = {
    run: async function (services) {
        for (const service of services) {
            var data = service.split("*");
            var method = data[0];
            var functionName = data[1];
            var splitName = functionName.split('.');
            var parent = splitName[0];
            eval(String.format("SERVICE.{0}=SERVICE.{0}===undefined?{{}}:SERVICE.{0};", parent));
            functionName = splitName[1];
            switch (method) {
                case "get": {

                    var functioner = "function (parameters, callBack) {\n" +
                        "                        var $queryString = $.param(parameters);\n" +
                        "                        $http = angular.injector([\"ng\"]).get(\"$http\");\n" +
                        "                        var http = new HTTP();                " +
                        "                        http.setToken($http);                " +
                        "                        $http.get(String.format(\"/service/{1}/{2}?{3}\", '', '" + parent + "', '" + functionName + "', $queryString)).then(function (data) {\n" +
                        "                            http.evaluate(data); if (!http.evaluateTokenHTML(data)) callBack(data);\n" +
                        "                        }, function (data) {\n" +
                        "                            console.log('error',data);\n" +
                        "                        });\n" +
                        "                    };";

                    eval(String.format("SERVICE.{0}.{1} = {2}", parent, functionName, functioner));
                    break;
                }
                case "post":
                case "put":
                case "delete": {
                    var functioner = "function (parameters, callBack) {\n" +
                        "                        $http = angular.injector([\"ng\"]).get(\"$http\");\n" +
                        "                        var http = new HTTP();                " +
                        "                        http.setToken($http);                " +
                        "                        $http." + method + "(String.format(\"/service/{1}/{2}\", 'service', '" + parent + "', '" + functionName + "'),parameters).then(function (data) {\n" +
                        "                            callBack(data);\n" +
                        "                        }, function (data) {\n" +
                        "                            console.log('error',data);\n" +
                        "                        });\n" +
                        "                    };";
                    eval(String.format("SERVICE.{0}.{1} = {2}", parent, functionName, functioner));
                    break;
                }
            }
        }
        var functions = await DRAGONAPI.listp('dragon_function', {});
        if (functions) {
            if (functions.data) {
                for (var func of functions.data) {
                    eval(`
                SERVICE.${func.name} = (data) => new Promise((resolve, reject) => {
                    SERVICE.database_db.runFunction({
                        id: '${func.id}',
                        params: data
                    }, function (result) {
                        resolve(result);
                    });
                });`);
                }
            }
        }
    }
};