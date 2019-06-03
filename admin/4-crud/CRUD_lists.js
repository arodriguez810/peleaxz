CRUD_lists = {};
DSON.keepmerge(CRUD_lists, CRUDDEFAULTS);
DSON.keepmerge(CRUD_lists,
    {
        table: {
            key: 'id',
            deletekeys: ['id'],
            width: 'width:1400px;',
            columns: {
                id: {
                    label: "ID",
                    sorttype: "numeric",//numeric,amount,time
                    class: "text-left",
                    exportExample: false,
                }
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
            }
        }
    });