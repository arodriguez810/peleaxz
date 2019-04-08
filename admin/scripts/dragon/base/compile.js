COMPILE = {
    run: function ($scope, $real, $compile) {
        $scope.build = function (id) {
            CHILDSCOPES.push($real.$new());
            $("#" + id).html($compile($("#" + id).html())(ARRAY.last(CHILDSCOPES)));
            MESSAGE.run();
        };
        $scope.returnBuild = function (html) {
            CHILDSCOPES.push($real.$new());
            return $compile(html)(ARRAY.last(CHILDSCOPES));
        };
    }
};