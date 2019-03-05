CRUD_ms_allproducts = DSON.merge(CRUD_ms_allproducts,
    {
        table: {
            filters: {
                columns: [
                    {
                        key: 'ms_all__id',
                        label: 'All',
                        type: FILTER.types.relation,
                        table: 'ms_all',
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
                        key: 'ms_product__id',
                        label: 'Product',
                        type: FILTER.types.relation,
                        table: 'ms_product',
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
                    }
                ]
            }
        }
    });