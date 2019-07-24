CRUD_dragon_group = DSON.merge(CRUD_dragon_group,
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
                    },
                    {
                        key: 'isAdmin',
                        label: 'Admin',
                        type: FILTER.types.bool,
                    }
                ]
            }
        }
    });