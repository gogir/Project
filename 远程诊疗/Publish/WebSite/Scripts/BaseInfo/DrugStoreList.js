$(function () {
    $("#drugstorelist_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        collapsible: true,
        url: '../Handler/BaseInfo/DrugStoreHandler.ashx?action=drugstorelist',
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
                { field: 'drugstore_id', title: '药房编码', width: 130, align: 'center', columntype: 'TextColumn',hidden:true },
                { field: 'drugstore_name', title: '药房名称', width: 150, align: 'left', columntype: 'TextColumn' },
                { field: 'linkman', title: '联系人', width: 80, align: 'center', columntype: 'TextColumn' },
                { field: 'linktel', title: '联系电话', width: 100, align: 'center', columntype: 'TextColumn' },
                { field: 'province', title: '省', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'city', title: '市', width: 80, align: 'left', columntype: 'TextColumn' },
                { field: 'area', title: '区', width: 80, align: 'left', columntype: 'TextColumn' },
                { field: 'address', title: '地址', width: 300, align: 'left', columntype: 'TextColumn' },
                { field: 'grade', title: '评分等级', width: 100, align: 'left', itemlist: '0=-,1=一级,2=二级,3=三级,4=四级,5=五级',columntype: 'TextColumn' },
                { field: 'issign', title: '是否签约', width: 60, align: 'center', itemlist: '0=×,1=√', columntype: 'TextColumn', sortable: true }
            ]
        ],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#drugstorelist_tblist').datagrid("selectRow", 0);
            }
        }
    });
    $("#drugstorelist_tblist").datagrid("keyUpDown");
    $("#drugstorelist_tblist").datagrid("mouseRoll");
   
});

