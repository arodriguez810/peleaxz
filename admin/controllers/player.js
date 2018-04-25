var url = window.location.pathname;
var modelName = url.substring(url.lastIndexOf('/') + 1);

app.controller(modelName + 'Controller', function ($scope, $http) {
    $scope.model = {};
    basicMethods($scope, $http, modelName);
    $scope.after = function () {
        $scope.player.list(function (data) {
            $scope.players = data;
        });
    };
    $scope.after();
});