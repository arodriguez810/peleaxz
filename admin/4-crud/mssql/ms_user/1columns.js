CRUD_ms_user = {};
DSON.keepmerge(CRUD_ms_user, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ms_user, {
    table: {
        engine: 'ms',
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left"
            },
            username: {
                label: "name",
                shorttext: 20
            },
            name: {
                label: "name",
                shorttext: 20
            },
            lastname: {
                label: "name",
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
                formattype: "datetime>DD-MM-YYYY hh:mm a"
            },
            updated: {
                visible: false
            },
            deleted: {
                visible: false,
                visibleDetail: false
            },
            user_created: {
                visible: false,
                visibleDetail: false,
                export: false
            },
            user_updated: {
                visible: false,
                visibleDetail: false,
                export: false
            },
            user_deleted: {
                visible: false,
                visibleDetail: false,
                export: false
            }
        },
    }
});