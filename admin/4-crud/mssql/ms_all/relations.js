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
                },
                {
                    "table": "ms_category",
                    "base": "category",
                    "field": "id",
                    "columns": ["id", "name"]
                },
                {
                    "table": "ms_product",
                    "base": "product",
                    "field": "id",
                    "columns": ["id", "name"]
                }
            ]
        }
    }
);