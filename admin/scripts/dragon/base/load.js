LOAD = function () {
    outanimation = CONFIG.ui.animation.outanimation;
    inanimation = CONFIG.ui.animation.inanimation;

    this.loadContentScope = function (view, id, loadingText, callback, baseDiv, controller, $scope) {
        controller = controller === false ? undefined : controller;
        baseDiv = baseDiv === undefined ? true : baseDiv;

        var thisid = "#" + id;
        if (view === "") {
            this.template('error/base', {
                status: "404",
                statusText: MESSAGE.i('mono.NotFound') + "!"
            }, function (html) {

                $("#" + id).html(html);
                if (!DSON.oseaX(inanimation))
                    animation.playPure($("#" + id), inanimation, function () {
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
            this.template('error/base', {
                status: 403,
                statusText: MESSAGE.i('alerts.permissiondenied')
            }, function (html) {
                $("#" + id).html(html);
                if (!DSON.oseaX(inanimation))
                    animation.playPure($("#" + id), inanimation, function () {
                    });
                $("#" + id).show();
                MESSAGE.run();
            });
            return;
        }
        var session = new SESSION();
        if (session.ifLogoffRedirec(view)) {
            return;
        }
        $http = angular.injector(["ng"]).get("$http");

        new HTTP().setToken($http);
        $http.get(view + `?scope=${controller || $scope.modelName || 'DRAGON'}`, {}).then(
            function (data) {
                var http = new HTTP();
                http.evaluate(data);
                if (!http.evaluateTokenHTML(data))
                    $(thisid).html($scope.returnBuild(data.data));
                if (!DSON.oseaX(inanimation))
                    new ANIMATION().playPure($(thisid), inanimation, function () {
                    });
                $(thisid).show();
                MESSAGE.run();
                callback(true);
            },
            function (data) {
                console.log(data);
                $http.get("error/error" + "?scope=" + (controller || $scope.modelName), {}).then(
                    function (template) {
                        $scope.httpError = data;
                        STEP.register({
                            scope: controller || $scope.modelName,
                            windows: `error ${data.status}`, action: "http error",
                            description: view + `?scope=${controller || $scope.modelName} ` + data.statusText,
                        });
                        $(thisid).html($scope.returnBuild(template.data));
                        if (!DSON.oseaX(inanimation))
                            animation.playPure($(thisid), inanimation, function () {
                            });
                        $(thisid).show();
                        MESSAGE.run();
                        callback(true);
                    },
                );
            }
        );
    };
    this.loadContentClean = function (view, id, loadingText, callback, controller, $scope) {
        this.loadContentScope(view, id, loadingText, callback, false, controller, $scope);
    };
    this.loadContent = function ($scope, $http, $compile) {
        var view = window.location.href.split("#");
        if (view.length > 1)
            view = view[1];
        else {
            return;
        }
        if (view === "") {
            return;
        }
        if (new SESSION().ifLogoffRedirec(view))
            return;
        if (view.indexOf("?") !== -1) {
            view = view.split("?")[0];
        }
        MENU.setActive(view);
        this.loadContentView(view, $scope, $http, $compile);
    };
    this.loadContentView = function (view, $scope, $http, $compile) {
        var animation = new ANIMATION();
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
            this.template('error/base', {
                status: 403,
                statusText: MESSAGE.i('alerts.permissiondenied')
            }, function (html) {
                $("#content").html(html);
                if (!DSON.oseaX(inanimation))
                    animation.playPure($('#content'), inanimation, function () {
                    });
                $("#content").show();
                MESSAGE.run();
            });
            return;
        }
        $http.get(view + `?scope=${scope}`, {}).then(
            function (data) {
                var http = new HTTP();
                http.evaluate(data);
                if (!http.evaluateTokenHTML(data))
                    $("#content").html($compile(data.data)($scope));
                if (!DSON.oseaX(inanimation))
                    new ANIMATION().playPure($('#content'), inanimation, function () {

                    });
                $("#content").show();
                MESSAGE.run();
            },
            function (data) {
                STEP.register({
                    windows: `error ${data.status}`, action: "http error",
                    description: view + `?scope=${scope} ` + data.statusText,
                });
                new LOAD().template('error/base', {
                    status: data.status,
                    statusText: MESSAGE.i('error.e' + data.status)
                }, function (html) {
                    $("#content").html(html);
                    if (!DSON.oseaX(inanimation))
                        animation.playPure($('#content'), inanimation, function () {
                        });
                    $("#content").show();
                    MESSAGE.run();
                });
            }
        );
    };
    this.template = function (view, params, callback) {
        $http = angular.injector(["ng"]).get("$http");
        var http = new HTTP();
        http.setToken($http);
        $http.get(view + "?" + http.objToQuery(params), {}).then(
            function (data) {
                http.evaluate(data);
                if (!http.evaluateTokenHTML(data))
                    callback(data.data);
            },
            function (data) {
                callback(false);
            }
        );
    };
    this.templatePost = function (view, params, callback) {
        $http = angular.injector(["ng"]).get("$http");
        var http = new HTTP();
        http.setToken($http);
        $http.post(view, params).then(
            function (data) {
                http.evaluate(data);
                if (!http.evaluateTokenHTML(data))
                    callback(data.data);
            },
            function (data) {
                callback(false);
            }
        );
    };
};
