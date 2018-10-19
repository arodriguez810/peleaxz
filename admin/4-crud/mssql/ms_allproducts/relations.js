CRUD_ms_allproducts = DSON.merge(CRUD_ms_allproducts,
    {
        table: {
            single: [
                {
                    "table": "ms_all",
                    "base": "all",
                    "field": "id",
                    "columns": ["id", "name"]
                },
                {
                    "table": "ms_product",
                    "base": "product",
                    "field": "id",
                    "columns": ["id", "name"]
                }
            ],
            multiple: []
        }
    }
);