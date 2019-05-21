CRUD_texts = {};
DSON.keepmerge(CRUD_texts, CRUDDEFAULTS);
DSON.keepmerge(CRUD_texts,
    {
        table: {
            key: 'id',
            deletekeys: ['id'],
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
                mask: {
                    label: "mask",
                    shorttext: 20,
                },
                format: {
                    label: "format",
                    shorttext: 20,
                },
                readonly: {
                    label: "readonly",
                    shorttext: 20,
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