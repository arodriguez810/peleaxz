CRUD_child = {};
DSON.keepmerge(CRUD_child, CRUDDEFAULTS);
DSON.keepmerge(CRUD_child,
    {
        table: {
            key: 'id',
            deletekeys: ['id'],
            width: 'width:1400px;',
            columns: {
                id: {
                    visible: false,
                    visibleDetail: false,
                    export: false,
                    exportExample: false
                },
                name: {
                    shorttext: 80
                },
                description: {
                    shorttext: 80,
                },
                // allparents: {
                //     format: function (row) {
                //         if (typeof  PIVOTE === "undefined") {
                //             DRAGONAPI.listp('user_group', {}).then(function (data) {
                //                 PIVOTE = data.data;
                //             });
                //             DRAGONAPI.listp('group', {}).then(function (data) {
                //                 ORIGEN = data.data;
                //             });
                //         } else {
                //             var pivotesValidos = PIVOTE.filter(d => {
                //                 return d.user == row.id;
                //             });
                //             if (row.id == 1)
                //                 pivotesValidos = [{user: 1, group: 1}, {user: 1, group: 2}, {user: 2, group: 7}];
                //             if (row.id == 2)
                //                 pivotesValidos = [{user: 2, group: 7}];
                //             var final = [];
                //             for (var valido of pivotesValidos) {
                //                 var existgroup = ORIGEN.filter(d => {
                //                     return d.id == valido.group;
                //                 });
                //                 if (existgroup.length > 0)
                //                     final.push(existgroup[0].name);
                //             }
                //             return DSON.ULALIA(final);
                //         }
                //     },
                //     click: function () {
                //
                //     }
                // },
                parent_name: {
                    link: {
                        table: "parent",
                        from: "parent"
                    },
                },
            },
            filters: {
                columns: true
            },
            single: [
                {
                    "table": "parent",
                    "base": "parent",
                    "field": "id",
                    "columns": ["id", "name"]
                }
            ]
        }
    });