FIXELEMENT = {
    elements: [],
    add: function (id) {
        var element = $("#" + id);
        var newElement = FIXELEMENT.cloneFixed(element);
        $(".subcontent").prepend(newElement);
        newElement.hide();
        newElement.css({'position': 'fixed', 'top': '0'});
        FIXELEMENT.cloneBounds(element, newElement);
        FIXELEMENT.elements[id] = {newID: newElement.attr('id'), id: id, fixed: false};
    },
    cloneBounds: function (el, nel) {
        var bounds = el.get(0).getBoundingClientRect();
        nel.css({'width': bounds.width, 'height': bounds.height});
        if (el.children().length > 0) {
            for (var i = 0; i < el.children().length; i++) {
                var item = $(el.children()[i]);
                var newItem = $(nel.children()[i]);
                if (["INPUT", "I"].indexOf(newItem.prop("tagName")) !== -1)
                    newItem.remove();
                FIXELEMENT.cloneBounds(item, newItem);
            }
        }
    },
    cloneFixed: function (element) {
        var newID = "fisex_" + element.attr("id");
        $("#" + newID).remove();
        var newElement = element.clone();
        newElement.attr("id", newID);
        return newElement;
    },
    run: function () {
        for (let i in FIXELEMENT.elements) {
            var item = FIXELEMENT.elements[i];
            if (document.getElementById(item.id) != null) {
                var bounds = document.getElementById(item.id).getBoundingClientRect();
                FIXELEMENT.fix(item, bounds);
            }
        }
    },
    fix: function (item, bounds) {
        if (!item.fixed && bounds.top <= 0) {
            $("#" + item.newID).show();
            item.fixed = true;
        } else if (item.fixed && bounds.top > 0) {
            $("#" + item.newID).hide();
            item.fixed = false;
        }
    }
};