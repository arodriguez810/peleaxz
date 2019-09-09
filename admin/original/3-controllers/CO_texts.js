app.controller("texts", function ($scope, $http, $compile) {
    texts = this;

    texts.headertitle = "Custom";
    RUNCONTROLLER("texts", texts, $scope, $http, $compile);
    // texts.fixFilters = [
    //     {
    //         field: 'id',
    //         operator: ">",
    //         value: 16
    //     }
    // ];
    //asignar text singular pero se recomienda por language
    //texts.singular = "Singular";

    //asignar text plural pero se recomienda por language
    //texts.plural = "Singular";
    texts.formulary = function (data, mode, defaultData) {
        if (texts !== undefined) {
            RUN_B("texts", texts, $scope, $http, $compile);

            //tamaño del modal
            //texts.form.modalWidth = ENUM.modal.width.full;

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

        }
    };
});