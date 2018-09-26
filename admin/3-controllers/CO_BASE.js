var app = angular.module('app', ['ngSanitize']);
app.controller('baseController', function ($scope, $http, $compile, $controller) {
    var baseController = this;
    baseController.base = function () {
        LOAD.loadContent($scope, $http, $compile);
    }
    baseController.base();
});

RUNCONTROLLER = function (conrollerName, inside, $scope, $http, $compile) {
    inside.modelName = conrollerName;
    inside.singular = inside.modelName.split('_')[1];
    inside.plural = pluralize(inside.singular);
    eval("inside.crudConfig = CRUD_" + conrollerName);
    API.run(inside, $http);
    COMPILE.run(inside, $scope, $compile);
    TABLE.run(inside, $http, $compile);
    TABLEEVENT.run(inside, $http, $compile);
    TABLEFORMAT.run(inside);
    TABLESELECTION.run(inside);
    CRUD.run(inside, inside.crudConfig);
    PAGINATOR.run(inside);
    SORTABLE.run(inside);
    MODAL.run(inside);
    FILTER.run(inside);
    LOAD.run(inside, $http);
    STORAGE.run(inside);
    inside.refresh();
};