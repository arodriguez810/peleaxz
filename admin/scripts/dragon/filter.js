FILTER = {
    run: function ($scope) {
        $scope.openFilters = function () {
            $scope.modal.modalView('ms_user', {width: 'modal-full', content: {sameController: false}});
        };
        $scope.openFilters2 = function () {
            $scope.modal.modalView('ms_user/modal2', {backMode: false, header: {title: "Modal Andy"}});
        };
    }
};