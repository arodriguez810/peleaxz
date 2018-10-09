CRUD_ms_all = DSON.merge(CRUD_ms_all,
    {
        table: {
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
                                return "Export to clipboard";
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
                                return false;
                            }
                        },
                        {
                            text: (data) => {
                                return "Export to .pdf";
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
                                return false;
                            }
                        },
                        {
                            text: (data) => {
                                return "Export to .csv";
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
                                return false;
                            }
                        },
                        {
                            text: (data) => {
                                return "Export to .xlsx";
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
                                return false;
                            }
                        },
                        {
                            text: (data) => {
                                return "Export to .doc";
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
                                return false;
                            }
                        }
                    ]
                }
            ]
        }
    }
);