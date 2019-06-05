CRUD_users = {};
DSON.keepmerge(CRUD_users, CRUDDEFAULTS);
DSON.keepmerge(CRUD_users, {
    table: {
        engine: 'my',
        sort: 'username',
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
                folder: "users/profileimage/${this.id}",
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
        filters: {
            columns: [
                {
                    key: 'id',
                    label: 'ID',
                    type: FILTER.types.integer,
                    placeholder: 'ID'
                },
                {
                    key: 'username',
                    label: 'Username',
                    type: FILTER.types.string,
                    placeholder: 'Username',
                    maxlength: 15
                },
                {
                    key: 'name',
                    label: 'Name',
                    type: FILTER.types.string,
                    placeholder: 'Name',
                    maxlength: 50
                },
                {
                    key: 'lastname',
                    label: 'Lastname',
                    type: FILTER.types.string,
                    placeholder: 'Lastname',
                    maxlength: 50
                },
                {
                    key: 'created',
                    label: 'Created',
                    type: FILTER.types.datetime,
                },
                {
                    key: 'active',
                    label: 'Active',
                    type: FILTER.types.bool,
                }
            ]
        }
    }
});