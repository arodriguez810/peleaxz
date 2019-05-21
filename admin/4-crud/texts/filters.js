CRUD_texts = DSON.merge(CRUD_texts,
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
                        key: 'basic',
                        label: 'Basic',
                        type: FILTER.types.string,
                        placeholder: 'Basic',
                        maxlength: 20
                    },
                    {
                        key: 'mask',
                        label: 'Mask',
                        type: FILTER.types.string,
                        placeholder: 'mask',
                        maxlength: 20
                    },
                    {
                        key: 'format',
                        label: 'format',
                        type: FILTER.types.string,
                        placeholder: 'format',
                        maxlength: 20
                    },
                    {
                        key: 'readonly',
                        label: 'readonly',
                        type: FILTER.types.string,
                        placeholder: 'readonly',
                        maxlength: 20
                    },
                    {
                        key: 'normalpassword',
                        label: 'normal password',
                        type: FILTER.types.string,
                        placeholder: 'normalpassword',
                        maxlength: 20
                    },
                    {
                        key: 'passwordplus',
                        label: 'password plus',
                        type: FILTER.types.string,
                        placeholder: 'passwordplus',
                        maxlength: 20
                    }
                ]
            }
        }
    });