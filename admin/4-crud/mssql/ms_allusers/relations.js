CRUD_ms_allusers = DSON.merge(CRUD_ms_allusers,
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
                    "table": "ms_user",
                    "base": "user",
                    "field": "id",
                    "columns": ["id", "name"]
                },
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