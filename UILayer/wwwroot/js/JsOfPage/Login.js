
var Login = function () {

    var Login = function (Username, Password) {
        let rememberMe = false;

        if ($('#rememberMe').is(":checked")) { rememberMe = true; }

        var data = {
            UserName: Username,
            UserPassword: Password,
            RememberMe: rememberMe
        };
        //Core.loadingPanel.Show();
        Core.Request("/Account/Login", "POST", data, function (response) {

            console.log(response);

            //Core.loadingPanel.Close();

            if (response.data) {
                window.location.href = "/GuideBook/Index/";
            }
            else {
                Core.Toaster2(response.message, 0);
            }
        }, function (response) {
            //Core.loadingPanel.Close();
            Core.Toaster2(response.message, 0);
        })
    }

    var Logout = function () {
        Core.Request("/Account/Logout", "POST", null, function (response) {
            console.log(response);

            if (response.data) {
                window.location.href = "/Account/Login/";
            }
            else {
                Core.Toaster2(response.message, 0);
            }
        }, function (response) {
            Core.Toaster2(response.message, 0);
        })
    }

    return {
        init: function () {
            $(document).keypress(function (e) {
                if (e.which == 13) {
                    var username = $("#email").val();
                    var password = $("#password").val();
                    var errorStatus = false;

                    if (username == "") {
                        Core.Toaster2("Kullanıcı Adı Boş Geçilemez!!", 0);
                        errorStatus = true;
                    }
                    if (password == "") {
                        Core.Toaster2("Şifre Boş Geçilemez!!", 0);
                        errorStatus = true;
                    }

                    if (!errorStatus) {
                        Login(username, password);
                    }
                }
            });
        },
        onLoginClick: function () {
            var username = $("#email").val();
            var password = $("#password").val();
            var errorStatus = false;

            if (username == "") {
                Core.Toaster2("Kullanıcı Adı Boş Geçilemez!!", 0);
                errorStatus = true;
            }
            if (password == "") {
                Core.Toaster2("Şifre Boş Geçilemez!!", 0);
                errorStatus = true;
            }

            if (!errorStatus) {
                Login(username, password);
            }
        },
        onLogoutClick: function () {
            Logout();
        }
    }
}();