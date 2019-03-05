CRUDDEFAULTS = {
    table: {
        rowClass: function (row, $scope) {
            return $scope.activeSET(row) === false ? "bg-" + COLOR.danger + "-300" : "";
        },
        responsive: {
            "_7": "hidden",
            "_5": "visible-md visible-lg",
            "_3": "visible-sm visible-md visible-lg",
            "_1": "visible-xs visible-sm visible-md visible-lg"
        },
        report: false,
        width: "",
        offWidth: 5,
        baseWidth: 1000,
        columnsalign: "center",
        limits: [10, 50, 100, 0],
        activeColumn: "active",
        contextMenu: true,
        sorteable: true,
        key: 'id',
        deletekeys: ['id'],
        engine: 'ms',
        batch: true,
        persist: true,
        sortable: true,
        allow: {
            add: true,
            edit: true,
            view: true,
            remove: true,
            active: true,
            filter: true,
            import: true,
            copy: true,
            clone: true,
            export: {
                Clipboard: true,
                PDF: true,
                CSV: true,
                XLS: true,
                DOC: true
            },
            actions: true,
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
                    return ['edit', 'remove', 'active', 'view', 'copy'];
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
                            data.$scope.formulary({
                                where: [{
                                    field: data.$scope.table.crud.table.key,
                                    value: eval(`data.row.${data.$scope.table.crud.table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "View";
                        },
                        icon: (data) => {
                            return "eye";
                        },
                        permission: (data) => {
                            return 'view';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            if (!DSON.oseaX(data.row)) {
                                data.$scope.dataForView = data.row;
                                data.$scope.modal.modalView(String.format("{0}/view", data.$scope.modelName), {
                                    header: {
                                        title: "View of " + data.$scope.plural,
                                        icon: ICON.classes.user
                                    },
                                    footer: {
                                        cancelButton: true
                                    },
                                    content: {
                                        loadingContentText: "Loading Child Info",
                                        sameController: true
                                    },
                                });
                            }
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
                            SWEETALERT.confirm({
                                message: "¿Are you sure you want delete this record?",
                                confirm: function () {
                                    SWEETALERT.loading({message: "Deleting Row..."});
                                    data.$scope.deleteRow(data.row).then(function () {
                                        SWEETALERT.stop();
                                    });
                                }
                            });
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return "Enable";
                        },
                        icon: (data) => {
                            return "checkmark-circle";
                        },
                        permission: (data) => {
                            return 'active';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: "¿Are you sure you want " + "Enable" + " this record?",
                                confirm: function () {
                                    SWEETALERT.loading({message: "Procesing Row..."});
                                    data.$scope.activeRow(data.row, 1).then(function () {
                                        SWEETALERT.stop();
                                    });
                                }
                            });
                            return false;
                        },
                        show: function (data) {
                            return data.$scope.activeColumn();
                        }
                    },
                    {
                        text: (data) => {
                            return "Disable";
                        },
                        icon: (data) => {
                            return "circle";
                        },
                        permission: (data) => {
                            return 'active';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            SWEETALERT.confirm({
                                message: "¿Are you sure you want " + "Disable" + " this record?",
                                confirm: function () {
                                    SWEETALERT.loading({message: "Procesing Row..."});
                                    data.$scope.activeRow(data.row, 0).then(function () {
                                        SWEETALERT.stop();
                                    });
                                }
                            });
                            return false;
                        },
                        show: function (data) {
                            return data.$scope.activeColumn();
                        }
                    },
                    {
                        text: (data) => {
                            return "Copy";
                        },
                        icon: (data) => {
                            return "copy3";
                        },
                        permission: (data) => {
                            return 'copy';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {

                            var formatRow = {};

                            for (var i in data.$scope.table.crud.table.columns) {
                                var column = data.$scope.table.crud.table.columns[i];
                                var key = i;
                                var alter = column.exportKey !== undefined ? column.exportKey : i;
                                if (data.$scope.table.crud.table.columns[key].exportExample !== false) {
                                    var exampleText = data.$scope.table.crud.table.columns[key].exportExample;
                                    exampleText = exampleText === undefined ? "[string]" : exampleText;
                                    var realValue = eval(`data.row.${key};`);
                                    if (!DSON.oseaX(realValue)) {
                                        if (column.link !== undefined) {
                                            realValue = eval(`data.row.${key.split('_')[0]}_${key.split('_')[1]}_id;`);
                                        }
                                        eval(`formatRow.${alter} = '${realValue}';`);
                                    }
                                }
                            }
                            SWEETALERT.confirm({
                                title: 'Copy Records',
                                message: "This option copy this record without relations and paste in a new one with last ID. <br> ¿Are you sure you want copy this record?",
                                confirm: function () {
                                    SWEETALERT.loading({message: "Copyng Record..."});
                                    var records = [formatRow];
                                    var columns = data.$scope.table.crud.table.columns;
                                    var inserts = [];
                                    for (var i in records) {
                                        var record = records[i];
                                        var row = {};
                                        for (var i in record) {
                                            var key = i;
                                            var value = record[i];
                                            for (var c in columns) {
                                                var column = false;
                                                if (c === key || key === columns[c].exportKey)
                                                    column = columns[c];
                                                if (column === false) continue;
                                                eval(`row.${key} = '${value}';`);
                                                break;
                                            }
                                        }
                                        inserts.push({row: row, relations: []});
                                    }
                                    data.$scope.importing(inserts);
                                }
                            });
                            return false;
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
                    return '';
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
                            return 'export.Clipboard';
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
                            return 'export.PDF';
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
                            return 'export.CSV';
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
                            return ENUM.file.formats.XLS;
                        },
                        icon: (data) => {
                            return "file-excel";
                        },
                        permission: (data) => {
                            return 'export.XLS';
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
                            return 'export.DOC';
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