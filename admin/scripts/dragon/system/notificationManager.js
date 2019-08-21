NOTIFICATION = {
    OPEN: function () {
        var user = new SESSION().current();
        var modal = {
            width: 'modal-full',
            header: {
                title: MESSAGE.ic('mono.dragon_notifications'),
                icon: "bubble-notification"
            },
            footer: {
                cancelButton: false
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading'),
                sameController: 'dragon_configuration'
            },
        };
        DRAGON.modal.modalView("templates/components/notifications", modal);
    }
};