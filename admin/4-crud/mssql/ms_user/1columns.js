CRUD_ms_user = {};
DSON.keepmerge(CRUD_ms_user, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ms_user, {
    table: {
        engine: 'ms',
        columns: {
            id: {                 visible: false,                 visibleDetail: false,                 export: false,                 exportExample: false             },
            username: {
                label: "Username",
                shorttext: 80
            },
            name: {
                label: "Name",
                shorttext: 80
            },
            lastname: {
                label: "Lastname",
                shorttext: 80
            },
            image: {
                label: "Profile Image",
                folder: "ms_user/profileimage/${this.id}",
                files: {
                    maxsize: 20,
                    maxfiles: 2,
                    columns: 1,
                    acceptedFiles: "image/*",
                    modal: {
                        width: 'modal-full',
                        header: {
                            title: "${this.username}",
                            icon: "images3"
                        },
                        footer: {
                            cancelButton: true
                        },
                        content: {
                            loadingContentText: MESSAGE.i('actions.Loading')
                        },
                    }
                },
                sortable: false,
                exportExample: false
            },
            email: {
                label: "Email",
                shorttext: 80
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