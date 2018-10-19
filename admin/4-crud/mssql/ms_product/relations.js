CRUD_ms_product = DSON.merge(CRUD_ms_product,
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