
var Core = function () {

    const core = {};

    var intervalID = null;

    var LoadingPanel = function () {
        const panel = {};
        var panelCounter = 0;

        var panelString = `#preloader`;

        panel.Show = function () {
            panelCounter++;
            if (panelCounter > 0) {
                $(panelString).css("display", "block");
            }
        }

        panel.Close = function () {
            panelCounter--;

            if (panelCounter == 0) {
                $(panelString).css("display", "none");
            }
        }

        return panel;
    }

    core.AddMiniLoading = function (element) {
        $(element).append(`<div id="preloader" style="position: absolute;">
                             <div class="loader">
                                 <svg class="circular" viewBox="25 25 50 50">
                                     <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="3" stroke-miterlimit="10"></circle>
                                 </svg>
                             </div>
                         </div>`);
    }

    core.RemoveMiniLoading = function (element) {
        $(element + " #preloader").remove();
    }

    core.Request = function (url, type, data, successCallback, errorCallback, dataType = null) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            dataType: dataType || "json",
            contextType: "application/json",
            success: function (data) {
                if (typeof (data) === "string") {
                    data = JSON.parse(data)
                }
                successCallback(data);
            },
            error: function (data) {
                Core.Toaster2("Bir hata oluştu", 0);
                errorCallback(data);
            }
        });
    }

    core.Download = function (url, type, data, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            dataType: "text",
            contextType: "application/json;  charset=utf-8",
            success: function (data) {
                successCallback(data);
            },
            error: function (data) {
                Core.Toaster2("Bir hata oluştu", 0);
                errorCallback(data);
            }
        });
    }

    core.FileUpload = function (url, fileData, successCallback, errorCallback) {
        $.ajax({
            url: url,
            type: "POST",
            contentType: false,
            processData: false,
            data: fileData,
            success: function (result) {
                if (typeof (result) === "string") {
                    result = JSON.parse(result);
                }
                successCallback(result);
            },
            error: function (error) {
                Core.Toaster2("Bir hata oluştu", 0);
                errorCallback(error);
            }
        });
    }

    core.Toaster = function (message, type) {
        var toastString = `<div class="toast" data-autohide="false" style="position: fixed; top:80px; right:10px; opacity:1; display:none; width: 350px;">
                              <div class="toast-header">
                                <strong class="mr-auto"></strong>
                                <small class="text-muted"></small>
                              </div>
                              <div class="toast-body">
                                
                              </div>
                            </div>`;

        var toastHtml = $(toastString);
        toastHtml.find(".toast-body").text(message);
        switch (type) {
            case 0:
                toastHtml.find(".mr-auto").text("Hata");
                toastHtml.find(".mr-auto").css("color", "red");
                break;
            case 1:
                toastHtml.find(".mr-auto").text("Bilgi");
                toastHtml.find(".mr-auto").css("color", "blue");
                break;
            case 2:
                toastHtml.find(".mr-auto").text("Uyarı");
                toastHtml.find(".mr-auto").css("color", "yellow");
                break;
            default:
                break;
        }

        $("body").append(toastHtml);
        $('body .toast').fadeIn(500, () => {
            setTimeout(() => {
                $('body .toast').fadeOut(2000, () => {
                    $('body .toast').remove();
                });
            }, 3000);
        });
    }

    core.Toaster2 = function (message, type) {

        if (intervalID != null) {
            clearInterval(intervalID);
            intervalID = null;
            $('body .toast2').remove();
        }

        var toastString = `<div class="toast2" style="position:fixed; top:80px; right:10px; opacity:1; display:none; width: 350px; padding: 18px; background-color: #17c0eb; border-radius: 7px; color: white; z-index:1000;">
                                <div class="toast2-header">
                                    <strong class="mr-auto"></strong>
                                    <small class="text-muted"></small>
                                </div>
                                <div class="toast2-body">
                                </div>
                                <div class="completion-bar" style="height:4px; border-radius:14px; margin-top:10px; width:0%"></div>
                           </div>`;

        var toastHtml = $(toastString);
        toastHtml.find(".toast2-body").text(message);

        switch (type) {
            case 0:
                toastHtml.find(".mr-auto").text("Hata");
                toastHtml.find(".mr-auto").css("color", "#ff4d4d");
                toastHtml.find(".completion-bar").css("background-color", "#ff4d4d");
                break;
            case 1:
                toastHtml.find(".mr-auto").text("Bilgi");
                toastHtml.find(".mr-auto").css("color", "#32ff7e");
                toastHtml.find(".completion-bar").css("background-color", "#32ff7e");
                break;
            case 2:
                toastHtml.find(".mr-auto").text("Uyarı");
                toastHtml.find(".mr-auto").css("color", "#fffa65");
                toastHtml.find(".completion-bar").css("background-color", "#fffa65");
                break;
            default:
                break;
        }
        $("body").append(toastHtml);
        var counter = 0;
        intervalID = setInterval(function () {
            counter = counter + 10;
            var width = (counter / 5000) * 100;
            if (width > 100) {
                width = 100;
            }
            $(".completion-bar").css("width", width + "%");
        }, 10);

        $('body .toast2').fadeIn(500, () => {

            setTimeout(() => {
                $('body .toast2').fadeOut(2000, () => {
                    clearInterval(intervalID);
                    $('body .toast2').remove();
                    intervalID = null;
                });
            }, 3000);

        });
    }

    core.Datatable = function (element, data, colums, columnDefs, buttons) {
        var table = element.DataTable({
            data: data,
            columns: colums,
            columnDefs: columnDefs,
            destroy: true,
            buttons: buttons, // copyHtml5, excelHtml5, csvHtml5, pdfHtml5 , Js files required
            order: [],
            language: {
                emptyTable: "Gösterilecek veri yok.",
                processing: "Veriler yükleniyor",
                sDecimal: ".",
                sInfo: "_TOTAL_ kayıttan _START_ - _END_ arasındaki kayıtlar gösteriliyor",
                sInfoFiltered: "(_MAX_ kayıt içerisinden bulunan)",
                sInfoPostFix: "",
                sInfoThousands: ".",
                sLengthMenu: "Sayfada _MENU_ kayıt göster",
                sLoadingRecords: "Yükleniyor...",
                sSearch: "Ara:",
                sZeroRecords: "Eşleşen kayıt bulunamadı",
                oPaginate: {
                    sFirst: "İlk",
                    sLast: "Son",
                    sNext: "Sonraki",
                    sPrevious: "Önceki"
                },
                oAria: {
                    sSortAscending: ": artan sütun sıralamasını aktifleştir",
                    sSortDescending: ": azalan sütun sıralamasını aktifleştir"
                },
                select: {
                    rows: {
                        _: "%d kayıt seçildi",
                        0: "",
                        1: "1 kayıt seçildi"
                    }
                }
            }
        });

        return table;
    }

    core.SetContext = function (contextName, contextItem) {
        localStorage.setItem(contextName, JSON.stringify(contextItem));
    }

    core.GetContext = function (contextName) {
        var contextItem = localStorage.getItem(contextName);
        if (contextItem == null) {
            return null;
        }
        return JSON.parse(contextItem);
    }

    core.ClearContext = function (contextName) {
        localStorage.removeItem(contextName);
    }

    core.DatePicker = function (element) {
        $(element).bootstrapMaterialDatePicker({
            format: 'DD/MM/YYYY',
            weekStart: 1,
            time: false,
            lang: 'tr',
        });
        $(element).bootstrapMaterialDatePicker('setDate', moment());
    }

    core.DatePickerWithTime = function (element) {
        $(element).bootstrapMaterialDatePicker({
            format: 'DD/MM/YYYY HH:mm',
            weekStart: 1,
            time: true,
            lang: 'tr',
            minDate: new Date()
        });
        $(element).bootstrapMaterialDatePicker('setDate', moment());
    }
    core.SetDateRangePicker = function (element, startDate, endDate, valCallback) {
        $(element).daterangepicker({
            startDate: startDate,
            endDate: endDate,
            timePicker: true,
            locale: {
                format: 'MM/DD/YYYY HH:mm'
            },
            timePickerIncrement: 30,
            timePicker12Hour: true,
            timePickerSeconds: false,
            buttonClasses: ['btn', 'btn-sm'],
            applyClass: 'btn-danger',
            cancelClass: 'btn-inverse'
        },
            function (start, end) {
                valCallback(start, end);
            });
    }

    core.SetDateRangePickerNoTime = function (element, startDate, endDate, valCallback) {
        $(element).daterangepicker({
            startDate: startDate,
            endDate: endDate,
            locale: {
                format: 'MM/DD/YYYY'
            },
            buttonClasses: ['btn', 'btn-sm'],
            applyClass: 'btn-danger',
            cancelClass: 'btn-inverse'
        },
            function (start, end) {
                valCallback(start, end);
            });
    }

    core.BarChartDraw = function (elementId, labels, dataList) {
        var ctx = document.getElementById(elementId);
        ctx.height = 150;

        var datasets = [];
        $.each(dataList, function (i, e) {
            datasets.push({
                label: e.Name,
                data: e.dataList,
                backgroundColor: e.color,
                borderColor: e.color,
            });
        })


        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                "hover": {
                    "animationDuration": 0
                },
                "animation": {
                    "duration": 1,
                    "onComplete": function () {
                        var chartInstance = this.chart,
                            ctx = chartInstance.ctx;

                        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'bottom';

                        this.data.datasets.forEach(function (dataset, i) {
                            var meta = chartInstance.controller.getDatasetMeta(i);
                            meta.data.forEach(function (bar, index) {
                                var data = dataset.data[index];
                                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                            });
                        });
                    }
                },
                legend: {
                    "display": false
                },
                tooltips: {
                    "enabled": false
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: false,
                        ticks: {
                            min: 0
                        }
                    }]
                }
            },

        });

        return myChart;
    }

    core.BarChartDrawDiffBlock = function (elementId, labels, dataList, suffix) {
        var ctx = document.getElementById(elementId);
        ctx.height = 150;

        var datasets = [];
        $.each(dataList, function (i, e) {
            datasets.push({
                label: e.Name,
                data: e.dataList,
                backgroundColor: e.Color,
                borderColor: e.Color,
            });
        })


        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: datasets
            },
            options: {
                "hover": {
                    "animationDuration": 0
                },
                "animation": {
                    "duration": 1,
                    //"onComplete": function () {
                    //    var chartInstance = this.chart,
                    //        ctx = chartInstance.ctx;

                    //    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, Chart.defaults.global.defaultFontStyle, Chart.defaults.global.defaultFontFamily);
                    //    ctx.textAlign = 'center';
                    //    ctx.textBaseline = 'bottom';

                    //    this.data.datasets.forEach(function (dataset, i) {
                    //        var meta = chartInstance.controller.getDatasetMeta(i);
                    //        meta.data.forEach(function (bar, index) {
                    //            if (meta.hidden != true) {
                    //                var data = dataset.data[index];
                    //                ctx.fillText(data, bar._model.x, bar._model.y - 5);
                    //            }
                    //        });
                    //    });
                    //}
                },
                legend: {
                    "display": true
                },
                tooltips: {
                    mode: 'index',
                    titleFontSize: 12,
                    titleFontColor: '#000',
                    bodyFontColor: '#000',
                    backgroundColor: '#fff',
                    titleFontFamily: 'Montserrat',
                    bodyFontFamily: 'Montserrat',
                    cornerRadius: 3,
                    callbacks: {
                        label: function (tooltipItems, data) {
                            if (suffix != "" && suffix != null && suffix != undefined) {
                                return tooltipItems.yLabel + ' ' + suffix;
                            }
                            return tooltipItems.yLabel;
                        }
                    }
                },
                responsive: true,
                scales: {
                    xAxes: [{
                        stacked: false
                    }],
                    yAxes: [{
                        stacked: false,
                        ticks: {
                            min: 0
                        }
                    }]
                }
            },

        });

        return myChart;
    }

    core.ChartDraw = function (elementId, labels, dataList, scaleLabelName = 'Value') {
        var ctx = document.getElementById(elementId);
        ctx.height = 150;

        var datasets = [];
        $.each(dataList, function (i, e) {
            datasets.push({
                label: e.Name,
                data: e.dataList,
                backgroundColor: 'transparent',
                borderColor: e.Color,
                borderWidth: 1,
                pointRadius: 2,
            });
        });


        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                type: 'line',
                defaultFontFamily: 'Montserrat',
                datasets: datasets
            },
            options: {
                responsive: true,

                tooltips: {
                    mode: 'index',
                    titleFontSize: 12,
                    titleFontColor: '#000',
                    bodyFontColor: '#000',
                    backgroundColor: '#fff',
                    titleFontFamily: 'Montserrat',
                    bodyFontFamily: 'Montserrat',
                    cornerRadius: 3,
                    intersect: false,
                    position: "custom",
                },
                legend: {
                    labels: {
                        usePointStyle: true,
                        fontFamily: 'Montserrat',
                    },
                },
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: scaleLabelName
                        }
                    }]
                },
                title: {
                    display: false,
                    text: 'Normal Legend'
                }
            }
        });

        chartJSTooltipOption();
        return myChart;
    }

    core.ApexChartDraw = function (elementId, labels, dataList) {
        var ctx = document.getElementById(elementId);
        ctx.height = 150;

        var datasets = [];
        var colors = [];

        $.each(dataList, function (i, e) {
            datasets.push({
                name: e.Name,
                data: e.dataList,
            });
            colors.push(e.Color);
        });


        var options = {
            chart: {
                type: 'line'
            },
            series: datasets,
            xaxis: {
                categories: labels
            },
            colors: colors,
            tooltip: {
                custom: function ({ series, seriesIndex, dataPointIndex, w }) {

                    var title = w.globals.categoryLabels[dataPointIndex];

                    var valstr = "";
                    $.each(series, function (i, e) {
                        if (e[dataPointIndex] != null && e[dataPointIndex] != undefined) {
                            valstr = valstr + '<li style="color:' + w.config.colors[i] + '"><b>' + w.globals.initialSeries[i].name + '</b>: ' + e[dataPointIndex] + '</li>'
                        }
                    });

                    return '<ul>' +
                        '<li>' + title + '</li>' +
                        valstr +
                        '</ul>';
                },
                followCursor: true

            },
            markers: {
                size: 4,
            }
        }

        var myChart = new ApexCharts(document.querySelector("#" + elementId), options);

        myChart.render();

        return myChart;
    }

    core.ChartDraw2 = function (elementId, labels, data) {
        var ctx = document.getElementById(elementId);
        ctx.height = 150;

        var datasets = [];
        datasets.push({
            label: data.Name,
            data: data.dataList,
            backgroundColor: 'transparent',
            borderColor: data.Color,
            borderWidth: 1,
            pointRadius: 2,
        });


        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                type: 'line',
                defaultFontFamily: 'Montserrat',
                datasets: datasets
            },
            options: {
                responsive: true,

                tooltips: {
                    mode: 'index',
                    titleFontSize: 12,
                    titleFontColor: '#000',
                    bodyFontColor: '#000',
                    backgroundColor: '#fff',
                    titleFontFamily: 'Montserrat',
                    bodyFontFamily: 'Montserrat',
                    cornerRadius: 3,
                    intersect: false,
                    position: "custom",
                },
                legend: {
                    labels: {
                        usePointStyle: true,
                        fontFamily: 'Montserrat',
                    },
                },
                scales: {
                    xAxes: [{
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: false,
                            labelString: 'Month'
                        }
                    }],
                    yAxes: [{
                        display: true,
                        gridLines: {
                            display: false,
                            drawBorder: false
                        },
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }]
                },
                title: {
                    display: false,
                    text: 'Normal Legend'
                }
            }
        });

        return myChart;
    }

    core.GaugeDraw = function (elementId, maxVal, val, staticZones) {
        var deger = maxVal / 4;

        var opts = {
            angle: 0, // The span of the gauge arc
            lineWidth: 0.2, // The line thickness
            radiusScale: 1, // Relative radius
            pointer: {
                length: 0.6, // // Relative to gauge radius
                strokeWidth: 0.035, // The thickness
                color: '#000000' // Fill color
            },
            limitMax: false,     // If false, max value increases automatically if value > maxValue
            limitMin: true,     // If true, the min value of the gauge will be fixed
            colorStart: '#6FADCF',   // Colors
            colorStop: '#8FC0DA',    // just experiment with them
            strokeColor: '#E0E0E0',  // to see which ones work best for you
            generateGradient: true,
            highDpiSupport: true,     // High resolution support
            percentColors: [[0.0, "#a9d70b"], [0.50, "#f9c802"], [1.0, "#ff0000"]],
            staticLabels: {
                font: "12px sans-serif",  // Specifies font
                labels: [deger, deger * 2, deger * 3, maxVal],  // Print labels at these values
                fractionDigits: 0
            },
            staticZones: staticZones,
        };
        var target = document.getElementById(elementId); // your canvas element
        var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
        gauge.maxValue = maxVal; // set max gauge value
        //gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
        gauge.set(val); // set actual value
    }

    core.loadingPanel = LoadingPanel();

    var chartJSTooltipOption = function () {
        Chart.Tooltip.positioners.custom = function (items, cor) {
            const pos = Chart.Tooltip.positioners.average(items);
            // Happens when nothing is found
            if (pos === false) {
                return false;
            }

            const chart = this._chart;
            if (items.length > 6) {
                var offset = 0;
                if (items[0]._chart.width / 2 > cor.x) {
                    offset = 20;
                } else {
                    offset = -20;
                }
                return {
                    x: cor.x + offset,
                    y: cor.y,
                };
            }
            else {
                return {
                    x: pos.x,
                    y: pos.y,
                };
            }

        };
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    core.EmailValidate = function (val) {
        const email = val;

        if (validateEmail(email)) {
            return true;
        } else {
            return false;
        }
    }

    core.Confirm = function (message, resultCallback) {
        var popupString = `<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true" id="confirmationModal" style="background: rgb(128, 128, 128, .5);">
                             <div class="modal-dialog modal-sm">
                               <div class="modal-content">
                                 <div class="modal-header">
                                   <h4 class="modal-title" id="myModalLabel">Onay</h4>
                                   <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="timesButton"><span aria-hidden="true">&times;</span></button>
                                 </div>
                                 <div class="modal-body">
                                    ${message}
                                 </div>
                                 <div class="modal-footer">
                                   <button type="button" class="btn btn-default" id="confirmButton">Evet</button>
                                   <button type="button" class="btn btn-primary" id="rejectButton">Hayır</button>
                                 </div>
                               </div>
                             </div>
                           </div>`;

        $("body").append(popupString);
        $("#confirmationModal #confirmButton").off("click").on("click", function () {
            if (resultCallback != null && resultCallback != undefined && typeof resultCallback == "function") {
                resultCallback(true);
            }
            $("#confirmationModal").remove();
        });
        $("#confirmationModal #rejectButton").off("click").on("click", function () {
            if (resultCallback != null && resultCallback != undefined && typeof resultCallback == "function") {
                resultCallback(false);
            }
            $("#confirmationModal").remove();
        });
        $("#confirmationModal #timesButton").off("click").on("click", function () {
            if (resultCallback != null && resultCallback != undefined && typeof resultCallback == "function") {
                resultCallback(false);
            }
            $("#confirmationModal").remove();
        });

        $("#confirmationModal").addClass("show");
        $("#confirmationModal").css("display", "block");
    }

    return core;
}();

function Base64ToBytes(base64) {
    var s = window.atob(base64);
    var bytes = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) {
        bytes[i] = s.charCodeAt(i);
    }
    return bytes;
};

//var mouseX = 0;
//var mouseY = 0;

//$(document).ready(function () {
//    $("body").on("touchstart", function (e) {
//        var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
//        console.log("touch location:", touch.pageX, touch.pageY);
//        mouseX = touch.pageX;
//        mouseY = touch.pageY;
//    })
//})