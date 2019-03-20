CRUD_my_product = DSON.merge(CRUD_my_product,
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
                        key: 'name',
                        label: 'Name',
                        type: FILTER.types.string,
                        placeholder: 'Name'
                    },
                    {
                        key: 'my_category__id',
                        label: 'Category',
                        type: FILTER.types.relation,
                        table: 'my_category',
                        value: "id",
                        text: "item.name",
                        query: {
                            limit: 0,
                            page: 1,
                            where: [],
                            orderby: "id",
                            order: "desc",
                            distinct: false
                        },
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