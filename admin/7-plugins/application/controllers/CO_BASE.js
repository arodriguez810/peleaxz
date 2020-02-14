var app = angular.module('app', ['ngSanitize', 'ngMask']);
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
app.controller('DRAGON', function ($scope, $http, $compile, $controller) {
    IP = "";
    DRAGON = this;
    COMPILE.run(DRAGON, $scope, $compile);
    MODAL.run(DRAGON, $compile);
    CONTROL.run(DRAGON, $compile);
    DRAGON.about = eval(`CONFIG.version.about.${MESSAGE.current().code}`);
    var session = new SESSION();
    DRAGON.refreshAngular = function () {
        if (!$scope.$$phase)
            $scope.$digest();
    };

    session.ifLogoffRedirec();
    if (session.current()) {
        IP = "";
        if (session.current().menus)
            DRAGON.currentMenu = session.current().menus();
        else
            DRAGON.currentMenu = "menus";
        if (STORAGE.exist('currentMenu')) {
            DRAGON.currentMenu = STORAGE.get("currentMenu");
        }
        DRAGON.menus = CONFIG.menus;
        DRAGON.menusList = CONFIG.ui.menusList;
        DRAGON.myMenu = function () {
            return eval(`CONFIG.${DRAGON.currentMenu}`);
        };
        DRAGON.menuLabel = function (menu) {
            return MESSAGE.ispace('menu.' + menu.text.replaceAll(' ', ''), menu.text);
        };
        DRAGON.changeMenu = function (menu) {
            var animation = new ANIMATION();
            animation.loading(`#dragonmenu`, "", ``, '30');
            setTimeout(() => {
                DRAGON.currentMenu = menu.href;
                STORAGE.add("currentMenu", DRAGON.currentMenu);
                DRAGON.refreshAngular();
                animation.stoploading(`#dragonmenu`);
                MENU.setActive();
                location.reload();
            }, 500);
        };
        DRAGON.isLogged = true;
        DRAGON.isSuper = session.current().super;
        DRAGON.isAdmin = session.current().groupadmin;

        if (!DRAGON.isSuper) {
            if (session.current().menus)
                DRAGON.currentMenu = session.current().menus();
            else
                DRAGON.currentMenu = "menus";
        }

        if (session.current().isClient)
            DRAGON.isClient = new SESSION().current().isClient();
        else
            DRAGON.isClient = false;

        DRAGON.userID = session.current().getID();
        if (session.current().path)
            DRAGON.path = session.current().path();
        else
            DRAGON.path = CONFIG.users.path;
        DRAGON.fullName = session.current().fullName();
        DRAGON.type = session.current().type;
        GROUPS = new SESSION().current().onlygroups;
        var entitiesPermission = [];
        for (var pers of CONFIG.permissions.entities) {
            entitiesPermission.push(`${pers}-${DRAGON.userID}`)
        }
        DRAGONAPI.list('permission', {
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

            for (var gp in grouppermission) {
                var entities = eval("(" + grouppermission[gp].object + ")");
                for (var i in entities)
                    if (PERMISSIONS.mypermission.hasOwnProperty(i))
                        DSON.jalar(entities[i].allow, PERMISSIONS.mypermission[i].allow, false);
            }

            for (var gp in grouppermission) {
                var entities = eval("(" + grouppermission[gp].object + ")");
                for (var i in entities)
                    if (PERMISSIONS.mypermission.hasOwnProperty(i))
                        DSON.jalar(entities[i].allow, PERMISSIONS.mypermission[i].allow, true);
            }

            for (var i in PERMISSIONS.mypermission)
                if (PERMISSIONS.mypermission[i].allow.menu !== true)
                    MENU.hideMenus(i);

        });
    }

    DRAGON.favorites = [];
    DRAGON.mode = CONFIG.mode;
    DRAGON.features = CONFIG.features;
    DRAGON.SHOWLANGS = SHOWLANGS;
    DRAGON.currentLang = MESSAGE.current();
    DRAGON.changeLanguage = MESSAGE.change;
    if (STORAGE.exist('favorites')) {
        DRAGON.favorites = STORAGE.get('favorites');
    }
    DRAGON.base = function () {
        new LOAD().loadContent($scope, $http, $compile);
    };
    DRAGON.base();
    DRAGON.deleteFavorite = function (href) {
        if (STORAGE.exist('favorites')) {
            var stored = STORAGE.get('favorites');
            var newarray = [];
            stored.forEach(function (item) {
                if (item.href !== href)
                    newarray.push(item);
            });
            STORAGE.add('favorites', newarray);
            DRAGON.favorites = newarray;
        }
    };
    DRAGON.refreshAngular = function () {
        if (!$scope.$$phase)
            $scope.$digest();
    };
    DRAGON.favorite = function (href) {
        if (STORAGE.exist('favorites')) {
            var stored = STORAGE.get('favorites');
            var newarray = [];
            stored.forEach(function (item) {
                if (item.href !== href)
                    newarray.push(item);
            });
            STORAGE.add('favorites', newarray);
            DRAGON.favorites = newarray;
        }
    };
    DRAGON.show_form = function(form, index){
        var fm = form + index;
        if($(`.${fm}`).hasClass('show-form')){
            $(`.${fm}`).removeClass('show-form');
            $(`.${fm}`).show();
            $(`[name=icon${fm}]`).select2({
                templateSelection: DROPDOWN.iformat,
                templateResult: DROPDOWN.iformat,
                allowHtml: true
            });
        }else{
            $(`.${fm}`).addClass('show-form');
            $(`.${fm}`).hide();
        }
    };
    DRAGON.add_menu = function (nivel, form, index, levl1, levl2, levl3, levl4) {
        var text, href, modal_full, icon, fm, input;

        fm = form + index;
        input = fm;

        text= $(`[name=text${input}]`).val();
        href= $(`[name=href${input}]`).val();
        modal_full =  $(`[name=modal_full${input}]`).is(':checked');
        icon =   $(`[name=icon${input}]`).val();

        switch(nivel) {
            case 'new':
                DRAGON.menus.push({
                    text: text,
                    href: href,
                    icon: icon,
                    modal: modal_full ? 'modal-full' : ''
                });
                break;
            case 'primero':
                if(!DRAGON.menus[levl1].menus){
                    DRAGON.menus[levl1].menus = [];
                }
                DRAGON.menus[levl1].menus.push({
                    text: text,
                    href: href,
                    icon: "lifebuoy",
                    modal: modal_full ? 'modal-full' : ''
                });
                break;
            case 'segundo':
                if(!DRAGON.menus[levl1].menus[levl2].menus){
                    DRAGON.menus[levl1].menus[levl2].menus = [];
                }
                DRAGON.menus[levl1].menus[levl2].menus.push({
                    text: text,
                    href: href,
                    icon: "lifebuoy",
                    modal: modal_full ? 'modal-full' : ''
                });
                break;
            case 'tercero':
                if(!DRAGON.menus[levl1].menus[levl2].menus[levl3].menus){
                    DRAGON.menus[levl1].menus[levl2].menus[levl3].menus = [];
                }
                DRAGON.menus[levl1].menus[levl2].menus[levl3].menus.push({
                    text: text,
                    href: href,
                    icon: "lifebuoy",
                    modal: modal_full ? 'modal-full' : ''
                });
                break;
            case 'cuarto':
                if(!DRAGON.menus[levl1].menus[levl2].menus[levl3].menus[levl4].menus){
                    DRAGON.menus[levl1].menus[levl2].menus[levl3].menus[levl4].menus = [];
                }
                DRAGON.menus[levl1].menus[levl2].menus[levl3].menus[levl4].menus.push({
                    text: text,
                    href: href,
                    icon: "lifebuoy",
                    modal: modal_full ? 'modal-full' : ''
                });
                break;
            default:
            // code block
        }

        $(`[name=text${input}]`).val('');
        $(`[name=href${input}]`).val('');
        $(`[name=modal_full${input}]`).prop("checked", false);
        $(`[name=icon${input}]`).val("");

        $(`.${fm}`).addClass('show-form');
        $(`.${fm}`).hide();

        setTimeout(function () {
            $(".edit-hide").hide();
            $(".editar-menu").show();
        },1000);
        DRAGON.refreshAngular();
    };
    DRAGON.edit_menu = function (nivel, form, index, levl1, levl2, levl3, levl4, levl5) {
        var text, href, modal_full, icon, fm, input;

        fm = form + index;
        input = fm;

        text = $(`[name=text${input}]`).val();
        href = $(`[name=href${input}]`).val();
        modal_full = $(`[name=modal_full${input}]`).is(':checked');
        icon =   $(`[name=icon${input}]`).val();

        // console.log(fm,text, href, modal_full, icon );

        switch(nivel) {
            case 'primero':
                DRAGON.menus[levl1].text = text;
                DRAGON.menus[levl1].href = href;
                DRAGON.menus[levl1].modal = modal_full ? 'modal-full' : '';
                DRAGON.menus[levl1].icon = icon;
                break;
            case 'segundo':
                DRAGON.menus[levl1].menus[levl2].text = text;
                DRAGON.menus[levl1].menus[levl2].href = href;
                DRAGON.menus[levl1].menus[levl2].modal = modal_full ? 'modal-full' : '';
                DRAGON.menus[levl1].menus[levl2].icon = icon;
                break;
            case 'tercero':
                DRAGON.menus[levl1].menus[levl2].menus[levl3].text = text;
                DRAGON.menus[levl1].menus[levl2].menus[levl3].href = href;
                DRAGON.menus[levl1].menus[levl2].menus[levl3].modal = modal_full ? 'modal-full' : '';
                DRAGON.menus[levl1].menus[levl2].menus[levl3].icon = icon;
                break;
            case 'cuarto':
                DRAGON.menus[levl1].menus[levl2].menus[levl3].menus[levl4].text = text;
                DRAGON.menus[levl1].menus[levl2].menus[levl3].menus[levl4].href = href;
                DRAGON.menus[levl1].menus[levl2].menus[levl3].menus[levl4].modal = modal_full ? 'modal-full' : '';
                DRAGON.menus[levl1].menus[levl2].menus[levl3].menus[levl4].icon = icon;
                break;
            case 'quinto':
                DRAGON.menus[levl1].menus[levl2].menus[levl3].menus[levl4].menus[levl5].text = text;
                DRAGON.menus[levl1].menus[levl2].menus[levl3].menus[levl4].menus[levl5].href = href;
                DRAGON.menus[levl1].menus[levl2].menus[levl3].menus[levl4].menus[levl5].modal = modal_full ? 'modal-full' : '';
                DRAGON.menus[levl1].menus[levl2].menus[levl3].menus[levl4].menus[levl5].icon = "lifebuoy";
                break;
            default:
            // code block
        }

        $(`.${fm}`).addClass('show-form');
        $(`.${fm}`).hide();
        DRAGON.refreshAngular();
    };
    DRAGON.remove_menu = function(nivel, levl1, levl2, levl3, levl4, levl5){
        switch(nivel) {
            case 'primero':
                DRAGON.menus.splice(levl1, 1);
                break;
            case 'segundo':
                DRAGON.menus[levl1].menus.splice(levl2, 1);
                break;
            case 'tercero':
                DRAGON.menus[levl1].menus[levl2].menus.splice(levl3, 1);
                break;
            case 'cuarto':
                DRAGON.menus[levl1].menus[levl2].menus[levl3].menus.splice(levl4, 1);
                break;
            case 'quinto':
                DRAGON.menus[levl1].menus[levl2].menus[levl3].menus[levl4].menus.splice(levl5, 1);
                break;
            default:
            // code block
        }
        DRAGON.refreshAngular();
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
            DRAGONAPI.list('permission', {
                "where": [
                    {
                        "value": `${data.$scope.permissionTable || data.$scope.modelName}-${data.row.id}`
                    }
                ]
            }, function (result) {
                SWEETALERT.stop();
                eval(`${data.$scope.modelName}.idPermission = '${data.$scope.permissionTable || data.$scope.modelName}-${data.row.id}';`);
                var original = DSON.OSO(PERMISSIONS.entities);
                if (result.data.length > 0) {
                    var objects = eval("(" + result.data[0].object + ")");
                    var exists = [];
                    var count = 0;
                    for (var key in original)
                        if (objects.hasOwnProperty(key))
                            DSON.jalar(objects[key].allow, original[key].allow)
                }
                eval(`${data.$scope.modelName}.permissions = original`);
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
        if (eval(`typeof CRUD_${entity}!=='undefined'`)) {
            eval(`CRUD_${entity}.table.allow.permission = true;`);
            eval(`CRUD_${entity}.table.options.push(permissionOptions)`);
        }
    }
    for (var entity of CONFIG.permissions.terms) {
        if (eval(`typeof CRUD_${entity.name}!=='undefined'`)) {
            eval(`CRUD_${entity.name}.table.allow.permission = true;`);
            eval(`CRUD_${entity.name}.table.options.push(permissionOptions)`);
        }
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
                            if(${item}.destroyForm!==false && ${item}.modelName!==CURRENT.url()){
                                if(${item}.$scope.$destroy)
                                  ${item}.$scope.$destroy();
                              ${item} = null;
                              RELATIONS.anonymous = [];
                            }
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
                              if(CRUD_${item}!==undefined){ 
                                  eval('delete ${item}.'+CRUD_${item}.table.key);
                                  for(var field of ${item}.form.fileds){
                                     eval('delete ${item}.'+field);
                                  }
                                  ${item}.form = null;
                                  ${item}.open = null;
                                  ${item}.pages = null;
                                  RELATIONS.anonymous = [];
                              }else{
                                  for(var field of ${item}.form.fileds){
                                     eval('delete ${item}.'+field);
                                  }
                                  ${item}.form = null;
                                  ${item}.open = null;
                                  ${item}.pages = null;
                                  RELATIONS.anonymous = [];
                              }
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

    inside.plural = pluralize(capitalize(inside.singular.replace(/_/g, " ")));
    if (MESSAGE.exist(`columns.${inside.singular}_plural`))
        inside.plural = MESSAGE.ic(`columns.${inside.singular}_plural`);

    if (MESSAGE.exist(`columns.${inside.singular}`))
        inside.singular = MESSAGE.ic(`columns.${inside.singular}`);

    inside.$scope = $scope;
    COMPILE.run(inside, $scope, $compile);
    STORAGE.run(inside);
    PERMISSIONS.run(inside);
    FORM.run(inside, $http);
    VALIDATION.run(inside);
    MODAL.run(inside, $compile);
    inside.refreshAngular = function () {
        if (!inside.$scope.$$phase)
            inside.$scope.$digest();
    };
    $scope.$on('$destroy', function () {
    });
    if (MODAL.history.length === 0) {
        DRAGON.currentModel = inside;
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
    if (eval("typeof CRUD_" + eval(`${inside}`).modelName) !== "undefined")
        eval(inside + ".crudConfig = CRUD_" + eval(`${inside}`).modelName);
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
    inside.LAN = LAN;
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
    inside.plural = pluralize(capitalize(inside.singular.replace(/_/g, " ")));
    if (MESSAGE.exist(`columns.${inside.singular}_plural`))
        inside.plural = MESSAGE.ic(`columns.${inside.singular}_plural`);

    if (MESSAGE.exist(`columns.${inside.singular}`))
        inside.singular = MESSAGE.ic(`columns.${inside.singular}`);

    inside.$scope = $scope;
    inside.$compile = $compile;
    COMPILE.run(inside, $scope, $compile);
    STORAGE.run(inside);
    MODAL.run(inside, $compile);
    PERMISSIONS.run(inside);
    TABLEFORMAT.run(inside);
    TABLEOPTIONS.run(inside);
    if (inside.crudConfig)
        if (inside.crudConfig.type !== 'raw')
            CRUD.run(inside, inside.crudConfig);
    inside.pages = {};
    inside.refreshAngular = function () {
        if (!inside.$scope.$$phase)
            inside.$scope.$digest();
    };
    $scope.$on('$destroy', function () {

    });
    if (MODAL.history.length === 0)
        DRAGON.currentModel = inside;
};
