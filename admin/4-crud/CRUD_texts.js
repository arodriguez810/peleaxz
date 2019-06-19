CRUD_texts = {};
DSON.keepmerge(CRUD_texts, CRUDDEFAULTS);
DSON.keepmerge(CRUD_texts,
    {
        table: {
            dragrow: 'num',
            columns: {
                id: {
                    visible: false,
                    visibleDetail: false,
                    export: false,
                    exportExample: false
                },
                num: {
                    visible: false,
                    visibleDetail: false,
                    export: false,
                    exportExample: false
                },
                basic: {
                    drag: true,
                    shorttext: 80,
                    //["click", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup"]
                },
                percentage: {
                    formattype: ENUM.FORMAT.percentage
                },
                money: {
                    formattype: ENUM.FORMAT.money
                },
                phone: {},
                cellphone: {},
                hour: {},
                integer: {
                    formattype: ENUM.FORMAT.numeric
                },
                decimal: {
                    formattype: ENUM.FORMAT.decimal
                },
                year: {
                    formattype: ENUM.FORMAT.numeric
                },
                indentification: {},
                creditcard: {
                    formattype: ENUM.FORMAT.creditcard
                },
                readonly: {
                    shorttext: 80,
                    reference: "basic",
                    format: function (row) {
                        return row.basic + "*";
                    },
                    click: function (data) {
                        data.$scope.setPermission('add',false);
                        alert(`Information from basic:${data.row.basic}`);
                    }
                },
                normalpassword: {
                    formattype: ENUM.FORMAT.password
                },
                passwordplus: {
                    formattype: ENUM.FORMAT.password
                },
                textarea: {
                    shorttext: 60,
                },
            },
            filters: {
                columns: true
            }
        }
    });