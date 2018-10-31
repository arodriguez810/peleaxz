var app = angular.module('app', ['ngSanitize']);
app.controller('baseController', function ($scope, $http, $compile, $controller) {
    var baseController = this;
    baseController.menus = CONFIG.menus;
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
    baseController.SESSION = SESSION;
});
RUN_A = function (conrollerName, inside, $scope, $http, $compile) {
    API.run(auth_login,$http);
    COMPILE.run(auth_login, $scope, $compile);
    LOAD.run(auth_login, $http);
    PERMISSIONS.run(auth_login);
    MENU.run(auth_login);
    STORAGE.run(auth_login);
    FORM.run(auth_login, $http);
    VALIDATION.run(auth_login);
};

RUNCONTROLLER = function (conrollerName, inside, $scope, $http, $compile) {
    inside.MENU = MENU.current;
    inside.modelName = conrollerName;
    inside.singular = inside.modelName.split('_')[1];
    inside.plural = pluralize(inside.singular);
    inside.$http = $http;
    inside.$compile = $compile;
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
    EXPORT.run(inside);
    eval("inside.formConfig = CRUD_" + conrollerName);
    FORM.run(inside, $http, $compile);
    inside.refresh();
};