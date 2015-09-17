$(document).ready(function () {
    $('#tabs').tabs({
        onClose: function (title, index) {
            switch (title) {
                case "组织机构":
                    delete OrganizationList;
                    break;
                case "员工管理":
                    delete EmployeeList;
                    break;
                case "职位管理":
                    delete PositionList;
                    break;
                case "客户管理":
                    delete CustomerList;
                    break;



                case "协议合同录入":
                    delete FrameList;
                    break;
                case "协议合同审核":
                    delete FrameAuditList;
                    break;
                case "协议合同变更登记":
                    delete FrameChangeList;
                    break;
                case "协议合同变更审核":
                    delete FrameVerifyList;
                    break;
                case "合同综合查询":
                    delete ContractReport;
                    break;



                case "合同录入":
                    delete ExecuteContract;
                    break;
                case "合同审核":
                    delete ExecuteVerify;
                    break;
                case "合同变更":
                    delete ExecuteChange;
                    break;
                case "合同变更审核":
                    delete ExecuteChangeVerify;
                    break;
                case "生产登记":
                    delete ContractProduce;
                    break;
                case "发货登记":
                    delete ContractSend;
                    break;
                case "到货验收":
                    delete ExecuteArrivalCheck;
                    break;
                case "投运登记":
                    delete ContractCommit;
                    break;
                case "开票登记":
                    delete ContractInvoice;
                    break;
                case "收款登记":
                    delete ContractGather;
                    break;
                case "合同上报":
                    delete ExecuteStock;
                    break;
                case "结束合同":
                    delete ExecuteFinish;
                    break;


                case "无金额合同":
                    delete ExecuteZeroTotal;
                    break;
                case "待发货合同":
                    delete ExecuteWaitSend;
                    break;
                case "待开票合同":
                    delete ExecuteWaitInvoice;
                    break;
                case "待收款合同":
                    delete ExecuteWaitGather;
                    break;


                case "部门任务":
                    delete DepartTask;
                    break;
                case "个人任务":
                    delete UserTask;
                    break;
                case "投标预计":
                    delete ExpectPlan;
                    break;
                case "部门任务查询":
                    delete DepartTaskReport;
                    break;
                case "个人任务查询":
                    delete UserTaskReport;
                    break;
                case "投标预计查询":
                    delete ExpectPlanReport;
                    break;
                default:
                    break;
            }
        }
    });
    //获取提醒
});

var MainFunc = function () {
    return {
        ClickBaseInfo: function () {
            $(".meu_pi").removeClass("meu_pi2");
            $("#main_baseinfo").addClass("meu_pi2");

            var tab = $('#tabs').tabs('getTab', '功能导航');
            tab.panel('refresh', '../Navigate/BaseInfoNavigate.aspx');
            $('#tabs').tabs('select', '功能导航');
        },

        ClickFrame: function () {
            $(".meu_pi").removeClass("meu_pi2");
            $("#main_yljz").addClass("meu_pi2");
            var tab = $('#tabs').tabs('getTab', '功能导航');
            tab.panel('refresh', '../Navigate/YLJZNavigate.aspx');
            $('#tabs').tabs('select', '功能导航');
        },

        ClickExecute: function () {
            $(".meu_pi").removeClass("meu_pi2");
            $("#main_yfgl").addClass("meu_pi2");
            var tab = $('#tabs').tabs('getTab', '功能导航');
            tab.panel('refresh', '../Navigate/YFGLNavigate.aspx');
            $('#tabs').tabs('select', '功能导航');
        },

        ClickJiXiao: function () {
            $(".meu_pi").removeClass("meu_pi2");
            $("#main_tjfx").addClass("meu_pi2");
            var tab = $('#tabs').tabs('getTab', '功能导航');
            tab.panel('refresh', '../Navigate/TJFXNavigate.aspx');
            $('#tabs').tabs('select', '功能导航');
        },

        ClickConfigSet: function () {
            $(".meu_pi").removeClass("meu_pi2");
            $("#main_configset").addClass("meu_pi2");
            var tab = $('#tabs').tabs('getTab', '功能导航');
            tab.panel('refresh', '../Navigate/ConfigSetNavigate.aspx');
            $('#tabs').tabs('select', '功能导航');
        }
    }
} ();

//创建选项卡
function AddTab(title, url, type) {
    if ($("#tabs").tabs("exists", title)) {
        $('#tabs').tabs('select', title);
    }
    else {
        if (type == 1) {
            $('#tabs').tabs('add', {
                title: title,
                //href: url,
                content: '<iframe name="mainFrame" scrolling="no" frameborder="0"  src="' + url + '" style="width:100%;height:100%;"></iframe>',
                fit: true,
                closable: true,
                bodyCls: "tabcls"
            });
        }
        else {
            $('#tabs').tabs('add', {
                title: title,
                href: url,
                fit: true,
                closable: true,
                bodyCls: "tabcls"
            });
        }
    }
}

