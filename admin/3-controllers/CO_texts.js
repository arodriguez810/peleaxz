app.controller("child", function ($scope, $http, $compile) {
    child = this;
    child.fixFilters = [
        {
            field: 'id',
            operator: ">",
            value: 0
        }
    ];
    RUNCONTROLLER("child", child, $scope, $http, $compile);
    child.singular = "Singular";
    child.formulary = function (data, mode, defaultData) {
        if (child !== undefined) {
            RUN_B("child", child, $scope, $http, $compile);

            //tamaño del modal
            //child.form.modalWidth = ENUM.modal.width.full;

            //Titulos personalizados para el form
            // child.form.titles = {
            //     new: "Nuevos Texts",
            //     edit: "`Editar ALL - ${$scope.name}`",
            //     view: "`Ver ALL - ${$scope.name}`"
            // };

            //valores que no estan en el formulario para enviar a guardar
            child.form.readonly = {};

            //metodo para crear el form
            child.createForm(data, mode, defaultData);

            //validaciones y onchange por campo
            $scope.$watch('child.basic', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.realdata(value));
                VALIDATION.validate(child, "name", rules);
            });
        }
    };
});