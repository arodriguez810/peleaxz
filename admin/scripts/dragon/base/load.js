LOAD = {
    run: function ($scope, $http) {
        $scope.loadContent = function (view, id, loadingText, callback, baseDiv) {
            baseDiv = baseDiv === undefined ? true : baseDiv;
            var thisid = "#" + id;
            ANIMATION.loading(thisid, loadingText);
            if (view === "") {
                $("#" + id).load("error/" + "404");
                return;
            }

            $http.get(view, {}).then(
                function (data) {
                    var paths = view.split("/");
                    paths[paths.length - 1] = `CO_${ARRAY.last(paths)}.js`;
                    var key = paths.join('/');
                    var url = `${FOLDERS.controllers}/${key}`;
                    var html = data.data;
                    JQUERY.loadScript(
                        url,
                        key,
                        function (data) {
                            var htmlfinal = html;
                            if (baseDiv) {
                                htmlfinal = html.replace(
                                    String.format(
                                        '<div id="{0}" ng-controller="{0} as {0}">',
                                        key
                                    ),
                                    ""
                                );
                                htmlfinal = htmlfinal.replace("</div><!--end-->", "");
                            }

                            $(thisid).html(htmlfinal);
                            ANIMATION.stoploading(thisid);
                            callback(true);
                        }
                    );
                },
                function (data) {
                    $(thisid).load("error/" + data.status, function () {
                        ANIMATION.stoploading(thisid);
                        callback(false);
                    });
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
        MENU.setActive(view);
        LOAD.loadContentView(view, $scope, $http, $compile);
    },
    loadContentView: function (view, $scope, $http, $compile) {
        $http.get(view, {}).then(
            function (data) {
                var paths = view.split("/");
                paths[paths.length - 1] = `CO_${ARRAY.last(paths)}.js`;
                var key = paths.join('/');
                var html = data.data;
                var url = `${FOLDERS.controllers}/${key}`;
                JQUERY.loadScript(
                    url,
                    key,
                    function (data) {
                        $("#content").html($compile(html)($scope));
                        ANIMATION.stoploading();
                    }
                );
            },
            function (data) {
                $("#content").load("error/" + data.status);
                ANIMATION.stoploading();
            }
        );
    },
    template: function (view, params, callback) {
        $http = angular.injector(["ng"]).get("$http");
        $http.get(view + "?" + HTTP.objToQuery(params), {}).then(
            function (data) {
                callback(data.data);
            },
            function (data) {
                //"error/" + data.status
            }
        );
    }
};
