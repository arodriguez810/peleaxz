MODAL = {
    run: function ($scope) {
        $scope.modal = {};
        $scope.modal.DOMID = ($scope.modelName || "") + "_modalpool";
        $scope.modal.history = [];
        $scope.modal.historyObject = [];
        $scope.modal.add = function (data) {
            var buttonsHtml = "";
            data.footer.cancelButton = data.footer.cancelButton === undefined ? true : data.footer.cancelButton;
            data.backMode = data.backMode === undefined ? true : data.backMode;
            data.header.closeButton = data.closeButton === undefined ? true : data.closeButton;
            data.content.sameController = data.content.sameController === undefined ? false : data.content.sameController;
            for (var i in data.footer.buttons) {
                var item = data.footer.buttons[i];
                buttonsHtml += String.format("<button type=\"button\" class=\"btn bg-{0}\" ng-click='{2}'>{1}</button>",
                    item.color,
                    item.title,
                    item.func,
                );
            }
            if ($("#modal" + data.id).length > 0)
                $("#modal" + data.id).remove();

            var backMode = ($scope.modal.history.length > 0 && data.backMode);
            var closeModal = String.format("ng-click=\"{0}.modal.close()\"", $scope.modelName);
            var animation = (data.animation || "");
            var bgheader = (data.header.bg || "primary");
            var cancelTitle = backMode ? "Back to " + ARRAY.last($scope.modal.historyObject).header.title : "Close";
            var closeText = backMode ? ("<=" + (ARRAY.last($scope.modal.historyObject).header.title)) : "&times;";
            var headercloseButton = ((data.header.closeButton) ? "    <button type=\"button\" id='closeModal' class=\"close cancelmodal\" " + closeModal + ">" + closeText + "</button>" : "");
            var h = (data.header.h || "h6");
            var icon = ((data.header.icon) ? "<i class=\"icon-" + data.header.icon + "\"></i>" : "");
            var title = (data.header.title || "");
            var content = ((data.content.data.startsWith("->")) ? "" : data.content.data);
            var cancelText = backMode ? "Back" : "Close";
            var cancelButton = ((data.footer.cancelButton) ? "    <button type=\"button\" class=\"btn btn-link\" " + closeModal + " >" + cancelText + "</button>" : "");

            var html =
                String.format("<div id=\"modal" + data.id + "\" class=\"modal {0}\"  data-backdrop=\"false\">", animation) +
                " <div class=\"modal-dialog " + data.width + " \">" +
                "  <div class=\"modal-content\">" +
                "   <div class=\"modal-header bg-" + bgheader + "\">" + headercloseButton +
                "    <" + h + " class=\"modal-title\">" + icon + title + "</" + h + ">" +
                "   </div>" +
                "   <div class=\"modal-body\" id='modalcontent" + data.id + "'>" +
                "" + content +
                "   </div>" +
                "   <div class=\"modal-footer\">" + cancelButton + buttonsHtml +
                "   </div>" +
                "  </div>" +
                " </div>" +
                "</div>";

            $("#" + $scope.modal.DOMID).append(html);


            if (data.content.data.startsWith("->")) {
                if (data.content.sameController)
                    $scope.loadContent(data.content.data.replaceAll('->', ''), 'modalcontent' + data.id, data.content.loadingContentText || "Loading...", function (success) {
                        $scope.build("modal" + data.id);
                    });
                else
                    $scope.loadContentClean(data.content.data.replaceAll('->', ''), 'modalcontent' + data.id, data.content.loadingContentText || "Loading...", function (success) {
                        $scope.build("modal" + data.id);
                    });
            } else {
                $scope.build("modal" + data.id);
            }

            $("#modal" + data.id).on('show.bs.modal', function () {
                if (typeof data.event.show.begin === "function")
                    data.event.show.begin($scope);
            });
            $("#modal" + data.id).on('hide.bs.modal', function () {
                if (typeof data.event.hide.begin === "function")
                    data.event.hide.begin($scope);
            });
            $("#modal" + data.id).on('hidden.bs.modal', function () {
                if (typeof data.event.hide.end === "function")
                    data.event.hide.end($scope);
            });
            $("#modal" + data.id).on('shown.bs.modal', function () {
                if (typeof data.event.show.end === "function")
                    data.event.show.end($scope);
            });
            $scope.modal.historyObject.push(data);
        };
        $scope.modal.open = function (id) {
            if ($scope.modal.history.length > 0) {
                var last = ARRAY.last($scope.modal.history);
                $(last).modal("hide");
            }
            $("#modal" + id).modal("show");
            $scope.modal.history.push("#modal" + id);
        };
        $scope.modal.reopen = function (id) {
            $scope.modal.closeAll();
            $scope.modal.open(id);
        };
        $scope.modal.close = function () {
            var last = ARRAY.last($scope.modal.history);
            $(last).modal("hide");
            ARRAY.removeLast($scope.modal.history);
            ARRAY.removeLast($scope.modal.historyObject);
            if ($scope.modal.history.length > 0) {
                last = ARRAY.last($scope.modal.history);
                $(last).modal("show");
            }
        };
        $scope.modal.closeAll = function () {
            var last = ARRAY.last($scope.modal.history);
            $(last).modal("hide");
            $scope.modal.history = [];
        };
        $scope.modal.modalView = function (view, options) {
            var id = view.replaceAll("/", "_").replaceAll("#", "_");
            var properties = {
                id: id,
                animation: '',
                width: 'modal-lg',//modal-xs modal-sm modal-lg modal-full
                backMode: true,
                header: {
                    title: "Test Modal",
                    icon: "law",
                    bg: TAG.table,
                    closeButton: true,
                    h: "h6"
                },
                footer: {
                    cancelButton: true,
                    buttons: [
                        {
                            color: "success",
                            title: "Save",
                            func: "ms_user.openFilters2();"
                        }
                    ]
                },
                content: {
                    data: "->" + view,
                    loadingContentText: "Loading Filters",
                    sameController: true,
                },
                event: {
                    show: {
                        begin: function (data) {
                            console.log("se mostrará: " + data.table.currentPage);
                        },
                        end: function (data) {
                            console.log("se mostró: " + data.table.currentPage);
                        }
                    },
                    hide: {
                        begin: function (data) {
                            console.log("se cerrará: " + data.table.currentPage);
                        },
                        end: function (data) {
                            console.log("se cerró: " + data.table.currentPage);
                        }
                    }
                }
            };
            var merge = DSON.merge(properties, options);
            $scope.modal.add(merge);
            $scope.modal.open(id);
        };
        $scope.modal.simpleModal = function (html, options) {
            var id = "simple";
            var properties = {
                id: id,
                animation: '',
                width: 'modal-lg',
                backMode: false,
                header: {
                    title: "",
                    icon: "",
                    bg: TAG.table,
                    closeButton: true,
                    h: "h6"
                },
                footer: {
                    cancelButton: true
                },
                content: {
                    data: html,
                    loadingContentText: "Loading...",
                    sameController: true,
                },
                event: {
                    show: {
                        begin: function (data) {

                        },
                        end: function (data) {

                        }
                    },
                    hide: {
                        begin: function (data) {

                        },
                        end: function (data) {

                        }
                    }
                }
            };
            var merge = DSON.merge(properties, options);
            $scope.modal.add(merge);
            $scope.modal.open(id);
        };
    }
};
