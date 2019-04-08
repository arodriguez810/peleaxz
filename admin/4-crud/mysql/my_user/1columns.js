CRUD_my_user = {};
DSON.keepmerge(CRUD_my_user, CRUDDEFAULTS);
DSON.keepmerge(CRUD_my_user, {
    table: {
        engine: 'my',
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false
            },
            username: {
                label: "Username",
                shorttext: 20
            },
            name: {
                label: "Name",
                shorttext: 20
            },
            lastname: {
                label: "Lastname",
                shorttext: 20
            },
            image: {
                label: "Profile Image",
                folder: "my_user/profileimage/${this.id}",
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
                shorttext: 20
            },
            active: {
                visible: true,
                sorttype: "bool",
                formattype: "bool"
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