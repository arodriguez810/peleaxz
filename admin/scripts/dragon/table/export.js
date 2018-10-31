EXPORT = {
    run: function ($scope) {
        $scope.export = {};
        $scope.export.go = function (type, direct) {
            var parameters = {
                limit: $scope.table.currentLimit,
                page: $scope.table.currentPage,
                orderby: $scope.table.orderby,
                order: $scope.table.order,
                join: $scope.table.crud.table.single
            };
            if (!DSON.oseaX(ARRAY.last(MODAL.historyObject)))
                dataToList.where = ARRAY.last(MODAL.historyObject).viewData.data;

            var options = [
                {id: 'firstrow', text: "Columns in First Row"},
                {id: 'orderColumn', text: "Columns Position"},
                {id: 'sort', text: "Sort"},
                {id: 'filter', text: "Filters"},
                {id: 'currentPage', text: "Current Page"},
                {id: 'selected', text: "Selecteds"},
                {id: 'orginalformat', text: "Original Format"},
            ];
            var optionsHtml = "";
            options.forEach(function (item) {
                var goChecked = false;
                if (item.id === "selected") {
                    if ($scope.checkAllIcon($scope.checkall) !== "icon-checkbox-unchecked")
                        goChecked = true;
                }
                if (item.id === "sort") {
                    if (($scope.table.crud.table.key || "id") !== parameters.orderby || "asc" !== parameters.order)
                        goChecked = true;
                }
                if (item.id === "orderColumn") {
                    if (STORAGE.hasColumns($scope))
                        goChecked = true;
                }
                if (item.id === "firstrow") {
                    goChecked = true;
                }
                var checked = goChecked ? 'checked="checked"' : "";
                optionsHtml +=
                    `
                    <div class="checkbox checkbox-switchery">
                        <label>
                            <input type="checkbox" id="${item.id}" class="exportoptions switchery" ${checked}>
                            ${item.text}
                        </label>
                    </div>
                    `
            });
            var columnsHtml = "";
            for (const i in $scope.table.crud.table.columns) {
                var column = $scope.table.crud.table.columns[i];
                var checked = column.visible !== false ? 'checked="checked"' : "";
                if (column.export !== false)
                    columnsHtml +=
                        `
                    <div class="checkbox checkbox-switchery">
                        <label>
                            <input type="checkbox" value="${i}" class="switchery exporcolumns" ${checked}>
                            ${$scope.columnLabel(column, i)}
                        </label>
                    </div>`;
            }

            SWEETALERT.buttons(
                {
                    title:
                        `Export to ${type}`,
                    message:
                        `
                        <div class="row">
								<div class="col-md-12">
									<div class="content-group-lg">
										<p class="content-group">The information exported depends on the options you choose.</p>
										
									</div>
								</div>
								<div class="col-md-6">
									<div class="content-group-lg" style="text-align: left">
										${optionsHtml}
									</div>
								</div>
								<div class="col-md-6">
									<div class="content-group-lg" style="text-align: left">
										${columnsHtml}
									</div>
								</div>
						</div>
                        `,
                    type: " ",
                    class: "width-600"
                },
                [
                    {
                        text: "Export",
                        action: function () {
                            if (!$(`#currentPage`).is(':checked')) {
                                parameters.limit = 0;
                                parameters.page = 1;
                            }
                            if (!$(`#sort`).is(':checked')) {
                                parameters.orderby = $scope.table.crud.table.key || "id";
                                parameters.order = "asc";
                            }
                            var firstrow = true;
                            if (!$(`#firstrow`).is(':checked')) {
                                firstrow = false;
                            }
                            var orderColumn = true;
                            if (!$(`#orderColumn`).is(':checked')) {
                                orderColumn = false;
                            }
                            var filter = true;
                            if (!$(`#filter`).is(':checked')) {
                                filter = false;
                            }
                            var selected = true;
                            if (!$(`#selected`).is(':checked')) {
                                selected = false;
                            }
                            var orginalformat = true;
                            if (!$(`#orginalformat`).is(':checked')) {
                                orginalformat = false;
                            }

                            var columsAllow = [];
                            var coSel = document.querySelectorAll(".exporcolumns");
                            coSel.forEach(function (item) {
                                if (item.checked)
                                    columsAllow.push(item.value);
                            });
                            SWEETALERT.loading({title: `Preparing ${type} File`});
                            $scope.export.json(parameters, type, function (data) {
                                debugger;
                                var dataToExport = $scope.formatData(data.data, {
                                    orderColumn: orderColumn,
                                    selected: selected,
                                    orginalformat: orginalformat,
                                    columsAllow: columsAllow,
                                    onerow: direct,
                                    type: type
                                });

                                if (type === "Clipboard") {
                                    swal.close();
                                    $scope.export.Content = $scope.export.jsonToClipboard(dataToExport, columsAllow, firstrow);
                                    $scope.export.Preview = $scope.export.jsonToTable(dataToExport, columsAllow, firstrow);
                                    $scope.modal.simpleModal(`<div style="overflow: auto;height: 500px;width: 100%">${$scope.export.Preview}</div>`,
                                        {
                                            width: "modal-full",
                                            header: {title: `Export to ${type} of ${dataToExport.length} rows`},
                                            footer: {
                                                buttons: [
                                                    {
                                                        color: "success",
                                                        title: "Copy",
                                                        action: function () {
                                                            DOWNLOAD.clipboard($scope.export.Content);
                                                            SWEETALERT.show({
                                                                type: "succcess",
                                                                title: `Copy ${dataToExport.length} rows of ${$scope.plural} to ${type}`,
                                                                close: function () {
                                                                    swal.close();
                                                                }
                                                            })
                                                        }
                                                    }
                                                ]
                                            }
                                        });
                                    if (direct === true) {
                                        $scope.unCheckAll();
                                    }
                                }
                                if (type === "CSV") {
                                    swal.close();
                                    $scope.export.Content = $scope.export.jsonToCSV(dataToExport, columsAllow, firstrow);
                                    $scope.export.Preview = $scope.export.jsonToTable(dataToExport, columsAllow, firstrow);
                                    $scope.modal.simpleModal(`<div style="overflow: auto;height: 500px;width: 100%">${$scope.export.Preview}</div>`,
                                        {
                                            width: "modal-full",
                                            header: {title: `Export to ${type} Preview of ${dataToExport.length} rows`},
                                            footer: {
                                                buttons: [
                                                    {
                                                        color: "success",
                                                        title: "Download",
                                                        action: function () {
                                                            DOWNLOAD.csv(`${$scope.plural} with ${dataToExport.length} rows ${new Date().getTime()}.csv`, $scope.export.Content);
                                                            swal.close();
                                                        }
                                                    }
                                                ]
                                            }
                                        });
                                }
                                if (type === "PDF") {
                                    swal.close();
                                    $scope.export.Preview = $scope.export.jsonToTable(dataToExport, columsAllow, firstrow);
                                    $scope.export.ToExport = $scope.export.jsonToTable(dataToExport, columsAllow, firstrow, "500px", "");
                                    $scope.modal.simpleModal(`<div style="overflow: auto;height: 500px;width: 100%">${$scope.export.Preview}</div>`,
                                        {
                                            width: "modal-full",
                                            header: {title: `Export to ${type} of ${dataToExport.length} rows`},
                                            footer: {
                                                buttons: [
                                                    {
                                                        color: "success",
                                                        title: `${ICON.i('file-pdf')} Download`,
                                                        action: function () {
                                                            SWEETALERT.loading({title: "Building PDF..."});
                                                            if (direct) {
                                                                BASEAPI.ajax.formpost('post/templates/pdf/clean',
                                                                    {
                                                                        pdf: `PDF ${dataToExport.length} rows of ${$scope.plural} to ${type}.pdf`,
                                                                        content: $scope.export.Preview
                                                                    }, function (data) {

                                                                    });
                                                            } else {
                                                                BASEAPI.ajax.formpost('post/templates/pdf/table',
                                                                    {
                                                                        pdf: `PDF ${dataToExport.length} rows of ${$scope.plural} to ${type}.pdf`,
                                                                        content: JSON.stringify(dataToExport),
                                                                        firstrow: firstrow,
                                                                        columns: JSON.stringify($scope.export.jsonLabels(columsAllow))
                                                                    }, function (data) {

                                                                    });
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        });
                                }
                                if (type === "XLS") {
                                    swal.close();
                                    $scope.export.Preview = $scope.export.jsonToTable(dataToExport, columsAllow, firstrow);
                                    $scope.modal.simpleModal(`<div style="overflow: auto;height: 500px;width: 100%">${$scope.export.Preview}</div>`,
                                        {
                                            width: "modal-full",
                                            header: {title: `Export to ${type} Preview of ${dataToExport.length} rows`},
                                            footer: {
                                                buttons: [
                                                    {
                                                        color: "success",
                                                        title: "Download",
                                                        action: function () {
                                                            var fileName = `${$scope.plural} with ${dataToExport.length} rows ${new Date().getTime()}.xls`;
                                                            var url = $("#dataexport").excelexportjs({
                                                                containerid: "dataexport",
                                                                datatype: 'table',
                                                                worksheetName: `${$scope.plural} ${dataToExport.length} rows`,
                                                                returnUri: true
                                                            });
                                                            DOWNLOAD.excel(fileName, url);
                                                            swal.close();
                                                        }
                                                    }
                                                ]
                                            }
                                        });
                                }
                                if (type === "DOC") {
                                    swal.close();
                                    $scope.export.Preview = $scope.export.jsonToTable(dataToExport, columsAllow, firstrow, "500px");
                                    $scope.export.ToExport = $scope.export.jsonToTable(dataToExport, columsAllow, firstrow, "500px", "no");
                                    $scope.modal.simpleModal(`<div style="overflow: auto;height: 500px;width: 100%">${$scope.export.Preview}</div>`,
                                        {
                                            width: "modal-full",
                                            header: {title: `Export to ${type} Preview of ${dataToExport.length} rows`},
                                            footer: {
                                                buttons: [
                                                    {
                                                        color: "success",
                                                        title: "Download",
                                                        action: function () {
                                                            SWEETALERT.loading({title: "Building DOC..."});
                                                            if (direct) {
                                                                BASEAPI.ajax.formpost('post/templates/docx/clean',
                                                                    {
                                                                        docx: `DOC ${dataToExport.length} rows of ${$scope.plural} to ${type}.docx`,
                                                                        content: $scope.export.ToExport
                                                                    }, function (data) {

                                                                    });
                                                            } else {
                                                                BASEAPI.ajax.formpost('post/templates/pdf/table',
                                                                    {
                                                                        docx: `DOC ${dataToExport.length} rows of ${$scope.plural} to ${type}.docx`,
                                                                        content: JSON.stringify(dataToExport),
                                                                        firstrow: firstrow,
                                                                        columns: JSON.stringify($scope.export.jsonLabels(columsAllow))
                                                                    }, function (data) {

                                                                    });
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        });
                                }

                            });
                        }
                    },
                    {
                        text: "Cancel",
                        color: COLOR.danger,
                        action: function () {
                            swal.close();
                            if (direct === true) {
                                $scope.unCheckAll();
                            }
                        }
                    }
                ]);
            if (direct === true) {
                $("#sweetalertbutton0").click();
            }
            CHECKBOX.run_switchery();
        };
        $scope.export.json = function (parameters, type, callback) {
            $scope.list(parameters, function (data) {
                callback(data);
            });
        };
        $scope.export.jsonLabels = function (columns) {
            var labels = [];
            for (var i in columns) {
                var key = columns[i];
                labels.push(HTML.strip($scope.columnLabel($scope.table.crud.table.columns[key], key)));
            }
            return labels;
        };
        $scope.export.jsonToTable = function (json, columns, first, width, classes) {
            if (json.length > 1) {
                var preview = `<table id="dataexport" class="tabla-pagina-5 ${classes || "table"} table-togglable table-framed table-bordered" style="${width || $scope.funcWidth}">`;
                if (first) {
                    var labels = [];
                    var previewColums = "";
                    for (var i in columns) {
                        var key = columns[i];
                        labels.push(HTML.strip($scope.columnLabel($scope.table.crud.table.columns[key], key)));
                        previewColums += `<th>${ARRAY.last(labels)}</th>`;
                    }
                    preview += `<thead class="bg-${COLOR.info}"  ><tr>${previewColums}</tr></thead>`;
                }
                preview += `<tbody>`;
                json.forEach(function (row) {
                    var previewRow = "";
                    for (const i in row) {
                        previewRow += `<td>${row[i]}</td>`;
                    }
                    preview += `<tr>${previewRow}</tr>`;
                });
                preview += `</tbody>`;
                preview += `</table>`;
            } else {
                var preview = `<table id="dataexport" class="tabla-pagina-5 ${classes || "table"} table-togglable table-framed table-bordered">`;
                var labels = [];
                var previewColums = "";
                for (var i in columns) {
                    var key = columns[i];
                    labels.push(HTML.strip($scope.columnLabel($scope.table.crud.table.columns[key], key)));
                    previewColums += `<tr><td class="bg-${COLOR.info}">${ARRAY.last(labels)}</td><td>${eval("json[0]." + key)}</td></tr>`;
                }
                preview += `<tbody>${previewColums}</tbody></table>`;
            }
            return preview;
        };
        $scope.export.jsonToCSV = function (json, columns, first) {
            var csv = '';
            if (json.length > 1) {
                if (first) {
                    var labels = [];
                    for (var i in columns) {
                        var key = columns[i];
                        labels.push(HTML.strip($scope.columnLabel($scope.table.crud.table.columns[key], key)));
                    }
                    csv += labels.join(",") + "\r\n";
                }
                json.forEach(function (row) {
                    var rowValues = [];
                    for (const i in row) {
                        rowValues.push(row[i]);
                    }
                    csv += `"${rowValues.join('","')}"\r\n`;
                });
            } else {
                var labels = [];
                for (var i in columns) {
                    var key = columns[i];
                    labels.push(`${HTML.strip($scope.columnLabel($scope.table.crud.table.columns[key], key))},${eval("json[0]." + key)}`);
                }
                csv += labels.join("\r\n");
            }
            return csv;
        };
        $scope.export.jsonToClipboard = function (json, columns, first) {
            var result = '';
            if (json.length > 1) {
                if (first) {
                    var labels = [];
                    for (var i in columns) {
                        var key = columns[i];
                        labels.push(HTML.strip($scope.columnLabel($scope.table.crud.table.columns[key], key)));
                    }
                    result += labels.join("\t") + "\r\n";
                }
                json.forEach(function (row) {
                    var rowValues = [];
                    for (const i in row) {
                        rowValues.push(row[i]);
                    }
                    result += `${rowValues.join("\t")}\r\n`;
                });
            } else {
                var labels = [];
                for (var i in columns) {
                    var key = columns[i];
                    labels.push(`${HTML.strip($scope.columnLabel($scope.table.crud.table.columns[key], key))}\t${eval("json[0]." + key)}`);
                }
                result += labels.join("\r\n");
            }
            return result;
        }
    },

};