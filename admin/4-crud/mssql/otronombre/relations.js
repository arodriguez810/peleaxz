CRUD_otronombre = DSON.merge(CRUD_otronombre,
    {
        table: {
            single: [
                {
                    "table": "ms_category",
                    "base": "category",
                    "field": "id",
                    "columns": ["id", "name"]
                }
            ],
            multiple: []
        }
    }
);