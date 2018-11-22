CRUD_ms_all = DSON.merge(CRUD_ms_all,
    {
        table: {
            single: [
                {
                    "table": "ms_child",
                    "base": "child",
                    "field": "id",
                    "columns": ["id", "name"]
                },
                {
                    "type": "LEFT",
                    "table": "ms_other",
                    "base": "other",
                    "field": "id",
                    "columns": ["id", "description"]
                }
            ],
            multiple: {
                ms_all_products: {
                    "table": "ms_product",
                    "base": "product",
                    "field": "id"
                },
                ms_all_users: {
                    "table": "ms_user",
                    "base": "user",
                    "field": "id"
                }
            }
        }
    }
);