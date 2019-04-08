FILEMANAGER = {
    OPEN: function (folder, params) {
        var root = `${ folder.join('/')}`;
        baseController.viewData = {
            root: root,
            scope: baseController.currentModel,
            acceptedFiles: null,
            maxfiles: 99999,
            columns: 12,
        };
        baseController.viewData = DSON.merge(params, baseController.viewData);
        baseController.currentModel.modal.modalView("../templates/components/filemanager", {
            width: 'modal-full',
            header: {
                title:  MESSAGE.i('mono.FileManager'),
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