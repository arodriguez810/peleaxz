CRUD_dates = {};
DSON.keepmerge(CRUD_dates, CRUDDEFAULTS);
DSON.keepmerge(CRUD_dates,
    {
        table: {
            key: 'id',
            deletekeys: ['id'],
            columns: {
                id: {
                    visible: false,
                    visibleDetail: false,
                    export: false,
                    exportExample: false
                },
                date: {
                    sorttype: "time",
                    formattype: "date",
                    exportExample: "\"\"[Date YYYY-MM-DD]\"\"",
                },
                datetime: {
                    sorttype: "time",
                    formattype: "datetime",
                    exportExample: "\"\"[Date YYYY-MM-DD hh:mm am/pm]\"\""
                },
                time: {
                    sorttype: "time",
                    exportExample: "\"\"[Time hh:mm am/pm]\"\""
                },
                range_from: {
                    label: "From",
                    sorttype: "time",
                    formattype: "date",
                    exportExample: "\"\"[Date YYYY-MM-DD]\"\""
                },
                range_to: {
                    label: "To",
                    sorttype: "time",
                    formattype: "date",
                    exportExample: "\"\"[Date YYYY-MM-DD]\"\""
                },
                rangetime_from: {
                    label: "Datetime From",
                    sorttype: "time",
                    formattype: "datetime",
                    exportExample: "\"\"[Date YYYY-MM-DD]\"\""
                },
                rangetime_to: {
                    label: "Datetime To",
                    sorttype: "time",
                    formattype: "datetime",
                    exportExample: "\"\"[Date YYYY-MM-DD]\"\""
                },
                year: {
                    label: "Year",
                    class: "text-left",
                    sorttype: "numeric",
                }
            },
            filters: {
                columns: [
                    {
                        key: 'time',
                        label: 'time',
                        type: FILTER.types.time,
                    },
                    {
                        key: 'date',
                        label: 'date',
                        type: FILTER.types.date,
                    },
                    {
                        key: 'datetime',
                        label: 'datetime',
                        type: FILTER.types.datetime,
                    }
                ]
            }
        }
    });