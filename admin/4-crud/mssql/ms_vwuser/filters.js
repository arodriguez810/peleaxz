CRUD_ms_user = DSON.merge(CRUD_ms_user,
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
                        key: 'fullName',
                        label: 'Full Name',
                        type: FILTER.types.string,
                        placeholder: 'Full Name',
                        maxlength: 100
                    },
                    {
                        key: 'time',
                        label: 'Time',
                        type: FILTER.types.string,
                        placeholder: 'Name',
                        maxlength: 200
                    }
                ]
            }
        }
    });