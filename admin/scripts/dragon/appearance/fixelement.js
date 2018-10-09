FIXELEMENT = {
    isScrolledIntoView: function (elem) {
        var docViewTop = $(window).scrollTop();
        var elemTop = elem.offset().top;
        return ((elemTop >= docViewTop));
    },
    run: function () {
        var tables = $('.dragon-table');
        tables.each(function () {
            var table = $(this);
            var columns = table.find('thead tr').clone().addClass('dragon-column-hide');
            var rows = table.find('tbody tr.dragon-rows');
            var removes = table.find('tbody tr.dragon-columns');
            removes.remove();
            var lasHideRow = undefined;
            rows.each(function () {
                var row = $(this);
                if (FIXELEMENT.isScrolledIntoView(row) === false) {
                    lasHideRow = row;
                } else {
                    return;
                }
            });
            if (lasHideRow !== undefined)
                lasHideRow.after(columns);
        });
    }
};