CRUD_ms_other = {};
DSON.keepmerge(CRUD_ms_other, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ms_other, {
    table: {
        engine: 'ms',
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left"
            },
            name: {
                label: "name",
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
        }
    }
});