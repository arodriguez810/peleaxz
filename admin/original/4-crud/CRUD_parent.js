CRUD_parent = {};
DSON.keepmerge(CRUD_parent, CRUDDEFAULTS);
DSON.keepmerge(CRUD_parent, {
    table: {
        //width: "width:3000px;",
        //view: 'vw_parent',
        //method: 'parent',
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
            id: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false,
                dead: true
            },
            name: {},
            description: {},
            created: {visible: false, visibleDetail: false, export: false, exportExample: false},
            updated: {visible: false, visibleDetail: false, export: false, exportExample: false},
            user_created: {visible: false, visibleDetail: false, export: false, exportExample: false},
            user_updated: {visible: false, visibleDetail: false, export: false, exportExample: false}
        },
        filters: {
            columns: true
        }
    }
});
//add options example, remember add new item in allow object at admin/0-config/security/permission.json
// CRUD_texts.table.options[0].menus.push({
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