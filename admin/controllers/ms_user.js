app.controller('ms_user', function ($scope, $http, $compile) {
    var ms_user = this;
    ms_user.records = [];
    ms_user.CONFIG = CONFIG;
    ms_user.table = {
        loaded: false,
        crud: null,
        currentPage: 1,
        currentLimit: CONFIG.ui.tables.paginator.limits[0],
        pages: [],
        totalPages: 0,
        is: {
            loading: true
        }
    };

    ms_user.afterData = function (data) {
        paginator.make(ms_user,data);
        animation.stoploading("#ms_userTablePanel", "#loadingButton");
        ms_user.table.is.loading = false;
    };
    ms_user.refresh = function () {
        animation.loading("#ms_userTablePanel", "Refresing Users List...", "#loadingButton");
        ms_user.table.is.loading = true;
        setTimeout(function () {
            if (ms_user.table.crud === null) {
                ms_user.crud(function (crud) {
                    ms_user.crud = crud;
                    ms_user.table.crud = crud;
                    ms_user.table.loaded = true;
                    animation.play("#ms_userTable");
                    ms_user.list(
                        {
                            limit: ms_user.table.currentLimit,
                            page: ms_user.table.currentPage
                        }, function (data) {
                            ms_user.afterData(data);
                        });
                });
            } else {
                ms_user.list(
                    {
                        limit: ms_user.table.currentLimit,
                        page: ms_user.table.currentPage
                    }, function (data) {
                        ms_user.afterData(data);
                    });
            }
        }, 0);
    };

    api.run(ms_user, $http, 'ms_user');
    table.run(ms_user);
    paginator.run(ms_user);

    ms_user.refresh();
});