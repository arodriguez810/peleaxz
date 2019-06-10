CRUD_ms_product = {};
DSON.keepmerge(CRUD_ms_product, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ms_product, {
    table: {
        engine: 'ms',
        columns: {
            id: {                 visible: false,                 visibleDetail: false,                 export: false,                 exportExample: false             },
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
                            title: MESSAGE.i(`columns.ms_category_name`,'Category'),
                            icon: "archive"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading'),
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

            created: {
                visible: false,
                sorttype: "time",
                formattype: "datetime>DD-MM-YYYY hh:mm a",
                exportExample: false
            },
            updated: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            deleted: {
                visible: false,
                visibleDetail: false,
                export: false,
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
    }
});