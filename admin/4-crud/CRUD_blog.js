CRUD_blog = {};
DSON.keepmerge(CRUD_blog, CRUDDEFAULTS);
DSON.keepmerge(CRUD_blog,
    {

        table: {
            key: '_id',
            deletekeys: ['_id'],
            params: {
                appName: CONFIG.appName
            },
            columns: {
                _id: {
                    visible: false,
                    visibleDetail: false,
                    export: false,
                    exportExample: false
                },
                article: {},
                date: {},
                image: {
                    formattype: ENUM.FORMAT.externalimage,
                },
                likes: {
                    formattype: "numeric",
                },
                title: {},
                topic: {},
                createdAt: {
                    formattype: "datetime",
                },
            },
            filters: {
                columns: true
            }
        }
    });