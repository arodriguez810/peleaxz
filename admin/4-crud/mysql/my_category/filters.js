CRUD_my_category = DSON.merge(CRUD_my_category,
    {
        table: {
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