CRUD_interval = {};
DSON.keepmerge(CRUD_interval, CRUDDEFAULTS);
DSON.keepmerge(CRUD_interval, {
    table: {
        engine: 'ms',
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false
            },
            name: {
                label: "name",
                shorttext: 20
            },
            code: {
                label: "code",
                shorttext: 20
            },
            description: {
                label: "description",
                sortable: false,
                shorttext: 20,
                null: "<span class='text-grey'>[NULL]</span>"
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
                visible: false,
                exportExample: false
            },
            deleted: {
                visible: false,
                visibleDetail: false,
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
        }
    }
});