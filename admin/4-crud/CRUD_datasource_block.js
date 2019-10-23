CRUD_datasource_block = {};
DSON.keepmerge(CRUD_datasource_block, CRUDDEFAULTS);
DSON.keepmerge(CRUD_datasource_block, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_datasource_block',
        //method: 'datasource_block',
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
            datasource_name: {link: {table: 'datasource', from: 'datasource'}},
            tempid: {visible: false, visibleDetail: false, export: false, exportExample: false},
            datasource_function_name: {link: {table: 'datasource_function', from: 'datasource_function_id'}}
        },
        filters: {
            columns: true
        },
        single: [
            {
                'table': 'datasource',
                'base': 'datasource',
                'field': 'id',
                'columns': ['id', 'name']
            },
            {
                'table': 'datasource_function',
                'base': 'datasource_function',
                'field': 'id',
                'columns': ['id', 'name']
            }]
    }
});
//modify methods that existing option
//CRUD_datasource_block.table.options[0].menus[0].show = function (data) {
//  return data.row.id > 5;
//};
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_datasource_block.table.options[0].menus.push({
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