CRUD_st_user = DSON.merge(CRUD_st_user,
    {
        table: {
            single: [
                {
                    "table": "st_usertype",
                    "base": "tipo",
                    "field": "id",
                    "columns": ["id", "name"]
                }
            ],
            multiple: []
        }
    }
);