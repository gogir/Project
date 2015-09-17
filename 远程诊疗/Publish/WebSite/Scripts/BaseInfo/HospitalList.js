$(function () {
    $("#hospitallist_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        collapsible: true,
        url: '../Handler/BaseInfo/HospitalHandler.ashx?action=hospitallist',
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
                { field: 'hospital_id', title: '医院编码', width: 130, align: 'center', columntype: 'TextColumn', hidden: true },
                { field: 'hospital_name', title: '医院名称', width: 150, align: 'left', columntype: 'TextColumn' },
                { field: 'linkman', title: '联系人', width: 80, align: 'center', columntype: 'TextColumn' },
                { field: 'linktel', title: '联系电话', width: 100, align: 'center', columntype: 'TextColumn' },
                { field: 'province', title: '省', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'city', title: '市', width: 80, align: 'left', columntype: 'TextColumn' },
                { field: 'area', title: '区', width: 80, align: 'left', columntype: 'TextColumn' },
                { field: 'address', title: '地址', width: 300, align: 'left', columntype: 'TextColumn' },
               { field: 'grade', title: '评分等级', width: 100, align: 'left', itemlist: '0=-,1=一级,2=二级,3=三级,4=四级,5=五级', columntype: 'TextColumn' },
                { field: 'issign', title: '是否签约', width: 60, align: 'center', itemlist: '0=×,1=√', columntype: 'TextColumn', sortable: true }
            ]
        ],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#hospitallist_tblist').datagrid("selectRow", 0);
            }
        }
    });
    $("#hospitallist_tblist").datagrid("keyUpDown");
    $("#hospitallist_tblist").datagrid("mouseRoll");
   
});

var HospitalList = function () {
    return {
        ReLoad: function () {
            HospitalList.Cancel();
            var hospital_name = $("#hospitallist_hospitalname").val();
            $("#hospitallist_tblist").datagrid("options").url = "/Handler/BaseInfo/HospitalHandler.ashx?action=hospitallist&hospital_name=" + escape(hospital_name);
            $("#hospitallist_tblist").datagrid("reload");
        },

        ClearInput: function () {
            $("#hospitallist_hospital_id").val("");
            $("#hospitallist_hospital_name").val("");
            $("#hospitallist_hospital_linkman").val("");
            $("#hospitallist_hospital_linktel").val("");
            $("#hospitallist_hospital_province").combobox('setValue', "");
            $("#hospitallist_hospital_city").combobox('setValue', "");
            $("#hospitallist_hospital_area").combobox('setValue', "");
            $("#hospitallist_hospital_address").val("");
            $("#hospitallist_hospital_grade").combobox('setValue', "");
            $("#hospitallist_issign").combobox('setValue', "");
        },

        AddEdit: function (type) {
            HospitalList.ClearInput();
            if (type != 0) {
                var row = $("#hospitallist_tblist").datagrid("getSelected");
                if (!row) {
                    $.messager.alert('提示', '请选择要编辑的医院！');
                    return;
                }
                $("#hospitallist_hospital_id").val(row.hospital_id);
                $("#hospitallist_hospital_name").val(row.hospital_name);
                $("#hospitallist_hospital_linkman").val(row.linkman);
                $("#hospitallist_hospital_linktel").val(row.linktel);
                $("#hospitallist_hospital_province").combobox('setValue', row.province);
                $("#hospitallist_hospital_city").combobox('setValue', row.city);
                $("#hospitallist_hospital_area").combobox('setValue', row.area);
                $("#hospitallist_hospital_address").val(row.address);
                $("#hospitallist_hospital_grade").combobox('setValue', row.grade);
                $("#hospitallist_issign").combobox('setValue', row.issign);
            }
            $("#hospitallist_addeditwin").window("open");
        },

        Cancel: function () {
            HospitalList.ClearInput();
            $("#hospitallist_addeditwin").window("close");
        },

        SaveHospital: function () {

            var hospital_id = $('#hospitallist_hospital_id').val(); 
            var hospital_name = $("#hospitallist_hospital_name").val(); 
            var hospital_linkman = $("#hospitallist_hospital_linkman").val(); 
            var hospital_linktel = $("#hospitallist_hospital_linktel").val();
            var hospital_province = $("#hospitallist_hospital_province").combobox("getValue");
            var hospital_city = $("#hospitallist_hospital_city").combobox("getValue"); 
            var hospital_area = $("#hospitallist_hospital_area").combobox("getValue"); 
            var hospital_address = $("#hospitallist_hospital_address").val();
            var hospital_grade = $("#hospitallist_hospital_grade").combobox("getValue"); 
            var hospital_issign = $("#hospitallist_issign").combobox("getValue"); 
            if (!hospital_name) {
                $.messager.alert('提示', '医院名称不能为空！');
                return;
            }
            if (!hospital_linkman) {
                $.messager.alert('提示', '联系人不能为空！');
                return;
            }
            if (!hospital_linktel) {
                $.messager.alert('提示', '联系电话不能为空！');
                return;
            }
            if (!hospital_province) {
                $.messager.alert('提示', '请选择省份！');
                return;
            }
            if (!hospital_city) {
                $.messager.alert('提示', '请选择城市！');
                return;
            }
            if (!hospital_area) {
                $.messager.alert('提示', '请选择所在区域！');
                return;
            }
            if (!hospital_address) {
                $.messager.alert('提示', '请填写详细地址！');
                return;
            }
            $.ajax({
                type: "post",
                url: "/Handler/BaseInfo/HospitalHandler.ashx",
                dataType: 'json',
                data: {
                    action: "savehospital",
                    hospital_id: hospital_id,
                    hospital_name: hospital_name,
                    hospital_linkman: hospital_linkman,
                    hospital_linktel: hospital_linktel,
                    hospital_province: hospital_province,
                    hospital_city: hospital_city,
                    hospital_area: hospital_area,
                    hospital_address: hospital_address,
                    hospital_grade: hospital_grade,
                    hospital_issign: hospital_issign
                },
                success: function (res) {
                    if (res) {

                        if (res.ret == 0) {
                            HospitalList.ReLoad();
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
        DelHospital: function () {
            var row = $("#hospitallist_tblist").datagrid("getSelected");
            if (!row) {
                $.messager.alert('提示', '请选择要删除的医院！');
            }
            $.messager.confirm('确认', '您确定要删除吗？', function (r) {
                if (r) {
                    $.ajax({
                        type: "post",
                        url: "/Handler/BaseInfo/HospitalHandler.ashx",
                        dataType: 'json',
                        data: {
                            action: "delhospital",
                            hospital_id: row.hospital_id
                        },
                        success: function (res) {
                            if (res) {
                                $.messager.alert('提示', res.msg);
                                if (res.ret == 0) {
                                    HospitalList.ReLoad();
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