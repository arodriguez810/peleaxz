var modelName = 'home';
app.controller(modelName + 'Controller', function ($scope, $http, $compile, $controller) {
    var homeController = this;
    homeController.loadContent = function (view) {
        animation.loading();
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
            jquery.loadScript(String.format('controllers/{0}.js', key), key, function (data) {
                $("#content").html($compile(html)($scope));
                animation.stoploading();
            });
        }, function (data) {
            $("#content").load("error/" + data.status);
            animation.stoploading();
        });
    };
    homeController.loadContent();
});