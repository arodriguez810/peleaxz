CRUD_ms_all = {
    table: {
        rowClass: function (row) {
            return (row.active === false) ? 'bg-' + COLOR.danger + "-300" : "";
        },
        columnsalign: "center",
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
                sorttype: "bool"
            },
            created: {
                visible: true,
                sorttype: "time"
            },
            updated: {
                visible: false
            },
            deleted: {
                visible: false
            }
        },
        options: {}
    },
    batch: true,
    form: {}
};