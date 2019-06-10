CRUD_otronombre = DSON.merge(CRUD_otronombre,
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
                    },
                    {
                        key: 'price',
                        label: 'Price',
                        type: FILTER.types.decimal,
                        placeholder: 'Price',
                        maxlength: 50
                    },
                    {
                        key: 'ms_category__id',
                        label: 'Category',
                        type: FILTER.types.relation,
                        table: 'ms_category',
                        value: "id",
                        text: "item.name",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "asc",
                            distinct: false
                        },
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