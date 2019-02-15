CONTTEXTMENU = {};

$(document).ready(function () {

    $(document).on('mousedown', '.context-control, .dragon-actions', function (event) {
        var myTD = $(this);
        var currentRowMenu = myTD.parent().find('.icons-list:eq(0)');
        switch (event.which) {
            case 1: {
                break;
            }
            case 2: {
                break;
            }
            case 3: {
                myTD.append(currentRowMenu);
                currentRowMenu.find('.dropdown-toggle:eq(0)').click();
                break;
            }
        }
    });

    $(document).on('click', '.breadcrumb-elements-toggle', function (event) {
        $(this).parent().children(".breadcrumb-elements").toggleClass("visible-elements");
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
            $(this).popover({
                template: '<div class="popover border-teal-400"><div class="arrow"></div><h3 class="popover-title bg-' + COLOR.primary + '-400"></h3><div class="popover-content"></div></div>',
                placement: 'top',
            });
            $(this).popover('show');
        }
    });

});