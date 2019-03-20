CRUD_my_product = DSON.merge(CRUD_my_product,
    {
        table: {
            single: [
                {
                    "table": "my_category",
                    "base": "category",
                    "field": "id",
                    "columns": ["id", "name"]
                }
            ],
            multiple: {}
        }
    }
);