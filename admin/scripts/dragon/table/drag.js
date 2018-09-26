DRAG = {
    run: function ($scope) {
        var el = document.getElementById($scope.modelName + 'Table');
        var dragger = tableDragger(el, {
            mode: 'column',
            dragHandler: '.handle',
            onlyBody: true,
            animation: 300
        });
        dragger.on('drop', function (from, to) {
            STORAGE.saveColumns($scope);
        });
    }
};