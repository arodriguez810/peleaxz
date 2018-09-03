$(document).ready(function () {
    $(window).bind('hashchange', function () { //detect hash change
        angularjs.get('homeController').loadContent();
    });

    $(document).on('mouseover', '[data-popup=tooltip]', function () {
        if ($(this).data('original-title') === undefined) {
            $(this).tooltip({
                template:
                    '<div class="tooltip">' +
                    '   <div class="bg-info">' +
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
                template:'<div class="popover border-teal-400"><div class="arrow"></div><h3 class="popover-title bg-teal-400"></h3><div class="popover-content"></div></div>',
                placement: 'top',
            });
            $(this).popover('show');
        }
    });
});

