$(document).ready(function () {
    $(window).bind('hashchange', function () { //detect hash change
        angularjs.get('homeController').loadContent();
    });
});

