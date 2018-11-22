var app = angular.module('app', ['ngSanitize']);

app.directive("repeatEnd", function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            if (scope.$last) {
                scope.$eval(attrs.repeatEnd);
            }
        }
    };
});

app.controller('baseController', function ($scope, $http, $compile, $controller) {
    var baseController = this;
    baseController.SESSION = SESSION;
    baseController.menus = CONFIG.menus;
    baseController.favorites = [];
    baseController.$scope = $scope;
    baseController.refreshAngular = function () {
        baseController.$scope.$digest();
    };
    if (STORAGE.exist('favorites')) {
        baseController.favorites = STORAGE.get('favorites');
    }
    baseController.base = function () {
        LOAD.loadContent($scope, $http, $compile);
    };
    baseController.base();

    baseController.deleteFavorite = function (href) {
        if (STORAGE.exist('favorites')) {
            var stored = STORAGE.get('favorites');
            var newarray = [];
            stored.forEach(function (item) {
                if (item.href !== href)
                    newarray.push(item);
            });
            STORAGE.add('favorites', newarray);
            baseController.favorites = newarray;
        }
    };

});
RUN_A = function (conrollerName, inside, $scope, $http, $compile) {
    API.run(inside, $http);
    COMPILE.run(inside, $scope, $compile);
    LOAD.run(inside, $http);
    PERMISSIONS.run(inside);
    MENU.run(inside);
    STORAGE.run(inside);
    FORM.run(inside, $http);
    VALIDATION.run(inside);
};

RUN_B = function (conrollerName, inside, $scope, $http, $compile) {
    FORM.run(inside, $http);
    VALIDATION.run(inside);

};

RUNCONTROLLER = function (conrollerName, inside, $scope, $http, $compile) {
    inside.MENU = MENU.current;
    inside.modelName = conrollerName;
    inside.singular = inside.modelName.split('_')[1];
    inside.plural = pluralize(inside.singular);
    inside.$http = $http;
    inside.$compile = $compile;
    inside.$scope = $scope;
    eval("inside.crudConfig = CRUD_" + conrollerName);
    API.run(inside, $http);
    COMPILE.run(inside, $scope, $compile);
    CRUD.run(inside, inside.crudConfig);
    STORAGE.run(inside);
    FILTER.run(inside);
    TABLE.run(inside, $http, $compile);
    TABLEOPTIONS.run(inside);
    TABLEEVENT.run(inside, $http, $compile);
    TABLEFORMAT.run(inside);
    PAGINATOR.run(inside);
    SORTABLE.run(inside);
    MODAL.run(inside, $compile);
    TABLESELECTION.run(inside);
    LOAD.run(inside, $http);
    PERMISSIONS.run(inside);
    MENU.run(inside);
    EXPORT.run(inside);
    inside.pages = {};
    inside.refreshAngular = function () {
        inside.$scope.$digest();
    };
    inside.refresh();
};