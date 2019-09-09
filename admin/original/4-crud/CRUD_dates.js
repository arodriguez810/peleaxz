CRUD_dates = {};
DSON.keepmerge(CRUD_dates, CRUDDEFAULTS);
DSON.keepmerge(CRUD_dates,
    {
        table: {
            columns: {
                id: {
                    visible: false,
                    visibleDetail: false,
                    export: false,
                    exportExample: false
                },
                time: {
                    formattype: "time",
                },
                date: {formattype: "date",},
                datetime: {
                    formattype: "datetime",
                },
                timerange_from: {
                    formattype: "time",
                },
                timerange_to: {
                    formattype: "time",
                },
                range_from: {
                    formattype: "date",
                },
                range_to: {
                    formattype: "date",
                },
                rangetime_from: {
                    formattype: "datetime",
                },
                rangetime_to: {
                    formattype: "datetime",
                }
            },
            filters: {
                columns: true
            }
        }
    });