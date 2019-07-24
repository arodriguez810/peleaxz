exports.LoadEJS = function (files, params, folder) {
    for (var i in files) {
        var file = files[i];
        var viewName = params.S(file).contains("index.ejs") ? "" : file.replace(".ejs", "");
        params.app.get(params.util.format("/%s%s", params.modelName === "base" ? "" : params.modelName + "/", viewName),
            function (req, res) {
                params.secure.check(req, res).then(async function (token) {
                    if (!token.apptoken) {
                        res.json(token);
                        return;
                    }


                    var path = req.originalUrl;
                    var realPath = path.split("?");
                    var query = "";
                    if (realPath.length > 1) {
                        query = realPath[1];
                        realPath = realPath[0];
                    } else {
                        if (realPath[0] === "/") realPath = realPath[0] + "/base";
                        else {
                            if (realPath[0].split("/").length > 1) realPath = realPath[0];
                            else realPath = realPath[0] + "/index";
                        }
                    }

                    var models = params.models
                        .concat(params.modelsql)
                        .concat(params.modelmysql)
                        .concat(params.modeloracle).concat(params.modelstorage);
                    var tags = params.CONFIG.ui.colors.tag;
                    var newtags = {};
                    for (var tag in tags) {
                        var itag = tags[tag];
                        var largeVar = "params.CONFIG.ui.colors." + tags[tag];
                        eval("newtags." + tag + " = " + largeVar + '===undefined ? "' + itag + '" : ' + largeVar + ";");
                    }


                    var CONTROLLERSNAMES = [];
                    var CONTROLLERSNAMESILENT = [];
                    for (var CONTROLLER of params.controllersjs) {
                        var name = CONTROLLER.split('CO_')[1].split('.js')[0];
                        if (["BASE"].indexOf(name) === -1) {
                            CONTROLLERSNAMES.push({id: name, name: name});
                            CONTROLLERSNAMESILENT.push(name);
                        }
                    }


                    STORAGENAMES = [];
                    for (var sotargy in params.CONFIG.storageEntities) {
                        STORAGENAMES.push(sotargy);
                    }

                    silentsmodels = [];
                    models.forEach(function (item) {
                        if (item != undefined) {
                            if (CONTROLLERSNAMESILENT.indexOf(item) === -1) {
                                if (STORAGENAMES.indexOf(item) === -1) {
                                    silentsmodels.push(item);
                                }
                            }
                        }
                    });

                    var currencies = await params.storage.getItem("dragon_currency") || [];
                    var send = {
                        CURRENCIES: currencies,
                        scope: params.modelName,
                        THEMES: params.themes,
                        session: params.session,
                        localjs: params.localjs,
                        controls: params.controls,
                        controllersjs: params.controllersjs,
                        localStyles: params.localStyles,
                        crudjs: params.crudjs,
                        CONFIG: params.CONFIG,
                        LANGUAGE: params.LANGUAGE,
                        SHOWLANGS: params.SHOWLANGS,
                        COLOR: params.CONFIG.ui.colors,
                        TAG: newtags,
                        models: models,
                        silentsmodels: silentsmodels,
                        FOLDERS: params.folders,
                        DATA: req.query,
                        SERVICES: params.catalogs,
                        params: params,
                        localserver: localserver,
                        CONTROLLERSNAMES: CONTROLLERSNAMES
                    };

                    console.log(folder);
                    res.render("../" + (folder || params.folders.views) + "/" + realPath, send);
                }).catch(function () {

                });
            }
        );
    }
};
exports.LoadEJSDragon = function (files, params, folder) {
    for (var i in files) {
        var file = files[i];
        var viewName = params.S(file).contains("index.ejs") ? "" : file.replace(".ejs", "");
        params.app.get(params.util.format("/%s%s", params.modelName === "base" ? "" : params.modelName + "/", viewName),
            function (req, res) {
                params.secure.check(req, res).then(async function (token) {
                    if (!token.apptoken) {
                        res.json(token);
                        return;
                    }


                    var path = req.originalUrl;
                    var realPath = path.split("?");
                    var query = "";
                    if (realPath.length > 1) {
                        query = realPath[1];
                        realPath = realPath[0];
                    } else {
                        if (realPath[0] === "/") realPath = realPath[0] + "/base";
                        else {
                            if (realPath[0].split("/").length > 1) realPath = realPath[0];
                            else realPath = realPath[0] + "/index";
                        }
                    }

                    var models = params.models
                        .concat(params.modelsql)
                        .concat(params.modelmysql)
                        .concat(params.modeloracle).concat(params.modelstorage);
                    var tags = params.CONFIG.ui.colors.tag;
                    var newtags = {};
                    for (var tag in tags) {
                        var itag = tags[tag];
                        var largeVar = "params.CONFIG.ui.colors." + tags[tag];
                        eval("newtags." + tag + " = " + largeVar + '===undefined ? "' + itag + '" : ' + largeVar + ";");
                    }


                    var CONTROLLERSNAMES = [];
                    var CONTROLLERSNAMESILENT = [];
                    for (var CONTROLLER of params.controllersjs) {
                        var name = CONTROLLER.split('CO_')[1].split('.js')[0];
                        if (["BASE"].indexOf(name) === -1) {
                            CONTROLLERSNAMES.push({id: name, name: name});
                            CONTROLLERSNAMESILENT.push(name);
                        }
                    }

                    STORAGENAMES = [];
                    for (var sotargy in params.CONFIG.storageEntities) {
                        STORAGENAMES.push(sotargy);
                    }

                    silentsmodels = [];
                    models.forEach(function (item) {
                        if (item != undefined) {
                            if (CONTROLLERSNAMESILENT.indexOf(item) === -1) {
                                if (STORAGENAMES.indexOf(item) === -1) {
                                    silentsmodels.push(item);
                                }
                            }
                        }
                    });

                    var currencies = await params.storage.getItem("dragon_currency") || [];
                    var send = {
                        CURRENCIES: currencies,
                        scope: params.modelName,
                        THEMES: params.themes,
                        session: params.session,
                        localjs: params.localjs,
                        controls: params.controls,
                        controllersjs: params.controllersjs,
                        localStyles: params.localStyles,
                        crudjs: params.crudjs,
                        CONFIG: params.CONFIG,
                        LANGUAGE: params.LANGUAGE,
                        SHOWLANGS: params.SHOWLANGS,
                        COLOR: params.CONFIG.ui.colors,
                        TAG: newtags,
                        models: models,
                        silentsmodels: silentsmodels,
                        FOLDERS: params.folders,
                        DATA: req.query,
                        SERVICES: params.catalogs,
                        params: params,
                        localserver: localserver,
                        CONTROLLERSNAMES: CONTROLLERSNAMES
                    };

                    res.render("../" + (folder || params.folders.viewsDragon) + "/" + realPath, send);
                }).catch(function () {

                });
                ;
            }
        );
    }
};
exports.runServices = function (services, prefix, params) {
    var catalogs = [];
    for (var i in services.gets) {
        var func = services.gets[i];
        catalogs.push("get*" + prefix + "." + func.name);
        params.app.get(params.util.format("/service/%s/%s", prefix, i), async function (req, res) {
            var config = req.originalUrl.split('?')[0].replace('/service/', '').split('/');
            var service = config[0];
            var functionR = config[1];
            eval(`var serviceFunction = params.servicesFunctions["${service}"].gets.${functionR}`);
            return await serviceFunction(req.query).then(result => {
                params.secure.check(req, res).then(function (token) {
                    if (!token.apptoken) {
                        res.json(token);
                    } else
                        res.json(result);
                }).catch(function () {

                });
            }).catch(err => {
                res.json(err);
            });
        });
    }
    for (var i in services.posts) {
        var func = services.posts[i];
        catalogs.push("post*" + prefix + "." + func.name);
        params.app.post(params.util.format("/service/%s/%s", prefix, i), async function (req, res) {
            var config = req.originalUrl.replace('/service/', '').split('/');
            var service = config[0];
            var functionR = config[1];
            eval(`var serviceFunction = params.servicesFunctions["${service}"].posts.${functionR}`);
            return await serviceFunction(req.body).then(result => {
                params.secure.check(req, res).then(function (token) {
                    if (!token.apptoken) {
                        res.json(token);
                        return;
                    }
                    res.json(result);
                }).catch(function () {

                });
            }).catch(err => {
                res.json(err);
            });
        });
    }
    for (var i in services.puts) {
        var func = services.puts[i];
        catalogs.push("put*" + prefix + "." + func.name);
        params.app.post(params.util.format("/service/%s/%s", prefix, i), async function (req, res) {
            var config = req.originalUrl.replace('/service/', '').split('/');
            var service = config[0];
            var functionR = config[1];
            eval(`var serviceFunction = params.servicesFunctions["${service}"].puts.${functionR}`);
            return await serviceFunction(req.body).then(result => {
                params.secure.check(req, res).then(function (token) {
                    if (!token.apptoken) {
                        res.json(token);
                        return;
                    }
                    res.json(result);
                }).catch(function () {

                });
            }).catch(err => {
                res.json(err);
            });
        });
    }
    for (var i in services.deletes) {
        var func = services.deletes[i];
        catalogs.push("delete*" + prefix + "." + func.name);
        params.app.post(params.util.format("/service/%s/%s", prefix, i), async function (req, res) {
            var config = req.originalUrl.replace('/service/', '').split('/');
            var service = config[0];
            var functionR = config[1];
            eval(`var serviceFunction = params.servicesFunctions["${service}"].deletes.${functionR}`);
            return await serviceFunction(req.body).then(result => {
                params.secure.check(req, res).then(function (token) {
                    if (!token.apptoken) {
                        res.json(token);
                        return;
                    }
                    res.json(result);
                }).catch(function () {

                });
            }).catch(err => {
                res.json(err);
            });
        });
    }
    return catalogs;
};
exports.loadEJSSimple = function (folder, prefix, params) {
    params.fs.readdir(folder, function (err, files) {
        for (var i in files) {
            var file = files[i];
            var viewName = params.S(file).contains("index.ejs") ? "" : "/" + file.replace(".ejs", "");
            if (viewName.indexOf('.') !== -1)
                continue;
            params.app.get(params.util.format("/%s%s", prefix, viewName), function (req, res) {
                params.secure.check(req, res).then(async function (token) {
                    if (!token.apptoken) {
                        res.json(token);
                        return;
                    }
                    var path = req.originalUrl;
                    var realPath = path.split("?");
                    var viewN = realPath[0].split("/");

                    var models = params.models
                        .concat(params.modelsql)
                        .concat(params.modelmysql)
                        .concat(params.modeloracle)
                        .concat(params.modelstorage);
                    var tags = params.CONFIG.ui.colors.tag;
                    var newtags = {};
                    for (var tag in tags) {
                        var itag = tags[tag];
                        var largeVar = "params.CONFIG.ui.colors." + tags[tag];
                        eval(
                            "newtags." + tag + " = " + largeVar + '===undefined ? "' + itag + '" : ' + largeVar + ";"
                        );
                    }
                    var modelName = viewN.filter(function (item) {
                        return item !== '';
                    });

                    var CONTROLLERSNAMES = [];
                    var CONTROLLERSNAMESILENT = [];
                    for (var CONTROLLER of params.controllersjs) {
                        var name = CONTROLLER.split('CO_')[1].split('.js')[0];
                        if (["BASE"].indexOf(name) === -1) {
                            CONTROLLERSNAMES.push({id: name, name: name});
                            CONTROLLERSNAMESILENT.push(name);
                        }
                    }

                    STORAGENAMES = [];
                    for (var sotargy in params.CONFIG.storageEntities) {
                        STORAGENAMES.push(sotargy);
                    }

                    silentsmodels = [];
                    models.forEach(function (item) {
                        if (item != undefined) {
                            if (CONTROLLERSNAMESILENT.indexOf(item) === -1) {
                                if (STORAGENAMES.indexOf(item) === -1) {
                                    silentsmodels.push(item);
                                }
                            }
                        }
                    });

                    var currencies = await params.storage.getItem("dragon_currency") || [];
                    var send = {
                        CURRENCIES: currencies,
                        scope: req.query.scope,
                        THEMES: params.themes,
                        session: params.session,
                        localjs: params.localjs,
                        controls: params.controls,
                        controllersjs: params.controllersjs,
                        localStyles: params.localStyles,
                        crudjs: params.crudjs,
                        CONFIG: params.CONFIG,
                        LANGUAGE: params.LANGUAGE,
                        SHOWLANGS: params.SHOWLANGS,
                        COLOR: params.CONFIG.ui.colors,
                        TAG: newtags,
                        models: models,
                        silentsmodels: silentsmodels,
                        FOLDERS: params.folders,
                        DATA: req.query,
                        SERVICES: params.catalogs,
                        params: params,
                        localserver: localserver,
                        CONTROLLERSNAMES: CONTROLLERSNAMES
                    };
                    var viewfinal = viewN[viewN.length - 1];
                    if (modelName.length == 1)
                        viewfinal = "index";

                    res.render("." + folder + "/" + viewfinal, send);
                }).catch(function () {

                });
            });
            params.app.post(params.util.format("/post/%s%s", prefix, viewName), async function (req, res) {


                var path = req.originalUrl;
                var realPath = path.split("?");
                var viewN = realPath[0].split("/");

                var models = params.models
                    .concat(params.modelsql)
                    .concat(params.modelmysql)
                    .concat(params.modeloracle)
                    .concat(params.modelstorage);
                var tags = params.CONFIG.ui.colors.tag;
                var newtags = {};
                for (var tag in tags) {
                    var itag = tags[tag];
                    var largeVar = "params.CONFIG.ui.colors." + tags[tag];
                    eval(
                        "newtags." + tag + " = " + largeVar + '===undefined ? "' + itag + '" : ' + largeVar + ";"
                    );
                }
                var modelName = viewN.filter(function (item) {
                    return item !== '';
                });

                var CONTROLLERSNAMES = [];
                var CONTROLLERSNAMESILENT = [];
                for (var CONTROLLER of params.controllersjs) {
                    var name = CONTROLLER.split('CO_')[1].split('.js')[0];
                    if (["BASE"].indexOf(name) === -1) {
                        CONTROLLERSNAMES.push({id: name, name: name});
                        CONTROLLERSNAMESILENT.push(name);
                    }
                }

                STORAGENAMES = [];
                for (var sotargy in params.CONFIG.storageEntities) {
                    STORAGENAMES.push(sotargy);
                }

                silentsmodels = [];
                models.forEach(function (item) {
                    if (item != undefined) {
                        if (CONTROLLERSNAMESILENT.indexOf(item) === -1) {
                            if (STORAGENAMES.indexOf(item) === -1) {
                                silentsmodels.push(item);
                            }
                        }
                    }
                });

                var currencies = await params.storage.getItem("dragon_currency") || [];
                var send = {
                    CURRENCIES: currencies,
                    scope: req.query.scope,
                    THEMES: params.themes,
                    session: params.session,
                    localjs: params.localjs,
                    controls: params.controls,
                    controllersjs: params.controllersjs,
                    localStyles: params.localStyles,
                    crudjs: params.crudjs,
                    CONFIG: params.CONFIG,
                    LANGUAGE: params.LANGUAGE,
                    SHOWLANGS: params.SHOWLANGS,
                    COLOR: params.CONFIG.ui.colors,
                    TAG: newtags,
                    models: models,
                    silentsmodels: silentsmodels,
                    FOLDERS: params.folders,
                    DATA: req.body,
                    SERVICES: params.catalogs,
                    params: params,
                    localserver: localserver,
                    CONTROLLERSNAMES: CONTROLLERSNAMES
                };

                var viewfinal = viewN[viewN.length - 1];
                if (modelName.length == 1)
                    viewfinal = "index";
                if (send.DATA.pdf) {
                    params.app.render("." + folder + "/" + viewfinal, send, function (err, html) {
                        if (err) {
                            res.json(err);
                            return;
                        }

                        params.app.render("." + folder + "/" + 'header', send, function (err, headHtml) {
                            if (err) {
                                res.json(err);
                                return;
                            }

                            params.app.render("." + folder + "/" + 'footer', send, function (err, footerHtml) {
                                if (err) {
                                    res.json(err);
                                    return;
                                }
                                var runnings = `module.exports = {
                                    header: {
                                        height: '3cm', 
                                        contents: function (page) {
                                            return '${headHtml.replace(/(\r\n|\n|\r)/gm, "")}';
                                        }
                                    },
        
                                    footer: {
                                        height: '3cm', 
                                        contents: function (page) {
                                            return '${footerHtml.replace(/(\r\n|\n|\r)/gm, "")}';
                                        }
                                    },
                                };`;
                                var pdfOptions = {
                                    html: html,
                                    paperSize: {
                                        format: 'A4',
                                        orientation: 'landscape', // portrait
                                        border: '1cm'
                                    },
                                    runnings: runnings
                                };

                                params.fs.writeFile("./preview.html", html, function (err) {
                                    if (err) {
                                        return console.log(err);
                                    }
                                });

                                params.PDF.convert(pdfOptions, function (err, result) {
                                    result.toFile("./preview.pdf", function () {
                                        res.download("./preview.pdf", send.DATA.pdf);
                                    });
                                });
                            });
                        });
                    });
                } else if (send.DATA.docx) {
                    params.app.render("." + folder + "/" + viewN[viewN.length - 1], send, function (err, html) {
                        if (err) {
                            res.json(err);
                            return;
                        }
                        var docx = params.HtmlDocx.asBlob(html, {
                            orientation: 'landscape',
                            margins: {top: 200, right: 200, left: 200, header: 200, footer: 200, bottom: 200}
                        });
                        params.fs.writeFile("./preview.docx", docx, function (err) {
                            if (err) {
                                res.json(err);
                                return;
                            }

                            res.download("./preview.docx", send.DATA.docx);
                        });
                    });
                } else {
                    res.render("." + folder + "/" + viewN[viewN.length - 1], send);
                }
            });
        }
    });
};
exports.loadEJSSimpleSilents = function (folder, prefix, params) {
    params.fs.readdir(folder, function (err, files) {
        for (var i in files) {
            var file = files[i];
            var viewName = params.S(file).contains("index.ejs") ? "" : "/" + file.replace(".ejs", "");
            params.app.get(params.util.format("/%s%s", prefix, viewName), function (req, res) {
                params.secure.check(req, res).then(async function (token) {
                    if (!token.apptoken) {
                        res.json(token);
                        return;
                    }


                    var path = req.originalUrl;
                    var realPath = path.split("?");
                    var viewN = realPath[0].split("/");

                    var models = params.models
                        .concat(params.modelsql)
                        .concat(params.modelmysql)
                        .concat(params.modeloracle)
                        .concat(params.modelstorage);
                    var tags = params.CONFIG.ui.colors.tag;
                    var newtags = {};
                    for (var tag in tags) {
                        var itag = tags[tag];
                        var largeVar = "params.CONFIG.ui.colors." + tags[tag];
                        eval(
                            "newtags." + tag + " = " + largeVar + '===undefined ? "' + itag + '" : ' + largeVar + ";"
                        );
                    }
                    var modelName = viewN.filter(function (item) {
                        return item !== '';
                    });

                    var CONTROLLERSNAMES = [];
                    var CONTROLLERSNAMESILENT = [];
                    for (var CONTROLLER of params.controllersjs) {
                        var name = CONTROLLER.split('CO_')[1].split('.js')[0];
                        if (["BASE"].indexOf(name) === -1) {
                            CONTROLLERSNAMES.push({id: name, name: name});
                            CONTROLLERSNAMESILENT.push(name);
                        }
                    }

                    STORAGENAMES = [];
                    for (var sotargy in params.CONFIG.storageEntities) {
                        STORAGENAMES.push(sotargy);
                    }

                    silentsmodels = [];
                    models.forEach(function (item) {
                        if (item != undefined) {
                            if (CONTROLLERSNAMESILENT.indexOf(item) === -1) {
                                if (STORAGENAMES.indexOf(item) === -1) {
                                    silentsmodels.push(item);
                                }
                            }
                        }
                    });

                    var currencies = await params.storage.getItem("dragon_currency") || [];
                    var send = {
                        CURRENCIES: currencies,
                        scope: req.query.scope,
                        THEMES: params.themes,
                        session: params.session,
                        localjs: params.localjs,
                        controls: params.controls,
                        controllersjs: params.controllersjs,
                        localStyles: params.localStyles,
                        crudjs: params.crudjs,
                        CONFIG: params.CONFIG,
                        LANGUAGE: params.LANGUAGE,
                        SHOWLANGS: params.SHOWLANGS,
                        COLOR: params.CONFIG.ui.colors,
                        TAG: newtags,
                        models: models,
                        silentsmodels: silentsmodels,
                        FOLDERS: params.folders,
                        DATA: req.query,
                        SERVICES: params.catalogs,
                        params: params,
                        localserver: localserver,
                        CONTROLLERSNAMES: CONTROLLERSNAMES
                    };
                    var viewfinal = viewN[viewN.length - 1];
                    if (modelName.length == 1)
                        viewfinal = "index";
                    res.render("../" + params.folders.silents + "/" + viewfinal, send);
                }).catch(function () {

                });
            });
            params.app.post(params.util.format("/post/%s%s", prefix, viewName), async function (req, res) {


                var path = req.originalUrl;
                var realPath = path.split("?");
                var viewN = realPath[0].split("/");

                var models = params.models
                    .concat(params.modelsql)
                    .concat(params.modelmysql)
                    .concat(params.modeloracle)
                    .concat(params.modelstorage);
                var tags = params.CONFIG.ui.colors.tag;
                var newtags = {};
                for (var tag in tags) {
                    var itag = tags[tag];
                    var largeVar = "params.CONFIG.ui.colors." + tags[tag];
                    eval(
                        "newtags." + tag + " = " + largeVar + '===undefined ? "' + itag + '" : ' + largeVar + ";"
                    );
                }
                var modelName = viewN.filter(function (item) {
                    return item !== '';
                });

                var CONTROLLERSNAMES = [];
                var CONTROLLERSNAMESILENT = [];
                for (var CONTROLLER of params.controllersjs) {
                    var name = CONTROLLER.split('CO_')[1].split('.js')[0];
                    if (["BASE"].indexOf(name) === -1) {
                        CONTROLLERSNAMES.push({id: name, name: name});
                        CONTROLLERSNAMESILENT.push(name);
                    }
                }

                STORAGENAMES = [];
                for (var sotargy in params.CONFIG.storageEntities) {
                    STORAGENAMES.push(sotargy);
                }

                silentsmodels = [];
                models.forEach(function (item) {
                    if (item != undefined) {
                        if (CONTROLLERSNAMESILENT.indexOf(item) === -1) {
                            if (STORAGENAMES.indexOf(item) === -1) {
                                silentsmodels.push(item);
                            }
                        }
                    }
                });

                var currencies = await params.storage.getItem("dragon_currency") || [];
                var send = {
                    CURRENCIES: currencies,
                    scope: req.query.scope,
                    THEMES: params.themes,
                    session: params.session,
                    localjs: params.localjs,
                    controls: params.controls,
                    controllersjs: params.controllersjs,
                    localStyles: params.localStyles,
                    crudjs: params.crudjs,
                    CONFIG: params.CONFIG,
                    LANGUAGE: params.LANGUAGE,
                    SHOWLANGS: params.SHOWLANGS,
                    COLOR: params.CONFIG.ui.colors,
                    TAG: newtags,
                    models: models,
                    silentsmodels: silentsmodels,
                    FOLDERS: params.folders,
                    DATA: req.body,
                    SERVICES: params.catalogs,
                    params: params,
                    localserver: localserver,
                    CONTROLLERSNAMES: CONTROLLERSNAMES
                };

                var viewfinal = viewN[viewN.length - 1];
                if (modelName.length == 1)
                    viewfinal = "index";
                if (send.DATA.pdf) {
                    params.app.render("." + folder + "/" + viewfinal, send, function (err, html) {
                        if (err) {
                            res.json(err);
                            return;
                        }

                        params.app.render("." + folder + "/" + 'header', send, function (err, headHtml) {
                            if (err) {
                                res.json(err);
                                return;
                            }

                            params.app.render("." + folder + "/" + 'footer', send, function (err, footerHtml) {
                                if (err) {
                                    res.json(err);
                                    return;
                                }
                                var runnings = `module.exports = {
                                    header: {
                                        height: '3cm', 
                                        contents: function (page) {
                                            return '${headHtml.replace(/(\r\n|\n|\r)/gm, "")}';
                                        }
                                    },
        
                                    footer: {
                                        height: '3cm', 
                                        contents: function (page) {
                                            return '${footerHtml.replace(/(\r\n|\n|\r)/gm, "")}';
                                        }
                                    },
                                };`;
                                var pdfOptions = {
                                    html: html,
                                    paperSize: {
                                        format: 'A4',
                                        orientation: 'landscape', // portrait
                                        border: '1cm'
                                    },
                                    runnings: runnings
                                };

                                params.fs.writeFile("./preview.html", html, function (err) {
                                    if (err) {
                                        return console.log(err);
                                    }
                                });

                                params.PDF.convert(pdfOptions, function (err, result) {
                                    result.toFile("./preview.pdf", function () {
                                        res.download("./preview.pdf", send.DATA.pdf);
                                    });
                                });
                            });
                        });
                    });
                } else if (send.DATA.docx) {
                    params.app.render("." + folder + "/" + viewN[viewN.length - 1], send, function (err, html) {
                        if (err) {
                            res.json(err);
                            return;
                        }
                        var docx = params.HtmlDocx.asBlob(html, {
                            orientation: 'landscape',
                            margins: {top: 200, right: 200, left: 200, header: 200, footer: 200, bottom: 200}
                        });
                        params.fs.writeFile("./preview.docx", docx, function (err) {
                            if (err) {
                                res.json(err);
                                return;
                            }

                            res.download("./preview.docx", send.DATA.docx);
                        });
                    });
                } else {
                    res.render("." + folder + "/" + viewN[viewN.length - 1], send);
                }
            });
        }
    });
};
exports.loadEJSSimplePOST = function (folder, prefix, params) {
    params.fs.readdir(folder, function (err, files) {
        for (var i in files) {
            var file = files[i];
            var viewName = params.S(file).contains("index.ejs") ? "" : "/" + file.replace(".ejs", "");
            params.app.post(params.util.format("/%s%s", prefix, viewName), function (req, res) {
                params.secure.check(req, res).then(async function (token) {
                    if (!token.apptoken) {
                        res.json(token);
                        return;
                    }


                    var path = req.originalUrl;
                    var realPath = path.split("?");
                    var viewN = realPath[0].split("/");

                    var models = params.models
                        .concat(params.modelsql)
                        .concat(params.modelmysql)
                        .concat(params.modeloracle)
                        .concat(params.modelstorage);
                    var tags = params.CONFIG.ui.colors.tag;
                    var newtags = {};
                    for (var tag in tags) {
                        var itag = tags[tag];
                        var largeVar = "params.CONFIG.ui.colors." + tags[tag];
                        eval(
                            "newtags." + tag + " = " + largeVar + '===undefined ? "' + itag + '" : ' + largeVar + ";"
                        );
                    }
                    var modelName = viewN.filter(function (item) {
                        return item !== '';
                    });

                    var CONTROLLERSNAMES = [];
                    var CONTROLLERSNAMESILENT = [];
                    for (var CONTROLLER of params.controllersjs) {
                        var name = CONTROLLER.split('CO_')[1].split('.js')[0];
                        if (["BASE"].indexOf(name) === -1) {
                            CONTROLLERSNAMES.push({id: name, name: name});
                            CONTROLLERSNAMESILENT.push(name);
                        }
                    }

                    STORAGENAMES = [];
                    for (var sotargy in params.CONFIG.storageEntities) {
                        STORAGENAMES.push(sotargy);
                    }

                    silentsmodels = [];
                    models.forEach(function (item) {
                        if (item != undefined) {
                            if (CONTROLLERSNAMESILENT.indexOf(item) === -1) {
                                if (STORAGENAMES.indexOf(item) === -1) {
                                    silentsmodels.push(item);
                                }
                            }
                        }
                    });

                    var currencies = await params.storage.getItem("dragon_currency") || [];
                    var send = {
                        CURRENCIES: currencies,
                        scope: req.query.scope,
                        THEMES: params.themes,
                        session: params.session,
                        localjs: params.localjs,
                        controls: params.controls,
                        controllersjs: params.controllersjs,
                        localStyles: params.localStyles,
                        crudjs: params.crudjs,
                        CONFIG: params.CONFIG,
                        LANGUAGE: params.LANGUAGE,
                        SHOWLANGS: params.SHOWLANGS,
                        COLOR: params.CONFIG.ui.colors,
                        TAG: newtags,
                        models: models,
                        silentsmodels: silentsmodels,
                        FOLDERS: params.folders,
                        DATA: req.body,
                        SERVICES: params.catalogs,
                        params: params,
                        localserver: localserver,
                        CONTROLLERSNAMES: CONTROLLERSNAMES
                    };
                    var viewfinal = viewN[viewN.length - 1];
                    if (modelName.length == 1)
                        viewfinal = "index";
                    res.render("." + folder + "/" + viewfinal, send);
                }).catch(function () {

                });
            });
        }
    });
};
removeArray = function (array, ax) {
    var what, a = arguments, L = a.length, ax;
    while (L && array.length) {
        what = a[--L];
        while ((ax = array.indexOf(what)) !== -1) {
            array.splice(ax, 1);
        }
    }
    return array;
};
exports.init = function (params) {
    var excludes = [
        params.folders.views + "//base",
        params.folders.views + "//master",
    ];
    var excludesDragon = [
        params.folders.viewsDragon + "//base",
        params.folders.viewsDragon + "//master",
        "@templates",
        params.folders.viewsDragon + "//templates/charts",
        params.folders.viewsDragon + "//templates/email",
        params.folders.viewsDragon + "//templates/form",
        params.folders.viewsDragon + "//templates/header",
        params.folders.viewsDragon + "//templates/system",
        params.folders.viewsDragon + "//templates/table",
        params.folders.viewsDragon + "//application"
    ];
    var models = params.models
        .concat(params.modelsql)
        .concat(params.modelmysql)
        .concat(params.modeloracle)
        .concat(params.modelstorage);

    models.forEach(element => {
        excludes.push(params.folders.views + "//" + element);
    });
    models.forEach(element => {
        excludesDragon.push(params.folders.viewsDragon + "//" + element);
    });
    params.modelName = "base";
    params.fs.readdir(
        params.util.format("./" + params.folders.viewsDragon + "/%s", params.modelName), function (err, files) {
            params.modelName = "base";
            exports.LoadEJSDragon(files, params);
        }
    );
    var getFiles = function (exclude, dir, filelist, prefix) {
        var fs = params.fs || require("fs"),
            files = fs.readdirSync(dir);
        filelist = filelist || [];
        prefix = prefix || "";
        files.forEach(function (file) {
            if (fs.statSync(dir + "/" + file).isDirectory()) {
                if (exclude.indexOf(dir + "/" + file) === -1) {
                    filelist.push(prefix + file);
                    filelist = getFiles(
                        exclude,
                        dir + "/" + file,
                        filelist,
                        prefix + file + "/"
                    );
                } else {
                    //console.log("exclude:" + dir + "/" + file);
                }
            } else {
            }
        });
        for (var root in exclude) {
            if (exclude[root][0] === '@') {
                var path = exclude[root].replace("@", "");
                filelist = removeArray(filelist, path);
            }
        }
        return filelist;
    };
    var autroute = getFiles(excludesDragon, params.folders.viewsDragon + "/");
    autroute.forEach(element => {
        exports.loadEJSSimple(
            "./" + params.folders.viewsDragon + "/" + element.replace(".ejs", ""),
            element.replace(".ejs", ""),
            params
        );
    });
    autroute = getFiles(excludes, params.folders.views + "/");
    autroute.forEach(element => {
        exports.loadEJSSimple(
            "./" + params.folders.views + "/" + element.replace(".ejs", ""),
            element.replace(".ejs", ""), params
        );
    });

    CONTROLLERSNAMES = [];
    for (var CONTROLLER of params.controllersjs) {
        var name = CONTROLLER.split('CO_')[1].split('.js')[0];
        if (["BASE"].indexOf(name) === -1)
            CONTROLLERSNAMES.push(name);
    }

    STORAGENAMES = [];
    for (var sotargy in params.CONFIG.storageEntities) {
        STORAGENAMES.push(sotargy);
    }

    silentsmodels = [];
    models.forEach(function (item) {
        if (item !== undefined) {
            if (CONTROLLERSNAMES.indexOf(item) === -1) {
                if (STORAGENAMES.indexOf(item) === -1) {
                    silentsmodels.push(item);
                }
            }
        }
    });

    console.log("Silents Models".pxz);
    console.log(silentsmodels.join(","));
    silentsmodels.forEach(element => {
        if (params.CONFIG.silents.visible.indexOf(element) !== -1) {
            exports.loadEJSSimpleSilents(
                "./" + params.folders.silents, element.replace(".ejs", ""), params
            );
        }
    });

    exports.loadEJSSimplePOST("./" + params.folders.fields, "dragoncontrol", params);
    deleteFolderRecursive = function (path) {
        var files = [];
        if (fs.existsSync(path)) {
            files = fs.readdirSync(path);
            files.forEach(function (file, index) {
                var curPath = path + "/" + file;
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    };
    params.app.get("/test/token/", function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            res.json({all: "Good"});
        }).catch(function () {

        });
    });
    params.app.get("/files/api/", function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var fs = params.fs || require("fs");
            var folder = req.query.folder;
            var realPath = params.folders.files + "/" + folder;
            try {
                if (fs.statSync(realPath).isDirectory()) {
                    var files = fs.readdirSync(realPath);
                    files = files.filter(function (file) {
                        return file.indexOf(".zip") === -1 && file.indexOf("dragonfile.zip") === -1;
                    });
                    res.json({root: realPath, files: files, count: files.length});
                } else {
                    res.json({root: realPath, files: [], count: 0, error: "Is Not Directory"});
                }
            } catch (err) {
                console.log(err);
                res.json({root: realPath, files: [], count: 0, error: {catch: err}});
            }
            res.json({root: realPath, files: [], count: 0});
        }).catch(function () {

        });
    });
    params.app.get("/generalfiles/api/", function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var fs = params.fs || require("fs");
            var folder = req.query.folder;
            var realPath = params.folders.files + "/" + folder;
            try {
                if (fs.statSync(realPath).isDirectory()) {
                    var files = fs.readdirSync(realPath);
                    files = files.filter(function (file) {
                        return file.indexOf("dragonfile.zip") === -1;
                    });
                    res.json({root: realPath, files: files, count: files.length});
                } else {
                    res.json({root: realPath, files: [], count: 0, error: "Is Not Directory"});
                }
            } catch (err) {
                console.log(err);
                res.json({root: realPath, files: [], count: 0, error: {catch: err}});
            }
            res.json({root: realPath, files: [], count: 0});
        }).catch(function () {

        });
    });
    params.app.post("/files/api/delete", async function (req, res) {
        params.secure.check(req, res).then(async function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var fs = params.fs || require("fs");
            var files = req.body.filename;
            var info = {deleted: [], error: []};
            for (var file of files) {
                try {
                    var filename = __dirname + '/..' + params.S(file).replaceAll('/', '\\');
                    if (fs.lstatSync(filename).isDirectory()) {
                        params.rimraf.sync(filename);
                    } else {
                        await fs.unlinkSync(filename);
                    }
                    info.deleted.push(file);
                } catch (err) {
                    info.error.push(file);
                }
            }
            res.json(info);
        }).catch(function () {

        });
    });
    params.app.get("/files/api/download", async function (req, res) {
        params.secure.check(req, res).then(async function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var fs = params.fs || require("fs");
            var folder = req.query.folder;
            var name = req.query.name;
            var file = params.folders.files + "/" + folder + "/" + name;
            try {
                await fs.unlinkSync(file);
            } catch (err) {

            }
            params.zipdir(params.folders.files + "/" + folder + "/", {saveTo: file}, function (err, buffer) {
                if (err) {
                    res.json({zipped: err});
                }
                res.json({zipped: true});
            });
        }).catch(function () {

        });
    });
    params.app.post("/files/api/import", async function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var fs = params.fs || require("fs");
            var files = req.body.filename;
            var dirfile = __dirname + '/..' + params.S(files[0]).replaceAll('/', '\\');

            params.csvtojson().fromFile(dirfile).then((jsonObj) => {
                res.json(jsonObj);
            }).catch(err => {
                res.json(err);
            });
        }).catch(function () {

        });
    });
    params.app.post("/files/api/moveone", async function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var fs = params.fs || require("fs");
            var from = req.body.fromFolder;
            var to = req.body.toFolder;
            fs.renameSync(from, to);
            res.json(info);
        }).catch(function () {

        });
    });
    params.app.post("/files/api/exist", async function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var fs = params.fs || require("fs");
            if (!fs.existsSync(req.body.path))
                res.json({success: true});
            res.json({success: false});
        }).catch(function () {

        });
    });
    params.app.post("/files/api/move", async function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var fs = params.fs || require("fs");
            var verarray = [];
            var errors = [];
            var success = [];
            try {
                for (var transfer of req.body.moves) {
                    if (fs.statSync(transfer.from).isDirectory()) {

                        if (!fs.existsSync(transfer.from))
                            params.shelljs.mkdir('-p', transfer.from);

                        if (!fs.existsSync(transfer.to))
                            params.shelljs.mkdir('-p', transfer.to);

                        var files = fs.readdirSync(transfer.from);
                        for (const file of files) {
                            verarray.push({from: file, to: transfer.to});
                            fs.renameSync(transfer.from + "/" + file, transfer.to + "/" + file);
                        }
                        success.push({success: true, arr: verarray});
                    } else {
                        errors.push({root: realPath, files: [], count: 0, error: "Is Not Directory"});
                    }
                }
            } catch (err) {
                console.log(err);
                res.json({success: false, errors: errors, fines: success});
            }
            res.json({success: true});
        }).catch(function () {

        });
    });
    params.app.post("/files/api/upload", params.upload.array('toupload', 100), function (req, res, next) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var fs = params.fs || require("fs");
            var uploaded = [];
            for (var file of req.files) {
                var ext = file.originalname.split('.');
                ext = "." + ext[ext.length - 1];
                var dir = __dirname + '/../' + params.folders.files + '/' + req.body.folder;
                var filename = dir + "/" + (file.originalname + '___' + file.filename) + ext;
                if (req.body.filename !== '' && req.body.filename !== undefined) {
                    filename = dir + "/" + req.body.filename;
                }
                uploaded.push(filename);
                if (!fs.existsSync(dir))
                    params.shelljs.mkdir('-p', dir);

                fs.renameSync(file.path, filename);
            }
            res.json({uploaded: uploaded});
        }).catch(function () {

        });
    });
    params.app.post('/email/send', function (req, res) {
        params.secure.check(req, res).then(async function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }


            var transporter = params.mail.createTransport(params.CONFIG.smtp);
            var options = params.CONFIG.smptOptions;
            var from = req.body.from || options.sender;
            var name = req.body.name || options.name;
            if (!req.body.to)
                res.json({error: "mailneedreceivers", success: false});
            if (!req.body.subject)
                res.json({error: "mailneedsubject", success: false});
            if (!req.body.html && !req.body.text && !req.body.template)
                res.json({error: "mailneedbody", success: false});
            var mailOptions = {
                from: `"${name}" ${from}`,
                to: req.body.to,
                subject: req.body.subject
            };

            if (req.body.text) {
                mailOptions.text = req.body.text;
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.json({error: error, success: false});
                    }
                    res.json({success: true});
                });
            }
            if (req.body.html) {
                mailOptions.html = req.body.html;
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        res.json({error: error, success: false});
                    }
                    res.json({success: true});
                });
            }
            if (req.body.template) {
                params.app.render("../" + params.folders.viewsDragon + "/templates/" + req.body.template,
                    {
                        session: params.session,
                        CONFIG: params.CONFIG,
                        LANGUAGE: params.LANGUAGE,
                        SHOWLANGS: params.SHOWLANGS,
                        COLOR: params.CONFIG.ui.colors,
                        models: models,
                        FOLDERS: params.folders,
                        DATA: req.body.fields
                    }, function (err, html) {
                        if (err) {
                            res.json({error: err, html: html});
                            return;
                        }
                        mailOptions.html = html;
                        transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                                res.json({error: error, success: false});
                            }
                            res.json({success: true});
                        });
                    }
                )
                ;
            }
        }).catch(function () {

        });
    });
    params.app.post("/dragon/api/saveConfigSuper", async function (req, res) {
        params.secure.check(req, res).then(async function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var fs = params.fs || require("fs");
            var file = __dirname + '/../' + params.folders.config + '/' + 'z_saved.json';
            req.body.json = params.S(req.body.json).replaceAll("&#39;", "'").s;
            req.body.json = params.S(req.body.json).replaceAll("&#34;", "\"").s;
            req.body.json = params.S(req.body.json).replaceAll("&lt;", "<").s;
            req.body.json = params.S(req.body.json).replaceAll("&gt;", ">").s;
            fs.writeFile(file, req.body.json, function (err, data) {
                if (err) {
                    res.json({error: err});
                }
            });
            res.json({error: false, saved: true});
        }).catch(function () {

        });
    });
    params.app.post("/dragon/api/saveConfig", function (req, res) {
        params.secure.check(req, res).then(async function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var fs = params.fs || require("fs");
            var file = __dirname + '/../' + params.folders.config + '/' + 'z_saved.json';

            req.body.json = params.S(req.body.json).replaceAll("&#39;", "'").s;
            req.body.json = params.S(req.body.json).replaceAll("&#34;", "\"").s;
            req.body.json = params.S(req.body.json).replaceAll("&lt;", "<").s;
            req.body.json = params.S(req.body.json).replaceAll("&gt;", ">").s;

            fs.writeFile(file, req.body.json, function (err, data) {
                if (err) {
                    res.json({error: err});
                }
            });
            res.json({error: false, saved: true});
        }).catch(function () {

        });
    });
    params.app.post("/dragon/api/saveLanguages", function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var fs = params.fs || require("fs");

            var languages = eval("(" + req.body.json + ")");
            for (var lan in languages) {
                var dirlan = __dirname + '/../' + params.folders.language + '/' + lan;
                if (!fs.existsSync(dirlan))
                    params.shelljs.mkdir('-p', dirlan);
                for (var section in languages[lan]) {
                    var dirsec = __dirname + '/../' + params.folders.language + '/' + lan + '/' + section;
                    if (!fs.existsSync(dirsec))
                        params.shelljs.mkdir('-p', dirsec);

                    var file = __dirname + '/../' + params.folders.language + '/' + lan + '/' + section + '/' + 'index.json';
                    fs.writeFile(file, JSON.stringify(languages[lan][section]), function (err, data) {
                        if (err) {
                            res.json({error: err});
                        }
                    });
                }
            }
            res.json({error: false, saved: true});
        }).catch(function () {

        });
    });
    params.app.post("/dragon/api/generateMobile", function (req, res) {
        params.secure.check(req, res).then(function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var fs = params.fs || require("fs");
            var languages = eval("(" + req.body.json + ")");
            for (var lan in languages) {
                var dirlan = __dirname + '/../' + params.folders.language + '/' + lan;
                if (!fs.existsSync(dirlan))
                    params.shelljs.mkdir('-p', dirlan);
                for (var section in languages[lan]) {
                    var dirsec = __dirname + '/../' + params.folders.language + '/' + lan + '/' + section;
                    if (!fs.existsSync(dirsec))
                        params.shelljs.mkdir('-p', dirsec);

                    var file = __dirname + '/../' + params.folders.language + '/' + lan + '/' + section + '/' + 'index.json';
                    fs.writeFile(file, JSON.stringify(languages[lan][section]), function (err, data) {
                        if (err) {
                            res.json({error: err});
                        }
                    });
                }
            }
            res.json({error: false, saved: true});
        }).catch(function () {

        });
    });

    function getAccessToken(params) {
        let options = {
            method: 'POST',
            uri: params.CONFIG.microsoft_cognitiveservices.API,
            headers: {
                'Ocp-Apim-Subscription-Key': params.CONFIG.microsoft_cognitiveservices.subscriptionKey
            }
        };
        return params.request_promise(options);
    }

    function textToSpeech(accessToken, text, params, lan) {
        // Create the SSML request.
        let xml_body = params.xmlbuilder.create('speak')
            .att('version', '1.0').att('xml:lang', 'en-us').ele('voice').att('xml:lang', 'en-us')
            .att('name', eval(`params.CONFIG.microsoft_cognitiveservices.voices.${lan}`)).txt(text).end();
        // Short name for 'Microsoft Server Speech Text to Speech Voice (en-US, Guy24KRUS)'
        // Convert the XML into a string to send in the TTS request.
        let body = xml_body.toString();
        let options = {
            method: 'POST',
            baseUrl: params.CONFIG.microsoft_cognitiveservices.baseUrl,
            url: 'cognitiveservices/v1',
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'cache-control': 'no-cache',
                'User-Agent': 'YOUR_RESOURCE_NAME',
                'X-Microsoft-OutputFormat': 'riff-24khz-16bit-mono-pcm',
                'Content-Type': 'application/ssml+xml'
            },
            body: body
        };

        let request = params.request_promise(options)
            .on('response', (response) => {
                if (response.statusCode === 200) {
                    request.pipe(params.fs.createWriteStream('./preview.wav'));
                    console.log('Your file is ready');
                }
            });
        return request;

    };
    params.app.get("/cognitiveservices/api/", function (req, res) {
        params.secure.check(req, res).then(async function (token) {
            if (!token.apptoken) {
                res.json(token);
                return;
            }
            var accessToken = await getAccessToken(params);
            await textToSpeech(accessToken, req.query.text, params, req.query.lan);
            res.json({success: true});
        }).catch(function () {
            res.json({success: false});
        });
    });
    exports.loadEJSSimple("./" + params.folders.viewsDragon + "/master/error", "error", params);
};
