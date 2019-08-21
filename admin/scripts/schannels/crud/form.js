SOCKETS.channels.interactive = async function (data) {
    console.log(data);
    var User = await new SESSION().prepare(data.user);
    switch (data.action) {
        case SOCKETS.actions.refreshtable: {
            if (data.scope === CURRENT.url())
                if (User.getID() != DRAGON.userID) {
                    DRAGON.currentModel.refresh();

                    BROWSER.NOTIFICATION.user(
                        User,
                        MESSAGE.ic("mono.inserting"),
                        `${User.fullName()}, ${MESSAGE.ic("mono.insertingrow")} - ${MESSAGE.ic("columns." + data.scope)}`
                    );
                }
            break;
        }
        case SOCKETS.actions.deleterecord: {
            if (data.scope === CURRENT.url())
                if (User.getID() != DRAGON.userID) {
                    if (CURRENT.form.isOpen()) {

                        if (CURRENT.form.mode() === FORM.modes.edit) {
                            console.log(data.record);
                            var unavaible = false;
                            if (CURRENT.form.value() == CURRENT.form.getValue(data.record)) {
                                unavaible = true;
                            } else if (CURRENT.baseform.value() == CURRENT.baseform.getValue(data.record)) {
                                unavaible = true;
                            }
                            if (unavaible) {
                                SWEETALERT.show({
                                    type: ENUM.modal.type.error,
                                    title: MESSAGE.ic('mono.deleting'),
                                    message: MESSAGE.ieval('mono.sorrydelete', {user: User}),
                                    confirm: function () {
                                        MODAL.closeAll();
                                    }
                                });
                                DRAGON.currentModel.refresh();
                                break;
                            }
                        }
                    }
                    DRAGON.currentModel.refresh();
                    BROWSER.NOTIFICATION.user(
                        User,
                        MESSAGE.ic("mono.deleting"),
                        `${User.fullName()}, ${MESSAGE.ic("mono.deletingrow")} - ${MESSAGE.ic("columns." + data.scope)}`
                    );
                }
            break;
        }
        case SOCKETS.actions.editrecord: {
            if (data.scope === CURRENT.url())
                if (User.getID() != DRAGON.userID) {
                    if (CURRENT.form.isOpen()) {
                        if (CURRENT.form.mode() === FORM.modes.edit) {
                            console.log(data.record);
                            var unavaible = false;
                            if (CURRENT.form.value() == data.record) {
                                unavaible = true;
                            } else if (CURRENT.baseform.value() == data.record) {
                                unavaible = true;
                            }
                            if (unavaible) {
                                SWEETALERT.confirm({
                                    type: ENUM.modal.type.warning,
                                    title: MESSAGE.ic('mono.updating'),
                                    message: MESSAGE.ieval('mono.sorryedit', {user: User}),
                                    confirm: function () {
                                        MODAL.close(DRAGON.currentModel, function () {
                                            setTimeout(() => {
                                                DRAGON.modal.edit(data.scope, data.record);
                                            }, 100);
                                        });
                                    }
                                });
                                DRAGON.currentModel.refresh();
                                break;
                            }
                        }
                    }
                    DRAGON.currentModel.refresh();
                    BROWSER.NOTIFICATION.user(
                        User,
                        MESSAGE.ic("mono.updating"),
                        `${User.fullName()}, ${MESSAGE.ic("mono.updatingrow")} - ${MESSAGE.ic("columns." + data.scope)}`
                    );
                }
            break;
        }
    }
};

