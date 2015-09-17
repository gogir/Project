$(function () {
    $("#druggistlist_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        collapsible: true,
        url: '../Handler/BaseInfo/DruggistHandler.ashx?action=druggistlist',
        pageList: [10, 15, 20, 25, 30, 40, 50],
        pageSize: 20,
        pageNumber: 1,
        remoteSort: true,
        rownumbers: true,
        pagination: true,
        singleSelect: true,
        showFooter: true,
        columns: [
            [
                { field: 'druggist_id', title: '药剂师编号', width: 130, align: 'center', columntype: 'TextColumn', hidden: true },
                { field: 'druggist_name', title: '药剂师名称', width: 80, align: 'center', columntype: 'TextColumn' },
                { field: 'sex', title: '性别', width: 60, align: 'center', itemlist: '0="",1=男,2=女', columntype: 'TextColumn' },
                { field: 'birthday', title: '出生日期', width: 80, align: 'center', columntype: 'DateColumn' },
                { field: 'hospital_name', title: '所属医院', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'title', title: '职称', width: 80, align: 'left', columntype: 'TextColumn' }
            ]
        ],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#druggistlist_tblist').datagrid("selectRow", 0);
            }
        }
    });
    $("#druggistlist_tblist").datagrid("keyUpDown");
    $("#druggistlist_tblist").datagrid("mouseRoll");   
});

var DruggistList = function () {
    return {
        ReLoad: function () {
            DruggistList.Cancel();
            var druggist_name = $("#druggistlist_druggistname").val();
            $("#druggistlist_tblist").datagrid("options").url = "/Handler/BaseInfo/DruggistHandler.ashx?action=druggistlist&druggist_name=" + escape(druggist_name);
            $("#druggistlist_tblist").datagrid("reload");
        },

        ClearInput: function () {
            $("#druggistlist_user_id").val("");
            $("#druggistlist_user_name").val("");
            $("#druggistlist_user_password").val("");
            $("#druggistlist_druggist_id").val("");
            $("#druggistlist_druggist_name").val("");
            $("#druggistlist_druggist_sex").combobox('setValue',"");
            $("#druggistlist_druggist_birthday").datebox('setValue', "");
            $("#druggistlist_druggist_title").val("");
            $("#druggistlist_druggist_hospital").combobox('setValue', "");
            $("#druggistlist_user_name").attr("disabled", false);
            $("#druggistlist_user_password").attr("disabled", false);
        },
        AddEdit: function (type) {
            DruggistList.ClearInput();
            if (type != 0) {
                var row = $("#druggistlist_tblist").datagrid("getSelected");
                if (!row) {
                    $.messager.alert('提示', '请选择要编辑的药剂师！');
                    return;
                }
                $("#druggistlist_user_name").attr("disabled", true);
                $("#druggistlist_user_password").attr("disabled", true);
                $("#druggistlist_user_id").val(row.userid);
                $("#druggistlist_user_name").val(row.username);
                $("#druggistlist_druggist_id").val(row.druggist_id);
                $("#druggistlist_druggist_name").val(row.druggist_name);
                $("#druggistlist_druggist_sex").combobox('setValue', row.sex);
                $("#druggistlist_druggist_birthday").datebox('setValue', row.birthday);
                $("#druggistlist_druggist_title").val(row.title);
                $("#druggistlist_druggist_hospital").combobox('setValue', row.hospital_id);
            }
            $("#druggistlist_addeditwin").window("open");
        },
        Cancel: function () {
            DruggistList.ClearInput();
            $("#druggistlist_addeditwin").window("close");
        },

        SaveDruggist: function () {
            var druggist_user_id = $("#druggistlist_user_id").val();
            var druggist_user_name = $("#druggistlist_user_name").val();
            var druggist_user_password = $("#druggistlist_user_password").val();
            var druggist_id = $("#druggistlist_druggist_id").val();
            var druggist_name = $("#druggistlist_druggist_name").val();
            var druggist_sex = $("#druggistlist_druggist_sex").combobox("getValue");
            var druggist_birthday = $("#druggistlist_druggist_birthday").datebox("getValue");
            var druggist_title = $("#druggistlist_druggist_title").val();
            var druggist_hospital = $("#druggistlist_druggist_hospital").combobox("getValue");
            if (!druggist_user_name) {
                $.messager.alert('提示', '登录用户名不能为空！');
                return;
            }
            if (!druggist_user_id) {
                if (!druggist_user_password) {
                    $.messager.alert('提示', '登录密码不能为空！');
                    return;
                }
            }
            if (!druggist_name) {
                $.messager.alert('提示', '药剂师名称不能为空！');
                return;
            }
            if (!druggist_sex) {
                $.messager.alert('提示', '请选择性别！');
                return;
            }           
            if (!druggist_hospital) {
                $.messager.alert('提示', '请选择所属医院！');
                return;
            }
            $.ajax({
                type: "post",
                url: "/Handler/BaseInfo/DruggistHandler.ashx",
                dataType: 'json',
                data: {
                    action: "savedruggist",
                    druggist_user_id: druggist_user_id,
                    druggist_user_name: druggist_user_name,
                    druggist_user_password: druggist_user_password,
                    druggist_id: druggist_id,
                    druggist_name: druggist_name,
                    druggist_sex: druggist_sex,
                    druggist_birthday: druggist_birthday,
                    druggist_title: druggist_title,
                    druggist_hospital: druggist_hospital
                },
                success: function (res) {
                    if (res) {
                        if (res.ret == 0) {
                            DruggistList.ReLoad();
                            $.messager.alert('提示', res.msg);
                        } else if (res.ret == 10000) {
                            top.location = '/Login.aspx';
                        }
                        else $.messager.alert('提示', res.msg);
                    }
                    else {
                        $.messager.alert('提示', '操作失败，请刷新后再试！');
                    }
                }
            });
        },
        DelDruggist: function () {
            var row = $("#druggistlist_tblist").datagrid("getSelected");
            if (!row) {
                $.messager.alert('提示', '请选择要删除的用户！');
            }
            $.messager.confirm('确认', '您确定要删除吗？', function (r) {
                if (r) {
                    $.ajax({
                        type: "post",
                        url: "/Handler/BaseInfo/DruggistHandler.ashx",
                        dataType: 'json',
                        data: {
                            action: "deldruggist",
                            druggist_id: row.druggist_id
                        },
                        success: function (res) {
                            if (res) {
                                $.messager.alert('提示', res.msg);
                                if (res.ret == 0) {
                                    DruggistList.ReLoad();
                                } else if (res.ret == 10000) {
                                    top.location = '/Login.aspx';
                                }
                                else $.messager.alert('提示', res.msg);
                            }
                            else {
                                $.messager.alert('提示', '删除失败，请刷新后再试！');
                            }
                        }
                    });
                }
            });
        }
    }
} ();