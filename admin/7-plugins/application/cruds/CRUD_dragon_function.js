CRUD_dragon_function = {};
DSON.keepmerge(CRUD_dragon_function, CRUDDEFAULTS);
DSON.keepmerge(CRUD_dragon_function, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_dragon_function',
        //method: 'dragon_function',
        //limits: [10, 50, 100, 0],
        //report: true,
        //batch: false,
        //persist: false,
        //sortable: false,
        //dragrow: 'num',
        //rowStyle: function (row, $scope) {
        //    return "color:red;";
        //},
        //rowClass: function (row, $scope) {
        //    return row.name === 'whatever' ? "bg-" + COLOR.danger + "-300" : "";
        //},
        //activeColumn: "active",
        //key: 'id',
        //deletekeys: ['id'],
        columns: {
            // dbcolumnname: {
            //     visible: false,
            //     visibleDetail: false,
            //     export: false,
            //     exportExample: false,
            //     sortable: false,
            //     shorttext: 360,
            //     dead:true,
            //     formattype: ENUM.FORMAT.numeric,
            //     sorttype: ENUM.FORMATFILTER.numeric,
            //     drag: true,
            //     click: function (data) {
            //         alert(data.row.id);
            //         //["click", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup"]
            //     },
            //     reference: "id",
            //     format: function (row) {
            //         return row.id + "*";
            //     }
            // },
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            name: {},
            description: {},
            parameters: {}
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_dragon_function.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
CRUD_dragon_function.table.options.push({
    text: (data) => {
        return MESSAGE.i('actions.execute');
    },
    icon: (data) => {
        return "play4";
    },
    title: (data) => {
        return MESSAGE.i("mono.runFuntion");
    },
    permission: (data) => {
        return 'execute';
    },
    characterist: (data) => {
        return "";
    },
    show: function (data) {
        return true;
    },
    click: function (data) {
        SWEETALERT.confirm({
            message: MESSAGE.i('mono.AYS'),
            confirm: function () {
                SERVICE.database_db.runFunction({
                    id: data.row.id,
                    params: {name: "Hola", name2: "Bye"}
                }, function (result) {
                    SWEETALERT.show({message: MESSAGE.i('mono.executed')});
                });
            }
        });
        return false;
    }
});