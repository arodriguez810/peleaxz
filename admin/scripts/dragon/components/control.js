CONTROL = {
    cache: {},
    run: function ($scope, $compile) {
        $scope.control = {};
        $scope.control.dropdown = [];
        $scope.control.draw = (content, url, name, opts, append, cols, label, cache) => new Promise((resolve, reject) => {
            if (!CONTROL.cache[url] || cache === false) {
                new LOAD().templatePost(`dragoncontrol/${url}`, {
                    name: "DRAGONNAME",
                    model: "DRAGONMODEL",
                    opts: JSON.stringify(opts)
                }, function (control) {
                    if (control !== false) {
                        CONTROL.cache[url] = control;
                        var controlReal = control.replaceAll("DRAGONNAME", name);
                        controlReal = controlReal.replaceAll("Dragonname", label || name);
                        controlReal = controlReal.replaceAll("DRAGONMODEL", $scope.modelName);
                        controlReal = controlReal.replaceAll("DRAGONOPTION", JSON.stringify(opts));
                        if (cols)
                            controlReal = `<div class="col-sm-${cols} col-md-${cols}">` + controlReal + `</div>`;
                        if (append)
                            $(content).append($compile(controlReal)($scope.$scope));
                        else
                            $(content).html($compile(controlReal)($scope.$scope));
                        resolve(true);
                    } else {
                        $(content).html(`${url}->${name}->error`);
                        resolve(true);
                    }
                });
            } else {
                var controlReal = CONTROL.cache[url].replaceAll("DRAGONNAME", name);
                controlReal = controlReal.replaceAll("Dragonname", label || name);
                controlReal = controlReal.replaceAll("DRAGONMODEL", $scope.modelName);
                controlReal = controlReal.replaceAll("DRAGONOPTION", JSON.stringify(opts));
                if (cols)
                    controlReal = `<div class="col-sm-${cols} col-md-${cols}">` + controlReal + `</div>`;
                if (append)
                    $(content).append($compile(controlReal)($scope.$scope));
                else
                    $(content).html($compile(controlReal)($scope.$scope));

                resolve(true);
            }

        });
        for (var i of CONTROLS) {
            var nameData = i.replace(".ejs", "");
            eval(`$scope.control.${nameData} = (content, name, opts,append,cols,label,cache) => new Promise(async (resolve, reject) => {
                await $scope.control.draw(content, "${nameData}", name, opts,append,cols,label,cache);
                resolve(true);
            })`);
        }
        $scope.control.customfield = (content, fields, cols, destroy, readonly, folder) => new Promise(async (resolve, reject) => {
            $(content).html("");
            for (var field of fields) {
                if (destroy) {
                    eval(`delete $scope.${field.variable};`);
                }

                var pass = false;
                switch (field.type) {
                    case "1": {
                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                        if (readonly) {
                            await $scope.control.inputview(`#field${field.id}`, field.variable, {placeHolder: field.name});
                        } else {
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
                        }
                        break;
                    }
                    case "2": {
                        $(content).append(`<div class="col-sm-12 col-md-12" id="field${field.id}"></div>`);
                        var properties = {
                            placeHolder: field.name,
                            maxlength: field.length
                        };
                        if (readonly)
                            properties.disabled = true;
                        await $scope.control.textarea(`#field${field.id}`, field.variable, properties);
                        if (!readonly)
                            pass = true;
                        break;
                    }
                    case "4": {
                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                        if (readonly) {
                            await $scope.control.inputview(`#field${field.id}`, field.variable, {placeHolder: field.name});
                        } else {
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
                        }
                        break;
                    }
                    case "5": {
                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                        if (readonly) {
                            await $scope.control.inputview(`#field${field.id}`, field.variable, {placeHolder: field.name});
                        } else {
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
                        }
                        break;
                    }
                    case "7": {
                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                        var properties = {placeHolder: field.name};
                        if (readonly) {
                            // properties.disabled = true;
                        }
                        await $scope.control.checkbox(`#field${field.id}`, field.variable, properties);
                        if (!readonly) {
                            pass = true;
                        }
                        break;
                    }
                    case "8": {

                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                        var properties = {
                            placeHolder: field.name,
                            singleDatePicker: true,
                            from: field.variable
                        };
                        if (readonly) {
                            properties.disabled = true;
                        }
                        await $scope.control.range(`#field${field.id}`, field.variable + "_label", properties);
                        if (!readonly) {
                            pass = true;
                        }
                        break;
                    }
                    case "6": {

                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);

                        var options = {
                            placeHolder: field.name,
                            maxfiles: field.multiplefile ? 50 : 1,
                            columns: field.multiplefile ? 4 : 1,

                        };
                        if (folder) {
                            options.modelfolder = folder;
                            console.log(options.modelfolder);
                        }
                        await $scope.control.file(`#field${field.id}`, field.variable, options);
                        $scope.refreshAngular();
                        pass = true;
                        break;
                    }
                    case "3": {
                        $(content).append(`<div class="col-sm-${cols} col-md-${cols}" id="field${field.id}"></div>`);
                        if (readonly) {
                            await $scope.control.inputview(`#field${field.id}`, field.variable, {placeHolder: field.name});
                        } else {
                            if (!field.parent) {
                                var dataDropdown = [];
                                var elements = field.elements.split(",");
                                for (var element in elements) {
                                    dataDropdown.push({id: elements[element], name: elements[element]});
                                }
                                $scope.control.dropdown[field.variable] = {data: dataDropdown, field: field};
                                await $scope.control.selectsimple(`#field${field.id}`, field.variable,
                                    {
                                        label: field.name,
                                        data: $scope.control.dropdown[field.variable].data
                                    });
                            } else {
                                var myparent = $scope.control.dropdown[field.parent];

                                if (myparent) {
                                    var dataDropdown = [];
                                    console.log(myparent);
                                    for (var parent of myparent.data) {
                                        if (eval(`field.${parent.id}`)) {
                                            var elements = eval(`field.${parent.id}`).split(",");
                                            for (var element in elements) {
                                                dataDropdown.push({
                                                    id: elements[element],
                                                    name: elements[element],
                                                    parent: parent.id
                                                });
                                            }
                                        }
                                    }
                                    $scope.control.dropdown[field.variable] = {data: dataDropdown, field: field};
                                    await $scope.control.selectsimple(`#field${field.id}`, field.variable,
                                        {
                                            label: field.name,
                                            data: $scope.control.dropdown[field.variable].data,
                                            condition: `item.parent==${$scope.modelName}.${myparent.field.variable}`
                                        });
                                    $scope.form.loadSelect(field.variable);
                                }
                            }
                        }
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
            resolve(true);
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