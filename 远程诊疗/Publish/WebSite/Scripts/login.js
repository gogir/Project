//居中
$(function () {
    var w_h = $(window).height();
    var wi = (w_h - 700) / 2;
    if (wi > 0) {
        $("#gxz").css("margin-top", wi);
    } else {
        $("#gxz").css("margin-top", "0px");
    }
    $(window).resize(function () {
        var w_h = $(window).height();
        var wi = (w_h - 700) / 2;
        if (wi > 0) {
            $("#gxz").css("margin-top", wi);
        } else {
            $("#gxz").css("margin-top", "0px");
        }
    });

    var username = $("#username").val();
    if (!username) {
        $("#username").focus();
    }
    else {
        $("#password").focus();
    }
    //登录
    $("#login_button").bind("click", function () {
        login();
    });
});

//登录
function login() {
    var username = $("#username").val();
    var password = $("#password").val();
    var verifytext = $("#verifytext").val();
    if (!username) {
        $.messager.alert('提示', '请输入登录用户！');
        document.getElementById("username").focus();
        return;
    }

    if (!password) {
        $.messager.alert('提示', '请输入登录密码！');
        document.getElementById("password").focus();
        return;
    }

    if (!verifytext) {
        $.messager.alert('提示', '请输入验证码！');
        document.getElementById("verifytext").focus();
        return;
    }

    $.ajax({
        beforeSend: function () { $("#login_button").val("登录中..."); },
        type: "post",
        url: "/Login.aspx",
        dataType: "json",
        data: {
            action: "login",
            username: username,
            password: password,
            verifytext: verifytext
        },
        success: function (res) {
            if (!res) {
                $("#login_button").val("登录系统");
                $.messager.alert('提示', '登录失败，可能登录用户或登录密码错误！');
                return;
            }
            else {
                if (res.ret == 6) {
                    location = "/Main.aspx";
                }
                else {
                    $("#login_button").val("登录系统");
                    $.messager.alert('提示', res.msg);
                    return;
                }
            }
        }
    });
}


function UserIDKeyDown(evn) {
    if (evn.keyCode == 13) {
        document.getElementById("password").focus();
    }
}
function PasswordKeyDown(evn) {
    if (evn.keyCode == 13) {
        document.getElementById("verifytext").focus();
    }
}
function VerifytextKeyDown(evn) {
    if (evn.keyCode == 13) {
        login();
    }
}
function refresh() {
    var url = "ValidateCode.aspx?id=";
    var r = Math.random() * 1000;
    url = url + r;
    document.all("LoI_ValidateCodeImage").src = url;
    return false;
}

function onFocusValidate() {
    refresh();
    var obj = document.getElementById("LoI_ValidateCodeImage")
    obj.style.display = "block";
}

function onBlurValidate() {
    var obj = document.getElementById("LoI_ValidateCodeImage")
    obj.style.display = "none";
}
