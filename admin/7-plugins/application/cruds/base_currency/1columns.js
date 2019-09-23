CRUD_dragon_currency = {};
DSON.keepmerge(CRUD_dragon_currency, CRUDDEFAULTS);
DSON.keepmerge(CRUD_dragon_currency, {
    table: {
        engine: 'ms',
        columns: {
            id: {visible: false, visibleDetail: false, export: false, exportExample: false},
            name: {
                label: "name",
                shorttext: 80
            },
            symbol: {
                label: "name",
                shorttext: 80
            },
            decimal: {
                label: "name",
                shorttext: 80
            },
            separator: {
                label: "name",
                shorttext: 80
            },
            precision: {
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