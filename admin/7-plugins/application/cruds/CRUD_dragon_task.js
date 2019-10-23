CRUD_dragon_task = {};
DSON.keepmerge(CRUD_dragon_task, CRUDDEFAULTS);
DSON.keepmerge(CRUD_dragon_task, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_dragon_task',
        //method: 'dragon_task',
        //limits: [10, 50, 100, 0],
        //report: true,
        //batch: false,
        //persist: false,
        //sortable: false,
        //orderby: 'num',
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
            second: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            minute: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            hour: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            day: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            month: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            year: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            dayOfWeek: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            start: {formattype: ENUM.FORMAT.datetime},
            end: {formattype: ENUM.FORMAT.datetime},
            enabled: {visible: true, sorttype: ENUM.FORMAT.bool, formattype: ENUM.FORMAT.bool}
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_dragon_task.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_dragon_task.table.options[0].menus.push({
//     text: (data) => {
//         return MESSAGE.i('actions.Extra');
//     },
//     icon: (data) => {
//         return "list";
//     },
//     permission: (data) => {
//         return 'extra';
//     },
//     characterist: (data) => {
//         return "";
//     },
//     show: function (data) {
//         return true;
//     },
//     click: function (data) {
//         //extra function
//         return false;
//     }
// });