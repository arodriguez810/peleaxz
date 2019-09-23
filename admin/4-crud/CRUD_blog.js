CRUD_blog = {};
DSON.keepmerge(CRUD_blog, CRUDDEFAULTS);
DSON.keepmerge(CRUD_blog,
    {

        table: {
            key: '_id',
            report: true,
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
                article: {shorttext: 360},
                date: {},
                image: {
                    formattype: ENUM.FORMAT.externalimage,
                },
                likes: {
                    formattype: ENUM.FORMAT.numeric,
                },
                title: {},
                topic: {},
                createdAt: {
                    formattype: ENUM.FORMAT.datetime,
                },
            },
            filters: {
                columns: true
            }
        }
    });