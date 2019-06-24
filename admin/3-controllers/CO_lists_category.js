app.controller("lists_category", function ($scope, $http, $compile) {
    lists_category = this;
    //lists_category.fixFilters = [];
    //lists_category.singular = "singular";
    //lists_category.plural = "plural";
    //lists_category.headertitle = "Hola Title";
    //lists_category.destroyForm = false;
    //lists_category.permissionTable = "tabletopermission";
    RUNCONTROLLER("lists_category", lists_category, $scope, $http, $compile);
    lists_category.formulary = function (data, mode, defaultData) {
        if (lists_category !== undefined) {
            RUN_B("lists_category", lists_category, $scope, $http, $compile);
            lists_category.form.modalWidth = ENUM.modal.width.full;
            lists_category.form.readonly = {};
            lists_category.createForm(data, mode, defaultData);
            //ms_product.selectQueries['category'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("lists_category.category", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(lists_category, 'category', rules);
            });
            //ms_product.selectQueries['lists'] = [
            //    {
                //    field: 'id',
                //    operator: '!=',
                //    value: -1
            //    }
            //];
            $scope.$watch("lists_category.lists", function (value) {
                var rules = [];
                //rules here
                //rules.push(VALIDATION.general.required(value));
                VALIDATION.validate(lists_category, 'lists', rules);
            });
        }
    };
});