app.controller("ms_all", function ($scope, $http, $compile) {
    ms_all = this;
    RUNCONTROLLER("ms_all", ms_all, $scope, $http, $compile);
    RUN_B("ms_all", ms_all, $scope, $http, $compile);

    ms_all.pages.form = function (data, mode) {
        ms_all.createForm(data, mode);
        ms_all.form.rules = {
            name: function () {
                var rules = [];
                var value = ms_all.name;
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.text.realdata(value));
                return VALIDATION.process(ms_all, "name", rules)
            },
            child: function () {
                var rules = [];
                var value = ms_all.child;
                rules.push(VALIDATION.general.required(value));
                return VALIDATION.process(ms_all, "child", rules)
            },
            products: function () {
                var rules = [];
                var value = ms_all.products;
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.dropdown.atLeast(value, 3));
                rules.push(VALIDATION.dropdown.atLeast(value, 5, true));
                return VALIDATION.process(ms_all, "products", rules)
            },
            average: function () {
                var rules = [];
                var value = DSON.cleanNumber((ms_all.average || ""));
                ms_all.salaryNeto =
                    (DSON.cleanNumber(ms_all.salary) * DSON.cleanNumber(ms_all.average)) / 100;
                ms_all.salaryNeto = ms_all.form.masked("salaryNeto", Number(ms_all.salaryNeto).toFixed(2));
                rules.push(VALIDATION.general.required(value));
                rules.push(VALIDATION.number.range(value, 1, 100));
                return VALIDATION.process(ms_all, "average", rules)
            },
            salary: function () {
                var rules = [];
                var value = DSON.cleanNumber((ms_all.salary || ""));
                rules.push(VALIDATION.general.required(value));
                return VALIDATION.process(ms_all, "salary", rules)
            },
            image: function () {
                var rules = [];
                var value = ms_all.imageCount;
                rules.push(VALIDATION.file.count(value, 1));
                return VALIDATION.process(ms_all, "image", rules)
            },
            color: function () {
                var rules = [];
                var value = ms_all.color;
                rules.push(VALIDATION.text.noContainsColor(value, ['rgb(255, 0, 0)']));
                return VALIDATION.process(ms_all, "color", rules)
            },
        };

        ms_all.form.rulesGroup = {
            basic: function () {
                return ms_all.validation.stateIcon(['name', 'child', 'average', 'salary', 'image', 'color']);
            },
            products: function () {
                return ms_all.validation.stateIcon(['products']);
            },
            all: function () {
                return ms_all.validation.stateIcon(ms_all.form.fileds);
            },
        };


    };

});