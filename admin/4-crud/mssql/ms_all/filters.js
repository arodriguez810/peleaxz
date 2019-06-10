CRUD_ms_all = DSON.merge(CRUD_ms_all,
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
                        key: 'lastName',
                        label: 'Lastname',
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
                        key: 'average',
                        label: 'Average',
                        type: FILTER.types.integer,
                    },
                    {
                        key: 'salary',
                        label: 'Salary',
                        type: FILTER.types.decimal,
                    },
                    {
                        key: 'hashtags',
                        label: 'Hashtags',
                        type: FILTER.types.string,
                    },
                    {
                        key: 'record',
                        label: 'Record',
                        type: FILTER.types.time,
                    },
                    {
                        key: 'birthDate',
                        label: 'BirthDate',
                        type: FILTER.types.date,
                    },
                    {
                        key: 'lastLogin',
                        label: 'LastLogin',
                        type: FILTER.types.datetime,
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
                    },
                    {
                        key: 'ms_child__id',
                        label: 'Child',
                        type: FILTER.types.relation,
                        table: 'ms_child',
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
                        key: 'ms_other__id',
                        label: 'Other',
                        type: FILTER.types.relation,
                        table: 'ms_other',
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
                        key: 'products',
                        label: 'Products',
                        type: FILTER.types.relation,
                        table: 'ms_product',
                        value: "id",
                        text: "item.name",
                        multi: {
                            table: 'ms_allproducts',
                            from: 'id',
                            to: 'all',
                            adjacent: 'product'
                        },
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