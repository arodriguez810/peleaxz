app.controller('my_testController', function ($scope, $http, $compile) {
    var my_testController = this;
    basicMethods(my_testController, $http, 'my_test');
    my_testController.list = [];
    my_testController.my_test.list(function (data) {
        my_testController.list = data;
    });
});