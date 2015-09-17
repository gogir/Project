(function () {
    var win;
    var hinp;
    var options;
    var winId;
    $.extend({
        showDataWindow: function (opts) {

            opts = opts || {};
            //var win;
            var winDefault = {
                width: "auto",
                height: "auto",
                //data: undefined,
                content: "",
                //isdblclick: true,
                onClose: function () { win.dialog("destroy"); }
            };

            options = $.extend({}, winDefault, opts);

            //取顶层页面
            var _doc, _top = (function (w) {
                try {
                    _doc = w['top'].document;
                    _doc.getElementsByTagName;
                } catch (e) {
                    _doc = w.document;
                    return w;
                }
                if (options.self || _doc.getElementsByTagName('frameset').length > 0) {
                    _doc = w.document;
                    return w;
                }
                return w['top'];
            })(window);

            //如填写ID属性，则窗体唯一

            if (options.id) {
                winId = options.id;
                delete options.id;

                //检查创建窗口是否已经存在，存在则不在创建
                if ($('#' + winId).size()) {
                    return;
                }
            }

            //检查判断content传递的值文本还是url参数
            var isUrl = /^url:/.test(options.content);
            if (isUrl) {
                var url = options.content.substring(4, options.content.length);
                options.href = url;
            }
            win = _top.$('<div>', { id: winId }).dialog(options);
            //            var inputid_hid = "<input type=\"hidden\" id=\"hid_" + winId + "\" name=\"hid_" + winId + "\" />";
            //            var hidinputwid = "<input type=\"hidden\" id=\"hidwin" + winId + "\" value=\"" + options.inpid + "\">";
            //            if ($('#hid_' + winId).size() > 0) {
            //                return;
            //            }
            //            else {
            //                hinp = _top.$("body").append(inputid_hid);
            //            }

            //            if ($("#hidwin" + winId).size() > 0) {
            //                return; 
            //            }
            //            else {
            //                _top.$("body").append(hidinputwid);
            //            }
        },
        closeWin: function () {
            win.dialog("destroy");
        },
        nextFoucs: function () {
            var index = $("html").data("inp_index");
            var adr_form = $("html").data("adr_form");
            $("#" + adr_form).find("input:text:visible").eq(index).focus().select();
        },
        //        getHidInputId: function () {
        //            return $("#hid_" + winId).attr("id");
        //        },
        getParentInpId: function () {
            return options.inpid;
        },
        getWinId: function () {
            return winId;
        }
    });
})(jQuery);
