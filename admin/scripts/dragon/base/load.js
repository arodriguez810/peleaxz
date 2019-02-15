LOAD = {
    run: function ($scope, $http) {
        $scope.loadContent = function (view, id, loadingText, callback, baseDiv) {

            baseDiv = baseDiv === undefined ? true : baseDiv;
            var thisid = "#" + id;
            ANIMATION.loading(thisid, loadingText);
            if (view === "") {
                $("#" + id).load("error/" + "404");
                $http.get("error/error", {}).then(
                    function (error) {
                        error.status = 404;
                        $scope.httpError = error;
                        $("#" + id).html($scope.returnBuild(data.data));
                        ANIMATION.stoploading(thisid);
                        callback(true);
                    },
                );
                return;
            }

            if (SESSION.ifLogoffRedirec(view))
                return;


            $http.get(view + "?scope=" + $scope.modelName, {}).then(
                function (data) {
                    HTTP.evaluate(data);
                    $(thisid).html($scope.returnBuild(data.data));
                    ANIMATION.stoploading(thisid);
                    callback(true);
                },
                function (data) {
                    $http.get("error/error" + "?scope=" + $scope.modelName, {}).then(
                        function (template) {
                            $scope.httpError = data;
                            $(thisid).html($scope.returnBuild(template.data));
                            ANIMATION.stoploading(thisid);
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
        ANIMATION.loading();
        var view = window.location.href.split("#");
        if (view.length > 1)
            view = view[1];
        else {
            ANIMATION.stoploading();
            return;
        }
        if (view === "") {
            ANIMATION.stoploading();
            return;
        }
        if (SESSION.ifLogoffRedirec(view))
            return;
        MENU.setActive(view);
        LOAD.loadContentView(view, $scope, $http, $compile);
    },
    loadContentView: function (view, $scope, $http, $compile) {
        var scope = $scope.modelName;
        if (DSON.oseaX(scope))
            scope = view.replaceAll('/', '_');
        $http.get(view + "?scope=" + scope, {}).then(
            function (data) {
                HTTP.evaluate(data);
                $("#content").html($compile(data.data)($scope));
                ANIMATION.stoploading();
            },
            function (data) {
                $http.get("error/error" + "?scope=" + $scope.modelName, {}).then(
                    function (template) {
                        $scope.httpError = data;
                        $("#content").html($scope.returnBuild(template.data));
                        ANIMATION.stoploading();
                        callback(true);
                    },
                );
                ANIMATION.stoploading();
            }
        );
    },
    template: function (view, params, callback) {
        $http = angular.injector(["ng"]).get("$http");
        $http.get(view + "?" + HTTP.objToQuery(params), {}).then(
            function (data) {
                HTTP.evaluate(data);
                callback(data.data);
            },
            function (data) {
                //"error/" + data.status
            }
        );
    }
};
