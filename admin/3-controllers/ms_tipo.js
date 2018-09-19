app.controller('ms_tipo', function ($scope, $http, $compile) {
    ms_tipo = this;
    ms_tipo.modelName = 'ms_tipo';
    ms_tipo.singular = "Tipo";
    ms_tipo.plural = pluralize(ms_tipo.singular);
    API.run(ms_tipo, $http);
    COMPILE.run(ms_tipo,$scope, $compile);
    ms_tipo.crud(function (crudConfig) {
        TABLE.run(ms_tipo, crudConfig);
        CRUD.run(ms_tipo, crudConfig);
        PAGINATOR.run(ms_tipo);
        SORTABLE.run(ms_tipo);
        MODAL.run(ms_tipo);
        FILTER.run(ms_tipo);
        LOAD.run(ms_tipo, $http);
        ms_tipo.refresh();
    });
});