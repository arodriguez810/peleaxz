CRUD_users = DSON.merge(CRUD_users,
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
                        key: 'username',
                        label: 'Username',
                        type: FILTER.types.string,
                        placeholder: 'Username',
                        maxlength: 15
                    },
                    {
                        key: 'name',
                        label: 'Name',
                        type: FILTER.types.string,
                        placeholder: 'Name',
                        maxlength: 50
                    },
                    {
                        key: 'lastname',
                        label: 'Lastname',
                        type: FILTER.types.string,
                        placeholder: 'Lastname',
                        maxlength: 50
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