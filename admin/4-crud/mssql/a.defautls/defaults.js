CRUDDEFAULTS = {
    table: {
        rowClass: function (row, $scope) {
            return $scope.active(row) === false ? "bg-" + COLOR.danger + "-300" : "";
        },
        width: 200,
        offWidth: 5,
        baseWidth: 1000,
        columnsalign: "center",
        limits: [10, 50, 100, 0],
        activeColumn: "active",
        contextMenu: true,
        sorteable: true,
        key: 'id',
        engine: 'ms',
        batch: true,
        persist: true,
        sortable: true,
        allow: {
            add: true,
            edit: true,
            remove: true,
            active: true,
            filter: true,
            export: true,
            actions: true
        },
        options: [
            {
                text: (data) => {
                    return "";
                },
                icon: (data) => {
                    return "cog2";
                },
                permission: (data) => {
                    return ['edit', 'remove', 'active'];
                },
                characterist: (data) => {
                    return '';
                },
                menus: [
                    {
                        text: (data) => {
                            return "Edit";
                        },
                        icon: (data) => {
                            return "pencil5";
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            alert(data.row.name);
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "Remove";
                        },
                        icon: (data) => {
                            return "trash";
                        },
                        permission: (data) => {
                            return 'remove';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            alert(data.row.name);
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return !data.$scope.active(data.row) ? "Enable" : "Disable";
                        },
                        icon: (data) => {
                            return !data.$scope.active(data.row) ? "checkmark-circle" : "circle";
                        },
                        permission: (data) => {
                            return 'active';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            alert(data.row.name);
                            return false;
                        },
                        show: function (data) {
                            return data.$scope.activeColumn();
                        }
                    }
                ]
            },
            {
                text: (data) => {
                    return "";
                },
                icon: (data) => {
                    return "file-download2";
                },
                permission: (data) => {
                    return 'export';
                },
                characterist: (data) => {
                    return '';
                },
                menus: [
                    {
                        text: (data) => {
                            return "Clipboard";
                        },
                        icon: (data) => {
                            return "copy3";
                        },
                        permission: (data) => {
                            return '';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            data.$scope.unCheckAll();
                            data.row.selected = true;
                            data.$scope.export.go('Clipboard', true);
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "PDF";
                        },
                        icon: (data) => {
                            return "file-pdf";
                        },
                        permission: (data) => {
                            return '';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            data.$scope.unCheckAll();
                            data.row.selected = true;
                            data.$scope.export.go('PDF', true);
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "CSV";
                        },
                        icon: (data) => {
                            return "libreoffice";
                        },
                        permission: (data) => {
                            return '';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            data.$scope.unCheckAll();
                            data.row.selected = true;
                            data.$scope.export.go('CSV', true);
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "XLS";
                        },
                        icon: (data) => {
                            return "file-excel";
                        },
                        permission: (data) => {
                            return '';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            data.$scope.unCheckAll();
                            data.row.selected = true;
                            data.$scope.export.go('XLS', true);
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "DOCX";
                        },
                        icon: (data) => {
                            return "file-word";
                        },
                        permission: (data) => {
                            return '';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            data.$scope.unCheckAll();
                            data.row.selected = true;
                            data.$scope.export.go('DOC', true);
                            return false;
                        }
                    }
                ]
            }
        ]
    }
};