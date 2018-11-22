CRUD_ms_allproducts = {};
DSON.keepmerge(CRUD_ms_allproducts, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ms_allproducts, {
    table: {
        engine: 'ms',
        key: "ms_all_name",
        columns: {
            ms_all_name: {
                label: "All",
                link: {
                    table: "ms_all",
                    from: "all",
                    modal: {
                        header: {
                            title: "Detail of All",
                            icon: "archive"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: "Loading.."
                        },
                    }
                }
            },
            ms_product_name: {
                label: "product",
                link: {
                    table: "ms_product",
                    from: "product",
                    modal: {
                        header: {
                            title: "Detail of Product",
                            icon: "archive"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: "Loading.."
                        },
                    }
                }
            }
        }
    }
});
