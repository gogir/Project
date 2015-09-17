$(function () {
    var inputwindow = $(".input-window");
    var str;
    var j;
    $(inputwindow).each(function (i) {
        $(this).on("keydown", function (event) {
            var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
            if (keyCode == 13) {
                str = '{' + inputwindow.eq(i).attr("input-option") + '}';
                j = eval("(" + str + ")");
                ShowWindow();
            }
        });
    });
    $(inputwindow).each(function (i) {
        $(this).on("dblclick", function () {
            str = '{' + inputwindow.eq(i).attr("input-option") + '}';
            j = eval("(" + str + ")");
            ShowWindow();
        });
    });
//    $(".div-choosewindow").each(function (i) {
//        $(this).on("click", function () {
//            str = '{' + inputwindow.eq(i).attr("input-option") + '}';
//            j = eval("(" + str + ")");
//            ShowWindow();
//        });
//    });
    //显示窗体
    function ShowWindow() {
        $.showDataWindow({
            id: j.id,
            modal: true,
            title: j.title,
            width: j.width,
            height: j.height,
            self: true,
            inpid: j.inpid,
            content: "url:" + j.url + "",
            buttons: [
                {
                    text: '取消',
                    iconCls: 'icon-cancel',
                    handler: function () {
                        $.closeWin();
                    }
                }
            ]
        });
    }
});