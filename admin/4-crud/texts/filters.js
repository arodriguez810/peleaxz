CRUD_ms_all = DSON.merge(CRUD_ms_all,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'id',
                        label: 'ID',
                        type: FILTER.types.integer,
                        placeholder: 'ID'
                    },
                    {
                        key: 'basic',
                        label: 'Basic',
                        type: FILTER.types.string,
                        placeholder: 'Name',
                        maxlength: 50
                    }
                ]
            }
        }
    });