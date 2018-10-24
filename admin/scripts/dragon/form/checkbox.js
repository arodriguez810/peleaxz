CHECKBOX = {
    run: function () {
        $("input[type='checkbox']").filter(function () {
            return !$(this).parents('div').hasClass('checker');
        }).uniform({
            radioClass: 'choice',
            wrapperClass: 'border-' + COLOR.primary + '-600 text-black'
        });
        $("input[type='checkbox']").change(function () {

        });
    },
    run_switchery: function () {
        var elems = Array.prototype.slice.call(document.querySelectorAll('.switchery'));
        elems.forEach(function (html) {
            console.log(html);
            var switchery = new Switchery(html, {});
        });
    }
};