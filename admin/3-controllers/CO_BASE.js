var app = angular.module('app', ['ngSanitize']);
var modelName = 'BASE';
app.controller(modelName + 'Controller', function ($scope, $http, $compile, $controller) {
    var homeController = this;
    homeController.loadContent = function (view) {
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
    };
    homeController.loadContent();
});