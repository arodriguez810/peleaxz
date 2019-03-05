COMPILE = {
    run: function ($scope, $real, $compile) {
        $scope.build = function (id) {
            CHILDSCOPES.push($real.$new());
            $("#" + id).html($compile($("#" + id).html())(ARRAY.last(CHILDSCOPES)));
        };
        $scope.returnBuild = function (html) {
            CHILDSCOPES.push($real.$new());
            var performance = `
            <div ng-show="$$watchersCount>=baseController.CONFIG.performance.angular.modal && baseController.CONFIG.mode!=='production'"
                    class="alert alpha-warning border-warning alert-styled-left">
                This window is consuming more memory than established({{baseController.CONFIG.performance.angular.modal}}), this could cause the application to go slow sometimes. ({{$$watchersCount}}).
            </div>`;
            return $compile(performance + html)(ARRAY.last(CHILDSCOPES));
        };
    }
};