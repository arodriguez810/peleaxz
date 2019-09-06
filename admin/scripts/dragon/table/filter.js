FILTER = {
    connectors: [
        'AND',
        'OR'
    ],
    types: {
        string: 'string',
        integer: 'integer',
        decimal: 'decimal',
        datetime: 'datetime',
        date: 'date',
        time: 'time',
        relation: 'relation',
        multiRelation: 'multiRelation',
        custom: 'custom',
        all: 'all',
        logic: 'logic',
        color: 'color',
        tags: 'tags',
        group: 'group',
        bool: 'bool'
    },
    run: function ($scope) {
        $scope.selectTextDropOperator = MESSAGE.ic('mono.youselect') + " " + MESSAGE.ic('mono.operator')
        $scope.selectTextDropField = MESSAGE.ic('mono.youselect') + " " + MESSAGE.ic('mono.field');
        FILTER.operators = [
            {text: MESSAGE.i('mono.Contains'), operator: `LIKE`, value: '%{0}%', type: 'string'},
            {text: MESSAGE.i('mono.Notcontains'), operator: `NOT LIKE`, value: '%{0}%', type: 'string'},
            {text: MESSAGE.i('mono.Equalto'), operator: `=`, value: '{0}', type: 'all'},
            {text: MESSAGE.i('mono.Differentto'), operator: `!=`, value: '{0}', type: 'all'},
            {text: MESSAGE.i('mono.Startswith'), operator: `LIKE`, value: '{0}%', type: 'string'},
            {text: MESSAGE.i('mono.Notstartswith'), operator: `NOT LIKE`, value: '{0}%', type: 'string'},
            {text: MESSAGE.i('mono.Endswith'), operator: `LIKE`, value: '%{0}', type: 'string'},
            {text: MESSAGE.i('mono.Notendswith'), operator: `NOT LIKE`, value: '%{0}', type: 'string'},
            {text: MESSAGE.i('mono.Onlynotset'), operator: `IS NULL`, value: '$', type: 'all', disabled: true},
            {text: MESSAGE.i('mono.Lessthan'), operator: `<`, value: '{0}', type: 'logic'},
            {text: MESSAGE.i('mono.Lessthanorequalto'), operator: `<=`, value: '{0}', type: 'logic'},
            {text: MESSAGE.i('mono.Greaterthan'), operator: `>`, value: '{0}', type: 'logic'},
            {text: MESSAGE.i('mono.Greaterthanorequalto'), operator: `>=`, value: '{0}', type: 'logic'},
            {text: MESSAGE.i('mono.Existin'), operator: `in`, value: "", type: 'group'},
            {text: MESSAGE.i('mono.NotExistin'), operator: `not in`, value: "", type: 'group'},
            {text: MESSAGE.i('mono.Onlynotset'), operator: `IS NULL`, value: '$', type: 'group', disabled: true},
            {text: MESSAGE.i('mono.IsTrue'), operator: `= '1'`, value: '$', type: 'bool'},
            {text: MESSAGE.i('mono.IsFalse'), operator: `= '0'`, value: '$', type: 'bool'},
        ];
        var myCrud = eval(`CRUD_${$scope.modelName}`);
        if (myCrud.table.filters !== undefined) {
            if (myCrud.table.filters.columns === true) {
                myCrud.table.filters.columns = [];
                for (var i in myCrud.table.columns) {
                    var column = myCrud.table.columns[i];
                    if (column.formattype)
                        if ([
                            ENUM.FORMAT.password,
                            ENUM.FORMAT.file,
                            ENUM.FORMAT.location,
                            ENUM.FORMAT.image,
                            ENUM.FORMAT.externalimage,
                            ENUM.FORMAT.html,
                        ].indexOf(column.formattype) !== -1)
                            continue;
                    if (column.link) {
                        myCrud.table.filters.columns.push({
                            key: i,
                            type: FILTER.types.relation,
                            table: column.link.from,
                            value: column.link.value || "id",
                            text: column.link.text || "item.name",
                            query: {
                                limit: 0,
                                page: 1,
                                where: [],
                                orderby: column.link.value || "id",
                                order: "asc",
                                distinct: false
                            },
                        });
                    } else if (column.multilink) {
                        myCrud.table.filters.columns.push({
                            key: i,
                            type: FILTER.types.relation,
                            table: column.multilink.table,
                            value: column.multilink.from || "id",
                            text: column.multilink.text || "item.name",
                            query: {
                                limit: 0,
                                page: 1,
                                where: [],
                                orderby: column.multilink.from || "id",
                                order: "asc",
                                distinct: false
                            },
                        });
                    } else
                        myCrud.table.filters.columns.push({
                            key: column.reference || i,
                            type: column.formattype ? ENUM.FORMATFILTER[column.formattype] : ENUM.FORMATFILTER.string,
                        });
                }
            }
            $scope.filters = {};
            $scope.filters.connectorsLabel = {
                AND: MESSAGE.ic('mono.and'),
                OR: MESSAGE.ic('mono.or')
            };
            $scope.filters.fields = myCrud.table.filters.columns;
            $scope.filters.blocks = [];
            $scope.filters.lastFilter = [];
            $scope.filters.options = {};
            $scope.filters.originals = 0;
            $scope.filters.queryToBlocks = function () {
                var idplus = 1;
                for (const filter of $scope.filters.lastFilter) {
                    var thisvalue = filter.guarduro;
                    var column = $scope.filters.fields.filter(function (item) {
                        return item.key === filter.guarduroField;
                    })[0];
                    var newbloack = {
                        applied: true,
                        id: new Date().getTime() + idplus,
                        group: !DSON.oseaX(filter.open),
                        column: column,
                        operator: FILTER.operators.filter(function (item) {
                            return item.operator === filter.operator;
                        })[0],
                        value: thisvalue,
                        finalValue: thisvalue,
                        endgroup: !DSON.oseaX(filter.close),
                        connector: filter.connector
                    };
                    $scope.filters.blocks.push(newbloack);
                    idplus++;
                }
            };
            $scope.filters.default_block = {
                applied: false,
                group: false,
                column: '',
                operator: '',
                value: '',
                finalValue: '',
                endgroup: false,
                connector: 'AND'
            };
            $scope.firstTime = true;
            $scope.openFilters = function () {
                $scope.filters.originals = $scope.filters.blocks.length;
                $scope.modal.modalView($scope.modelName + '/filter', {
                    width: ENUM.modal.width.full,
                    header: {
                        title: MESSAGE.ic('mono.filters') + " " + MESSAGE.i('mono.for') + capitalize(` ${$scope.singular}`),
                        icon: "filter4",
                        closeButton: true,
                        h: "h6"
                    },
                    footer: {
                        cancelButton: false
                    },
                    event: {
                        show: {
                            begin: function (data) {

                            },
                            end: function (data) {
                                if (!$scope.firstTime) {
                                    var loadonce = [];
                                    for (const filter of $scope.filters.fields) {
                                        if (filter.type === FILTER.types.relation) {
                                            if (loadonce.indexOf(filter.key) === -1) {
                                                DRAGONAPI.list(filter.table, filter.query,
                                                    function (info) {
                                                        eval(`$scope.filters.options.${filter.key} = info.data`);
                                                        for (const block of $scope.filters.blocks) {
                                                            if (block.column.type === FILTER.types.relation)
                                                                block.value = block.finalValue;
                                                        }
                                                        $scope.$scope.$digest();
                                                        if (filter.type === FILTER.types.relation) {
                                                            $(".relationFilter").select2();
                                                            $(".relationFilter").on('change', function (e) {
                                                                $scope.$scope.$digest();
                                                            });
                                                        }
                                                    });
                                            } else {
                                                for (const block of $scope.filters.blocks) {
                                                    if (block.column.type === FILTER.types.relation)
                                                        block.value = block.finalValue;
                                                }
                                                if (filter.type === FILTER.types.relation) {
                                                    $(".relationFilter").select2();
                                                    $(".relationFilter").on('change', function (e) {
                                                        $scope.$scope.$digest();
                                                    });
                                                }
                                            }
                                            loadonce.push(filter.key);
                                        }
                                    }
                                } else {
                                    $scope.firstTime = false;
                                }
                                setTimeout(function () {
                                    $(".relationFilter").select2();
                                    $(".columnFilter").select2();
                                    $(".operatorFilter").select2();
                                }, 500);
                            }
                        },
                    }
                });

            };
            $scope.filters.changeType = function (block) {
                block.value = "";
                if (block.column.type === FILTER.types.relation) {
                    $(".relationFilter").select2();
                    $(".relationFilter").on('change', function (e) {
                        $scope.$scope.$digest();
                    });
                }
            };
            $scope.filters.label = function (column) {
                if (typeof column.label === "function")
                    return column.label();
                if (MESSAGE.exist('columns.' + column.key)) {
                    return MESSAGE.ic('columns.' + column.key);
                } else {
                    return column.label;
                }
            };
            $scope.filters.getSelect = function (block) {
                return eval(`$scope.filters.options.${block.column.key}`);
            };
            $scope.filters.operatorByType = function (column) {
                var filterType = column.type === undefined ? 'string' : column.type;
                var result;
                if (filterType === FILTER.types.string)
                    result = FILTER.operators.filter(function (item) {
                        return [FILTER.types.string, FILTER.types.all].indexOf(item.type) !== -1
                    });
                else if (filterType === FILTER.types.integer)
                    result = FILTER.operators.filter(function (item) {
                        return [FILTER.types.logic, FILTER.types.all].indexOf(item.type) !== -1
                    });
                else if (filterType === FILTER.types.decimal)
                    result = FILTER.operators.filter(function (item) {
                        return [FILTER.types.logic, FILTER.types.all].indexOf(item.type) !== -1
                    });
                else if (filterType === FILTER.types.color)
                    result = FILTER.operators.filter(function (item) {
                        return [FILTER.types.all].indexOf(item.type) !== -1
                    });
                else if (filterType === FILTER.types.tags)
                    result = FILTER.operators.filter(function (item) {
                        return [FILTER.types.string, FILTER.types.all].indexOf(item.type) !== -1
                    });
                else if (filterType === FILTER.types.relation)
                    result = FILTER.operators.filter(function (item) {
                        return [FILTER.types.group].indexOf(item.type) !== -1
                    });
                else if (filterType === FILTER.types.time)
                    result = FILTER.operators.filter(function (item) {
                        return [FILTER.types.logic].indexOf(item.type) !== -1
                    });
                else if (filterType === FILTER.types.date)
                    result = FILTER.operators.filter(function (item) {
                        return [FILTER.types.logic].indexOf(item.type) !== -1
                    });
                else if (filterType === FILTER.types.datetime)
                    result = FILTER.operators.filter(function (item) {
                        return [FILTER.types.logic].indexOf(item.type) !== -1
                    });
                else if (filterType === FILTER.types.bool)
                    result = FILTER.operators.filter(function (item) {
                        return [FILTER.types.bool].indexOf(item.type) !== -1
                    });
                return result;
            };
            $scope.filters.showControl = function (type, column) {
                var filterType = column.type === undefined ? 'string' : column.type;

                return type.indexOf(filterType) !== -1;
            };
            $scope.filters.close = function () {
                if ($scope.filters.blocks.length === 1) {
                    if ($scope.filters.blocks[0].applied !== true) {
                        $scope.filters.blocks = [];
                    }
                }
                if (MODAL.history.length > 0)
                    MODAL.close($scope);
            };
            $scope.filters.colored = function (block) {
                var color = 'alpha-' + COLOR.secundary;
                var backs = $scope.filters.blocks.filter(function (item) {
                    return item.id < block.id;
                }).reverse();
                var colored = false;
                for (const back of backs) {
                    if (back.endgroup) {
                        colored = false;
                        break;
                    }
                    if (back.group) {
                        colored = true;
                        break;
                    }
                }
                if (colored)
                    return color;
                if (block.group || block.endgroup)
                    return color;
                return "";
            };
            $scope.filters.visibleConnector = function (block) {
                return (block.id.toString() !== ARRAY.last($scope.filters.blocks).id.toString());
            };
            $scope.filters.toggleConnector = function (block) {
                var currentIndex = FILTER.connectors.indexOf(block.connector);
                currentIndex = (currentIndex === FILTER.connectors.length - 1) ? 0 : currentIndex + 1;
                block.connector = FILTER.connectors[currentIndex];
            };
            $scope.filters.colorConnector = function (block) {
                return block.connector === 'AND' ? `bg-${COLOR.primary}` : `bg-${COLOR.secundary}`;
            };
            $scope.filters.toggleGroup = function (block) {
                block.group = !block.group;
            };
            $scope.filters.toggleEndGroup = function (block) {
                block.endgroup = !block.endgroup;
            };
            $scope.filters.remove = function (block) {
                $scope.filters.blocks = $scope.filters.blocks.filter(function (item) {
                    return item.id !== block.id;
                });
            };
            $scope.filters.removeApply = function (block, close) {
                $scope.filters.remove(block);
                $scope.filters.apply(close);
            };
            $scope.filters.applyText = function (block) {
                return !block.applied ? '*' : '';
            };
            $scope.filters.validateParentesis = function () {
                var opens = 0;
                var closes = 0;
                for (var item of $scope.filters.blocks) {
                    opens += item.group ? 1 : 0;
                    closes += item.endgroup ? 1 : 0;
                }
                return opens === closes;
            };
            $scope.filters.clear = function () {
                $scope.filters.blocks = [];
            };
            $scope.filters.apply = function (close) {
                if ($scope.filters.blocks.length > 0) {
                    if (!$scope.filters.validateParentesis()) {
                        SWEETALERT.show({
                            type: "error",
                            title: "Missing parentheses",
                            message: `It is necessary to close some of the opened parentheses, to find the indicated one in the shading of each filter.`
                        });
                        return;
                    }
                }

                STEP.register({
                    scope: DRAGON.currentModel.modelName,
                    action: `Apply Filters`,
                    field: $scope.filters.descriptionNoHtml()
                });
                for (var item of $scope.filters.blocks)
                    item.applied = true;
                $scope.filters.lastFilter = $scope.filters.query();
                $scope.saveModelObject("filters", $scope.filters.lastFilter);
                if (DSON.oseaX(close))
                    $scope.filters.close();
                $scope.refresh();
                $scope.goPage(1);
                MESSAGE.run();
            };
            $scope.filters.clearApply = function (close) {
                STEP.register({
                    scope: $scope.modelName, action: `Clear All Filters`
                });
                $scope.filters.blocks = [];
                $scope.filters.apply(close);
            };
            $scope.filters.add = function () {
                if ($scope.filters.blocks.length === 0) {
                    var newbloack = {
                        applied: false,
                        id: new Date().getTime(),
                        group: false,
                        column: $scope.filters.default_block.column,
                        operator: $scope.filters.default_block.operator,
                        value: $scope.filters.default_block.value,
                        finalValue: $scope.filters.default_block.finalValue,
                        endgroup: false,
                        connector: $scope.filters.default_block.connector,

                    };
                    $scope.filters.blocks.push(newbloack);
                } else {
                    var last = ARRAY.last($scope.filters.blocks);
                    var newbloack = {
                        applied: false,
                        id: new Date().getTime(),
                        group: false,
                        column: last.column,
                        operator: last.operator,
                        value: last.value,
                        finalValue: last.finalValue,
                        endgroup: false,
                        connector: last.connector
                    };
                    $scope.filters.blocks.push(newbloack);
                }
                $(".relationFilter").select2();

                $(".relationFilter").on('change', function (e) {
                    $scope.$scope.$digest();
                });
                setTimeout(() => {
                    $(".columnFilter").select2();
                    $(".operatorFilter").select2();
                    MESSAGE.run();
                }, 200);

            };
            $scope.filters.blocksDescription = function () {
                var where = [];
                for (const item of $scope.filters.blocks) {
                    if (!DSON.oseaX(item.column) &&
                        !DSON.oseaX(item.operator) &&
                        !DSON.oseaX(item.connector)) {
                        var danger = `${!item.applied ? 'text-danger' : ''}`;
                        var showvalue = item.value;
                        if (Array.isArray(showvalue)) {
                            if (item.column.type === FILTER.types.relation) {
                                var itemsElements = $scope.filters.getSelect(item);
                                if (itemsElements !== undefined) {
                                    var selecteds = itemsElements.filter(function (it) {
                                        return eval(`showvalue.indexOf(it.${item.column.value}.toString())!==-1`);
                                    });
                                    var descriptions = [];
                                    for (const sel of selecteds) {
                                        descriptions.push(eval(`${item.column.text.replace('item', 'sel')}`));
                                    }
                                    showvalue = descriptions;
                                }
                            }
                        }
                        item.showvalue = showvalue;
                        where.push(item);
                    }
                }
                return where;
            };
            $scope.filters.description = function () {
                var where = [];
                for (const item of $scope.filters.blocks) {
                    if (!DSON.oseaX(item.column) &&
                        !DSON.oseaX(item.operator) &&
                        !DSON.oseaX(item.connector)) {
                        var danger = `${!item.applied ? 'text-danger' : ''}`;
                        var showvalue = item.value;
                        if (Array.isArray(showvalue)) {
                            if (item.column.type === FILTER.types.relation) {
                                var itemsElements = $scope.filters.getSelect(item);
                                if (itemsElements != undefined) {

                                    var selecteds = itemsElements.filter(function (it) {
                                        return eval(`showvalue.indexOf(it.${item.column.value}.toString())!==-1`);
                                    });

                                    var descriptions = [];
                                    for (const sel of selecteds) {
                                        descriptions.push(`<span class="label bg-${COLOR.secundary} label-rounded">${eval(`${item.column.text.replace('item', 'sel')}`)}</span>`);
                                    }
                                    showvalue = descriptions;
                                }
                            }
                        }
                        var whe = `<span class="${danger}">${item.operator.text}</span> <b class="${danger}">${showvalue}</b> <b class="text-${COLOR.secundary}-800">${$scope.filters.connectorsLabel[item.connector]}</b>`;
                        if (DSON.oseaX(where[item.column.key]))
                            where[item.column.key] = [];
                        where[item.column.key].push(whe);
                    }
                }
                var description = [];

                for (var i in where) {
                    var items = where[i];
                    var realColumn = $scope.filters.fields.filter(function (item) {
                        return item.key === i;
                    })[0];
                    description.push(`<b class="text-${COLOR.secundary}-800">${$scope.filters.label(realColumn)}:</b> ` + (items.join(' ') + "*****").replace(`<b class="text-${COLOR.secundary}-800">${$scope.filters.connectorsLabel.AND}</b>*****`, '').replace(`<b class="text-${COLOR.secundary}-800">${$scope.filters.connectorsLabel.OR}</b>*****`, ''));
                }
                return "<b>" + MESSAGE.ic('mono.filters') + ":</b> " + description.join('');
            };
            $scope.filters.descriptionPlane = function () {
                var where = [];
                for (const item of $scope.filters.blocks) {
                    if (!DSON.oseaX(item.column) &&
                        !DSON.oseaX(item.operator) &&
                        !DSON.oseaX(item.connector)) {
                        var danger = `${!item.applied ? 'text-danger' : ''}`;
                        var showvalue = item.value;
                        if (Array.isArray(showvalue)) {
                            if (item.column.type === FILTER.types.relation) {
                                var itemsElements = $scope.filters.getSelect(item);
                                if (itemsElements !== undefined) {

                                    var selecteds = itemsElements.filter(function (it) {
                                        return eval(`showvalue.indexOf(it.${item.column.value}.toString())!==-1`);
                                    });

                                    var descriptions = [];
                                    for (const sel of selecteds) {
                                        descriptions.push(`<span class="label bg-${COLOR.secundary} label-rounded">${eval(`${item.column.text.replace('item', 'sel')}`)}</span>`);
                                    }
                                    showvalue = descriptions;
                                }
                            }
                        }
                        var whe = `<span class="${danger}">${item.operator.text}</span> <b class="${danger}">${showvalue}</b> <b class="text-${COLOR.secundary}-800">${$scope.filters.connectorsLabel[item.connector]}</b>`;
                        if (DSON.oseaX(where[item.column.key]))
                            where[item.column.key] = [];
                        where[item.column.key].push(whe);
                    }
                }
                var description = [];

                for (var i in where) {
                    var items = where[i];
                    var realColumn = $scope.filters.fields.filter(function (item) {
                        return item.key === i;
                    })[0];
                    realColumn.items = items;
                    description.push(realColumn);
                }
                return description;
            };
            $scope.filters.descriptionNoHtml = function () {
                var where = [];
                for (const item of $scope.filters.blocks) {
                    if (!DSON.oseaX(item.column) &&
                        !DSON.oseaX(item.operator) &&
                        !DSON.oseaX(item.connector)) {
                        var danger = `${!item.applied ? 'text-danger' : ''}`;
                        var whe = `${item.operator.text} ${item.value} ${$scope.filters.connectorsLabel[item.connector]}`;
                        if (DSON.oseaX(where[item.column.key]))
                            where[item.column.key] = [];
                        where[item.column.key].push(whe);
                    }
                }
                var description = [];

                for (var i in where) {
                    var items = where[i];
                    var realColumn = $scope.filters.fields.filter(function (item) {
                        return item.key === i;
                    })[0];
                    description.push(`${$scope.filters.label(realColumn)}: ` + (items.join(' ') + "*****").replace(`${$scope.filters.connectorsLabel.AND}*****`, '').replace(`${$scope.filters.connectorsLabel.OR}*****`, ''));
                }
                return "Filters:\n" + description.join('\n');
            };
            $scope.filters.query = function () {
                var where = [];
                for (const item of $scope.filters.blocks) {
                    if (!DSON.oseaX(item.column) &&
                        !DSON.oseaX(item.operator) &&
                        !DSON.oseaX(item.connector)) {
                        var whe = {};
                        whe.guarduroField = item.column.key;
                        whe.guarduro = item.finalValue;

                        whe.field = item.column.type === FILTER.types.relation ? item.column.key.replace('__', '.[') + ']' : item.column.key;
                        if (item.column.key.indexOf('__') === -1)
                            whe.field = whe.field.replace(']', '');
                        if (item.column.multi !== undefined) {
                            whe.field = item.column.multi.from;
                        }
                        whe.operator = item.operator.operator;
                        whe.connector = item.connector;
                        whe.open = item.group ? '(' : '';
                        whe.close = item.endgroup ? ')' : '';

                        if (item.column.type === FILTER.types.relation) {
                            if (!DSON.oseaX(item.finalValue)) {
                                whe.value = item.finalValue;

                                if (Array.isArray(item.finalValue))
                                    if (item.column.multi !== undefined) {
                                        var m = item.column.multi;
                                        whe.value = `$(select R.[${m.to}] from [${m.table}] R where R.[${m.adjacent}] in ('${item.finalValue.join("','")}'))`;
                                    }
                            }
                        } else {
                            whe.value = item.operator.value.replace('{0}', item.finalValue);
                        }
                        where.push(whe);
                    }
                }
                return where;
            };
            $scope.filters.setReal = function (block, control) {
                if (DSON.oseaX(block))
                    return;
                if (DSON.oseaX(block.value))
                    return;


                if ([FILTER.types.integer].indexOf(block.column.type) !== -1)
                    block.finalValue = DSON.cleanNumber($(control.currentTarget).val());
                else if ([FILTER.types.decimal].indexOf(block.column.type) !== -1) {
                    block.finalValue = Number(block.value.replaceAll(',', '')).toFixed(2);
                    block.finalValue = isNaN(block.finalValue) ? 0 : block.finalValue;
                } else if ([FILTER.types.datetime].indexOf(block.column.type) !== -1) {
                    block.finalValue = $(control.currentTarget).data('realValue');
                } else if ([FILTER.types.date].indexOf(block.column.type) !== -1) {
                    block.finalValue = $(control.currentTarget).data('realValue');
                } else if ([FILTER.types.time].indexOf(block.column.type) !== -1) {
                    block.finalValue = $(control.currentTarget).data('realValue');
                } else if ([FILTER.types.relation].indexOf(block.column.type) !== -1) {
                    block.finalValue = block.value;
                } else
                    block.finalValue = block.value;
            };
            if ($scope.hasModel('filters')) {
                $scope.filters.lastFilter = $scope.getModelObject('filters');
                $scope.filters.queryToBlocks();
                $scope.filters.originals = $scope.filters.blocks.length;
                $scope.openFilters();
                $scope.filters.close();
            }
        }
    }
};
$(document).ready(function () {
    var classes = [".numberFilter", ".decimalFilter"];
    for (const cls of classes) {
        $(document).on("keyup", cls, function () {
            var scope = $(this).data('scope');
            $(this).trigger('change');
            eval(`${scope}.$scope.$digest();`);
        });
    }
});