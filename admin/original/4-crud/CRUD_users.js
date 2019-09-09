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
                shorttext: 80,
                format: function (row) {
                    if (DRAGON.ONLINE) {
                        var status = DRAGON.ONLINE.filter(d => {
                            return d.id == row.id
                        }).length > 0 ? '<i class="online icon-circle2"></i>' : '<i class="offline icon-circle2"></i>';
                        return row.username + " " + status;
                    } else {
                        return row.username
                    }
                }
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