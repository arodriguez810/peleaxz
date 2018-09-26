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

            $http.get(view, {}).then(function (data) {
                var key = view.split('/')[0];
                var html = data.data;
                JQUERY.loadScript(String.format(FOLDERS.controllers + '/{0}.js', key), key, function (data) {
                    var htmlfinal = html;
                    if (baseDiv) {
                        htmlfinal = html.replace(String.format("<div id=\"{0}\" ng-controller=\"{0} as {0}\">", key), '');
                        htmlfinal = htmlfinal.replace("</div><!--end-->", '');
                    }

                    $(thisid).html(htmlfinal);
                    ANIMATION.stoploading(thisid);
                    callback(true);
                });
            }, function (data) {
                $(thisid).load("error/" + data.status, function () {
                    ANIMATION.stoploading(thisid);
                    callback(false);
                });
            });
        };
        $scope.loadContentClean = function (view, id, loadingText, callback) {
            $scope.loadContent(view, id, loadingText, callback, false);
        };
    },
    loadContent: function (view) {
        ANIMATION.loading();
        if (view === undefined) {
            view = window.location.href.split('#');
            if (view.length > 1)
                view = view[1];
            else
                return;
        }
        if (view === "") return;
        $http.get(view, {}).then(function (data) {
            var key = view.split('/')[0];
            var html = data.data;
            JQUERY.loadScript(String.format(FOLDERS.controllers + '/{0}.js', key), key, function (data) {
                $("#content").html($compile(html)($scope));
                ANIMATION.stoploading();
            });
        }, function (data) {
            $("#content").load("error/" + data.status);
            ANIMATION.stoploading();
        });
    }
};