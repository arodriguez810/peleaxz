TRIGGER = {
    run: function ($scope) {
        if ($scope.triggers === undefined) {
            $scope.triggers = {};
            $scope.triggers.table = {};
            $scope.triggers.table.after = {};
            $scope.triggers.table.before = {};

            $scope.triggers.table.after.load = function (records) {
                //console.log(`$scope.triggers.table.after.load ${$scope.modelName}`);
            };
            $scope.triggers.table.before.load = () => new Promise((resolve, reject) => {
                //console.log(`$scope.triggers.table.before.load ${$scope.modelName}`);
                resolve(true);
            });

            $scope.triggers.table.after.open = function (data) {
                //console.log(`$scope.triggers.table.after.open ${$scope.modelName}`);
            };
            $scope.triggers.table.before.open = () => new Promise((resolve, reject) => {
                //console.log(`$scope.triggers.table.before.open ${$scope.modelName}`);
                resolve(true);
            });

            $scope.triggers.table.after.close = function (data) {
                //console.log(`$scope.triggers.table.after.close ${$scope.modelName}`);
            };
            $scope.triggers.table.before.close = () => new Promise((resolve, reject) => {
                //console.log(`$scope.triggers.table.before.close ${$scope.modelName}`);
                resolve(true);
            });

            $scope.triggers.table.after.insert = function (data) {
                //console.log(`$scope.triggers.table.after.insert ${$scope.modelName}`);
                return true;
            };
            $scope.triggers.table.before.insert = (data) => new Promise((resolve, reject) => {
                //console.log(`$scope.triggers.table.before.insert ${$scope.modelName}`);
                resolve(true);
            });

            $scope.triggers.table.after.update = function (data) {
                //console.log(`$scope.triggers.table.after.update ${$scope.modelName}`);
            };
            $scope.triggers.table.before.update = (data) => new Promise((resolve, reject) => {
                //console.log(`$scope.triggers.table.before.update ${$scope.modelName}`);
                resolve(true);
            });


            $scope.triggers.table.after.control = function (data) {
                //console.log(`$scope.triggers.table.after.control ${$scope.modelName} ${data}`);
            };
            $scope.triggers.table.before.control = function (data) {
                //console.log(`$scope.triggers.table.before.control ${$scope.modelName} ${data}`);
            };
        }
    }
};