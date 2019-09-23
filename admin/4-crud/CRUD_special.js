CRUD_special = {};
DSON.keepmerge(CRUD_special, CRUDDEFAULTS);
DSON.keepmerge(CRUD_special, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_special',
        //method: 'special',
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
            color: {formattype: ENUM.FORMAT.color,sortable: false},
            location: {formattype: ENUM.FORMAT.location,sortable: false},
            bit: {visible: true,sorttype: ENUM.FORMAT.bool,formattype: ENUM.FORMAT.bool},
            tags: {formattype: ENUM.FORMAT.tags},
            html: {sortable: false,formattype: ENUM.FORMAT.html,export: false,exportExample: false}
        },
        filters: {
            columns: true
        }
    }
});