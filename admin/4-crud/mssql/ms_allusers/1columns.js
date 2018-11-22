CRUD_ms_allusers = {};
DSON.keepmerge(CRUD_ms_allusers, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ms_allusers, {
    table: {
        engine: 'ms',
        key: "ms_all_name",
        columns: {
            ms_all_name: {
                label: "All",
                reference:false,
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
            ms_user_name: {
                label: "user",
                link: {
                    table: "ms_user",
                    from: "user",
                    modal: {
                        header: {
                            title: "User",
                            icon: "user"
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
            ms_category_name: {
                label: "category",
                link: {
                    table: "ms_category",
                    from: "category",
                    modal: {
                        header: {
                            title: "Category",
                            icon: "category"
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
            description: {
                label: "description",
                sortable: false,
                shorttext: 20
            }
        }
    }
});
