CRUD_lists_category = {};
DSON.keepmerge(CRUD_lists_category, CRUDDEFAULTS);
DSON.keepmerge(CRUD_lists_category, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_lists_category',
        //method: 'lists_category',
        //limits: [10, 50, 100, 0],
        //report: true,
        //batch: false,
        //persist: false,
        //sortable: false,
        //dragrow: 'num',
        columns: {
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            category_name: {link: {table: 'category',from: 'category'}},
            lists_name: {link: {table: 'lists',from: 'lists'}}
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'category',
                'base': 'category',
                'field': 'id',
                'columns': ['id', 'name']
            },

            {
                'table': 'lists',
                'base': 'lists',
                'field': 'id',
                'columns': ['id', 'name']
            }]
    }
});