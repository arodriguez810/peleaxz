var app = angular.module('app', ['ngSanitize']);
app.directive("repeatEnd", function () {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            if (scope.$last) {
                scope.$eval(attrs.repeatEnd);
            }
        }
    };
});
app.directive('ngModelOnblur', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elm, attr, ngModelCtrl) {
            setTimeout(() => {
                if (attr.type === 'radio' || attr.type === 'checkbox') return;

                elm.unbind('input').unbind('keydown').unbind('change');
                elm.bind('blur', function () {
                    scope.$apply(function () {
                        ngModelCtrl.$setViewValue(elm.val());
                    });
                });
            }, 1000);
        }
    };
});
app.factory('logTimeTaken', [function () {
    var logTimeTaken = {
        request: function (config) {
            config.requestTimestamp = new Date().getTime();
            return config;
        },
        response: function (response) {
            response.config.responseTimestamp = new Date().getTime();
            return response;
        }
    };
    return logTimeTaken;
}]);
app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('logTimeTaken');
    var session = new SESSION();
    if (session.isLogged())
        $httpProvider.defaults.headers.common['x-access-token'] = session.current().token;
}]);
$.ajaxSetup({
    beforeSend: function (xhr) {
        var session = new SESSION();
        if (session.isLogged())
            xhr.setRequestHeader("x-access-token", session.current().token);
    }
});
app.controller('baseController', function ($scope, $http, $compile, $controller) {
    var baseController = this;
    var session = new SESSION();
    session.ifLogoffRedirec();
    if (session.current()) {
        baseController.isLogged = true;
        baseController.isSuper = session.current().super;
        baseController.isAdmin = session.current().groupadmin;
        baseController.userID = session.current().getID();
        baseController.fullName = session.current().fullName();
        GROUPS = new SESSION().current().onlygroups;
        SWEETALERT.loading({message: MESSAGE.ic('actions.Loading') + " " + MESSAGE.ic('actions.permissions')});
        var entitiesPermission = [];
        for (var pers of CONFIG.permissions.entities) {
            entitiesPermission.push(`${pers}-${baseController.userID}`)
        }
        BASEAPI.list('permission', {
            where: [
                {
                    "field": "id",
                    "value": entitiesPermission,
                    "connector": "OR"
                },
                {
                    "field": "id",
                    "value": GROUPS
                }
            ]
        }, function (result) {
            SWEETALERT.stop();
            var userPermission = null;
            var grouppermission = [];
            for (var permissionD of result.data) {
                if (permissionD.id.indexOf(CONFIG.permissions.entities[0]) !== -1)
                    userPermission = permissionD;
                else {
                    grouppermission.push(permissionD);
                }
            }

            if (result.data.length > 0) {
                for (var CONTROLLER of CONTROLLERSNAMES) {
                    if (eval(`typeof CRUD_${CONTROLLER} !== 'undefined'`)) {
                        if (CONFIG.permissions.excludes.indexOf(CONTROLLER) === -1)
                            eval(`DSON.allvalue(CRUD_${CONTROLLER}.table.allow,false)`);
                    }
                }
                if (grouppermission) {
                    for (var gper of grouppermission) {
                        var objects = eval("(" + gper.object + ")");
                        for (var obj in objects) {
                            if (eval(`typeof CRUD_${objects[obj].name} !=='undefined'`)) {
                                var native = eval("CRUD_" + objects[obj].name + ".table.allow");
                                for (var i in native) {
                                    if (!objects[obj].obj.table.allow.hasOwnProperty(i)) {
                                        eval(`objects[obj].obj.table.allow.${i}=native[i]`);
                                    }
                                }
                            }
                        }
                        var permissions = objects;
                        for (var i in permissions) {
                            if (eval(`typeof CRUD_${permissions[i].name} !=='undefined'`)) {
                                if (CONFIG.permissions.excludes.indexOf(permissions[i].name) === -1)
                                    eval(`DSON.mergeBool(permissions[i].obj.table.allow,CRUD_${permissions[i].name}.table.allow);`);
                            }
                        }
                    }
                }

                if (userPermission) {
                    var objects = eval("(" + userPermission.object + ")");
                    for (var obj in objects) {
                        var native = eval("CRUD_" + objects[obj].name + ".table.allow");
                        for (var i in native) {
                            if (!objects[obj].obj.table.allow.hasOwnProperty(i)) {
                                eval(`objects[obj].obj.table.allow.${i}=native[i]`);
                            }
                        }
                    }
                    var permissions = objects;
                    for (var i in permissions) {
                        if (eval(`typeof CRUD_${permissions[i].name} !=='undefined'`))
                            if (CONFIG.permissions.excludes.indexOf(permissions[i].name) === -1)
                                eval(`DSON.mergeBool(permissions[i].obj.table.allow,CRUD_${permissions[i].name}.table.allow);`);
                    }
                }
            }
            CRUDNAMES = [];
            for (var CONTROLLER of CONTROLLERSNAMES) {
                if (eval(`typeof CRUD_${CONTROLLER} !== 'undefined'`)) {
                    if (CONFIG.permissions.excludes.indexOf(CONTROLLER) === -1) {
                        if (eval(`CRUD_${CONTROLLER}.table.allow.menu`) !== true) {
                            MENU.hideMenus(CONTROLLER);
                        }

                        CRUDNAMES.push(
                            {
                                name: `${CONTROLLER}`,
                                obj: (eval(`CRUD_${CONTROLLER}`))
                            }
                        )
                    }
                }
            }
        });
    }
    baseController.menus = CONFIG.menus;
    baseController.favorites = [];
    baseController.mode = CONFIG.mode;
    baseController.features = CONFIG.features;
    baseController.SHOWLANGS = SHOWLANGS;
    baseController.currentLang = MESSAGE.current();
    baseController.changeLanguage = MESSAGE.change;
    if (STORAGE.exist('favorites')) {
        baseController.favorites = STORAGE.get('favorites');
    }
    baseController.base = function () {
        new LOAD().loadContent($scope, $http, $compile);
    };
    baseController.base();
    baseController.deleteFavorite = function (href) {
        if (STORAGE.exist('favorites')) {
            var stored = STORAGE.get('favorites');
            var newarray = [];
            stored.forEach(function (item) {
                if (item.href !== href)
                    newarray.push(item);
            });
            STORAGE.add('favorites', newarray);
            baseController.favorites = newarray;
        }
    };
    baseController.favorite = function (href) {
        if (STORAGE.exist('favorites')) {
            var stored = STORAGE.get('favorites');
            var newarray = [];
            stored.forEach(function (item) {
                if (item.href !== href)
                    newarray.push(item);
            });
            STORAGE.add('favorites', newarray);
            baseController.favorites = newarray;
        }
    };
    var permissionOptions = {
        text: (data) => {
            return "";
        },
        icon: (data) => {
            return "user-lock";
        },
        permission: (data) => {
            return ['permission'];
        },
        characterist: (data) => {
            return '';
        },
        title: (data) => {
            return MESSAGE.ic('actions.permissions');
        },
        click: function (data) {
            SWEETALERT.loading({message: MESSAGE.i('actions.Loading')});
            BASEAPI.list('permission', {
                "where": [
                    {
                        "value": `${data.$scope.permissionTable || data.$scope.modelName}-${data.row.id}`
                    }
                ]
            }, function (result) {
                SWEETALERT.stop();
                eval(`${data.$scope.modelName}.permissions = {};`);
                eval(`${data.$scope.modelName}.idPermission = '${data.$scope.permissionTable || data.$scope.modelName}-${data.row.id}';`);


                DSON.merge(eval(`${data.$scope.modelName}.permissions`), CRUDNAMES, true);

                if (result.data.length > 0) {
                    var objects = eval("(" + result.data[0].object + ")");
                    var exists = [];
                    var count = 0;
                    for (var obj in objects) {
                        if (CONFIG.permissions.excludes.indexOf(objects[obj].name) !== -1) {
                            delete objects[obj];
                        }
                    }
                    console.log(objects);
                    for (var obj in objects) {
                        count++;
                        if (eval(`typeof CRUD_${objects[obj].name} !=='undefined'`)) {
                            exists.push(objects[obj].name);
                            var native = eval("CRUD_" + objects[obj].name + ".table.allow");
                            for (var i in native) {
                                if (!objects[obj].obj.table.allow.hasOwnProperty(i)) {
                                    eval(`objects[obj].obj.table.allow.${i}=native[i]`);
                                }
                            }
                        }
                    }
                    for (var w in CRUDNAMES) {
                        if (exists.indexOf(CRUDNAMES[w].name) === -1) {
                            objects[count] = CRUDNAMES[w];
                            count++;
                        }
                    }
                    eval(`${data.$scope.modelName}.permissions = objects`);
                }
                data.$scope.modal.modalView("templates/components/permissions", {
                    width: ENUM.modal.width.full,
                    header: {
                        title: `Permissions per ${data.$scope.modelName} of ${data.row.name}`,
                        icon: "user-lock"
                    },
                    footer: {
                        cancelButton: false
                    },
                    content: {
                        loadingContentText: `${MESSAGE.i('actions.Loading')}...`,
                        sameController: true
                    },
                });
            });

            return false;
        }
    };
    for (var entity of CONFIG.permissions.entities) {
        eval(`CRUD_${entity}.table.allow.permission = true;`);
        eval(`CRUD_${entity}.table.options.push(permissionOptions)`);
    }
    for (var entity of CONFIG.permissions.terms) {
        eval(`CRUD_${entity.name}.table.allow.permission = true;`);
        eval(`CRUD_${entity.name}.table.options.push(permissionOptions)`);
    }
});
CHILDSCOPES = [];
REMOVELASTCHILDSCOPE = function () {
    ARRAY.last(CHILDSCOPES).$destroy();
    ARRAY.removeLast(CHILDSCOPES);
};
REMOVEALLCHILDSCOPE = function () {
    CHILDSCOPES.forEach((scopy) => {
        scopy.$destroy();
    });
    CHILDSCOPES = [];
};
GARBAGECOLECTOR = function (exclude, ignoreChangeMenu) {
    if (!Array.isArray(exclude))
        exclude = [exclude];
    if (ignoreChangeMenu || CHANGINGMENU)
        if (MODAL.history.length === 0)
            MODELLIST.forEach((item) => {
                if (!DSON.oseaX(item)) {
                    if (exclude.indexOf(item) === -1) {
                        eval(`
                    if((typeof ${item})!=='undefined'){
                        if(${item}!==null){
                          if(${item}.$scope!==undefined){ 
                              ${item}.$scope.$destroy();
                              ${item} = null;
                          }
                        }
                    }`);
                    } else {
                        eval(`
                    if(${item}.cleanForm){
                        if(${item}!==null){
                          if(${item}.destroyForm!==false)
                          if(${item}.form!==null) 
                          if(${item}.form!==undefined){ 
                              eval('delete ${item}.'+CRUD_${item}.table.key);
                              for(var field of ${item}.form.fileds){
                                 eval('delete ${item}.'+field);
                              }
                              ${item}.form = null;
                              ${item}.open = null;
                              ${item}.pages = null;
                          }
                        }
                    }`);
                    }

                }
            });
    CHANGINGMENU = false;
};
RUN_A = function (conrollerName, inside, $scope, $http, $compile) {
    TRIGGER.run(inside);
    inside.MENU = MENU.current;
    inside.modelName = conrollerName;
    inside.singular = inside.modelName.split('_').length > 1 ? inside.modelName.split('_')[1] : inside.modelName.split('_')[0];
    if (MESSAGE.exist(`columns.${inside.singular}`))
        inside.singular = MESSAGE.ic(`columns.${inside.singular}`);
    inside.plural = pluralize(capitalize(inside.singular.replace(/_/g, " ")));
    if (MESSAGE.exist(`columns.${inside.singular}_plural`))
        inside.plural = MESSAGE.ic(`columns.${inside.singular}_plural`);
    inside.$scope = $scope;
    COMPILE.run(inside, $scope, $compile);
    STORAGE.run(inside);
    PERMISSIONS.run(inside);
    FORM.run(inside, $http);
    VALIDATION.run(inside);
    MODAL.run(inside, $compile);
    inside.refreshAngular = function () {
        inside.$scope.$digest();
    };
    $scope.$on('$destroy', function () {
    });
    if (MODAL.history.length === 0) {
        baseController.currentModel = inside;
    }
};
RUN_B = function (conrollerName, inside, $scope, $http, $compile) {
    FORM.run(inside, $http);
    CONTROL.run(inside, $compile);
    VALIDATION.run(inside);
};
RUNTABLE = function (inside) {

    if (eval(`${inside}`).crudConfig !== undefined)
        return;
    TRIGGER.run(eval(`${inside}`));
    if (eval("typeof CRUD_" + eval(
        `${inside}`
    ).modelName) !== "undefined")
        eval(inside + ".crudConfig = CRUD_" + eval(
            `${inside}`
        ).modelName);
    else
        eval(`${inside}`).crudConfig = undefined;
    if (eval(`${inside}`).crudConfig)
        if (eval(`${inside}`).crudConfig.type !== 'raw')
            CRUD.run(eval(`${inside}`), eval(`${inside}`).crudConfig);
    if (eval(`${inside}`).crudConfig)
        if (eval(`${inside}`).crudConfig.type !== 'raw')
            TABLE.run(eval(`${inside}`));
    if (eval(`${inside}`).crudConfig) {
        if (eval(`${inside}`).crudConfig.type !== 'raw') {
            FILTER.run(eval(`${inside}`));
            TABLEOPTIONS.run(eval(`${inside}`));
            TABLEEVENT.run(eval(`${inside}`));
            TABLEFORMAT.run(eval(`${inside}`));
            PAGINATOR.run(eval(`${inside}`));
            SORTABLE.run(eval(`${inside}`));
            TABLESELECTION.run(eval(`${inside}`));
        }
    }
    if (eval(`${inside}`).crudConfig)
        if (eval(`${inside}`).crudConfig.type !== 'raw')
            EXPORT.run(eval(`${inside}`));
    if (eval(`${inside}`).crudConfig)
        if (eval(`${inside}`).crudConfig.type !== 'raw')
            eval(`${inside}`).refresh();
};
RUNCONTROLLER = function (conrollerName, inside, $scope, $http, $compile) {
    if (inside.events === undefined) {
        TRIGGER.run(inside);
    }
    if (inside.cleanForm === undefined)
        inside.cleanForm = true;
    inside.MENU = MENU.current;
    inside.modelName = conrollerName;
    inside.colertor = function () {
        GARBAGECOLECTOR(inside.extraExclude || inside.modelName, true);
    };
    GARBAGECOLECTOR(inside.extraExclude || inside.modelName);
    inside.singular = inside.modelName;
    if (MESSAGE.exist(`columns.${inside.singular}`))
        inside.singular = MESSAGE.ic(`columns.${inside.singular}`);
    inside.plural = pluralize(capitalize(inside.singular.replace(/_/g, " ")));
    if (MESSAGE.exist(`columns.${inside.singular}_plural`))
        inside.plural = MESSAGE.ic(`columns.${inside.singular}_plural`);
    inside.$scope = $scope;
    COMPILE.run(inside, $scope, $compile);
    STORAGE.run(inside);
    MODAL.run(inside, $compile);
    PERMISSIONS.run(inside);
    inside.pages = {};
    inside.refreshAngular = function () {
        inside.$scope.$digest();
    };
    $scope.$on('$destroy', function () {

    });
    if (MODAL.history.length === 0)
        baseController.currentModel = inside;
};