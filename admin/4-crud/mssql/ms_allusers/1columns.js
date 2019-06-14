CRUD_ms_allusers = {};
DSON.keepmerge(CRUD_ms_allusers, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ms_allusers, {
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
            ms_user_name: {
                label: "user",
                link: {
                    table: "ms_user",
                    from: "user",
                    modal: {
                        header: {
                            title: MESSAGE.i(`columns.ms_user_name`,'Users'),
                            icon: "user"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading')
                        },
                    }
                }
            },
            ms_category_name: {
                label: "category",
                link: {
                    table: "ms_category",
                    from: "category",
                    modal: {
                        header: {
                            title: MESSAGE.i(`columns.ms_category_name`,'Category'),
                            icon: "category"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading')
                        },
                    }
                }
            },
            description: {
                label: "description",
                sortable: false,
                shorttext: 80
            }
        }
    }
});
