DRAG = {
    draggers: [],
    run: function ($scope) {
        if ($scope.characterist('persist')) {
            var elements = document.querySelectorAll(`.${$scope.modelName}-drag`);
            var goModalName = $scope.modelName;
            elements.forEach(function (element) {
                tableDragger(element, {
                    mode: 'column',
                    dragHandler: '.handle',
                    onlyBody: true,
                    animation: 300
                }).on('drop', function (from, to) {
                    console.log(goModalName);
                    STORAGE.saveColumns(goModalName,element);
                });
            });
        }
    }
};