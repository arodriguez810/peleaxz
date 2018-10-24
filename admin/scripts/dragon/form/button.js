BUTTON = {
    create: function (text, cb, before, after) {
        return $(`<button class="btn bg-${COLOR.primary}">${text}</button>`).on('click', cb);
    }
};
