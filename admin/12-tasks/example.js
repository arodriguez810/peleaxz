exports.init = function (params) {
    // second (0-59)
    // minute (0-59)
    // hour (0-23)
    // date (1-31)
    // month (0-11)
    // year
    // dayOfWeek (0-6) Starting with Sunday
    // start: Date
    // end: Date
    var work = async function () {
        module = params.modules.mysql;
        users = new module.Model('users', params);
        users.all({
            where: [
                {
                    field: "id",
                    operator: "!=",
                    value: "0"
                }
            ]
        }).then(async data => {
            console.log(data.data);
            // params.servicesFunctions.base_onesignal.posts.send({
            //     users: [1],
            //     contents: {en: data.data[0].name},
            //     title: 'Test from server'
            // });
        });
    };
    // for (var i = 0; i <= 60; i += 5) {
    //     params.schedule.scheduleJob({second: i}, work);
    // }

};
