CRUD_ms_all = {
    table: {
        rowClass: function (row, $scope) {
            return $scope.active(row) === false ? "bg-" + COLOR.danger + "-300" : "";
        },
        width: 200,
        offWidth: 5,
        baseWidth: 1000,
        columnsalign: "center",
        limits: [5, 10, 50, 100],
        activeColumn: "active",
        contextMenu: true,
        sorteable: true,
        key: 'id',
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
            biography: {
                label: "biography",
                sortable: false,
                shorttext: 1
            },
            average: {
                label: function () {
                    return "average" + ICON.i("file-stats");
                },
                format: function (value) {
                    return value === null ? '' : value + ICON.i("percent");
                },
                sorttype: "numeric"
            },
            salary: {
                label: "salary",
                formattype: "numeric:0,0.00",
                sorttype: "numeric",
                class: "text-right"
            },
            location: {
                label: "location",
                formattype: "location:name",
                sortable: false,
            },
            image: {
                label: "image",
                formattype: "file:image",
                sortable: false,
            },
            file: {
                label: "file",
                formattype: "file:all",
                sortable: false,
            },
            active: {
                visible: true,
                sorttype: "bool",
                formattype: "bool"
            },
            created: {
                visible: true,
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
    }
};