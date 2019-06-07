app.controller("texts", function ($scope, $http, $compile) {
    texts = this;
    texts.fixFilters = [
        {
            field: 'id',
            operator: ">",
            value: 0
        }
    ];
    texts.headertitle = "Custom";
    RUNCONTROLLER("texts", texts, $scope, $http, $compile);
    //asignar text singular pero se recomienda por language
    //texts.singular = "Singular";

    //asignar text plural pero se recomienda por language
    //texts.plural = "Singular";
    texts.formulary = function (data, mode, defaultData) {
        if (texts !== undefined) {
            RUN_B("texts", texts, $scope, $http, $compile);

            //tamaño del modal
            //texts.form.modalWidth = ENUM.modal.width.full;

            //Titulos personalizados para el form
            // texts.form.titles = {
            //     new: "Nuevos Texts",
            //     edit: "`Editar ALL - ${$scope.name}`",
            //     view: "`Ver ALL - ${$scope.name}`"
            // };

            //valores que no estan en el formulario para enviar a guardar
            texts.form.readonly = {};

            //metodo para crear el form
            texts.createForm(data, mode, defaultData);

            //validaciones y onchange por campo
            $scope.$watch('texts.basic', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.realdata(value));
                texts.readonly = value;
                VALIDATION.validate(texts, "basic", rules);
            });
            $scope.$watch('texts.format', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(texts, "format", rules);
            });
        }
    };
});