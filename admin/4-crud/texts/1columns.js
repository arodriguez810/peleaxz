CRUD_texts = {};
DSON.keepmerge(CRUD_texts, CRUDDEFAULTS);
DSON.keepmerge(CRUD_texts,
    {
        table: {
            key: 'id',
            deletekeys: ['id'],
            width: 'width:2000px;',
            columns: {
                id: {
                    label: "ID",
                    sorttype: "numeric",//numeric,amount,time
                    class: "text-left",
                    exportExample: false,
                },
                basic: {
                    label: "basic",
                    shorttext: 20,
                    //["click", "dblclick", "mousedown", "mouseenter", "mouseleave", "mousemove", "mouseover", "mouseup"]
                },
                money: {
                    label: "Money",
                    shorttext: 20,
                    formattype: 'money'
                },
                percentage: {
                    label: "Percentage",
                    shorttext: 20,
                    formattype: 'percentage'
                },
                readonly: {
                    label: "readonly",
                    shorttext: 20,
                    format: function (row) {
                        return row.basic + " from basic";
                    }
                },
                normalpassword: {
                    label: "normal password",
                    shorttext: 20,
                },
                passwordplus: {
                    label: "password plus",
                    shorttext: 20,
                },
                textarea: {
                    label: "textarea",
                    shorttext: 60,
                }
            }
        }
    });