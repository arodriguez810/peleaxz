CONFIGURATION = {
    OPEN: function () {
        var user = new SESSION().current();
        var modal = {
            width: 'modal-full',
            header: {
                title: MESSAGE.ic('mono.dragon_configuration'),
                icon: "cog2"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'dragon_configuration'
            },
        };
        if (user.super)
            DRAGON.currentModel.modal.modalView("dragon_configuration", modal);
        else
            DRAGON.currentModel.modal.modalView("dragon_configuration/soft", modal);
    }
};