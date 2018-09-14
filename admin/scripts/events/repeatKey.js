KEY = {
    repeat: {
        baseCount: 5,
        count: 1,
        key: null,
        current: null,
        increment: function () {
            KEY.repeat.count++;
        },
        sameKey: function (key) {
            return (KEY.repeat.current === key);
        },
        readyRun: function () {
            return (KEY.repeat.count === KEY.repeat.baseCount);
        },
        clear: function () {
            KEY.repeat.key = null;
            KEY.repeat.current = null;
            KEY.repeat.count = 1;
        },
        run: function (key) {
            switch (KEY.repeat.key) {
                case "1": {
                    if (angularjs.tableScope !== null) {
                        eval(angularjs.tableScope + ".firstPage()");
                        eval(angularjs.tableScope + ".resetSort()");
                    }
                    break;
                }
                case "R":
                case "r": {
                    if (angularjs.tableScope !== null) {
                        eval(angularjs.tableScope + ".refresh()");
                    }
                    break;
                }
                case "P":
                case "p": {
                    if (angularjs.tableScope !== null) {
                        eval(angularjs.tableScope + ".refresh()");
                    }
                    break;
                }
            }
            KEY.repeat.clear();
        },
        make: function (key) {
            if (KEY.repeat.sameKey(key)) {
                KEY.repeat.increment();
                if (KEY.repeat.readyRun()) {
                    KEY.repeat.key = key;
                    KEY.repeat.run(key);
                    return;
                }
            } else
                KEY.repeat.clear();
            KEY.repeat.current = key;
        }
    },
};