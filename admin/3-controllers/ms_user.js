app.controller('ms_user', function ($scope, $http) {
    ms_user = this;
    ms_user.modelName = 'ms_user';
    ms_user.singular = "User";
    ms_user.plural = pluralize(ms_user.singular);
    api.run(ms_user, $http);
    ms_user.crud(function (crudConfig) {
        table.run(ms_user, crudConfig);
        crud.run(ms_user, crudConfig);
        paginator.run(ms_user);
        sortable.run(ms_user);
        ms_user.refresh();
    });
});