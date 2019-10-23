exports.init = function (params) {
    TASKS = [];
    var work = () => {
        for (var i in TASKS) {
            var task = TASKS[i];
            task.cancel();
        }
        params.storage.getItem("dragon_task").then(tasks => {
            for (var task of tasks) {
                var configuration = {};
                if (task.second) configuration.second = task.second;
                if (task.minute) configuration.minute = task.minute;
                if (task.hour) configuration.hour = task.hour;
                if (task.day) configuration.date = task.date;
                if (task.month) configuration.month = task.month;
                if (task.year) configuration.year = task.year;
                if (task.dayOfWeek) configuration.dayOfWeek = task.dayOfWeek;
                if (task.start) configuration.start = task.start;
                if (task.end) configuration.end = task.end;

                if (task.enabled == 1) {
                    if (task.datasource) {
                        var cnn = params.modules.mysql;

                        cnn.data(`SELECT * FROM datasource where id=${task.datasource}`, params).then(data => {
                            var engine = data.data[0].datasource_engine.toLowerCase();
                            if (engine === 'mssql') {
                                eval(`cnngeneral = params.modules.${data.data[0].datasource_engine.toLowerCase()};`);
                                cnngeneral.dataGeneral({
                                    "user": data.data[0].user,
                                    "password": data.data[0].password,
                                    "server": data.data[0].server,
                                    "database": data.data[0].database,
                                    "port": data.data[0].port || 1433,
                                    "encrypt": false
                                }, data.data[0].query, params, false).then(tosave => {
                                    if (tosave.data.length > 0) {
                                        var fields = [];
                                        var row1 = tosave.data[0];
                                        for (var field in row1) {
                                            fields.push({name: field, datasource: data.data[0].id});
                                        }

                                        cnn.data(`SELECT * FROM datasource_field where datasource=${data.data[0].id}`, params, false).then(count => {

                                            if (count.data.length < 1) {
                                                cnn.insertQuery("datasource_field", fields, params).then(queryXin => {
                                                    cnn.executeNonQuery(queryXin, params).then(insrt => {

                                                    });
                                                });
                                            }
                                        });

                                    }
                                    if (tosave.error) {
                                        params.sio.emit("notification", {
                                            title: 'Alert',
                                            message: `An error has occurred with the ${data.data[0].name} datasource "${tosave.error}" please review`
                                        });
                                    } else {

                                        eval(`stcnn = params.modules.storage;`);
                                        if (data.data[0].rewritedata) {
                                            stcnn.truncate(data.data[0].entity, params).then(err => {
                                                stcnn.insertQuery(data.data[0].entity, tosave.data, params, undefined, undefined, true).then(insrt => {

                                                    params.sio.emit("dashboard", {});
                                                    TASKS.push(params.schedule.scheduleJob(configuration, eval(`async () => {
                                                        eval(\`${task.script}\`);
                                                    };`)));
                                                });
                                            });
                                        } else {

                                            stcnn.insertQuery(data.data[0].entity, tosave.data, params, undefined, undefined, true).then(insrt => {
                                                params.sio.emit("dashboard", {});
                                                TASKS.push(params.schedule.scheduleJob(configuration, eval(`async () => {
                                                    eval(\`${task.script}\`);
                                                };`)));
                                            });
                                        }
                                        cnn.data(`SELECT * FROM datasource_block where datasource=${data.data[0].id}`, params).then(block => {
                                            console.log(block);
                                        });
                                    }
                                });
                            }
                        });
                    } else {
                        TASKS.push(params.schedule.scheduleJob(configuration, eval(`async () => {
                            eval(\`${task.script}\`);
                        };`)));
                    }

                }
            }
        });
    };
    params.schedule.scheduleJob({second: 1}, work);
    work();
};
