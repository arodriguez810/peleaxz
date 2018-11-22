ANIMATION = {
    play: function (block, animation) {
        if (block === undefined) block = "#content";
        var element = $(block);
        if (animation === undefined) {
            animation = element.data("animation");
        }
        element.addClass("animated " + animation).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            element.removeClass("animated " + animation);
        });
    },
    loading: function (customBlock, text, spinner, size, icon) {
        if (customBlock === undefined) customBlock = "#content";
        if (text === undefined) text = "Loading...";
        if (spinner !== undefined) {
            ANIMATION.spinner.on(spinner);
        }
        var block = $(customBlock);
        $(block).block({
            message: text + '<br><i class="icon-' + (icon || "spinner2") + ' spinner" style="font-size: ' + (size || "50") + 'px"></i>',
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8,
                cursor: 'wait',
                'box-shadow': '0 0 0 1px #ddd',
                height: '100%',
                width: '100%',
                left: '0px'
            },
            css: {
                border: 0,
                backgroundColor: 'none'
            }
        });
    },
    stoploading: function (customBlock, spinner) {
        if (customBlock === undefined) customBlock = "#content";
        if (spinner !== undefined) {
            ANIMATION.spinner.off(spinner);
        }
        var block = $(customBlock);
        $(block).unblock();
    },
    spinner: {
        on: function (customBlock) {
            var i = $(customBlock).find("i");
            $(customBlock).addClass("disabled");
            if (i.length <= 0) {
                $(customBlock).addClass("spinner");
            } else {
                i.addClass("spinner");
            }
        },
        off: function (customBlock) {
            var i = $(customBlock).find("i");
            $(customBlock).removeClass("disabled");
            if (i.length <= 0) {
                $(customBlock).removeClass("spinner");
            } else {
                i.removeClass("spinner");
            }
        }
    }
};


$(document).ready(function () {
    $(".navbar, .navbar-brand, .navbar-text, .navbar-nav > li, .page-header, .page-title, .page-header .heading-elements, .breadcrumb, .breadcrumb-elements > li, .content > .panel, .content .row > [class*=col-], .footer, img, .sidebar-content, .sidebar-content div")
        .css('opacity', 1)
        .velocity("transition.slideDownIn", {
            stagger: 50,
            duration: 200,
            complete: function (elements) {
                $(this).removeAttr('style');
            }
        });
});