app.controller("ms_all", function ($scope, $http, $compile) {
    ms_all = this;
    ms_all.fixFilters = [];
    RUNCONTROLLER("ms_all", ms_all, $scope, $http, $compile);
    ms_all.formulary = function (data, mode, defaultData) {
        if (ms_all !== undefined) {
            RUN_B("ms_all", ms_all, $scope, $http, $compile);
            ms_all.form.modalWidth = ENUM.modal.width.full;
            ms_all.form.titles = {
                new: "Nuevo ALL",
                edit: "`Editar ALL - ${$scope.name}`",
                view: "`Ver ALL - ${$scope.name}`"
            };
            ms_all.form.schemas.insert = {
                file: FORM.schemasType.upload,
                gallery: FORM.schemasType.upload,
                image: FORM.schemasType.upload,
                products: FORM.schemasType.selectMultiple,
                products_config: {
                    toTable: "ms_allproducts",
                    text: "Inserting products...",
                    fields: {
                        all: "$id",
                        product: "$item"
                    },
                    fieldsUpdate: {
                        field: "all",
                        value: "$id",
                    },
                },
                ms_allusers: FORM.schemasType.relation,
                ms_allusers_config: {
                    toTable: "ms_allusers",
                    update: {all: "$id", tempid: "$NULL"},
                    where: [{field: "tempid", value: "$id"}]
                },
                salaryNeto: FORM.schemasType.calculated
            };
            ms_all.form.schemas.select = {
                record: FORM.schemasType.datetime,
                birthDate: FORM.schemasType.datetime,
                lastLogin: FORM.schemasType.datetime,
                salary: FORM.schemasType.decimal,
                location: FORM.schemasType.location,
                products: {
                    toTable: "ms_allproducts",
                    text: MESSAGE.i('actions.Loading'),
                    fields: {
                        all: "$id",
                    },
                },
            };
            ms_all.form.readonly = {};
            ms_all.createForm(data, mode, defaultData);

            ms_all.$scope.$watch('ms_all.name', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.realdata(value));
                VALIDATION.validate(ms_all, "name", rules);
            });
            ms_all.$scope.$watch('ms_all.child', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(ms_all, "child", rules);
            });
            ms_all.$scope.$watch('ms_all.products', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.dropdown.atLeast(value, 3));
                rules.push(VALIDATION.dropdown.atLeast(value, 2, true));
                VALIDATION.validate(ms_all, "products", rules);
            });
            ms_all.$scope.$watch('ms_all.salary', function (value) {
                var rules = [];
                rules.push(VALIDATION.general.required(DSON.cleanNumber((value || ""))));
                VALIDATION.validate(ms_all, "salary", rules);
            });
            ms_all.$scope.$watch('ms_all.average', function (value) {
                var rules = [];
                var valueClean = DSON.cleanNumber((value || ""));
                ms_all.salaryNeto = (DSON.cleanNumber(ms_all.salary) * DSON.cleanNumber(value)) / 100;
                ms_all.salaryNeto = ms_all.form.masked("salaryNeto", Number(ms_all.salaryNeto).toFixed(2));
                rules.push(VALIDATION.general.required(valueClean));
                rules.push(VALIDATION.number.range(valueClean, 1, 100));
                VALIDATION.validate(ms_all, "average", rules);
            });
            ms_all.$scope.$watch('ms_all.image_DragonCountFile', function (value) {
                var rules = [];
                rules.push(VALIDATION.file.count(value, 1));
                VALIDATION.validate(ms_all, "image", rules);
            });
            ms_all.$scope.$watch('ms_all.color', function (value) {
                var rules = [];
                rules.push(VALIDATION.text.noContainsColor(value, ['rgb(255, 0, 0)']));
                VALIDATION.validate(ms_all, "color", rules);
            });
        }
    };
});