var DrugStoreList = function () {
    return {
        ReLoad: function () {
            DrugStoreList.Cancel();
            var drugstore_name = $("#drugstorelist_drugstorename").val();
            $("#drugstorelist_tblist").datagrid("options").url = "/Handler/BaseInfo/DrugStoreHandler.ashx?action=drugstorelist&drugstore_name=" + escape(drugstore_name);
            $("#drugstorelist_tblist").datagrid("reload");
        },

        ClearInput: function () {
            $("#drugstorelist_user_id").val("");
            $("#drugstorelist_user_name").val("");
            $("#drugstorelist_user_password").val("");
            $("#drugstorelist_drugstore_id").val("");
            $("#drugstorelist_drugstore_name").val("");
            $("#drugstorelist_drugstore_linkman").val("");
            $("#drugstorelist_drugstore_linktel").val("");
            $("#drugstorelist_drugstore_province").combobox('setValue', "");
            $("#drugstorelist_drugstore_city").combobox('setValue', "");
            $("#drugstorelist_drugstore_area").combobox('setValue', "");
            $("#drugstorelist_drugstore_address").val("");
            $("#drugstorelist_drugstore_grade").combobox('setValue', "");
            $("#drugstorelist_issign").combobox('setValue', "");
            $("#drugstorelist_user_name").attr("disabled", false);
            $("#drugstorelist_user_password").attr("disabled", false);
        },

        AddEdit: function (type) {
            DrugStoreList.ClearInput();
            if (type != 0) {
                var row = $("#drugstorelist_tblist").datagrid("getSelected");
                if (!row) {
                    $.messager.alert('提示', '请选择要编辑的药房！');
                    return;
                }
                $("#drugstorelist_user_id").val(row.userid);
                $("#drugstorelist_user_name").val(row.username);
                $("#drugstorelist_drugstore_id").val(row.drugstore_id);
                $("#drugstorelist_drugstore_name").val(row.drugstore_name);
                $("#drugstorelist_drugstore_linkman").val(row.linkman);
                $("#drugstorelist_drugstore_linktel").val(row.linktel);
                $("#drugstorelist_drugstore_province").combobox('setValue', row.province);
                $("#drugstorelist_drugstore_city").combobox('setValue', row.city);
                $("#drugstorelist_drugstore_area").combobox('setValue', row.area);
                $("#drugstorelist_drugstore_address").val(row.address);
                $("#drugstorelist_drugstore_grade").combobox('setValue', row.grade);
                $("#drugstorelist_issign").combobox('setValue', row.issign);
                $("#drugstorelist_user_name").attr("disabled", true);
                $("#drugstorelist_user_password").attr("disabled", true);
            }
            $("#drugstorelist_addeditwin").window("open");
        },

        Cancel: function () {
            DrugStoreList.ClearInput();
            $("#drugstorelist_addeditwin").window("close");
        },

        SaveDrugStore: function () {
            var drugstore_userid = $("#drugstorelist_user_id").val();
            var drugstore_username = $("#drugstorelist_user_name").val();
            var drugstore_password = $("#drugstorelist_user_password").val();
            var drugstore_id = $('#drugstorelist_drugstore_id').val();
            var drugstore_name = $("#drugstorelist_drugstore_name").val();
            var drugstore_linkman = $("#drugstorelist_drugstore_linkman").val();
            var drugstore_linktel = $("#drugstorelist_drugstore_linktel").val();
            var drugstore_province = $("#drugstorelist_drugstore_province").combobox("getValue");
            var drugstore_city = $("#drugstorelist_drugstore_city").combobox("getValue");
            var drugstore_area = $("#drugstorelist_drugstore_area").combobox("getValue");
            var drugstore_address = $("#drugstorelist_drugstore_address").val();
            var drugstore_grade = $("#drugstorelist_drugstore_grade").combobox("getValue");
            var drugstore_issign = $("#drugstorelist_issign").combobox("getValue");
            if (!drugstore_userid) {
                if (!drugstore_username) {
                    $.messager.alert('提示', '用户名不能为空！');
                    return;
                }
                if (!drugstore_password) {
                    $.messager.alert('提示', '密码不能为空！');
                    return;
                } 
            }
            if (!drugstore_name) {
                $.messager.alert('提示', '药房名称不能为空！');
                return;
            }
            if (!drugstore_linkman) {
                $.messager.alert('提示', '联系人不能为空！');
                return;
            }
            if (!drugstore_linktel) {
                $.messager.alert('提示', '联系电话不能为空！');
                return;
            }
            if (!drugstore_province) {
                $.messager.alert('提示', '请选择省份！');
                return;
            }
            if (!drugstore_city) {
                $.messager.alert('提示', '请选择城市！');
                return;
            }
            if (!drugstore_area) {
                $.messager.alert('提示', '请选择所在区域！');
                return;
            }
            if (!drugstore_address) {
                $.messager.alert('提示', '请填写详细地址！');
                return;
            }
            $.ajax({
                type: "post",
                url: "/Handler/BaseInfo/DrugStoreHandler.ashx",
                dataType: 'json',
                data: {
                    action: "savedrugstore",
                    drugstore_id: drugstore_id,
                    drugstore_name: drugstore_name,
                    drugstore_linkman: drugstore_linkman,
                    drugstore_linktel: drugstore_linktel,
                    drugstore_province: drugstore_province,
                    drugstore_city: drugstore_city,
                    drugstore_area: drugstore_area,
                    drugstore_address: drugstore_address,
                    drugstore_grade: drugstore_grade,
                    drugstore_issign: drugstore_issign,
                    drugstore_userid:drugstore_userid,
                    drugstore_username: drugstore_username,
                    drugstore_password: drugstore_password
                },
                success: function (res) {
                    if (res) {

                        if (res.ret == 0) {
                            DrugStoreList.ReLoad();
                            $.messager.alert('提示', res.msg);
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
        DelDrugStore: function () {
            var row = $("#drugstorelist_tblist").datagrid("getSelected");
            if (!row) {
                $.messager.alert('提示', '请选择要删除的药房！');
            }
            $.messager.confirm('确认', '您确定要删除吗？', function (r) {
                if (r) {
                    $.ajax({
                        type: "post",
                        url: "/Handler/BaseInfo/DrugStoreHandler.ashx",
                        dataType: 'json',
                        data: {
                            action: "deldrugstore",
                            drugstore_id: row.drugstore_id
                        },
                        success: function (res) {
                            if (res) {
                                $.messager.alert('提示', res.msg);
                                if (res.ret == 0) {
                                    DrugStoreList.ReLoad();
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