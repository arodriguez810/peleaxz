STEP = {
    steps: [],
    blacklist: [
        "Request Manager Modal",
        "Steps Manager Modal"
    ],
    register: function (step) {
        if (CONFIG.mode === "developer") {
            step.windows = step.windows || "";
            if (STEP.blacklist.indexOf(step.windows) === -1)
                STEP.steps.push({
                    step: STEP.steps.length,
                    scope: step.scope || "-",
                    windows: step.windows || "-",
                    action: step.action || "-",
                    field: step.field || "-",
                    value: step.value || "-",
                    description: step.description || "-",
                    date: new Date()
                });
        }
    },
    clear: function () {
        STEP.steps = [];
    },
    send: function () {
        if (STEP.steps.length > 0) {
            var csv = '';
            var columns = [];
            for (var i in STEP.steps[0]) {
                columns.push(capitalize(i));
            }
            csv += columns.join(",") + "\r\n";
            for (var step of STEP.steps) {
                var values = [];
                for (var i in step) {
                    values.push(step[i]);
                }
                csv += `"${values.join('","')}"\r\n`;
            }
            SWEETALERT.loading({title: `Downloading  Steps`});
            DOWNLOAD.csv(`${baseController.currentModel.plural} steps ${new Date()}.csv`, csv);
            swal.close();
        } else {
            SWEETALERT.show('Theres not steps for download');
        }
    },
    OPEN: function () {
        baseController.viewData = {
            staticdata: STEP.steps
        };
        var modal = {
            header: {
                title: MESSAGE.ic("mono.StepsManager") ,
                icon: "stack-text"
            },
            footer: {
                cancelButton: true
            },
            content: {
                loadingContentText: MESSAGE.i('actions.Loading')
            },
        };
        baseController.currentModel.modal.modalView("../templates/components/stepManager", modal);
    }
};