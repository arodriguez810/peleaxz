app.controller("logica", function ($scope, $http, $compile) {
    logica = this;
    logica.new = "A";
    logica.config = {
        name: "Hola",
        estamuerto: false
    };
    RUNCONTROLLER("logica", logica, $scope, $http, $compile);
    RUN_B("logica", logica, $scope, $http, $compile);
});