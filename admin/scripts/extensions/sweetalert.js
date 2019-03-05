SWEETALERT = {
    lastLaert: null,
    goPage: function ($scope) {
        SWEETALERT.lastLaert = myswal({
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
                        if (result.dismiss === undefined) SWEETALERT.goPage($scope);
                    });
                } else {
                    $scope.goPage(parseInt(result.value));
                }
            }
        });
    },
    confirm: function (data) {
        SWEETALERT.lastLaert = myswal({
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
    buttons: function (data, buttons) {
        var buttonsHtml = ' <div class="row"> <div class="col-md-12">';
        var id = 0;
        buttons.forEach(function (item) {
            buttonsHtml += `<button style="margin-top: 10px" id="sweetalertbutton${id}" class="btn bg-${item.color || COLOR.primary}">${item.text}</button>`;
            id++;
        });
        buttonsHtml += '</div> </div>';
        SWEETALERT.lastLaert = myswal({
            type: data.type || "info",
            title: data.title || "",
            html: (data.message || "") + buttonsHtml,
            customClass: data.class || "",
            showCancelButton: false,
            showConfirmButton: false
        });
        id = 0;
        buttons.forEach(function (item) {
            $(`#sweetalertbutton${id}`).click(function () {
                if (DSON.iffunction(item.action)) {
                    item.action();
                } else {
                    alert('This sweetlaert customButton don\'t have an action!');
                }
            });
            id++;
        });
    },
    show: function (data) {
        SWEETALERT.lastLaert = myswal({
            type: data.type || "info",
            title: data.title || "",
            html: data.message || "",
            confirmButtonText: data.ok || "Ok"
        }).then(result => {
            if (typeof data.confirm === "function") data.confirm();
        });
    },
    loading: function (data, animation) {
        SWEETALERT.lastLaert = swal({
            title: data.title || "",
            html: data.message || "",
            showConfirmButton: false,
            animation: animation === undefined
        });
        swal.showLoading();
    },
    stop: function () {
        swal.close()
    }
};

$(document).ready(function () {
    myswal = swal.mixin({
        confirmButtonClass: "btn btn-" + COLOR.success,
        cancelButtonClass: "btn btn-" + COLOR.danger,
        buttonsStyling: false,
        allowOutsideClick: false,
        closeOnClickOutside: false
    });
});
