CRUD_ms_category = {};
DSON.keepmerge(CRUD_ms_category, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ms_category, {
    table: {
        engine: 'ms',
        view: 'vw_ms_category',
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false
            },
            name: {
                label: "name",
                shorttext: 20
            },
            description: {
                label: "description",
                sortable: false,
                shorttext: 20,
                null: "<span class='text-grey'>[NULL]</span>"
            },

            created: {
                visible: false,
                sorttype: "time",
                formattype: "datetime>DD-MM-YYYY hh:mm a"
            },
            updated: {
                visible: false,
                exportExample: false
            },
            deleted: {
                visible: false,
                visibleDetail: false,
                exportExample: false
            },
            user_created: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            user_updated: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            user_deleted: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            }
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
                            return "Permisos";
                        },
                        icon: (data) => {
                            return "heart";
                        },
                        permission: (data) => {
                            return 'edit';
                        },
                        characterist: (data) => {
                            return "";
                        },
                        click: function (data) {
                            PARAMETROSDELOGICA = {
                                id: data.row.id
                            };
                            data.$scope.modal.modalView("logica", {
                                header: {
                                    title: "Permisos de " + data.row.name,
                                    icon: "user"
                                },
                                footer: {
                                    cancelButton: true
                                },
                                content: {
                                    loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                    sameController: "logica"
                                },
                            });
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Edit');
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
                                    field: eval(`CRUD_${data.$scope.modelName}`).table.key,
                                    value: eval(`data.row.${eval(`CRUD_${data.$scope.modelName}`).table.key}`)
                                }]
                            }, FORM.modes.edit, {});
                            return false;
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.View');
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
                                        title: MESSAGE.i('mono.Viewof') + " " + data.$scope.plural,
                                        icon: "user"
                                    },
                                    footer: {
                                        cancelButton: true
                                    },
                                    content: {
                                        loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                                        sameController: true
                                    },
                                });
                            }
                        }
                    },
                    {
                        text: (data) => {
                            return MESSAGE.i('actions.Remove');
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
                                message: MESSAGE.i('alerts.AYSDelete'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.deleting') + "..."});
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
                            return MESSAGE.i('actions.Enable');
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
                                message: MESSAGE.i('alerts.AYSEnable'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
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
                            return MESSAGE.i('actions.Disable');
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
                                message: MESSAGE.i('alerts.AYSDisable'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.ic('mono.procesing')});
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
                            return MESSAGE.i('actions.Copy');
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

                            for (var i in eval(`CRUD_${data.$scope.modelName}`).table.columns) {
                                var column = eval(`CRUD_${data.$scope.modelName}`).table.columns[i];
                                var key = i;
                                var alter = column.exportKey !== undefined ? column.exportKey : i;
                                if (eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample !== false) {
                                    var exampleText = eval(`CRUD_${data.$scope.modelName}`).table.columns[key].exportExample;
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
                                title: MESSAGE.i('actions.CopyRecords'),
                                message: MESSAGE.i('alerts.Copy'),
                                confirm: function () {
                                    SWEETALERT.loading({message: MESSAGE.i('actions.CopyngRecord')});
                                    var records = [formatRow];
                                    var columns = eval(`CRUD_${data.$scope.modelName}`).table.columns;
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
                            return MESSAGE.i('actions.Clipboard');
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
});