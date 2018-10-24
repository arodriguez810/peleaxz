MENU = {
    current: {parents: [], menu: {}},
    favorites: [],
    setLast: function (menu) {
        MENU.current.parents = [];
        MENU.current.menu = MENU.getMenu(menu);
        MENU.setParents(menu);
        MENU.current.parents = MENU.current.parents.reverse();
    },
    getMenu: function (A) {
        var icon = A.find('i:eq(0)').attr('class');
        var text = A.find('span:eq(0)').html();
        return {icon: icon, text: text, a: A, href: A.attr("href")};
    },
    convertToNoA: function (item) {
        return {icon: item.icon, text: item.text, href: item.href};
    },
    setParents: function (menu) {
        var UL = menu.closest("ul");
        if (!UL.hasClass('dragon-menu')) {
            var A = UL.parent().find('a:eq(0)');
            var I = A.find('i:eq(0)');
            var icon = I.attr('class');
            var text = A.find('span:eq(0)').html();
            MENU.current.parents.push({icon: icon, text: text, a: A});
            MENU.setBrothers(ARRAY.last(MENU.current.parents));
            MENU.setParents(A);
        }
    },
    setActive: function (link) {
        $(".dragon-menu li").removeClass('active');
        var a = $('.dragon-menu a[href="#' + link + '"]:eq(0)');
        document.title = `${CONFIG.appName} - ${a.find('span:eq(0)').html()}`;
        if (a.length > 0) {
            MENU.setLast(a);
            MENU.expand(a);
        }
    },
    expand: function (a) {
        var LI = a.parent();
        LI.addClass('active');
        var UL = LI.parent();
        UL.show();
        MENU.current.parents.forEach(function (item) {
            var LI = item.a.parent();
            LI.addClass('active');
            var UL = LI.parent();
            UL.show();
        });
    },
    setBrothers: function (item) {
        item.childs = DSON.ifundefined(item.childs, []);
        var A = item.a;
        var UL = A.next('ul:eq(0)');
        var count = UL.children('li').length;
        for (var i = 0; i < count; i++) {
            var LI = UL.children('li:eq(' + i + ')');
            var child = LI.find('a:eq(0)');
            if (child.attr('href') !== "#") {
                item.childs.push(MENU.getMenu(child));
            }
        }
    },
    run: function ($scope) {
        $scope.menu = {};
        $scope.sameHref = function (menu, result) {
            if (menu.href === $scope.MENU.menu.href)
                return result;
            return undefined;
        };
        $scope.favorite = function (scope) {
            var exist = scope.favorites.filter(function (item) {
                return item.href === MENU.current.menu.href;
            });
            if (exist.length === 0) {
                var current = [];
                if (STORAGE.exist('favorites'))
                    current = STORAGE.get('favorites');
                current.push(MENU.convertToNoA(MENU.current.menu));
                scope.favorites.push(MENU.convertToNoA(MENU.current.menu));
                STORAGE.add('favorites', current);
            }
        };
        $scope.menu.already = function (scope, href) {
            if (scope.favorites !== undefined) {
                var exits = scope.favorites.filter(function (item) {
                    return item.href === href;
                });
                return exits.length > 0;
            }
            return true;
        }

    }
};
$(document).ready(function () {
    $(document).on('click', '.dragon-menu a', function () {
        MENU.setLast($(this));
    });
});