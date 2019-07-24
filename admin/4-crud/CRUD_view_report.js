CRUD_view_report = {};
DSON.keepmerge(CRUD_view_report, CRUDDEFAULTS);
DSON.keepmerge(CRUD_view_report, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_view_report',
        //method: 'view_report',
        //limits: [10, 50, 100, 0],
        report: true,
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
            basic: {},
            money: {formattype: ENUM.FORMAT.money},
            percentage: {formattype: ENUM.FORMAT.percentage},
            normalpassword: {formattype: ENUM.FORMAT.password},
            passwordplus: {formattype: ENUM.FORMAT.password},
            textarea: {},
            num: {visible: false,visibleDetail: false,export: false,exportExample: false},
            phone: {},
            cellphone: {},
            integer: {formattype: ENUM.FORMAT.numeric},
            decimal: {formattype: ENUM.FORMAT.decimal},
            hour: {},
            year: {formattype: ENUM.FORMAT.numeric},
            indentification: {},
            creditcard: {}
        },
        filters: {
            columns: true
        }
    }
});
//modify methods that existing option
//CRUD_view_report.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_view_report.table.options[0].menus.push({
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