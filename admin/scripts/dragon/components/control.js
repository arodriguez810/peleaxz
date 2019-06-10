CONTROL = {
    run: function ($scope, $compile) {
        $scope.control = {};
        $scope.control.draw = (content, url, name, opts) => new Promise((resolve, reject) => {
            new LOAD().templatePost(`dragoncontrol/${url}`, {
                name: name,
                model: $scope.modelName,
                opts: opts
            }, function (control) {
                if (control !== false) {
                    $(content).html($compile(control)($scope.$scope));
                    resolve(true);
                } else {
                    $(content).html(`${url}->${name}->error`);
                    resolve(true);
                }
            });
        });
        for (var i of CONTROLS) {
            var nameData = i.replace(".ejs", "");
            eval(`$scope.control.${nameData} = (content, name, opts) => new Promise(async (resolve, reject) => {
                await $scope.control.draw(content, "${nameData}", name, opts);
                resolve(true);
            })`);
        }
        $scope.control.customfield = (content, fields, cols, destroy, readonly) => new Promise(async (resolve, reject) => {
            $(content).html("");
            console.log(fields);
            for (var field of fields) {
                if (destroy) {
                    eval(`delete $scope.${field.variable};`);
                }
                if (readonly) {
                    $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                    await $scope.control.inputview(`#field${field.id}`, field.variable, {placeHolder: field.name});
                    continue;
                }
                var pass = false;
                switch (field.type) {
                    case "1": {
                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                        if (field.mask) {
                            await $scope.control.inputformat(`#field${field.id}`, field.variable, {
                                placeHolder: field.name,
                                format: {
                                    mask: field.mask,
                                    options: {reverse: true}
                                }
                            });
                        } else {
                            await $scope.control.input(`#field${field.id}`, field.variable, {placeHolder: field.name});
                        }
                        pass = true;
                        break;
                    }
                    case "2": {
                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                        await $scope.control.textarea(`#field${field.id}`, field.variable, {
                            placeHolder: field.name,
                            maxlength: field.length
                        });
                        pass = true;
                        break;
                    }
                    case "4": {
                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                        if (field.isDecimal) {
                            await $scope.control.inputformat(`#field${field.id}`, field.variable, {
                                placeHolder: field.name,
                                format: {
                                    mask: "0".repeat(field.length || 0) + "." + "0".repeat(field.positions || 0),
                                    options: {reverse: true}
                                }
                            });
                        } else {
                            await $scope.control.inputformat(`#field${field.id}`, field.variable, {
                                placeHolder: field.name,
                                format: {mask: "0".repeat(field.length || 0), options: {reverse: true}}
                            });
                        }
                        pass = true;
                        break;
                    }
                    case "5": {
                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                        await $scope.control.inputformat(`#field${field.id}`, field.variable, {
                            placeHolder: field.name,
                            isNumber: true,
                            icon: {class: "cash3"},
                            format: {
                                mask: "${LAN.money(0).s.symbol}000${LAN.money(0).s.separator}000${LAN.money(0).s.separator}000${LAN.money(0).s.separator}000${LAN.money(0).s.separator}000${LAN.money(0).s.decimal}00",
                                options: {reverse: true}
                            }
                        });
                        pass = true;
                        break;
                    }
                    case "7": {
                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                        await $scope.control.checkbox(`#field${field.id}`, field.variable, {placeHolder: field.name});
                        pass = true;
                        break;
                    }
                    case "8": {

                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                        await $scope.control.range(`#field${field.id}`, field.variable + "_label", {
                            placeHolder: field.name,
                            singleDatePicker: true,
                            from: field.variable
                        });
                        pass = true;
                        break;
                    }
                    case "6": {
                        console.log(field);
                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                        await $scope.control.file(`#field${field.id}`, field.variable, {
                            placeHolder: field.name,
                            acceptedFiles: `${field.documentType}/*`,
                            maxfiles: field.multiplefile ? 50 : 1,
                            columns: field.multiplefile ? 4 : 1
                        });
                        pass = true;
                        break;
                    }
                    case "3": {
                        //$(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}">${field.name}: En desarrollo</div>`);
                        // await $scope.control.select(`#field${field.id}`, field.variable,
                        //     {
                        //         placeHolder: field.name
                        //     }
                        // );
                        break;
                    }
                }
                if (pass)
                    if (field.required) {
                        eval(` ${$scope.modelName}.$scope.$watch("${$scope.modelName}.${field.variable}", function (value) {
                            var rules = [];
                            rules.push(VALIDATION.general.required(value));
                            VALIDATION.validate(${$scope.modelName}, "${field.variable}", rules);
                        });`);
                    }

            }
        });
    },
    shadesMonochrome: function (color, shadesBlocks) {
        var colors = [];
        var hsl = tinycolor(color).toHsl();
        var index = 1;
        for (var i = 9.5; i >= 0.5; i -= 1) {
            hsl.l = 0.1 * i;
            colors[index] = tinycolor(hsl).toHexString();
            index++;
        }
        var shades = {};
        var shadesArray = shadesBlocks.split(',');
        eval(`shades.color0 = '${color}';`);
        for (var i in shadesArray) {
            if (shadesArray[i] == 0) {
                eval(`shades.color${parseInt(i) + 1} = '${color}';`);
            } else {
                eval(`shades.color${parseInt(i) + 1} = colors[${shadesArray[i]}];`);
            }
        }
        return shades;
    }
};