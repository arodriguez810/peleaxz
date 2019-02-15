CRUD_ms_all = {};
DSON.keepmerge(CRUD_ms_all, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ms_all,
    {
        table: {
            rowClass: function (row, $scope) {
                return $scope.activeSET(row) === false ? "bg-" + COLOR.danger + "-300" : "";
            },
            width: 200,
            offWidth: 5,
            baseWidth: 1000,
            columnsalign: "center",
            limits: [5, 10, 50, 100],
            activeColumn: "active",
            contextMenu: true,
            sorteable: true,
            key: 'id',
            deletekeys: ['id'],
            engine: 'ms',
            columns: {
                id: {
                    label: "ID",
                    sorttype: "numeric",//numeric,amount,time
                    class: "text-left",
                    exportExample: false,
                },
                name: {
                    label: "name",
                    shorttext: 20,
                    //["click", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup"]
                    click: function (data) {
                        alert(data.row.name);
                    },
                },
                lastName: {
                    label: "lastName",
                    shorttext: 20,
                },
                products: {
                    exportKey: '$$products',
                    label: "Products",
                    multilink: {
                        table: "ms_allproducts",
                        from: "id",
                        to: "all",
                        getList: "product",
                        list: "ms_product",
                        wherelist: "id",
                        modal: {
                            header: {
                                title: "Products of ${this.name}",
                                icon:  ICON.classes.archive
                            },
                            footer: {
                                cancelButton: true
                            },
                            content: {
                                loadingContentText: "Loading Products..."
                            },
                        }
                    },
                    exportExample: "id separated by ';'",
                },
                users: {
                    label: "Users",
                    multilink: {
                        table: "ms_allusers",
                        from: "id",
                        to: "all",
                        getList: "all",
                        list: "ms_allusers",
                        wherelist: "all",
                        modal: {
                            header: {
                                title: "Users Category Opinions of ${this.name}",
                                icon: ICON.classes.user
                            },
                            footer: {
                                cancelButton: true
                            },
                            content: {
                                loadingContentText: "Loading Users..."
                            },
                        }
                    },
                    exportExample: false
                },
                ms_child_name: {
                    exportKey: 'child',
                    label: "child",
                    shorttext: 20,
                    link: {
                        table: "ms_child",
                        from: "child",
                        modal: {
                            header: {
                                title: "Detail of Child ${this.ms_child_name}",
                                icon: ICON.classes.archive
                            },
                            footer: {
                                cancelButton: true
                            },
                            content: {
                                loadingContentText: "Loading Child Info"
                            },
                        }
                    },
                    exportExample: "id from master table",
                },
                ms_other_description: {
                    exportKey: 'other',
                    label: "other",
                    shorttext: 20,
                    link: {
                        table: "ms_other",
                        from: "other",
                        modal: {
                            header: {
                                title: "Detail of Other ${this.ms_other_name}",
                                icon: ICON.classes.cube
                            },
                            footer: {
                                cancelButton: true
                            },
                            content: {
                                loadingContentText: "Loading Other Info"
                            },
                        }
                    }
                },
                description: {
                    label: "description",
                    sortable: false,
                    shorttext: 20,
                    null: "<span class='text-grey'>[NULL]</span>"
                },
                biography: {
                    label: "biography",
                    sortable: false,
                    formattype: "html",
                    export: false,
                    exportExample: false
                },
                average: {
                    label: function () {
                        return "average" + ICON.i("file-stats");
                    },
                    format: function (value) {
                        return value === null ? '' : value + ICON.i("percent");
                    },
                    sorttype: "numeric",
                    exportExample: "[numeric 1 to 100]",
                },
                salary: {
                    label: "salary",
                    formattype: "numeric:0,0.00",
                    sorttype: "numeric",
                    class: "text-right",
                    exportExample: "[money]",
                },
                salaryNeto: {
                    label: "Salary Neto",
                    formattype: "numeric:0,0.00",
                    anonymous: true,
                    class: "text-right text-red",
                    value: function (data) {
                        return (data.row.salary * data.row.average) / 100;
                    },
                    exportExample: false
                },
                location: {
                    label: "location",
                    formattype: "location:name",
                    sortable: false,
                    exportExample: "[latitude],[longitud]",
                },
                image: {
                    label: "image",
                    folder: "ms_all/image/${this.id}",
                    files: {
                        maxsize: 20,
                        maxfiles: 1,
                        columns: 1,
                        acceptedFiles: null,
                        modal: {
                            width: 'modal-full',
                            header: {
                                title: "Image of ${this.name}",
                                icon: ICON.classes.images3
                            },
                            footer: {
                                cancelButton: true
                            },
                            content: {
                                loadingContentText: "Loading Image"
                            },
                        }
                    },
                    sortable: false,
                    exportExample: false
                },
                images: {
                    label: "Gallery",
                    folder: "ms_all/gallery/${this.id}",
                    files: {
                        maxsize: 20,
                        maxfiles: 4,
                        columns: 2,
                        acceptedFiles: null,
                        modal: {
                            width: 'modal-full',
                            header: {
                                title: "Gallery of ${this.name}",
                                icon: ICON.classes.images3
                            },
                            footer: {
                                cancelButton: true
                            },
                            content: {
                                loadingContentText: "Loading Images"
                            },
                        }
                    },
                    sortable: false,
                    exportExample: false
                },
                file: {
                    label: "file",
                    folder: "ms_all/file/${this.id}",
                    files: {
                        maxsize: 20,
                        maxfiles: 1,
                        columns: 1,
                        acceptedFiles: null,
                        modal: {
                            width: 'modal-full',
                            header: {
                                title: "File of ${this.name}",
                                icon: ICON.classes.archive
                            },
                            footer: {
                                cancelButton: true
                            },
                            content: {
                                loadingContentText: "Loading File"
                            },
                        }
                    },
                    sortable: false,
                    exportExample: false
                },
                color: {
                    formattype: "color",
                    sortable: false,
                    exportExample: "[Hexadecimal Color]",
                },
                hashtags: {
                    formattype: "tags",
                    sortable: false
                },
                birthDate: {
                    sorttype: "time",
                    formattype: "datetime>DD-MM-YYYY",
                    exportExample: "\"\"[Date YYYY-MM-DD]\"\""
                },
                lastLogin: {
                    sorttype: "time",
                    formattype: "datetime>DD-MM-YYYY hh:mm a",
                    exportExample: "\"\"[Date YYYY-MM-DD hh:mm am/pm]\"\""
                },
                record: {
                    sorttype: "time",
                    formattype: "datetime>hh:mm a",
                    exportExample: "\"\"[Time hh:mm am/pm]\"\""
                },
                active: {
                    visible: true,
                    sorttype: "bool",
                    formattype: "bool",
                    exportExample: "[0 or 1]"
                },
                created: {
                    visible: true,
                    sorttype: "time",
                    formattype: "datetime>DD-MM-YYYY hh:mm a",
                    exportExample: false
                },
                updated: {
                    visible: false,
                    export: false,
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
            }
        }
    });