
var GuideBook = function () {
    var getGuideList = function () {

        //Core.loadingPanel.Show();
        Core.Request("/GuideBook/GetGuideList", "GET", null, function (response) {
            //Core.loadingPanel.Close();
            console.log(response);
            Core.Datatable($("#rehberTablo"), response.data,
                [
                    { title: "Ad", data: "firstName" },
                    { title: "Soyad", data: "lastName" },
                    { title: "Telefon No", data: "telephoneNumber" },
                    {
                        title: "Güncelle", data: null,
                        render: function (data) {
                            return "<button class='btn btn-xs btn-primary' onclick='GuideBook.updateGuide(`" + data.id + "`)' data-toggle='modal' data-target='#guncelleModal' data-whatever='@getbootstrap'>Güncelle</button>";
                        }
                    },
                    {
                        title: "Sil", data: null,
                        render: function (data) {
                            return "<button class='btn btn-xs btn-danger' onclick='GuideBook.deleteGuide(`" + data.id + "`)'>Sil</button>";
                        }
                    }
                ]
            );
        }, function (response) {
            //Core.loadingPanel.Close();
            Core.Toaster2(response.Message, 0);
        })
    }


    var GetGuide = function (id) {

        //Core.loadingPanel.Show();
        Core.Request("/GuideBook/GetUpdateGuide/" + id, "GET", null, function (response) {
            //Core.loadingPanel.Close();
            $('#firtName_input').val(response.data.firstName);
            $('#lastName_input').val(response.data.lastName);
            $('#phoneNumber_input').val(response.data.telephoneNumber);
            $('#recordId_input').val(response.data.id);

        }, function (response) {
            //Core.loadingPanel.Close();
            Core.Toaster2(response.Message, 0);
        })

    };

    var InsertGuide = function (data) {

        Core.Request("/GuideBook/InsertGuide", "POST", data, function (response) {
            Core.Toaster2(response.Message, 1);
            getGuideList();
            Temizle();

        }, function (response) {
            Core.Toaster2(response.Message, 0);
        })
    }; 

    var Temizle = function () {
        $('#ekle_firtName_input').val("");
        $('#ekle_lastName_input').val("");
        $('#ekle_phoneNumber_input').val("");
    }

    var UpdateGuide = function (data) {

        Core.Request("/GuideBook/UpdateGuide", "POST", data, function (response) {
            //Core.loadingPanel.Close();
            Core.Toaster2(response.Message, 1);
            getGuideList();

        }, function (response) {
            //Core.loadingPanel.Close();
            Core.Toaster2(response.Message, 0);
        })
    };

    var DeleteGuide = function (id) {

        //Core.loadingPanel.Show();
        Core.Request("/GuideBook/RemoveGuide/" + id, "POST", null, function (response) {
            //Core.loadingPanel.Close();
            Core.Toaster2(response.Message, 1);
            getGuideList();
        }, function (response) {
            //Core.loadingPanel.Close();
            Core.Toaster2(response.Message, 0);
        })
    };

    return {
        init: function () {
            getGuideList();
        },
        updateGuide: function (id) {
            GetGuide(id);
        },
        deleteGuide: function (id) {
            DeleteGuide(id);
        },
        modifyGuide: function () {

            let firstName = $('#firtName_input').val();
            let lastName = $('#lastName_input').val();
            let telephoneNumber = $('#phoneNumber_input').val();
            let id = $('#recordId_input').val();

            var updateData = {
                Id : id,
                FirstName: firstName,
                LastName: lastName,
                TelephoneNumber: telephoneNumber
            }

            UpdateGuide(updateData);
        },
        insertGuide : function() {

            let firstName = $('#ekle_firtName_input').val();
            let lastName = $('#ekle_lastName_input').val();
            let telephoneNumber = $('#ekle_phoneNumber_input').val();

            var insertData = {
                FirstName: firstName,
                LastName: lastName,
                TelephoneNumber: telephoneNumber
            }

            InsertGuide(insertData);
        }

    }
}();