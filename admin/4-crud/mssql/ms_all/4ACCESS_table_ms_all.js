CRUD_ms_all = DSON.merge(CRUD_ms_all,
    {
        table: {
            batch: true,
            persist: true,
            sortable: true,
            allow: {
                add: true,
                edit: true,
                remove: true,
                active: true,
                filter: true,
                export: true,
                actions: true
            }
        }
    }
);