MODAL = {
    historyObject: [],
    history: [],
    viewData: [],
    rawModal: function (title, link, icon, width, controller) {
        //MENUMODAL = true;
        DRAGON.modal.modalView(link, {
            width: width || ENUM.modal.width.full,
            header: {
                title: title || '',
                icon: icon || ''
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                sameController: controller || true
            },
            event: {
                hide: {
                    begin: function (data) {
                        //MENUMODAL = true;
                    },
                    end: function (data) {
                        //MENUMODAL = true;
                    }
                }
            }
        });
    },
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
        if (typeof DRAGON !== "undefined")
            DRAGON.viewData = undefined;
        if (MODAL.historyObject.length < 1) {
            if (MENUMODAL) {
                ANGULARJS.get('DRAGON').base();
                MENUMODAL = false;
            }
            UNIQUEFIELD = null;
        }
    },
    close: function ($scope, callback) {
        if ($scope === undefined)
            $scope = DRAGON.currentModel;
        var last = ARRAY.last(MODAL.history);
        STEP.register({
            scope: $scope ? $scope.modelName : '',
            windows: `${ARRAY.last(MODAL.historyObject).header.title} Modal`, action: "Close Modal",
        });
        $(last).modal("hide");
        ARRAY.removeLast(MODAL.history);
        ARRAY.removeLast(MODAL.historyObject);
        if (MODAL.historyObject.length < 1) {
            $scope.colertor();
            REMOVEALLCHILDSCOPE();
            $scope.colertor();
            UNIQUEFIELD = null;
            if (MENUMODAL) {
                ANGULARJS.get('DRAGON').base();
                MENUMODAL = false;
            }
        }
        $(last).remove();
        if (MODAL.history.length > 0) {
            last = ARRAY.last(MODAL.history);
            var isTemporal = $(last).html().indexOf('@temporal') !== -1;
            if (isTemporal) {
                MODAL.close($scope);
                if (typeof callback === "function")
                    callback();
            } else {
                DRAGON.viewData = ARRAY.last(MODAL.historyObject).viewData;
                $(last).modal("show");
            }
        } else {
            DRAGON.viewData = undefined;
        }
        if (typeof callback === "function")
            callback();
    },
    run: function ($scope) {
        $scope.modal = {};

        $scope.modal.new = function (controller) {
            var html =
                `
                <div id="${controller}" ng-controller="${controller} as ${controller}" ng-init="${controller}.formulary(null,'new');"></div>
                `;
            $scope.returnBuild(html);
        };
        $scope.modal.edit = function (controller, id) {
            var html =
                `
                <div id="${controller}" ng-controller="${controller} as ${controller}" ng-init="${controller}.formulary(${controller}.info.whereKey(${id}),'edit',{});">              
                </div>
                `;
            $scope.returnBuild(html);
        };
        $scope.modal.list = async function (controller) {
            $scope.modal.modalView(controller, {
                header: {
                    title: MESSAGE.ic(`columns.${controller}_plural`),
                    icon: ""
                },
                footer: {
                    cancelButton: true
                },
                content: {
                    loadingContentText: MESSAGE.i('actions.Loading'),
                    sameController: controller
                }
            });
        };
        $scope.modal.view = async function (controller, id) {
            var item = await DRAGONAPI.firstp(controller, $scope.info.whereKey(id, controller));
            DRAGONID = item;
            var html =
                `
                <div id="${controller}" ng-controller="${controller} as ${controller}" ng-init="${controller}.dataForView = DRAGONID;${controller}.modal.modalView('${controller}/view', {header: {title: MESSAGE.i('mono.Viewof') + ' ' + ${controller}.plural,icon: ''},footer: {cancelButton: true},content: {loadingContentText: ${MESSAGE.i('actions.Loading')},sameController: true}});">              
                </div>
                `;
            $scope.returnBuild(html);
        };

        $scope.modalAction = function (controller, callbackinit) {
            var html =
                `
                <script>${controller}.initCtrl = callbackinit;</script>
                <div id="${controller}" ng-controller="${controller} as ${controller}" ng-init="${controller}.initCtrl()"></div>
                `;
            $scope.returnBuild(html);
        };
        $scope.simpleModalAction = function (html, controller, title, icon, action, id) {
            DRAGONACTION = action;
            DRAGONID = id;
            $scope.modal.simpleModal(html, {
                header: {
                    title: title,
                    icon: icon
                },
                footer: {
                    cancelButton: true
                },
                content: {
                    loadingContentText: MESSAGE.i('actions.Loading'),
                    sameController: controller
                },
            });
        };
        $scope.viewmore = function (text, length) {
            if (text.length > length) {
                $scope.modal.simpleModal(text, {
                    header: {title: `${MESSAGE.ic('mono.completetext')} ${MESSAGE.i('mono.of')} ` + $scope.plural}
                });
            }
        };
        $scope.viewless = function (text, length) {
            if (text.length > length) {
                return text.substring(0, length) + "..."
            }
            return text;
        };
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
            var closeText = backMode ? "<i class='icon-arrow-left8'></i>" + DSON.substringif(ARRAY.last(MODAL.historyObject).header.title, 30) : "&times;";

            if (MENUMODAL)
                closeText = "<i class='icon-arrow-left8'></i>";

            var headercloseButton = data.header.closeButton ?
                '    <button type="button" id=\'closeModal\' class="bg-' + bgheader + ' close cancelmodal" ' + closeModal + ">" + closeText + "</button>" : "";
            var h = data.header.h || "h6";
            var icon = data.header.icon ? '<i class="icon-' + data.header.icon + '"></i>' : "";
            var title = data.header.title || "";
            var content = data.content.data.startsWith("->") ?
                `<div class="spinner222Modal">
                    <div class="double-bounce1 bg-${COLOR.primary}-600"></div>
                    <div class="double-bounce2 bg-${COLOR.secundary}-600"></div>
                    <div class="double-bounce3 bg-${COLOR.extra}-600"></div>
                </div>`
                : data.content.data;
            var cancelText = backMode ? MESSAGE.ic('mono.back') : MESSAGE.ic('mono.close');
            var cancelButton = data.footer.cancelButton
                ? '    <button type="button" class="btn btn-labeled bg-' + COLOR.secundary + '" ' + closeModal + " > <b><i class=\"icon-cross2\"></i></b>" + cancelText + "</button>" : "";
            var html = String.format('<div id="modal' + data.id + '" class="modal {0}"  data-backdrop="static" data-keyboard="false">', animation) +
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
            $("#" + $scope.modal.DOMID).append($scope.returnBuild(html));

            //$(thisid).html($scope.returnBuild(data.data));
            if (data.content.data.startsWith("->")) {
                if (data.content.sameController === true) {
                    new LOAD().loadContentScope(
                        data.content.data.replaceAll("->", ""),
                        "modalcontent" + data.id,
                        data.content.loadingContentText || MESSAGE.i('actions.Loading'),
                        function (success) {
                            MESSAGE.run();
                        }, undefined, undefined, $scope);
                } else {

                    new LOAD().loadContentClean(
                        data.content.data.replaceAll("->", ""),
                        "modalcontent" + data.id,
                        data.content.loadingContentText || MESSAGE.i('actions.Loading'),
                        function (success) {
                            MESSAGE.run();
                        },
                        data.content.sameController, $scope
                    );
                }
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
            data.viewData = DRAGON.viewData;
            MODAL.historyObject.push(data);
            return data.id;
        };
        $scope.modal.addInline = function (data, div) {
            if (data.content.data.startsWith("->")) {
                if (data.content.sameController === true) {
                    new LOAD().loadContentScope(
                        data.content.data.replaceAll("->", ""),
                        div,
                        data.content.loadingContentText || MESSAGE.i('actions.Loading'),
                        function (success) {
                            MESSAGE.run();
                        }, undefined, undefined, $scope);
                } else {

                    new LOAD().loadContentClean(
                        data.content.data.replaceAll("->", ""),
                        div,
                        data.content.loadingContentText || MESSAGE.i('actions.Loading'),
                        function (success) {
                            MESSAGE.run();
                        },
                        data.content.sameController, $scope
                    );
                }
            }
        };
        $scope.modal.refreshViewData = function () {
        };
        $scope.modal.open = function (id) {
            if (MODAL.history.length > 0) {
                var last = ARRAY.last(MODAL.history);
                $(last).modal("hide");
            }
            var data = ARRAY.last(MODAL.historyObject);
            DRAGON.viewData = data.viewData;
            $("#modal" + id).modal("show");
            var indexb = 0;
            for (var i in data.footer.buttons) {
                var item = data.footer.buttons[i];
                $(`#modalButton${indexb}${data.id}`).click(function () {
                    if (typeof item.action === "function") {
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
        $scope.modal.override = function (id) {
            $scope.modal.close();
            $scope.modal.open(id);
        };
        $scope.modal.openinline = function (id) {
            // if (MODAL.history.length > 0) {
            //     var last = ARRAY.last(MODAL.history);
            //     $(last).modal("hide");
            // }
            // var data = ARRAY.last(MODAL.historyObject);
            // DRAGON.viewData = data.viewData;
            // $("#modal" + id).modal("show");
            // var indexb = 0;
            // for (var i in data.footer.buttons) {
            //     var item = data.footer.buttons[i];
            //     $(`#modalButton${indexb}${data.id}`).click(function () {
            //         if (typeof item.action === "function") {
            //             item.action();
            //         } else {
            //             alert('This modal customButton don\'t have an action!');
            //         }
            //     });
            //     indexb++;
            // }
            // STEP.register({
            //     scope: $scope.modelName,
            //     windows: `${data.header.title} Modal`, action: "Open Modal"
            // });
            // MODAL.history.push("#modal" + id);
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
            if (MODAL.historyObject.length < 1) {
                $scope.colertor();
                REMOVEALLCHILDSCOPE();
                $scope.colertor();
            }

            $(last).remove();

            if (MODAL.history.length > 0) {
                last = ARRAY.last(MODAL.history);
                var isTemporal = $(last).html().indexOf('@temporal') !== -1;
                if (isTemporal) {
                    MODAL.close($scope);
                    if (typeof callback === "function")
                        callback();
                } else {
                    DRAGON.viewData = ARRAY.last(MODAL.historyObject).viewData;
                    $(last).modal("show");
                }
            } else {
                DRAGON.viewData = undefined;
            }
            if (MODAL.historyObject.length < 1) {
                if (MENUMODAL) {
                    ANGULARJS.get('DRAGON').base();
                    MENUMODAL = false;
                }
                UNIQUEFIELD = null;
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

            DRAGON.viewData = undefined;
            if (MODAL.historyObject.length < 1) {
                if (MENUMODAL) {
                    ANGULARJS.get('DRAGON').base();
                    MENUMODAL = false;
                }
                UNIQUEFIELD = null;
            }
        };
        $scope.modal.modalView = function (view, options, override) {
            var id = view.replaceAll("/", "_").replaceAll("#", "_").replaceAll(".", "_");
            var properties = {
                id: id,
                animation: "",
                width: ENUM.modal.width.full,
                backMode: true,
                header: {
                    title: "Test Modal",
                    icon: "law",
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
                    loadingContentText: MESSAGE.i('actions.Loading')
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
            if (override)
                $scope.modal.override(id);
            $scope.modal.open(id);
        };
        $scope.modal.modalViewInline = function (view, options, div) {
            var id = view.replaceAll("/", "_").replaceAll("#", "_").replaceAll(".", "_");
            var properties = {
                id: id,
                animation: "",
                width: ENUM.modal.width.full,
                backMode: true,
                header: {
                    title: "Test Modal",
                    icon: "law",
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
                    loadingContentText: MESSAGE.i('actions.Loading')
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
            id = $scope.modal.addInline(merge, div);
            //$scope.modal.openinline(id);
        };
        $scope.modal.simpleModal = function (html, options, override) {
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
                    loadingContentText: MESSAGE.i('actions.Loading')

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
            if (override)
                $scope.modal.override(id);
            $scope.modal.open(id);
        };
        $scope.modal.map = function (location, content, options) {
            $scope.modal.simpleModal('<div id="mapdiv" class="map-container"></div>', options);
            var maper = new MAP();
            var map = maper.basic("#mapdiv", location, {zoom: 18});
            maper.pixel(map, content);
        };
        $scope.modal.jsonDetail = function (method, paramenters, crud, modaloptions) {
            DRAGONAPI.ajax.post(method, paramenters, function (data) {
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