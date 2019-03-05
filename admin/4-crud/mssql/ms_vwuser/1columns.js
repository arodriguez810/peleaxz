CRUD_ms_vwuser = {};
DSON.keepmerge(CRUD_ms_vwuser, CRUDDEFAULTS);
DSON.keepmerge(CRUD_ms_vwuser, {
    table: {
        engine: 'ms',
        report: true,
        allow: {
            add: false,
            edit: false,
            view: true,
            remove: false,
            active: false,
            filter: true,
            import: false,
            copy: false,
            clone: false,
            export: {
                Clipboard: true,
                PDF: true,
                CSV: true,
                XLS: true,
                DOC: true
            },
            actions: true,
        },
        columns: {
            id: {
                label: "ID",
                sorttype: "numeric",
                class: "text-left",
                exportExample: false
            },
            fullName: {
                label: "Full Name",
                shorttext: 30
            },
            time: {
                label: "Time",
            }
        },
    }
});