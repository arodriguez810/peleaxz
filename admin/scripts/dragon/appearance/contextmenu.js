CONTTEXTMENU = {};

$(document).ready(function () {

    $(document).on('mouseover', '.dragon-rows', function () {
        var lastRow = $(this).data('object');
        if (ANGULARJS.tableScope !== null) {
            eval(String.format("{0}.lastRow = {1}", ANGULARJS.tableScope, JSON.stringify(lastRow)));
        }
    });

    var lastTD = -1;
    $(document).on('mouseover', '.context-control:not(.already-context)', function () {
        $(".context-control").addClass('already-context');
        $(".context-control").contextmenu({
            target: '.context-menu',
            before: function (e, element, target) {
                var row = element.parent().parent().children().index(element.parent());
                if (lastTD === row) {
                    eval(String.format("{0}.lastMenu = ({0}.lastMenu === ({0}.options.length-1) ? 0 : ({0}.lastMenu+({0}.currentOptionsContext().count))) {1}", ANGULARJS.tableScope));
                } else {
                    eval(String.format("{0}.lastMenu = 0", ANGULARJS.tableScope));
                }
                element.trigger('click');
                lastTD = row;
                return true;
            },
            onItem: function (context, e) {
                var tr = context.parent();
                var td = tr.find('.dragon-actions').eq(0);
                var row = context.parent().data('object');
                var action = $(e.target).data('action');
                var link = tr.find('[data-action=' + action + ']').eq(0);
                link.trigger('click');
            }
        });
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