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
            if (!DSON.oseaX(ANGULARJS.tableScope)) {
                switch (KEY.repeat.key) {
                    case "1": {
                        eval(ANGULARJS.tableScope + ".firstPage()");
                        eval(ANGULARJS.tableScope + ".resetSort()");
                        break;
                    }
                    case "R":
                    case "r": {
                        eval(ANGULARJS.tableScope + ".refresh()");
                        break;
                    }
                    case "C":
                    case "c": {
                        eval(ANGULARJS.tableScope + ".pages.form.close()");
                        break;
                    }
                    case "P":
                    case "p": {
                        eval(ANGULARJS.tableScope + ".goPageModal()");
                        break;
                    }
                    case "t":
                    case "T": {
                        eval(ANGULARJS.tableScope + ".restoreStorage()");
                        break;
                    }
                    case "f":
                    case "F": {
                        eval(ANGULARJS.tableScope + ".openFilters()");
                        break;
                    }
                    case"a":
                    case"A": {
                        eval(ANGULARJS.tableScope + ".add()");
                        break;
                    }
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

$(document).ready(function () {
    // $(document).on('keyup', 'body', function (e) {
    //     KEY.repeat.make(e.key);
    //     if (!DSON.oseaX(ANGULARJS.tableScope))
    //         eval(String.format("{0}.pageKey('{1}')", ANGULARJS.tableScope, e.key));
    // });
    //
    // $(document).on('mouseover', '.table', function (e) {
    //     ANGULARJS.tableScope = $(this).data("scope");
    // });
});