function loginOut() {
    $.messager.confirm('确认', '您确定要退出吗？', function (r) {
        if (r) {
            $.ajax({
                type: "post",
                url: "/Handler/CommHandler.ashx",
                data: {
                    action: "loginout"
                },
                success: function () {
                    location = "/Login.aspx";
                }
            });
        }
    });
}

function ModiyPwd() {
    var oldpwd = $("#mainbaseinfo_oldpwd").val();
    var newpwd1 = $("#mainbaseinfo_newpwd1").val();
    var newpwd2 = $("#mainbaseinfo_newpwd2").val();
    if (!oldpwd) {
        $.messager.alert('提示', '请输入原始密码！');
        return;
    }

    if (!newpwd1) {
        $.messager.alert('提示', '请输入新密码！');
        return;
    }

    if (newpwd1.length < 6) {
        $.messager.alert('提示', '新密码长度不能少于6位！');
        return;
    }

    if (!newpwd2) {
        $.messager.alert('提示', '请输入确认密码！');
        return;
    }
    if (newpwd1 != newpwd2) {
        $.messager.alert('提示', '新密码和确认密码不一致！');
        return;
    }

    var reg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[a-zA-Z0-9]{8,16}$/;
    if (!reg.test(newpwd1)) {
        $.messager.alert('提示', '密码必须包含字母和数字，长度在8-16位！');
        return;
    }

    $.ajax({
        type: "post",
        url: "/Handler/BaseInfo/EmployeeHandler.ashx",
        dataType: "json",
        data: {
            action: "modifypwd",
            oldpwd: oldpwd,
            newpwd1: newpwd1,
            newpwd2: newpwd2
        },
        success: function (res) {
            if (res) {
                if (res.ret == 0) {
                    $("#mainbaseinfo_oldpwd").val("");
                    $("#mainbaseinfo_newpwd1").val("");
                    $("#mainbaseinfo_newpwd2").val("");
                    $('#mainbaseinfo_pwddlg').dialog('close');
                    $.messager.alert('提示', "密码修改成功，3 秒钟后自动退出登录！");
                    setTimeout(function () { location = "/Login.aspx"; }, 3000);
                }
                else if (res.ret == 10000) {
                    $.messager.alert('提示', res.msg);
                    $("#mainbaseinfo_oldpwd").val("");
                    $("#mainbaseinfo_newpwd1").val("");
                    $("#mainbaseinfo_newpwd2").val("");
                    $('#mainbaseinfo_pwddlg').dialog('close');
                    location = "/Login.aspx";
                }
                else {
                    $.messager.alert('提示', res.msg);
                }
            }
            else {
                $.messager.alert('提示', "操作失败，请稍后再试！");
            }
        }
    });
}

function CheckFile(name) {
    var obj = $("#" + name);
    var fileName = obj.val();
    if (fileName == "") return;

    var file_typename = fileName.substring(fileName.lastIndexOf('.'), fileName.length).toLowerCase();
    if (file_typename == '.xls' || file_typename == '.doc' || file_typename == '.xlsx' || file_typename == '.docx' ||
        file_typename == '.rar' || file_typename == '.zip' || file_typename == '.txt'
        || file_typename == '.jpg' || file_typename == '.gif' || file_typename == '.png' || file_typename == '.bmp' || file_typename=='.pdf') {

        var fileobj = document.getElementById(name).files;
        if (file == undefined || !file) return;
        var file = fileobj[0];
        if (file == undefined || !file) return;

        var fileSize = Math.round(file.size * 100 / (1024 * 1024)) / 100;
        if (fileSize > 10) {
            $.messager.alert('提示', "文件大小不能超过10MB，现文件大小为：" + fileSize + "MB", "warning");
            obj.after(obj.clone().val(""));
            obj.remove();
            return;
        }
    }
    else {
        $.messager.alert('提示', "上传文件应该是.txt|.xls|.xlsx|.doc|.docx|.rar|.zip|.jpg|.gif|<br/>.png|.bmp|.pdf后缀而不应该是" + file_typename + ",请重新选择文件", 'warning');
        obj.after(obj.clone().val(""));
        obj.remove();
        return;
    }
}


//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function forbidBackSpace(e) {
    var ev = e || window.event; //获取event对象 
    var obj = ev.target || ev.srcElement; //获取事件源 
    var t = obj.type || obj.getAttribute('type'); //获取事件源类型 
    //获取作为判断条件的事件类型 
    var vReadOnly = obj.readOnly;
    var vDisabled = obj.disabled;
    //处理undefined值情况 
    vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
    vDisabled = (vDisabled == undefined) ? true : vDisabled;
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的， 
    //并且readOnly属性为true或disabled属性为true的，则退格键失效 
    var flag1 = ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea") && (vReadOnly == true || vDisabled == true);
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效 
    var flag2 = ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea";
    //判断 
    if (flag2 || flag1) return false;
}

//禁止后退键 作用于Firefox、Opera
document.onkeypress = forbidBackSpace;
//禁止后退键  作用于IE、Chrome
document.onkeydown = forbidBackSpace;
