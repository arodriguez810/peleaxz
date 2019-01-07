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
    operators: [
        {text: 'Contains', operator: `LIKE`, value: '%{0}%', type: 'string'},
        {text: 'Not contains', operator: `NOT LIKE`, value: '%{0}%', type: 'string'},
        {text: 'Equal to', operator: `=`, value: '{0}', type: 'all'},
        {text: 'Different to', operator: `!=`, value: '{0}', type: 'all'},
        {text: 'Starts with', operator: `LIKE`, value: '{0}%', type: 'string'},
        {text: 'Not starts with', operator: `NOT LIKE`, value: '{0}%', type: 'string'},
        {text: 'Ends with', operator: `LIKE`, value: '%{0}', type: 'string'},
        {text: 'Not ends with', operator: `NOT LIKE`, value: '%{0}', type: 'string'},
        {text: 'Only not set', operator: `IS NULL`, value: '$', type: 'all', disabled: true},
        {text: 'Less than', operator: `<`, value: '{0}', type: 'logic'},
        {text: 'Less than or equal to', operator: `<=`, value: '{0}', type: 'logic'},
        {text: 'Greater than', operator: `>`, value: '{0}', type: 'logic'},
        {text: 'Greater than or equal to', operator: `>=`, value: '{0}', type: 'logic'},
        {text: 'Exist in', operator: `in`, value: "", type: 'group'},
        {text: 'Not Exist in', operator: `not in`, value: "", type: 'group'},
        {text: 'Only not set', operator: `IS NULL`, value: '$', type: 'group', disabled: true},
        {text: 'Is True', operator: `= '1'`, value: '$', type: 'bool'},
        {text: 'Is False', operator: `= '0'`, value: '$', type: 'bool'},
    ],
    run: function ($scope) {
        if ($scope.crud.table.filters !== undefined) {
            $scope.filters = {};
            $scope.filters.fields = $scope.crud.table.filters.columns;
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
            if ($scope.hasModel('filters')) {
                $scope.filters.lastFilter = $scope.getModelObject('filters');
                $scope.filters.queryToBlocks();
                $scope.filters.originals = $scope.filters.blocks.length;
            }
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
            $scope.openFilters = function () {
                $scope.filters.originals = $scope.filters.blocks.length;
                $scope.modal.modalView($scope.modelName + '/filter', {
                    width: ENUM.modal.width.full,
                    header: {
                        title: capitalize(`Filter ${$scope.singular}`),
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
                                var loadonce = [];
                                for (const filter of $scope.filters.fields) {
                                    if (filter.type === FILTER.types.relation) {
                                        if (loadonce.indexOf(filter.key) === -1) {
                                            BASEAPI.list(filter.table, filter.query,
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
                                        }
                                        else {
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
                MODAL.close($scope);
            };
            $scope.filters.colored = function (block) {
                var color = 'alpha-' + TAG.table;

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
                return block.connector === 'AND' ? `bg-${COLOR.primary}` : `bg-${TAG.table}`;
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
            $scope.filters.applyText = function (block) {
                return !block.applied ? '*' : '';
            };


            $scope.filters.apply = function (close) {
                for (var item of $scope.filters.blocks)
                    item.applied = true;
                $scope.filters.lastFilter = $scope.filters.query();
                $scope.saveModelObject("filters", $scope.filters.lastFilter);
                if (DSON.oseaX(close))
                    $scope.filters.close();
                $scope.refresh();
            };
            $scope.filters.clear = function () {
                $scope.filters.blocks = [];
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
                }
                else {
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
                                        descriptions.push(`<span class="label bg-${TAG.table} label-rounded">${eval(`${item.column.text.replace('item', 'sel')}`)}</span>`);
                                    }
                                    showvalue = descriptions;
                                }
                            }
                        }
                        var whe = `<span class="${danger}">${item.operator.text}</span> <b class="${danger}">${showvalue}</b> <b class="text-${TAG.table}-800">${item.connector}</b>`;
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
                    description.push(`<b class="text-${TAG.table}-800">${realColumn.label}:</b> ` + (items.join(' ') + "*****").replace(`<b class="text-${TAG.table}-800">AND</b>*****`, '').replace(`<b class="text-${TAG.table}-800">OR</b>*****`, ''));
                }
                return "<b>Filters:</b> " + description.join('');
            };
            $scope.filters.descriptionNoHtml = function () {
                var where = [];
                for (const item of $scope.filters.blocks) {
                    if (!DSON.oseaX(item.column) &&
                        !DSON.oseaX(item.operator) &&
                        !DSON.oseaX(item.connector)) {
                        var danger = `${!item.applied ? 'text-danger' : ''}`;
                        var whe = `${item.operator.text} ${item.value} ${item.connector}`;
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
                    description.push(`${realColumn.label}: ` + (items.join(' ') + "*****").replace(`AND*****`, '').replace(`OR*****`, ''));
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
                        }
                        else {
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
                    block.finalValue = $(control.currentTarget).cleanVal();
                else if ([FILTER.types.decimal].indexOf(block.column.type) !== -1) {
                    block.finalValue = Number(block.value.replaceAll(',', '')).toFixed(2);
                    block.finalValue = isNaN(block.finalValue) ? 0 : block.finalValue;
                }
                else if ([FILTER.types.datetime].indexOf(block.column.type) !== -1) {
                    block.finalValue = $(control.currentTarget).data('realValue');
                }
                else if ([FILTER.types.date].indexOf(block.column.type) !== -1) {
                    block.finalValue = $(control.currentTarget).data('realValue');
                }
                else if ([FILTER.types.time].indexOf(block.column.type) !== -1) {
                    block.finalValue = $(control.currentTarget).data('realValue');
                }
                else if ([FILTER.types.relation].indexOf(block.column.type) !== -1) {
                    block.finalValue = block.value;
                }
                else
                    block.finalValue = block.value;
            };
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