SWEETALERT = {
    goPage: function ($scope) {
        myswal({
            title: String.format(
                "Enter Page Number between {0} to {1}",
                1,
                $scope.table.totalPages
            ),
            input: "number",
            showCancelButton: true,
            confirmButtonText: "Go"
        }).then(result => {
            if (result.dismiss === undefined) {
                if (result.value > $scope.table.totalPages || result.value < 1) {
                    myswal({
                        title:
                            "The page must be greater than 1 and less than " +
                            $scope.table.totalPages,
                        showCancelButton: true,
                        confirmButtonText: "Try Again"
                    }).then(result => {
                        console.log(result);
                        if (result.dismiss === undefined) SWEETALERT.goPage($scope);
                    });
                } else {
                    $scope.goPage(parseInt(result.value));
                }
            }
        });
    },
    confirm: function (data) {
        myswal({
            type: data.type || "warning",
            title: data.title || "",
            html: data.message || "¿Are you sure?",
            showCancelButton: true,
            confirmButtonText: data.yes || "Yes",
            cancelButtonText: data.cancel || "No"
        }).then(result => {
            if (result.dismiss === undefined) {
                if (typeof data.confirm === "function") data.confirm();
            } else {
                if (typeof data.cancel === "function") data.cancel();
            }
        });
    },
    show: function (data) {
        myswal({
            type: data.type || "info",
            title: data.title || "",
            html: data.message || "",
            confirmButtonText: data.ok || "Ok",
        }).then(result => {
            if (typeof data.confirm === "function") data.close();
        });
    }
};

$(document).ready(function () {
    myswal = swal.mixin({
        confirmButtonClass: "btn btn-" + COLOR.success,
        cancelButtonClass: "btn btn-" + COLOR.danger,
        buttonsStyling: false,
        allowOutsideClick: true
    });
});
