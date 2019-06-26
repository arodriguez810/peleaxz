CRUD_users = {};
DSON.keepmerge(CRUD_users, CRUDDEFAULTS);
DSON.keepmerge(CRUD_users, {
    table: {
        engine: 'my',
        sort: 'username',
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            username: {
                shorttext: 80
            },
            name: {
                shorttext: 80
            },
            lastname: {
                shorttext: 80
            },
            image: {
                folder: "users/profileimage/${this.id}",
                files: {
                    maxsize: 20,
                    maxfiles: 1,
                    columns: 1,
                    acceptedFiles: "image/*",
                },
                sortable: false,
                exportExample: false
            },
            email: {
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
            }
        },
        filters: {
            columns: true
        }
    }
});