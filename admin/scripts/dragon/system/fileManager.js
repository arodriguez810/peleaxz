FILEMANAGER = {
    OPEN: function (folder, params) {
        var root = `${folder.join('/')}`;
        DRAGON.viewData = {
            root: root,
            scope: DRAGON.currentModel,
            acceptedFiles: null,
            maxfiles: 99999,
            columns: 12,
        };
        DRAGON.viewData = DSON.merge(params, DRAGON.viewData);
        DRAGON.currentModel.modal.modalView("../templates/components/filemanager", {
            width: 'modal-full',
            header: {
                title: MESSAGE.i('mono.FileManager'),
                icon: "file-stats"
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        });
    }
};