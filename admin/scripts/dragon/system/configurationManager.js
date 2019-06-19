CONFIGURATION = {
    OPEN: function () {
        var user = new SESSION().current();
        var modal = {
            width: 'modal-full',
            header: {
                title: MESSAGE.ic('mono.configuration'),
                icon: "cog2"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'configuration'
            },
        };
        if (user.super)
            baseController.currentModel.modal.modalView("configuration", modal);
        else
            baseController.currentModel.modal.modalView("configuration/soft", modal);
    }
};