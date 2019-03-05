MODAL = {
    historyObject: [],
    history: [],
    viewData: [],
    getViewData: function () {
        return ARRAY.last(MODAL.historyObject).viewData;
    },
    current: function () {
        return ARRAY.last(MODAL.historyObject);
    },
    closeAll: function () {
        var last = ARRAY.last(MODAL.history);
        $(last).modal("hide");
        for (const item of MODAL.history) {
            $(item).remove();
        }
        MODAL.history = [];
        if (typeof  baseController !== "undefined")
            baseController.viewData = undefined;
    },
    close: function ($scope) {
        var last = ARRAY.last(MODAL.history);
        STEP.register({
            scope: $scope.modelName,
            windows: `${ARRAY.last(MODAL.historyObject).header.title} Modal`, action: "Close Modal",
        });
        $(last).modal("hide");
        ARRAY.removeLast(MODAL.history);
        ARRAY.removeLast(MODAL.historyObject);
        if (MODAL.historyObject.length < 1)
            REMOVEALLCHILDSCOPE();
        $(last).remove();
        if (MODAL.history.length > 0) {
            last = ARRAY.last(MODAL.history);
            baseController.viewData = ARRAY.last(MODAL.historyObject).viewData;
            $(last).modal("show");
        } else {
            baseController.viewData = undefined;
        }
    },
    run: function ($scope) {
        $scope.modal = {};
        $scope.modal.DOMID = "modalpool";
        $scope.modal.isOpen = function () {
            return MODAL.historyObject.length > 0;
        };
        $scope.modal.HISTORY = function () {
            return ARRAY.last(MODAL.historyObject);
        };
        $scope.modal.add = function (data) {
            data.id += +new Date().getTime();
            var buttonsHtml = "";
            data.footer.cancelButton = data.footer.cancelButton === undefined ? true : data.footer.cancelButton;
            data.backMode = data.backMode === undefined ? true : data.backMode;
            data.header.closeButton = data.closeButton === undefined ? true : data.closeButton;
            data.content.sameController = data.content.sameController === undefined ? false : data.content.sameController;
            var indexb = 0;
            for (var i in data.footer.buttons) {
                var item = data.footer.buttons[i];
                buttonsHtml += String.format('<button id="modalButton{2}{3}" type="button" class="btn bg-{0}">{1}</button>', item.color, item.title, indexb, data.id);
                indexb++;
            }

            if ($("#modal" + data.id).length > 0) $("#modal" + data.id).remove();

            var backMode = MODAL.history.length > 0 && data.backMode;
            var closeModal = String.format(
                'onclick="MODAL.close({0})"', $scope.modelName
            );
            var animation = data.animation || "";
            var bgheader = data.header.bg || COLOR.primary;
            var closeText = backMode ? "<=" + ARRAY.last(MODAL.historyObject).header.title : "&times;";
            var headercloseButton = data.header.closeButton ?
                '    <button type="button" id=\'closeModal\' class="bg-' + bgheader + ' close cancelmodal" ' + closeModal + ">" + closeText + "</button>" : "";
            var h = data.header.h || "h6";
            var icon = data.header.icon ? '<i class="icon-' + data.header.icon + '"></i>' : "";
            var title = data.header.title || "";
            var content = data.content.data.startsWith("->") ? "" : data.content.data;
            var cancelText = backMode ? "Back" : "Close";
            var cancelButton = data.footer.cancelButton
                ? '    <button type="button" class="btn btn-link" ' + closeModal + " >" + cancelText + "</button>" : "";
            var html = String.format('<div id="modal' + data.id + '" class="modal {0}"  data-backdrop="false">', animation) +
                ' <div class="modal-dialog ' + data.width + ' ">' +
                '  <div class="modal-content">' +
                '   <div class="modal-header bg-' + bgheader + '">' + headercloseButton +
                "    <" + h + ' class="modal-title">' + icon + " " + title + "</" + h + ">" +
                "   </div>" +
                '   <div class="modal-body" id=\'modalcontent' + data.id + "'>" + "" + content + "   </div>" +
                '   <div class="modal-footer">' + buttonsHtml + cancelButton + "   </div>" +
                "  </div>" +
                " </div>" +
                "</div>";

            $("#" + $scope.modal.DOMID).append(html);

            if (data.content.data.startsWith("->")) {
                if (data.content.sameController) {

                    $scope.loadContent(
                        data.content.data.replaceAll("->", ""),
                        "modalcontent" + data.id,
                        data.content.loadingContentText || "Loading...",
                        function (success) {
                        }
                    );
                }
                else {

                    $scope.loadContentClean(
                        data.content.data.replaceAll("->", ""),
                        "modalcontent" + data.id,
                        data.content.loadingContentText || "Loading...",
                        function (success) {
                        }
                    );
                }
            } else {
                // $scope.build("modal" + data.id);
            }

            $("#modal" + data.id).on("show.bs.modal", function () {
                if (typeof data.event.show.begin === "function")
                    data.event.show.begin($scope);
            });
            $("#modal" + data.id).on("hide.bs.modal", function () {
                if (typeof data.event.hide.begin === "function")
                    data.event.hide.begin($scope);
            });
            $("#modal" + data.id).on("hidden.bs.modal", function () {
                if (typeof data.event.hide.end === "function")
                    data.event.hide.end($scope);
            });
            $("#modal" + data.id).on("shown.bs.modal", function () {
                if (typeof data.event.show.end === "function")
                    data.event.show.end($scope);
            });
            data.viewData = baseController.viewData;
            MODAL.historyObject.push(data);


            return data.id;
        };
        $scope.modal.refreshViewData = function () {

        };
        $scope.modal.open = function (id) {
            if (MODAL.history.length > 0) {
                var last = ARRAY.last(MODAL.history);
                $(last).modal("hide");
            }
            var data = ARRAY.last(MODAL.historyObject);
            baseController.viewData = data.viewData;
            $("#modal" + id).modal("show");


            var indexb = 0;
            for (var i in data.footer.buttons) {
                var item = data.footer.buttons[i];
                $(`#modalButton${indexb}${data.id}`).click(function () {
                    if (DSON.iffunction(item.action)) {
                        item.action();
                    } else {
                        alert('This modal customButton don\'t have an action!');
                    }
                });
                indexb++;
            }
            STEP.register({
                scope: $scope.modelName,
                windows: `${data.header.title} Modal`, action: "Open Modal"
            });
            MODAL.history.push("#modal" + id);
        };
        $scope.modal.reopen = function (id) {
            $scope.modal.closeAll();
            $scope.modal.open(id);
        };
        $scope.modal.close = function () {
            var last = ARRAY.last(MODAL.history);
            STEP.register({
                scope: $scope.modelName,
                windows: `${ARRAY.last(MODAL.historyObject).header.title} Modal`, action: "Close Modal",
            });
            $(last).modal("hide");
            ARRAY.removeLast(MODAL.history);
            ARRAY.removeLast(MODAL.historyObject);
            if (MODAL.historyObject.length < 1)
                REMOVEALLCHILDSCOPE();

            $(last).remove();
            if (MODAL.history.length > 0) {
                last = ARRAY.last(MODAL.history);
                baseController.viewData = ARRAY.last(MODAL.historyObject).viewData;
                $(last).modal("show");
            } else {
                baseController.viewData = undefined;
            }
        };
        $scope.modal.closeAll = function () {
            var last = ARRAY.last(MODAL.history);
            STEP.register({
                scope: $scope.modelName,
                windows: `All Modal`, action: "Close All Modal",
            });
            $(last).modal("hide");
            for (const item of MODAL.history) {
                $(item).remove();
            }
            MODAL.history = [];
            baseController.viewData = undefined;
        };
        $scope.modal.modalView = function (view, options) {

            var id = view.replaceAll("/", "_").replaceAll("#", "_").replaceAll(".", "_");
            var properties = {
                id: id,
                animation: "",
                width: ENUM.modal.width.large,
                backMode: true,
                header: {
                    title: "Test Modal",
                    icon: ICON.classes.law,
                    bg: COLOR.primary + "-600",
                    closeButton: true,
                    h: "h6"
                },
                footer: {
                    cancelButton: true,
                    // buttons: [
                    //     {
                    //         color: "success",
                    //         title: "Save",
                    //         action: function(){}
                    //     }
                    // ]
                },
                content: {
                    data: "->" + view,
                    loadingContentText: "Loading..."
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
            id = $scope.modal.add(merge);
            $scope.modal.open(id);
        };
        $scope.modal.simpleModal = function (html, options) {
            var id = "simple";
            var properties = {
                id: id,
                animation: "",
                width: ENUM.modal.width.large,
                backMode: true,
                header: {
                    title: "",
                    icon: "",
                    bg: COLOR.primary + "-600",
                    closeButton: true,
                    h: "h6"
                },
                footer: {
                    cancelButton: true
                },
                content: {
                    data: html,
                    loadingContentText: "Loading..."

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
            id = $scope.modal.add(merge);
            $scope.modal.open(id);
        };
        $scope.modal.map = function (location, content, options) {
            $scope.modal.simpleModal('<div id="mapdiv" class="map-container"></div>', options);
            var map = MAP.basic("#mapdiv", location, {zoom: 18});
            MAP.pixel(map, content);
        };
        $scope.modal.jsonDetail = function (method, paramenters, crud, modaloptions) {
            BASEAPI.ajax.post(method, paramenters, function (data) {
                $scope.currentDetail = {
                    from: $scope.modelName,
                    to: method,
                    data: data.data,
                    crud: eval("CRUD_" + crud)
                };
                $scope.modal.modalView(String.format("{0}/detail", $scope.modelName), modaloptions);
            });

        }
    }
};
