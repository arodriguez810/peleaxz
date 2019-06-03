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
                    label: "ID",
                    sorttype: "numeric",
                    class: "text-left",
                    exportExample: false
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
                parent_name: {
                    exportKey: 'parent',
                    label: "parent",
                    shorttext: 50,
                    link: {
                        table: "parent",
                        from: "parent"
                    },
                    exportExample: "id from master table",
                },
            },
            filters: {
                columns: [
                    {
                        key: 'id',
                        label: 'ID',
                        type: FILTER.types.integer,
                        placeholder: 'ID'
                    }
                ]
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