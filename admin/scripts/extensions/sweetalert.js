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
                            title: "The page must be greater than 1 and less than " + $scope.table.totalPages,
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
        },
        confirm: function (data) {

            LOAD.template('templates/alerts/modal', {icon: 'icon-menu'}, function (html) {
                myswal({
                    type: data.yes || 'warning',
                    title: data.message || "¿Are you sure?",
                    html: html,
                    showCancelButton: true,
                    confirmButtonText: data.yes || "Yes",
                    cancelButtonText: data.cancel || "Cancel",
                }).then((result) => {
                    if (result.dismiss === undefined) {
                        if (typeof data.success === "function")
                            data.confirm();
                    } else {
                        if (typeof data.success === "function")
                            data.cancel();
                    }
                })
            });

        }
    };

$(document).ready(function () {
    myswal = swal.mixin({
        confirmButtonClass: 'btn btn-' + COLOR.success,
        cancelButtonClass: 'btn btn-' + COLOR.danger,
        buttonsStyling: false,
        allowOutsideClick: true
    });
});
