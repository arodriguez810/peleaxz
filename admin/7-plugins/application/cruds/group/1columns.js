CRUD_dragon_group = {};
DSON.keepmerge(CRUD_dragon_group, CRUDDEFAULTS);
DSON.keepmerge(CRUD_dragon_group, {
    table: {
        engine: 'ms',
        columns: {
            id: {visible: false, visibleDetail: false, export: false, exportExample: false},
            name: {
                label: "name",
                shorttext: 40
            },
            description: {
                label: "description",
                sortable: false,
                shorttext: 80,
                null: "<span class='text-grey'>[NULL]</span>"
            },
            homePage: {
                label: "Home Page",
                shorttext: 40
            },
            isAdmin: {
                label: "Admin",
                visible: true,
                sorttype: "bool",
                formattype: "bool"
            }
        }
    }
});