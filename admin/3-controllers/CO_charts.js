app.controller("charts", function ($scope, $http, $compile) {
    charts = this;
    RUNCONTROLLER("charts", charts, $scope, $http, $compile);
    RUN_B("charts", charts, $scope, $http, $compile);
    charts.data = null;
    charts.isinside = false;
    charts.loaddata = async function () {
        if (!charts.isinside) {
            charts.isinside = true;
            charts.datasources = await DRAGONAPI.listp("datasource", {});
            charts.data = [];
            charts.pie_data = [];
            for (var datasource of charts.datasources.data) {
                var data = await DRAGONAPI.ajax.postp('/data/list', {
                    "entity": datasource.entity
                }, 'no');
                var exist = charts.data.filter(d => {
                    return d.name == datasource.name;
                });
                if (exist.length > 0) {
                    charts.data.filter(d => {
                        if (d.name == datasource.name) {
                            d.value = data.data.count;
                        }
                    });
                } else
                    charts.data.push({value: data.data.count, name: datasource.name});
            }
            charts.pie_data = charts.data;
            charts.charts.pie.refresh();
            charts.refreshAngular();
            console.log('refresh data');
            charts.isinside = false;
        }
    };

});