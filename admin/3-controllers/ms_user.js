app.controller('ms_user', function ($scope, $http, $compile) {
    ms_user = this;
    ms_user.modelName = 'ms_user';
    ms_user.singular = "User";
    ms_user.plural = pluralize(ms_user.singular);
    API.run(ms_user, $http);
    COMPILE.run(ms_user,$scope, $compile);
    ms_user.crud(function (crudConfig) {
        TABLE.run(ms_user, crudConfig);
        CRUD.run(ms_user, crudConfig);
        PAGINATOR.run(ms_user);
        SORTABLE.run(ms_user);
        MODAL.run(ms_user);
        FILTER.run(ms_user);
        LOAD.run(ms_user, $http);
        ms_user.refresh();
    });
});