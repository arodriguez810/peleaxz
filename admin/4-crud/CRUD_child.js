CRUD_child = {};
DSON.keepmerge(CRUD_child, CRUDDEFAULTS);
DSON.keepmerge(CRUD_child,
    {
        table: {
            key: 'id',
            deletekeys: ['id'],
            width: 'width:1400px;',
            columns: {
                id: {
                    visible: false,
                    visibleDetail: false,
                    export: false,
                    exportExample: false
                },
                name: {
                    shorttext: 80
                },
                description: {
                    shorttext: 80,
                },
                parent_name: {
                    link: {
                        table: "parent",
                        from: "parent"
                    },
                },
            },
            filters: {
                columns: true
            },
            single: [
                {
                    "table": "parent",
                    "base": "parent",
                    "field": "id",
                    "columns": ["id", "name"]
                }
            ]
        }
    });