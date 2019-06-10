CRUD_segment = {};
DSON.keepmerge(CRUD_segment, CRUDDEFAULTS);
DSON.keepmerge(CRUD_segment, {
    table: {
        engine: 'ms',
        columns: {
            id: {                 visible: false,                 visibleDetail: false,                 export: false,                 exportExample: false             },
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
            created: {
                visible: false,
                sorttype: "time",
                formattype: "datetime>DD-MM-YYYY hh:mm a"
            },
            updated: {
                visible: false,
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
        }
    }
});