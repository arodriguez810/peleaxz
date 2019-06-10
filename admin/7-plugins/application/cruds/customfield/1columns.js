CRUD_customfield = {};
DSON.keepmerge(CRUD_customfield, CRUDDEFAULTS);
DSON.keepmerge(CRUD_customfield, {
    table: {
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            name: {
                label: "name",
                shorttext: 20
            },
            variable: {
                label: "Variable",
                shorttext: 20
            },
            type: {
                label: "Type",
                shorttext: 20
            },
            description: {
                label: "description",
                sortable: false,
                shorttext: 60,
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