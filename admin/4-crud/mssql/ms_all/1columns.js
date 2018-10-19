CRUD_ms_all = {};
DSON.keepmerge(CRUD_ms_all, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ms_all,
    {
        table: {
            rowClass: function (row, $scope) {
                return $scope.active(row) === false ? "bg-" + COLOR.danger + "-300" : "";
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
            engine: 'ms',
            columns: {
                id: {
                    label: "ID",
                    sorttype: "numeric",//numeric,amount,time
                    class: "text-left"
                },
                name: {
                    label: "name",
                    shorttext: 20,
                    //["click", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup"]
                    click: function (data) {
                        alert(data.row.name);
                    }
                },
                lastName: {
                    label: "lastName",
                    shorttext: 20
                },
                products: {
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
                                icon: "archive"
                            },
                            footer: {
                                cancelButton: true
                            },
                            content: {
                                loadingContentText: "Loading Products"
                            },
                        }
                    }
                },
                ms_child_name: {
                    label: "child",
                    shorttext: 20,
                    link: {
                        table: "ms_child",
                        from: "child",
                        modal: {
                            header: {
                                title: "Detail of Child ${this.ms_child_name}",
                                icon: "archive"
                            },
                            footer: {
                                cancelButton: true
                            },
                            content: {
                                loadingContentText: "Loading Child Info"
                            },
                        }
                    }
                },
                ms_other_description: {
                    label: "other",
                    shorttext: 20
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
                    shorttext: 1
                },
                average: {
                    label: function () {
                        return "average" + ICON.i("file-stats");
                    },
                    format: function (value) {
                        return value === null ? '' : value + ICON.i("percent");
                    },
                    sorttype: "numeric"
                },
                salary: {
                    label: "salary",
                    formattype: "numeric:0,0.00",
                    sorttype: "numeric",
                    class: "text-right"
                },
                salaryNeto: {
                    label: "Salary Neto",
                    formattype: "numeric:0,0.00",
                    anonymous: true,
                    class: "text-right text-red",
                    value: function (data) {
                        return (data.row.salary * data.row.average) / 100;
                    }
                },
                location: {
                    label: "location",
                    formattype: "location:name",
                    sortable: false,
                },
                image: {
                    label: "image",
                    formattype: "file:image",
                    sortable: false,
                },
                file: {
                    label: "file",
                    formattype: "file:all",
                    sortable: false,
                },
                active: {
                    visible: true,
                    sorttype: "bool",
                    formattype: "bool"
                },
                created: {
                    visible: true,
                    sorttype: "time",
                    formattype: "datetime:12"
                },
                updated: {
                    visible: false
                },
                deleted: {
                    visible: false,
                    visibleDetail: false
                }
            }
        }
    });