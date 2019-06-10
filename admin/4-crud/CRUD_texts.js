CRUD_texts = {};
DSON.keepmerge(CRUD_texts, CRUDDEFAULTS);
DSON.keepmerge(CRUD_texts,
    {
        table: {
            key: 'id',
            sort: 'num',
            deletekeys: ['id'],
            dragrow: 'num',
            sortable: false,
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
                },

            },
            filters: {
                columns: [
                    {
                        key: 'basic',
                        label: 'Basic',
                        type: FILTER.types.string,
                        placeholder: 'Basic',
                        maxlength: 20
                    },
                    {
                        key: 'mask',
                        label: 'Mask',
                        type: FILTER.types.string,
                        placeholder: 'mask',
                        maxlength: 20
                    },
                    {
                        key: 'format',
                        label: 'format',
                        type: FILTER.types.string,
                        placeholder: 'format',
                        maxlength: 20
                    },
                    {
                        key: 'readonly',
                        label: 'readonly',
                        type: FILTER.types.string,
                        placeholder: 'readonly',
                        maxlength: 20
                    },
                    {
                        key: 'normalpassword',
                        label: 'normal password',
                        type: FILTER.types.string,
                        placeholder: 'normalpassword',
                        maxlength: 20
                    },
                    {
                        key: 'passwordplus',
                        label: 'password plus',
                        type: FILTER.types.string,
                        placeholder: 'passwordplus',
                        maxlength: 20
                    }
                ]
            }
        }
    });