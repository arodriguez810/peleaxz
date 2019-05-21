CRUD_dates = DSON.merge(CRUD_dates,
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
                        key: 'time',
                        label: 'time',
                        type: FILTER.types.time,
                    },
                    {
                        key: 'date',
                        label: 'date',
                        type: FILTER.types.date,
                    },
                    {
                        key: 'datetime',
                        label: 'datetime',
                        type: FILTER.types.datetime,
                    }
                ]
            }
        }
    });