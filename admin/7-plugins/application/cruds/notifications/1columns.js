CRUD_dragon_notifications = {};
DSON.keepmerge(CRUD_dragon_notifications, CRUDDEFAULTS);
DSON.keepmerge(CRUD_dragon_notifications, {
    table: {
        engine: 'ms',
        allow: {
            menu: true,
            add: true,
            edit: true,
            view: true,
            remove: true,
            active: false,
            filter: true,
            import: true,
            copy: true,
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
            id: {                 visible: false,                 visibleDetail: false,                 export: false,                 exportExample: false             },
            subject: {
                label: "subject",
                shorttext: 80
            },
            content: {
                label: "content",
                sortable: false,
                shorttext: 80,
                null: "<span class='text-grey'>[NULL]</span>"
            },
            created: {
                visible: false,
                sorttype: "time",
                formattype: "datetime>DD-MM-YYYY hh:mm a"
            },
            updated: {
                visible: false,
                exportExample: false
            },
            user_created: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            },
            user_updated: {
                visible: false,
                visibleDetail: false,
                export: false,
                exportExample: false
            }
        }
    }
});