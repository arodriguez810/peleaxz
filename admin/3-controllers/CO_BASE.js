var app = angular.module('app', ['ngSanitize']);
app.controller('baseController', function ($scope, $http, $compile, $controller) {
    var baseController = this;
    baseController.favorites = [];
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

RUNCONTROLLER = function (conrollerName, inside, $scope, $http, $compile) {
    inside.MENU = MENU.current;
    inside.modelName = conrollerName;
    inside.singular = inside.modelName.split('_')[1];
    inside.plural = pluralize(inside.singular);
    eval("inside.crudConfig = CRUD_" + conrollerName);
    API.run(inside, $http);
    COMPILE.run(inside, $scope, $compile);
    CRUD.run(inside, inside.crudConfig);
    TABLE.run(inside, $http, $compile);
    TABLEOPTIONS.run(inside);
    TABLEEVENT.run(inside, $http, $compile);
    TABLEFORMAT.run(inside);
    PAGINATOR.run(inside);
    STORAGE.run(inside);
    SORTABLE.run(inside);
    MODAL.run(inside);
    FILTER.run(inside);
    TABLESELECTION.run(inside);
    LOAD.run(inside, $http);
    PERMISSIONS.run(inside);
    MENU.run(inside);
    TABLEACTION.run(inside);
    inside.refresh();
};