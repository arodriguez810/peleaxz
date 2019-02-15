CRUD_ms_product = {};
DSON.keepmerge(CRUD_ms_product, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ms_product, {
    table: {
        engine: 'ms',
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left"
            },
            name: {
                label: "Nombraso",
                shorttext: 20
            },
            price: {
                label: "price",
                formattype: "numeric:0,0.00",
                sorttype: "numeric",
                class: "text-right"
            },
            ms_category_name: {
                label: "Category",
                shorttext: 20,
                link: {
                    table: "ms_category",
                    from: "category",
                    modal: {
                        header: {
                            title: "Detail of Category",
                            icon: ICON.classes.archive
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: "Loading Category Info",
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
            active: {
                visible: true,
                sorttype: "bool",
                formattype: "bool"
            },
            created: {
                visible: false,
                sorttype: "time",
                formattype: "datetime>DD-MM-YYYY hh:mm a"
            },
            updated: {
                visible: false
            },
            deleted: {
                visible: false,
                visibleDetail: false
            },
            user_created: {
                visible: false,
                visibleDetail: false,
                export: false
            },
            user_updated: {
                visible: false,
                visibleDetail: false,
                export: false
            },
            user_deleted: {
                visible: false,
                visibleDetail: false,
                export: false
            }
        },
    }
});