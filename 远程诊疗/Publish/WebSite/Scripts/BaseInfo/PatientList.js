$(function () {
    $("#patientlist_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        collapsible: true,
        url: '../Handler/BaseInfo/PatientHandler.ashx?action=patientlist',
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
                { field: 'patient_id', title: '病人编号', width: 130, align: 'center', columntype: 'TextColumn',hidden:true},
                { field: 'patient_name', title: '病人名称', width: 80, align: 'center', columntype: 'TextColumn' },
                { field: 'sex', title: '性别', width: 60, align: 'center', itemlist: '0="",1=男,2=女', columntype: 'TextColumn' },
                { field: 'birthday', title: '出生日期', width: 80, align: 'center', columntype: 'DateColumn' },
                { field: 'tel', title: '电话', width: 100, align: 'center', columntype: 'TextColumn' },
                { field: 'id_card', title: '身份证号', width: 130, align: 'center', columntype: 'TextColumn' },
                { field: 'ss_card', title: '社保号', width: 130, align: 'center', columntype: 'TextColumn' },
                { field: 'address', title: '地址', width: 200, align: 'left', columntype: 'TextColumn' }
            ]
        ],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#patientlist_tblist').datagrid("selectRow", 0);
            }
        }
    });
    $("#patientlist_tblist").datagrid("keyUpDown");
    $("#patientlist_tblist").datagrid("mouseRoll");
    $("#patientlist_patient_img").click(function () {
        return $("#patientlist_patient_picture").click();
    });
});

var PatientList = function () {
    return {
        ReLoad: function () {
            PatientList.Cancel();
            var patient_name = $("#patientlist_patientname").val();
            $("#patientlist_tblist").datagrid("options").url = "/Handler/BaseInfo/PatientHandler.ashx?action=patientlist&patient_name=" + escape(patient_name);
            $("#patientlist_tblist").datagrid("reload");
        },

        ClearInput: function () {
            $("#patientlist_patient_id").val("");
            $("#patientlist_patient_name").val("");
            $("#patientlist_patient_sex").val("");
            $("#patientlist_patient_birthday").val("");
            $("#patientlist_patient_tel").val("");
            $("#patientlist_id_card").val("");
            $("#patientlist_ss_card").val("");
            $("#patientlist_patient_address").val("");
            $("#patientlist_patient_picture").val("");
            $("#patientlist_patient_img").attr("src", "../images/user.jpg");
        },
        AddEdit: function (type) {
            PatientList.ClearInput();
            if (type != 0) {
                var row = $("#patientlist_tblist").datagrid("getSelected");
                if (!row) {
                    $.messager.alert('提示', '请选择要编辑的病人！');
                    return;
                }
                $("#patientlist_patient_id").val(row.patient_id);
                $("#patientlist_patient_name").val(row.patient_name);
                $("#patientlist_patient_sex").combobox('setValue', row.sex);
                $("#patientlist_patient_birthday").datebox('setValue', row.birthday);
                $("#patientlist_patient_tel").val(row.tel);
                $("#patientlist_id_card").val(row.id_card);
                $("#patientlist_ss_card").val(row.ss_card);
                $("#patientlist_patient_address").val(row.address);
                $("#patientlist_patient_img").attr("src", (row.picture + "?" + Math.random() * 100)|| "../images/user.jpg");
            }
            $("#patientlist_addeditwin").window("open");
        },

        Cancel: function () {
            PatientList.ClearInput();
            $("#patientlist_addeditwin").window("close");
        },

        SavePatient: function () {
            var patient_id = $("#patientlist_patient_id").val();
            var patient_name = $("#patientlist_patient_name").val();
            var patient_sex = $("#patientlist_patient_sex").combobox("getValue");
            var patient_birthday = $("#patientlist_patient_birthday").datebox("getValue");
            var patient_tel = $("#patientlist_patient_tel").val();
            var patient_id_card = $("#patientlist_id_card").val();
            var patient_ss_card = $("#patientlist_ss_card").val();
            var patient_address = $("#patientlist_patient_address").val();
            var patient_picture = $("#patientlist_patient_img").attr("src"); //照片
            if (patient_picture == "../images/user.jpg") patient_picture = "";            
            if (!patient_name) {
                $.messager.alert('提示', '病人名称不能为空！');
                return;
            }
            if (!patient_sex) {
                $.messager.alert('提示', '请选择性别！');
                return;
            }
            if (!patient_birthday) {
                $.messager.alert('提示', '请填写出生日期！');
                return;
            }
            if (!patient_tel) {
                $.messager.alert('提示', '请填写手机号码！');
                return;
            }
            $.ajax({
                type: "post",
                url: "/Handler/BaseInfo/PatientHandler.ashx",
                dataType: 'json',
                data: {
                    action: "savepatient",
                    patient_id: patient_id,
                    patient_name: patient_name,
                    patient_sex: patient_sex,
                    patient_birthday: patient_birthday,
                    patient_tel: patient_tel,
                    patient_id_card: patient_id_card,
                    patient_ss_card: patient_ss_card,
                    patient_address: patient_address,
                    patient_picture: patient_picture
                },
                success: function (res) {
                    if (res) {
                        if (res.ret == 0) {
                            PatientList.ReLoad();
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
        UpDataImg: function (event) {
            var img = event.files[0];
            if (!img) {
                return;
            }
            if (!(img.type.indexOf('image') == 0 && img.type && /\.(?:jpg|png|gif)$/.test(img.name))) {
                $.messager.alert('提示', '图片格式错误，图片只能是jpg,gif,png！');
                return;
            }
            var reader = new FileReader();
            reader.readAsDataURL(img);
            reader.onload = function (evt) { $("#patientlist_patient_img").attr("src", evt.target.result); }
        },
        DelPatient: function () {
            var row = $("#patientlist_tblist").datagrid("getSelected");
            if (!row) {
                $.messager.alert('提示', '请选择要删除的用户！');
            }
            $.messager.confirm('确认', '您确定要删除吗？', function (r) {
                if (r) {
                    $.ajax({
                        type: "post",
                        url: "/Handler/BaseInfo/PatientHandler.ashx",
                        dataType: 'json',
                        data: {
                            action: "delpatient",
                            patient_id: row.patient_id
                        },
                        success: function (res) {
                            if (res) {
                                $.messager.alert('提示', res.msg);
                                if (res.ret == 0) {
                                    PatientList.ReLoad();
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