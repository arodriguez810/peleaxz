CRUD_base_currency = DSON.merge(CRUD_base_currency,
    {
        table: {
            filters: {
                columns: [

                    {
                        key: 'name',
                        label: 'Name',
                        type: FILTER.types.string,
                        placeholder: 'Name',
                        maxlength: 50
                    }, {
                        key: 'symbol',
                        label: 'Symbol',
                        type: FILTER.types.string,
                        maxlength: 50
                    }, {
                        key: 'decimal',
                        label: 'Decimal',
                        type: FILTER.types.string,
                        maxlength: 50
                    }, {
                        key: 'separator',
                        label: 'Separator',
                        type: FILTER.types.string,
                        maxlength: 50
                    }, {
                        key: 'precision',
                        label: 'Precision',
                        type: FILTER.types.string,
                        maxlength: 50
                    },
                    {
                        key: 'description',
                        label: 'Description',
                        type: FILTER.types.string,
                        maxlength: 200
                    },
                    {
                        key: 'created',
                        label: 'Created',
                        type: FILTER.types.datetime,
                    },
                    {
                        key: 'active',
                        label: 'Active',
                        type: FILTER.types.bool,
                    }
                ]
            }
        }
    });