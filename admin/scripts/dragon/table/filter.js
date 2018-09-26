FILTER = {
    run: function ($scope) {
        $scope.openFilters = function () {
            $scope.modal.modalView('ms_all/angel', {width: 'modal-full', content: {sameController: true}});
        };
        $scope.openFilters2 = function () {
            $scope.modal.modalView('ms_user/angel', {header: {title: "Modal Andy"}});
        };
    }
};