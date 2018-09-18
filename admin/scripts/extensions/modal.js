modal = {
    open: function (id, content, buttons, cancelButton) {
        var buttonsHtml = "";
        cancelButton = cancelButton === undefined ? true : false;
        for (var i in buttons) {
            var item = buttons[i];
            buttonsHtml += String.format("<button type=\"button\" class=\"btn bg-{0}\" ng-click='{2}'>{1}</button>",
                item.color,
                item.title
            );
        }
        var html =
            "<!-- Primary modal -->" +
            "<div id=\"" + id + "\" class=\"modal fade\">" +
            " <div class=\"modal-dialog\">" +
            "  <div class=\"modal-content\">" +
            "   <div class=\"modal-header bg-primary\">" +
            "    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>" +
            "    <h6 class=\"modal-title\">Primary header</h6>" +
            "   </div>" +
            "" +
            "   <div class=\"modal-body\">" +
            "" + content +
            "   </div>" +
            "" +
            "   <div class=\"modal-footer\">" +
            ((cancelButton) ?
                "    <button type=\"button\" class=\"btn btn-link\" data-dismiss=\"modal\">Close</button>" : "") +
            buttonsHtml +
            "   </div>" +
            "  </div>" +
            " </div>" +
            "</div>" +
            "<!-- /primary modal -->";
        
    }
};