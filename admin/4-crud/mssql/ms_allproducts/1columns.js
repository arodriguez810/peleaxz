CRUD_ms_allproducts = {};
DSON.keepmerge(CRUD_ms_allproducts, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ms_allproducts, {
    table: {
        engine: 'ms',
        key: "id",
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            ms_all_name: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            ms_product_name: {
                label: "product",
                link: {
                    table: "ms_product",
                    from: "product",
                    modal: {
                        header: {
                            title: MESSAGE.i(`columns.ms_product_name`,'Product'),
                            icon: "archive"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading')
                        },
                    }
                }
            }
        }
    }
});
