app.controller('@model@Controller', function ($scope, $http, $compile) {
    var @model@Controller = this;
    basicMethods(@model@Controller, $http, '@model@');
    @model@Controller.list = [];
    @model@Controller.@model@.list(function (data) {
        @model@Controller.list = data;
    });
});