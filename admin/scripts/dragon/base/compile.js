COMPILE = {
    run: function ($scope,$real, $compile) {
        $scope.build = function (id) {
            $("#" + id).html($compile($("#" + id).html())($real));
        };
        $scope.returnBuild = function (html) {
            return $compile(html)($real);
        };
    }
};