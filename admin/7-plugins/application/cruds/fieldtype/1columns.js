CRUD_dragon_fieldtype = {};
DSON.keepmerge(CRUD_dragon_fieldtype, CRUDDEFAULTS);
DSON.keepmerge(CRUD_dragon_fieldtype, {
    table: {
        engine: 'ms',
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            name: {
                label: "name",
                shorttext: 80
            },
            description: {
                label: "description",
                sortable: false,
                shorttext: 80,
                null: "<span class='text-grey'>[NULL]</span>"
            }
        }
    }
});