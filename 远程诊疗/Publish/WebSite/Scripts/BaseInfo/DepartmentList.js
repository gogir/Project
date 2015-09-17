$(function () {
    $("#department_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        collapsible: true, 
        url: '/Handler/BaseInfo/DepartmentHandler.ashx?action=departmentlist',
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
                { field: 'department_id', title: '科室编码', width: 130, align: 'center', columntype: 'TextColumn', hidden: true },
                { field: 'department_name', title: '科室名称', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'remark', title: '科室描述', width: 350, align: 'left', columntype: 'TextColumn' },
            ]
        ],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#department_tblist').datagrid("selectRow", 0);
            }
        }
    });
    $("#department_tblist").datagrid("keyUpDown");
    $("#department_tblist").datagrid("mouseRoll");

});

var DepartmentList = function () {
    return {
        ReLoad: function () {
            DepartmentList.Cancel();
            var department_name = $("#departmentlist_departmentname").val();
            $("#department_tblist").datagrid("options").url = "/Handler/BaseInfo/DepartmentHandler.ashx?action=departmentlist&department_name=" + escape(department_name);
            $("#department_tblist").datagrid("reload");
        },

        ClearInput: function () {
            $("#departmentlist_department_id").val("");
            $("#departmentlist_department_name").val("");
            $("#departmentlist_department_remark").val("");
        },

        AddEdit: function (type) {
            DepartmentList.ClearInput();
            if (type != 0) {
                var row = $("#department_tblist").datagrid("getSelected");
                if (!row) {
                    $.messager.alert('提示', '请选择要编辑的科室！');
                    return;
                }
                $("#departmentlist_department_id").val(row.department_id);
                $("#departmentlist_department_name").val(row.department_name);
                $("#departmentlist_department_remark").val(row.remark);
            }
            $("#department_addeditwin").window("open");
        },

        Cancel: function () {
            DepartmentList.ClearInput();
            $("#department_addeditwin").window("close");
        },

        SaveDepartment: function () {
            var department_id = $('#departmentlist_department_id').val();
            var department_name = $("#departmentlist_department_name").val();
            var department_remark = $("#departmentlist_department_remark").val();
            if (!department_name) {
                $.messager.alert('提示', '科室名称不能为空！');
                return;
            }
            $.ajax({
                type: "post",
                url: "/Handler/BaseInfo/DepartmentHandler.ashx",
                dataType: 'json',
                data: {
                    action: "savedepartment",
                    department_id: department_id,
                    department_name: department_name,
                    department_remark: department_remark
                },
                success: function (res) {
                    if (res) {
                        $.messager.alert('提示', res.msg);
                        if (res.ret == 0) {
                            DepartmentList.Cancel();
                            DepartmentList.ReLoad();
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
        DelDepartment: function () {
            var row = $("#department_tblist").datagrid("getSelected");
            if (!row) {
                $.messager.alert('提示', '请选择要删除的用户！');
            }
            $.messager.confirm('确认', '您确定要删除吗？', function (r) {
                if (r) {
                    $.ajax({
                        type: "post",
                        url: "/Handler/BaseInfo/DepartmentHandler.ashx",
                        dataType: 'json',
                        data: {
                            action: "deldepartment",
                            department_id: row.department_id
                        },
                        success: function (res) {
                            if (res) {
                                $.messager.alert('提示', res.msg);
                                if (res.ret == 0) {
                                    DepartmentList.ReLoad();
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