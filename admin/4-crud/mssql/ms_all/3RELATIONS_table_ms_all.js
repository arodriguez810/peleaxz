CRUD_ms_all = DSON.merge(CRUD_ms_all,
    {
        table: {
            single: [
                {
                    "table": "ms_child",
                    "base": "child",
                    "field": "id",
                    "columns": ["name"]
                },
                {
                    "type": "LEFT",
                    "table": "ms_other",
                    "base": "other",
                    "field": "id",
                    "columns": ["description"]
                }
            ],
            multiple: []
        }
    }
);