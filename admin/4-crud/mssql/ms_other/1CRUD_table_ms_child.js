CRUD_ms_other = {
    table: {
        rowClass: function (row) {
            return row.active === false ? "bg-" + COLOR.danger + "-300" : "";
        },
        width: 300,
        offWidth: 5,
        baseWidth: 1000,
        columnsalign: "center",
        batch: false,
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left"
            },
            name: {
                label: "name",
                shorttext: 20
            },
            description: {
                label: "description",
                sortable: false,
                shorttext: 20,
                null: "<span class='text-grey'>[NULL]</span>"
            },
            active: {
                visible: true,
                sorttype: "bool",
                formattype: "bool"
            },
            created: {
                visible: false,
                sorttype: "time",
                formattype: "datetime:12"
            },
            updated: {
                visible: false
            },
            deleted: {
                visible: false
            }
        },
        options: {}
    }
};