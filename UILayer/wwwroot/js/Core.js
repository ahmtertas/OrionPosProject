
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

    core.loadingPanel = LoadingPanel();

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

    return core;
}();

