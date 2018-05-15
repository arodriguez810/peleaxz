animation = {
    loading: function () {
        var block = $("#content");
        $(block).block({
            message: '<i class="icon-spinner2 spinner" style="font-size: 50px"></i>',
            overlayCSS: {
                backgroundColor: '#fff',
                opacity: 0.8,
                cursor: 'wait',
                'box-shadow': '0 0 0 1px #ddd',
                height: 'auto'
            },
            css: {
                border: 0,
                backgroundColor: 'none'
            }
        });
    },
    stoploading: function () {
        var block = $("#content");
        $(block).unblock();
    }
};


$(document).ready(function () {
    $(".navbar, .navbar-brand, .navbar-text, .navbar-nav > li, .page-header, .page-title, .page-header .heading-elements, .breadcrumb, .breadcrumb-elements > li, .content > .panel, .content .row > [class*=col-], .footer")
        .css('opacity', 1)
        .velocity("transition.slideDownIn", {
            stagger: 200,
            duration: 200,
            complete: function (elements) {
                $(this).removeAttr('style');
            }
        });
});