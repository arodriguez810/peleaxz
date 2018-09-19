SWEETALERT =
    {
        goPage: function ($scope) {
            myswal({
                title: String.format("Enter Page Number between {0} to {1}", 1, $scope.table.totalPages),
                input: 'text',
                showCancelButton: true,
                confirmButtonText: "Go",
            }).then((result) => {
                if (result.dismiss === undefined) {
                    if (result.value > $scope.table.totalPages || result.value < 1) {
                        myswal({
                            title: "The page must be greater than 0 and less than " + $scope.table.totalPages,
                            showCancelButton: true,
                            confirmButtonText: "Try Again",
                        }).then((result) => {
                            console.log(result);
                            if (result.dismiss === undefined)
                                SWEETALERT.goPage($scope);
                        });
                    } else {
                        $scope.goPage(parseInt(result.value));
                    }
                }
            })
        }
    };