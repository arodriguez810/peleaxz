DRAG = {
    run: function ($scope) {
        if ($scope.characterist('persist')) {
            var el = document.getElementById($scope.modelName + 'Table');
            if (!DSON.oseaX(el)) {
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
        }
    }
};