CRUD_dragon_notifications = DSON.merge(CRUD_dragon_notifications,
    {
        table: {
            filters: {
                columns: [

                    {
                        key: 'subject',
                        label: 'Subject',
                        type: FILTER.types.string,
                        placeholder: 'Subject',
                        maxlength: 50
                    },
                    {
                        key: 'content',
                        label: 'Content',
                        type: FILTER.types.string,
                        maxlength: 200
                    },
                    {
                        key: 'created',
                        label: 'Created',
                        type: FILTER.types.datetime,
                    }
                ]
            }
        }
    });