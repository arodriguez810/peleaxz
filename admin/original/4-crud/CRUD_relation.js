CRUD_relation = {};
DSON.keepmerge(CRUD_relation, CRUDDEFAULTS);
DSON.keepmerge(CRUD_relation, {
    table: {
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            name: {},
            description: {shorttext: 360},
            created: {
                visible: false,
                visibleDetail: false,
                export: false,
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