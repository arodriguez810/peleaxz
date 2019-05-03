DRAG = {
    draggers: [],
    run: function ($scope) {
        if ($scope.characterist('persist')) {
            var crud = eval(`CRUD_${$scope.modelName}`);
            var elements = document.querySelectorAll(`.${$scope.modelName}-drag`);
            var goModalName = $scope.modelName;
            elements.forEach(function (element) {
                if ($scope.myDragger)
                    $scope.myDragger.destroy();
                $scope.myDragger = tableDragger(element, {
                    mode: crud.table.dragrow === false ? 'column' : 'row',
                    dragHandler: '.handle',
                    onlyBody: true,
                    animation: 300
                }).on('drop', function (from, to, el, mode) {
                    if (mode === 'column') {
                        STORAGE.saveColumns(goModalName, element);
                    } else {
                        $scope.changeOrder(from, to, el);
                    }
                });
            });
        }
    }
};