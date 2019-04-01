app.controller("logica", function ($scope, $http, $compile) {
    logica = this;
    logica.new = "A";
    logica.PARAMETROSDELOGICA = PARAMETROSDELOGICA;
    logica.config = {
        name: "Hola",
        estamuerto: false
    };
    logica.CRUDS = CRUDNAMES;
    RUNCONTROLLER("logica", logica, $scope, $http, $compile);
    RUN_B("logica", logica, $scope, $http, $compile);
});