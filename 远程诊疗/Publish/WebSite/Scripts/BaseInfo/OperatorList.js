$(function () {
    $("#operatorlist_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        collapsible: true,
        url: '../Handler/BaseInfo/OperatorHandler.ashx?action=operatorlist',
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
                { field: 'username', title: '用户名', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'operator_name', title: '操作员名称', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'organ_name', title: '关联医院/药房', width: 150, align: 'left', columntype: 'TextColumn' },
                { field: 'usertype', title: '登录角色', width: 100, align: 'left', itemlist: '0=系统后台,1=药房,2=药剂师,3=医生', columntype: 'TextColumn' },
                { field: 'disable', title: '状态', width: 60, align: 'center', itemlist: '0=正常,1=停用', columntype: 'TextColumn' }
            ]
        ],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#operatorlist_tblist').datagrid("selectRow", 0);
            }
        },
        onSelect: function (rowIndex, rowData) {
            if (rowData) {
                $('#operatorlist_btnnostop').linkbutton(rowData.isstop == 1 ? 'enable' : 'disable');
                $('#operatorlist_btnstop').linkbutton(rowData.isstop == 0 ? 'enable' : 'disable');
            }
        }
    });
    $("#operatorlist_tblist").datagrid("keyUpDown");
    $("#operatorlist_tblist").datagrid("mouseRoll");
});

var OperatorList = function () {
    return {
        ReLoad: function () {
            OperatorList.Cancel();
            var operator_name = $("#operatorlist_operatorname").val();
            $("#operatorlist_tblist").datagrid("options").url = "/Handler/BaseInfo/OperatorHandler.ashx?action=operatorlist&operator_name=" + escape(operator_name);
            $("#operatorlist_tblist").datagrid("reload");
        },

        ClearInput: function () {
            $("#operatorlist_operator_id").val("");
            $("#operatorlist_username").val("");
            $("#operatorlist_usertype").val("");
            $("#operatorlist_operator_name").val("");
            $("#operatorlist_password").val("");
        },

        AddEdit: function (type) {
            OperatorList.ClearInput();
            if (type != 0) {
                var row = $("#operatorlist_tblist").datagrid("getSelected");
                if (!row) {
                    $.messager.alert('提示', '请选择要编辑的用户！');
                    return;
                }
                if (row.usertype > 0) $("#operatorlist_usertype").attr("disabled", true);
                else $("#operatorlist_usertype").attr("disabled", false);
                $("#operatorlist_operator_id").val(row.operator_id);
                $("#operatorlist_username").val(row.username);
                $("#operatorlist_usertype").val(row.usertype);
                $("#operatorlist_operator_name").val(row.operator_name);
                $("#operatorlist_password").val(row.password);
            }

            $("#operatorlist_addeditwin").window("open");
        },

        Cancel: function () {
            OperatorList.ClearInput();
            $("#operatorlist_addeditwin").window("close");
        },

        SaveOperator: function () {
            var operator_id = $('#operatorlist_operator_id').val();
            var username = $("#operatorlist_username").val();
            var usertype = $("#operatorlist_usertype").val();
            var operator_name = $("#operatorlist_operator_name").val();
            var password = $("#operatorlist_password").val();
            if (!username) {
                $.messager.alert('提示', '用户名不能为空！');
                return;
            }
            if (!operator_name) {
                $.messager.alert('提示', '操作员不能为空！');
                return;
            }
            if (!password) {
                $.messager.alert('提示', '登录密码不能为空！');
                return;
            }
            $.ajax({
                type: "post",
                url: "/Handler/BaseInfo/OperatorHandler.ashx",
                dataType: 'json',
                data: {
                    action: "saveoperator",
                    operator_id: operator_id,
                    usertype: usertype,
                    operator_name: operator_name,
                    username: username,
                    password: password
                },
                success: function (res) {
                    if (res) {
                        $.messager.alert('提示', res.msg);
                        if (res.ret == 0) {
                            OperatorList.ReLoad();
                        } else if (res.ret == 10000) {
                            top.location = '/Login.aspx';
                        }
                    }
                    else {
                        $.messager.alert('提示', '操作失败，请刷新后再试！');
                    }
                }
            });
        },
        StopOperator: function (status) {
            var row = $("#operatorlist_tblist").datagrid("getSelected");
            if (!row) {
                $.messager.alert('提示', '请选择要启用停用的操作员！');
            }
            $.messager.confirm('确认', '您确定要执行此操作吗？', function (r) {
                if (r) {
                    $.ajax({
                        type: "post",
                        url: "/Handler/BaseInfo/OperatorHandler.ashx",
                        dataType: 'json',
                        data: {
                            action: "stopoperator",
                            status: status,
                            operator_id: row.operator_id
                        },
                        success: function (res) {
                            if (res) {
                                $.messager.alert('提示', res.msg);
                                if (res.ret == 0) {
                                    OperatorList.ReLoad();
                                } else if (res.ret == 10000) {
                                    top.location = '/Login.aspx';
                                }
                            }
                            else {
                                $.messager.alert('提示', '操作失败，请刷新后再试！');
                            }
                        }
                    });
                }
            });
        },
        DelOperator: function () {
            var row = $("#operatorlist_tblist").datagrid("getSelected");
            if (!row) {
                $.messager.alert('提示', '请选择要删除的用户！');
            }
            $.messager.confirm('确认', '您确定要删除吗？', function (r) {
                if (r) {
                    $.ajax({
                        type: "post",
                        url: "/Handler/BaseInfo/OperatorHandler.ashx",
                        dataType: 'json',
                        data: {
                            action: "deloperator",
                            operator_id: row.operator_id
                        },
                        success: function (res) {
                            if (res) {
                                $.messager.alert('提示', res.msg);
                                if (res.ret == 0) {
                                    OperatorList.ReLoad();
                                } else if (res.ret == 10000) {
                                    top.location = '/Login.aspx';
                                }
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