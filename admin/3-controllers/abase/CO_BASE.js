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
    if (SESSION.isLogged())
        $httpProvider.defaults.headers.common['x-access-token'] = SESSION.current().token;
}]);
$.ajaxSetup({
    beforeSend: function (xhr) {
        if (SESSION.isLogged())
            xhr.setRequestHeader("x-access-token", SESSION.current().token);
    }
});

app.controller('baseController', function ($scope, $http, $compile, $controller) {
    var baseController = this;
    baseController.SESSION = SESSION;
    baseController.menus = CONFIG.menus;
    baseController.favorites = [];
    baseController.$scope = $scope;
    baseController.CONFIG = CONFIG;
    baseController.SHOWLANGS = SHOWLANGS;
    baseController.currentLang = MESSAGE.current();
    baseController.changeLanguage = MESSAGE.change;
    baseController.refreshAngular = function () {
        baseController.$scope.$digest();
    };
    if (STORAGE.exist('favorites')) {
        baseController.favorites = STORAGE.get('favorites');
    }
    baseController.base = function () {
        LOAD.loadContent($scope, $http, $compile);
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


    var permissionOptions = {
        text: (data) => {
            return "";
        },
        icon: (data) => {
            return ICON.classes.user_lock;
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
                        "value": `${data.$scope.modelName}-${data.row.id}`
                    }
                ]
            }, function (result) {
                SWEETALERT.stop();
                eval(`${data.$scope.modelName}.permissions = {};`);
                eval(`${data.$scope.modelName}.idPermission = '${data.$scope.modelName}-${data.row.id}';`);
                DSON.merge(eval(`${data.$scope.modelName}.permissions`), CRUDNAMES, true);
                if (result.data.length > 0) {
                    eval(`${data.$scope.modelName}.permissions = eval("(" + result.data[0].object + ")")`);
                }
                data.$scope.modal.modalView("templates/components/permissions", {
                    width: ENUM.modal.width.full,
                    header: {
                        title: `Permissions per ${data.$scope.modelName} of ${data.row.name}`,
                        icon: ICON.classes.user_lock
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

GARBAGECOLECTOR = function (exclude) {
    if (CHANGINGMENU)
        if (MODAL.history.length === 0)
            MODELLIST.forEach((item) => {
                if (!DSON.oseaX(item)) {
                    if (exclude !== item) {
                        eval(`
                    if((typeof ${item})!=='undefined'){
                        if(${item}!==null){
                          if(${item}.$scope!==undefined){ 
                              ${item}.$scope.$destroy();
                              ${item} = null;
                          }
                        }
                    }`);
                    }
                }
            });
    CHANGINGMENU = false;
};

RUN_A = function (conrollerName, inside, $scope, $http, $compile) {
    inside.MENU = MENU.current;
    inside.modelName = conrollerName;
    inside.singular = inside.modelName.split('_').length > 1 ? inside.modelName.split('_')[1] : inside.modelName.split('_')[0];
    inside.plural = pluralize(inside.singular);
    inside.$http = $http;
    inside.$compile = $compile;
    inside.$scope = $scope;
    API.run(inside, $http);
    COMPILE.run(inside, $scope, $compile);
    LOAD.run(inside, $http);
    PERMISSIONS.run(inside);
    MENU.run(inside);
    STORAGE.run(inside);
    FORM.run(inside, $http);
    VALIDATION.run(inside);
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
    VALIDATION.run(inside);
};

RUNTABLE = function (inside) {
    console.log(inside);
    if (eval(`${inside}`).crudConfig !== undefined)
        return;
    if (eval("typeof CRUD_" + eval(`${inside}`).modelName) !== "undefined")
        eval(inside + ".crudConfig = CRUD_" + eval(`${inside}`).modelName);
    else
        eval(`${inside}`).crudConfig = undefined;
    if (eval(`${inside}`).crudConfig)
        if (eval(`${inside}`).crudConfig.type !== 'raw')
            CRUD.run(eval(`${inside}`), eval(`${inside}`).crudConfig);
    if (eval(`${inside}`).crudConfig)
        if (eval(`${inside}`).crudConfig.type !== 'raw')
            TABLE.run(eval(`${inside}`), eval(`${inside}`).$http, eval(`${inside}`).$compile);
    if (eval(`${inside}`).crudConfig) {
        if (eval(`${inside}`).crudConfig.type !== 'raw') {
            FILTER.run(eval(`${inside}`));
            TABLEOPTIONS.run(eval(`${inside}`));
            TABLEEVENT.run(eval(`${inside}`), eval(`${inside}`).$http, eval(`${inside}`).$compile);
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
    GARBAGECOLECTOR(conrollerName);
    inside.MENU = MENU.current;
    inside.modelName = conrollerName;
    inside.singular = inside.modelName;
    inside.plural = pluralize(inside.singular);
    inside.$http = $http;
    inside.$compile = $compile;
    inside.$scope = $scope;
    API.run(inside, $http);
    COMPILE.run(inside, $scope, $compile);
    STORAGE.run(inside);
    LOAD.run(inside, $http);
    MODAL.run(inside, $compile);
    PERMISSIONS.run(inside);
    MENU.run(inside);
    inside.pages = {};
    inside.refreshAngular = function () {
        inside.$scope.$digest();
    };
    $scope.$on('$destroy', function () {

    });
    if (MODAL.history.length === 0)
        baseController.currentModel = inside;
};