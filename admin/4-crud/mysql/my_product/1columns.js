CRUD_my_product = {};
DSON.keepmerge(CRUD_my_product, CRUDDEFAULTS);
DSON.keepmerge(CRUD_my_product, {
    table: {
        engine: 'my',
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false
            },
            name: {
                label: "Name",
                shorttext: 30
            },
            description: {
                label: "Description",
                shorttext: 30
            },
            category: {
                exportKey: 'category',
                label: "Category",
                shorttext: 30,
                format: function (row) {
                    var selected = MYCATEGORIES.data.filter(data => {
                        return data.id === row.id;
                    });
                    if (selected.length > 0) {
                        return selected[0].name;
                    }
                    return "N/A";
                },
                exportExample: "category ids",
            },
            active: {
                visible: true,
                sorttype: "bool",
                formattype: "bool"
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
            deleted: {
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
            },
            user_deleted: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            }
        },
    }
});