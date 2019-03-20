exports.init = function (params) {
    function execFile(file, parameters, res) {
        child = params.child_process.execFile(file, parameters, (error, stdout, stderr) => {
            if (error) {
                res.json({message: error, error: true});
            }
            else {
                res.json({message: stdout, error: false});
            }
        });
    }
};
