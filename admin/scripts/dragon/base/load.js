LOAD = {
    outanimation: "BounceOutLeft",
    inanimation: "BounceInRight",
    run: function ($scope, $http) {
        $scope.loadContent = function (view, id, loadingText, callback, baseDiv) {
            baseDiv = baseDiv === undefined ? true : baseDiv;
            var thisid = "#" + id;
            if (view === "") {
                LOAD.template('error/base', {
                    status: "404",
                    statusText: MESSAGE.i('mono.NotFound') + "!"
                }, function (html) {

                    $("#" + id).html(html);
                    ANIMATION.playPure($("#" + id), LOAD.inanimation, function () {
                    });
                    $("#" + id).show();
                    MESSAGE.run();
                });
                return;
            }
            if (ARRAY.contains(CONFIG.hidemenus, view)) {
                STEP.register({
                    windows: `error ${'403'}`, action: "http error",
                    description: view + ` ` + MESSAGE.i('alerts.permissiondenied'),
                });
                LOAD.template('error/base', {
                    status: 403,
                    statusText: MESSAGE.i('alerts.permissiondenied')
                }, function (html) {
                    $("#" + id).html(html);
                    ANIMATION.playPure($("#" + id), LOAD.inanimation, function () {
                    });
                    $("#" + id).show();
                    MESSAGE.run();
                });
                return;
            }
            if (SESSION.ifLogoffRedirec(view)) {
                return;
            }
            $http.get(view + `?scope=${$scope.modelName}`, {}).then(
                function (data) {
                    HTTP.evaluate(data);
                    if (!HTTP.evaluateTokenHTML(data))
                        $(thisid).html($scope.returnBuild(data.data));
                    ANIMATION.playPure($(thisid), LOAD.inanimation, function () {
                    });
                    $(thisid).show();
                    MESSAGE.run();
                    callback(true);
                },
                function (data) {
                    $http.get("error/error" + "?scope=" + $scope.modelName, {}).then(
                        function (template) {
                            $scope.httpError = data;
                            STEP.register({
                                scope: $scope.modelName,
                                windows: `error ${data.status}`, action: "http error",
                                description: view + `?scope=${$scope.modelName} ` + data.statusText,
                            });
                            $(thisid).html($scope.returnBuild(template.data));
                            ANIMATION.playPure($(thisid), LOAD.inanimation, function () {
                            });
                            $(thisid).show();
                            MESSAGE.run();
                            callback(true);
                        },
                    );
                }
            );
        };
        $scope.loadContentClean = function (view, id, loadingText, callback) {
            $scope.loadContent(view, id, loadingText, callback, false);
        };
    },
    loadContent: function ($scope, $http, $compile) {
        var view = window.location.href.split("#");
        if (view.length > 1)
            view = view[1];
        else {
            return;
        }
        if (view === "") {
            return;
        }
        if (SESSION.ifLogoffRedirec(view))
            return;
        MENU.setActive(view);
        LOAD.loadContentView(view, $scope, $http, $compile);
    },
    loadContentView: function (view, $scope, $http, $compile) {
        var scope = $scope.modelName;
        if (DSON.oseaX(scope)) {
            var spaces = view.split('/');
            scope = spaces[0];
        }
        STEP.clear();
        STEP.register({
            scope: scope,
            windows: `${scope} Page`, action: "Open Page"
        });
        $("#content").hide();
        if (ARRAY.contains(CONFIG.hidemenus, view)) {
            STEP.register({
                windows: `error ${'403'}`, action: "http error",
                description: view + `?scope=${scope} ` + MESSAGE.i('alerts.permissiondenied'),
            });
            LOAD.template('error/base', {
                status: 403,
                statusText: MESSAGE.i('alerts.permissiondenied')
            }, function (html) {
                $("#content").html(html);
                ANIMATION.playPure($('#content'), LOAD.inanimation, function () {
                });
                $("#content").show();
                MESSAGE.run();
            });
            return;
        }
        $http.get(view + `?scope=${scope}`, {}).then(
            function (data) {
                HTTP.evaluate(data);
                if (!HTTP.evaluateTokenHTML(data))
                    $("#content").html($compile(data.data)($scope));
                ANIMATION.playPure($('#content'), LOAD.inanimation, function () {

                });
                $("#content").show();
                MESSAGE.run();
            },
            function (data) {
                STEP.register({
                    windows: `error ${data.status}`, action: "http error",
                    description: view + `?scope=${scope} ` + data.statusText,
                });
                LOAD.template('error/base', {
                    status: data.status,
                    statusText: MESSAGE.i('error.e' + data.status)
                }, function (html) {
                    $("#content").html(html);
                    ANIMATION.playPure($('#content'), LOAD.inanimation, function () {
                    });
                    $("#content").show();
                    MESSAGE.run();
                });
            }
        );
    },
    template: function (view, params, callback) {
        $http = angular.injector(["ng"]).get("$http");
        HTTP.setToken($http);
        $http.get(view + "?" + HTTP.objToQuery(params), {}).then(
            function (data) {
                HTTP.evaluate(data);
                if (!HTTP.evaluateTokenHTML(data))
                    callback(data.data);
            },
            function (data) {
                //"error/" + data.status
            }
        );
    }
};
