CRUD_dates = {};
DSON.keepmerge(CRUD_dates, CRUDDEFAULTS);
DSON.keepmerge(CRUD_dates,
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
                date: {
                    sorttype: "time",
                    formattype: "datetime>DD-MM-YYYY",
                    exportExample: "\"\"[Date YYYY-MM-DD]\"\""
                },
                datetime: {
                    sorttype: "time",
                    formattype: "datetime>DD-MM-YYYY hh:mm a",
                    exportExample: "\"\"[Date YYYY-MM-DD hh:mm am/pm]\"\""
                },
                time: {
                    sorttype: "time",
                    exportExample: "\"\"[Time hh:mm am/pm]\"\""
                },
                year: {
                    label: "Year",
                    class: "text-left",
                    sorttype: "numeric",
                }
            }
        }
    });