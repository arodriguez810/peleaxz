$(window).on('load', function () {
    $('body').removeClass('no-transitions')
});
$(function () {
    $('body').addClass('no-transitions');

    function containerHeight() {
    }

    containerHeight();
    $('.panel-footer').has('> .heading-elements:not(.not-collapsible)').prepend('<a class="heading-elements-toggle"><i class="icon-more"></i></a>');
    $('.page-title, .panel-title').parent().has('> .heading-elements:not(.not-collapsible)').children('.page-title, .panel-title').append('<a class="heading-elements-toggle"><i class="icon-more"></i></a>');
    $('.page-title .heading-elements-toggle, .panel-title .heading-elements-toggle').on('click', function () {
        $(this).parent().parent().toggleClass('has-visible-elements').children('.heading-elements').toggleClass('visible-elements')
    });
    $('.panel-footer .heading-elements-toggle').on('click', function () {
        $(this).parent().toggleClass('has-visible-elements').children('.heading-elements').toggleClass('visible-elements')
    });
    $('.breadcrumb-line').has('.breadcrumb-elements').prepend('<a class="breadcrumb-elements-toggle"><i class="icon-menu-open"></i></a>');
    $('.breadcrumb-elements-toggle').on('click', function () {
        $(this).parent().children('.breadcrumb-elements').toggleClass('visible-elements')
    });
    $(document).on('click', '.dropdown-content', function (e) {
        e.stopPropagation()
    });
    $('.navbar-nav .disabled a').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation()
    });
    $('.dropdown-content a[data-toggle="tab"]').on('click', function (e) {
        $(this).tab('show')
    });
    $('.panel [data-action=reload]').click(function (e) {
        e.preventDefault();
        var block = $(this).parent().parent().parent().parent().parent();
        $(block).block({
            message: '<i class="icon-spinner2 spinner"></i>',
            overlayCSS: {backgroundColor: '#fff', opacity: 0.8, cursor: 'wait', 'box-shadow': '0 0 0 1px #ddd'},
            css: {border: 0, padding: 0, backgroundColor: 'none'}
        });
        window.setTimeout(function () {
            $(block).unblock()
        }, 2000)
    });
    $('.category-title [data-action=reload]').click(function (e) {
        e.preventDefault();
        var block = $(this).parent().parent().parent().parent();
        $(block).block({
            message: '<i class="icon-spinner2 spinner"></i>',
            overlayCSS: {backgroundColor: '#000', opacity: 0.5, cursor: 'wait', 'box-shadow': '0 0 0 1px #000'},
            css: {border: 0, padding: 0, backgroundColor: 'none', color: '#fff'}
        });
        window.setTimeout(function () {
            $(block).unblock()
        }, 2000)
    });
    $('.sidebar-default .category-title [data-action=reload]').click(function (e) {
        e.preventDefault();
        var block = $(this).parent().parent().parent().parent();
        $(block).block({
            message: '<i class="icon-spinner2 spinner"></i>',
            overlayCSS: {backgroundColor: '#fff', opacity: 0.8, cursor: 'wait', 'box-shadow': '0 0 0 1px #ddd'},
            css: {border: 0, padding: 0, backgroundColor: 'none'}
        });
        window.setTimeout(function () {
            $(block).unblock()
        }, 2000)
    });
    $('.category-collapsed').children('.category-content').hide();
    $('.category-collapsed').find('[data-action=collapse]').addClass('rotate-180');
    $('.category-title [data-action=collapse]').click(function (e) {
        e.preventDefault();
        var $categoryCollapse = $(this).parent().parent().parent().nextAll();
        $(this).parents('.category-title').toggleClass('category-collapsed');
        $(this).toggleClass('rotate-180');
        containerHeight();
        $categoryCollapse.slideToggle(150)
    });
    $('.panel-collapsed').children('.panel-heading').nextAll().hide();
    $('.panel-collapsed').find('[data-action=collapse]').addClass('rotate-180');
    $('.panel [data-action=collapse]').click(function (e) {
        e.preventDefault();
        var $panelCollapse = $(this).parent().parent().parent().parent().nextAll();
        $(this).parents('.panel').toggleClass('panel-collapsed');
        $(this).toggleClass('rotate-180');
        containerHeight();
        $panelCollapse.slideToggle(150)
    });
    $('.panel [data-action=close]').click(function (e) {
        e.preventDefault();
        var $panelClose = $(this).parent().parent().parent().parent().parent();
        containerHeight();
        $panelClose.slideUp(150, function () {
            $(this).remove()
        })
    });
    $('.category-title [data-action=close]').click(function (e) {
        e.preventDefault();
        var $categoryClose = $(this).parent().parent().parent().parent();
        containerHeight();
        $categoryClose.slideUp(150, function () {
            $(this).remove()
        })
    });
    $('.navigation').find('li.active').parents('li').addClass('active');
    $('.navigation').find('li').not('.active, .category-title').has('ul').children('ul').addClass('hidden-ul');
    $('.navigation').find('li').has('ul').children('a').addClass('has-ul');
    $('.dropdown-menu:not(.dropdown-content), .dropdown-menu:not(.dropdown-content) .dropdown-submenu').has('li.active').addClass('active').parents('.navbar-nav .dropdown:not(.language-switch), .navbar-nav .dropup:not(.language-switch)').addClass('active');
    $('.navigation-main > .navigation-header > i').tooltip({placement: 'right', container: 'body'});
    $('.navigation-main').find('li').has('ul').children('a').on('click', function (e) {
        e.preventDefault();
        $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).toggleClass('active').children('ul').slideToggle(250);
        if ($('.navigation-main').hasClass('navigation-accordion')) {
            $(this).parent('li').not('.disabled').not($('.sidebar-xs').not('.sidebar-xs-indicator').find('.navigation-main').children('li')).siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(250)
        }
    });
    $('.navigation-alt').find('li').has('ul').children('a').on('click', function (e) {
        e.preventDefault();
        $(this).parent('li').not('.disabled').toggleClass('active').children('ul').slideToggle(200);
        if ($('.navigation-alt').hasClass('navigation-accordion')) {
            $(this).parent('li').not('.disabled').siblings(':has(.has-ul)').removeClass('active').children('ul').slideUp(200)
        }
    });
    $('.sidebar-main-toggle').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-xs');
        var hasClass = $('body').hasClass('sidebar-xs');
        STORAGE.add('app.sidebar-xs', hasClass)
    });
    $(document).on('click', '.navigation .disabled a', function (e) {
        e.preventDefault()
    });
    $(document).on('click', '.sidebar-control', function (e) {
        containerHeight()
    });
    $(document).on('click', '.sidebar-main-hide', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-main-hidden');
        var hasClass = $('body').hasClass('sidebar-main-hidden');
        if (hasClass)
            $(".sidebar-main-toggle").hide(); else $(".sidebar-main-toggle").show();
        STORAGE.add('app.sidebar-main-ishide', hasClass)
    });
    $(document).on('click', '.sidebar-secondary-hide', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-secondary-hidden')
    });
    $(document).on('click', '.sidebar-detached-hide', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-detached-hidden')
    });
    $(document).on('click', '.sidebar-all-hide', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-all-hidden')
    });
    $(document).on('click', '.sidebar-opposite-toggle', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-opposite-visible');
        if ($('body').hasClass('sidebar-opposite-visible')) {
            $('body').addClass('sidebar-xs');
            $('.navigation-main').children('li').children('ul').css('display', '')
        }
        else {
            $('body').removeClass('sidebar-xs')
        }
    });
    $(document).on('click', '.sidebar-opposite-main-hide', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-opposite-visible');
        if ($('body').hasClass('sidebar-opposite-visible')) {
            $('body').addClass('sidebar-main-hidden')
        }
        else {
            $('body').removeClass('sidebar-main-hidden')
        }
    });
    $(document).on('click', '.sidebar-opposite-secondary-hide', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-opposite-visible');
        if ($('body').hasClass('sidebar-opposite-visible')) {
            $('body').addClass('sidebar-secondary-hidden')
        }
        else {
            $('body').removeClass('sidebar-secondary-hidden')
        }
    });
    $(document).on('click', '.sidebar-opposite-hide', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-all-hidden');
        if ($('body').hasClass('sidebar-all-hidden')) {
            $('body').addClass('sidebar-opposite-visible');
            $('.navigation-main').children('li').children('ul').css('display', '')
        }
        else {
            $('body').removeClass('sidebar-opposite-visible')
        }
    });
    $(document).on('click', '.sidebar-opposite-fix', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-opposite-visible')
    });
    var MENUvisible = !1;
    $('.sidebar-mobile-main-toggle').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-mobile-main').removeClass('sidebar-mobile-secondary sidebar-mobile-opposite sidebar-mobile-detached')
    });
    $('.sidebar-mobile-secondary-toggle').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-mobile-secondary').removeClass('sidebar-mobile-main sidebar-mobile-opposite sidebar-mobile-detached')
    });
    $('.sidebar-mobile-opposite-toggle').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-mobile-opposite').removeClass('sidebar-mobile-main sidebar-mobile-secondary sidebar-mobile-detached')
    });
    $('.sidebar-mobile-detached-toggle').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('sidebar-mobile-detached').removeClass('sidebar-mobile-main sidebar-mobile-secondary sidebar-mobile-opposite')
    });

    resizeCharts = function () {
        var allCharts = $('.chart');
        for (var i = 0; i < allCharts.length; i++) {
            var $item = $(allCharts[i]);
            echarts.getInstanceById($item.attr('_echarts_instance_')).resize();
        }
    }



    $(window).on('resize', function () {
        setTimeout(function () {
            containerHeight();
            resizeCharts();
            if ($(window).width() <= 768) {
                $('body').addClass('sidebar-xs-indicator');
                $('.sidebar-opposite').insertBefore('.content-wrapper');
                $('.sidebar-detached').insertBefore('.content-wrapper');
                $('.dropdown-submenu').on('mouseenter', function () {
                    $(this).children('.dropdown-menu').addClass('show')
                }).on('mouseleave', function () {
                    $(this).children('.dropdown-menu').removeClass('show')
                })
            }
            else {
                $('body').removeClass('sidebar-xs-indicator');
                $('.sidebar-opposite').insertAfter('.content-wrapper');
                $('body').removeClass('sidebar-mobile-main sidebar-mobile-secondary sidebar-mobile-detached sidebar-mobile-opposite');
                if ($('body').hasClass('has-detached-left')) {
                    $('.sidebar-detached').insertBefore('.container-detached')
                }
                else if ($('body').hasClass('has-detached-right')) {
                    $('.sidebar-detached').insertAfter('.container-detached')
                }
                $('.page-header-content, .panel-heading, .panel-footer').removeClass('has-visible-elements');
                $('.heading-elements').removeClass('visible-elements');
                $('.dropdown-submenu').children('.dropdown-menu').removeClass('show')
            }
        }, 100)
    }).resize();
    $('[data-popup="popover"]').popover();
    $('[data-popup="tooltip"]').tooltip()
})