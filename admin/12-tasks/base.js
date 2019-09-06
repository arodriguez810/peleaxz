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
                    TASKS.push(params.schedule.scheduleJob(configuration, eval(`async () => {
                        eval(\`${task.script}\`);
                    };`)));
                }
            }
        });
    };
    params.schedule.scheduleJob({second: 1}, work);
    work();
};
