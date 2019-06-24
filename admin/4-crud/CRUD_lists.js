CRUD_lists = {};
DSON.keepmerge(CRUD_lists, CRUDDEFAULTS);
DSON.keepmerge(CRUD_lists, {
    table: {
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            name: {},
            parent_name: {link: {table: 'parent', from: 'parent'}},
            child_name: {link: {table: 'child', from: 'child'}},
            relation: {multilink: {table: "relation", to: "list"}},
            categories: {multilink: {table: "lists_category", to: "lists"}}
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'parent',
                'base': 'parent',
                'field': 'id',
                'columns': ['id', 'name']
            },

            {
                'table': 'child',
                'base': 'child',
                'field': 'id',
                'columns': ['id', 'name']
            }]
    }
});