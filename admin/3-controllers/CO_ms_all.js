app.controller('ms_user', function ($scope, $http, $compile) {
    ms_user = this;
    ms_user.diomedes = 5;
    ms_user.modelName = 'ms_user';
    ms_user.singular = "User";
    ms_user.plural = pluralize(ms_user.singular);
    ms_user.crudConfig = ms_userCRUD;
    API.run(ms_user, $http);
    COMPILE.run(ms_user, $scope, $compile);
    TABLE.run(ms_user, $http, $compile);
    TABLEEVENT.run(ms_user, $http, $compile);
    TABLEFORMAT.run(ms_user);
    TABLESELECTION.run(ms_user);
    CRUD.run(ms_user, ms_user.crudConfig);
    PAGINATOR.run(ms_user);
    SORTABLE.run(ms_user);
    MODAL.run(ms_user);
    FILTER.run(ms_user);
    LOAD.run(ms_user, $http);
    ms_user.refresh();
});