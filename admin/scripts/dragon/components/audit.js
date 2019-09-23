AUDIT = {
    LOG: (action, modelName, data, prev) => new Promise(async (resolve, reject) => {
        var user = new SESSION().current();
        var obj = {
            modelname: modelName,
            action: action,
            username: user.fullName(),
            dataJson: data,
            date: new Date(),
            version: CONFIG.version.data,
            ip: user.ip
        };
        if (prev) {
            obj.updatedJson = data;
            obj.dataJson = prev;
        }
        await DRAGONAPI.insertp('dragon_audit', obj);
        resolve(true);
    }),
    ACTIONS: {
        insert: 'insert',
        update: 'update',
        delete: 'delete'
    }
};
