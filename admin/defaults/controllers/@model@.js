app.controller('@model@', function ($scope, $http) {
    @model@ = this;
    @model@.modelName = '@model@';
    @model@.plural = "Users";
    @model@.singular = "User";
    api.run(@model@, $http);
    @model@.crud(function (crudConfig) {
        table.run(@model@, crudConfig);
        crud.run(@model@, crudConfig);
        paginator.run(@model@);
        sortable.run(@model@);
        @model@.refresh();
    });
});