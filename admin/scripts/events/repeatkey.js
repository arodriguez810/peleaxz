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
                    if (ANGULARJS.tableScope !== null) {
                        eval(ANGULARJS.tableScope + ".firstPage()");
                        eval(ANGULARJS.tableScope + ".resetSort()");
                    }
                    break;
                }
                case "R":
                case "r": {
                    if (ANGULARJS.tableScope !== null) {
                        eval(ANGULARJS.tableScope + ".refresh()");
                    }
                    break;
                }
                case "P":
                case "p": {
                    if (ANGULARJS.tableScope !== null) {
                        eval(ANGULARJS.tableScope + ".refresh()");
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