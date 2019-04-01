CONFIGURATION = {
    OPEN: function () {
        var modal = {
            width: 'modal-full',
            header: {
                title: MESSAGE.i('mono.configuration'),
                icon: ICON.classes.cog2
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'configuration'
            },
        };
        baseController.currentModel.modal.modalView("configuration", modal);
    }
};