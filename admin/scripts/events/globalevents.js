$(document).ready(function () {

    $(window).bind('hashchange', function () { //detect hash change
        FIXELEMENT.elements = [];
        ANGULARJS.get('baseController').base();
    });

    $(document).on("scroll", function () {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            $(".upButtom").show();
        } else {
            $(".upButtom").hide();
        }
        FIXELEMENT.run();
    });


    $(document).on('click', '.dragon-menu a', function () {
        MENU.setLast($(this));
    });
    $(document).on('click', '.upButtom', function () {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    $(document).on('mouseover', '[data-popup=tooltip]', function () {
        if ($(this).data('original-title') === undefined) {
            $(this).tooltip({
                template:
                    '<div class="tooltip">' +
                    '   <div class="bg-' + COLOR.primary + '">' +
                    '       <div class="tooltip-arrow">' +
                    '       </div>' +
                    '       <div class="tooltip-inner">' +
                    '       </div>' +
                    '   </div>' +
                    '</div>'
            });
            $(this).tooltip('show');
        }
    });

    $(document).on('mouseover', '[data-popup=tooltip]', function () {
        if ($(this).data('original-title') === undefined) {
            $(this).tooltip({
                template:
                    '<div class="tooltip">' +
                    '   <div class="bg-' + COLOR.primary + '">' +
                    '       <div class="tooltip-arrow">' +
                    '       </div>' +
                    '       <div class="tooltip-inner">' +
                    '       </div>' +
                    '   </div>' +
                    '</div>'
            });
            $(this).tooltip('show');
        }
    });

    $(document).on('mouseover', '[data-popup=popover]', function () {
        if ($(this).data('original-title') === undefined) {
            console.log($(this));
            $(this).popover({
                template: '<div class="popover border-teal-400"><div class="arrow"></div><h3 class="popover-title bg-' + COLOR.primary + '-400"></h3><div class="popover-content"></div></div>',
                placement: 'top',
            });
            $(this).popover('show');
        }
    });

    $(document).on('keyup', 'body', function (e) {
        KEY.repeat.make(e.key);
        if (ANGULARJS.tableScope !== null)
            eval(String.format("{0}.pageKey('{1}')", ANGULARJS.tableScope, e.key));
    });

    $(document).on('mouseover', '.table', function (e) {
        ANGULARJS.tableScope = $(this).data("scope");
    });


});

