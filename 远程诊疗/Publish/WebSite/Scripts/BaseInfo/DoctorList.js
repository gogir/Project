$(function () {
    $("#doctorlist_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        collapsible: true,
        url: '../Handler/BaseInfo/DoctorHandler.ashx?action=doctorlist',
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
                { field: 'doctor_id', title: '医生编号', width: 130, align: 'center', columntype: 'TextColumn' },
                { field: 'doctor_name', title: '医生名称', width: 80, align: 'left', columntype: 'TextColumn' },
                { field: 'sex', title: '性别', width: 60, align: 'center', itemlist: '0="",1=男,2=女', columntype: 'TextColumn' },
                { field: 'birthday', title: '出生日期', width: 80, align: 'center', columntype: 'DateColumn' },
                { field: 'hospital_name', title: '所属医院', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'title', title: '职称', width: 80, align: 'left', columntype: 'TextColumn' },
                { field: 'fee', title: '诊疗费', width: 60, align: 'center', columntype: 'NumberColumn' },
                { field: 'department_name', title: '科室', width: 80, align: 'left', columntype: 'TextColumn' },
                { field: 'sort', title: '类别', width: 80, align: 'left', columntype: 'TextColumn' },
                { field: 'describe', title: '专业介绍', width: 200, align: 'left', columntype: 'TextColumn' },
                { field: 'drugstores', title: '就诊药房', width: 200, align: 'left', columntype: 'TextColumn',
                    formatter: function (value, row, index) {
                        if (!row.drugstores) return "全部药房";
                        return row.drugstores;
                    }
                 }
            ]
        ],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#doctorlist_tblist').datagrid("selectRow", 0);
            }
        }
    });
    $("#doctorlist_tblist").datagrid("keyUpDown");
    $("#doctorlist_tblist").datagrid("mouseRoll");
    $("#doctorlist_doctor_img").click(function () {
            return $("#doctorlist_doctor_picture").click();
        });
});

var DoctorList = function () {
    return {
        ReLoad: function () {
            DoctorList.Cancel();
            var doctor_name = $("#doctorlist_doctorname").val();
            var hospital_name = $("#doctorlist_hospital").attr("alt");
            if (hospital_name == undefined || !hospital_name) hospital_name = "";
            if (hospital_name == "所有") hospital_name = "";
            $("#doctorlist_tblist").datagrid("options").url = "/Handler/BaseInfo/DoctorHandler.ashx?action=doctorlist&doctor_name=" + escape(doctor_name) + "&hospital_name=" + escape(hospital_name);
            $("#doctorlist_tblist").datagrid("reload");
        },
        ClearInput: function () {
            $("#doctorlist_user_id").val("");
            $("#doctorlist_user_name").val("");
            $("#doctorlist_user_password").val("");
            $("#doctorlist_doctor_id").val("");
            $("#doctorlist_doctor_name").val("");
            $("#doctorlist_doctor_sex").combobox("setValue", "");
            $("#doctorlist_doctor_birthday").datebox("setValue", "");
            $("#doctorlist_doctor_title").val("");
            $("#doctorlist_doctor_hospital").combobox("setValue", "");
            $("#doctorlist_doctor_department").combobox("setValue", "");
            $("#doctorlist_doctor_sort").val("");
            $("#doctorlist_doctor_fee").val("");
            $("#doctorlist_doctor_drugstore").combobox("setValue", "");
            $("#doctorlist_doctor_describe").val("");
            $("#doctorlist_doctor_picture").val("");
            $("#doctorlist_doctor_img").attr("src", "../images/user.jpg");
            $("#doctorlist_user_name").attr("disabled", false);
            $("#doctorlist_user_password").attr("disabled", false);
        },
        AddEdit: function (type) {

            DoctorList.ClearInput();
            if (type != 0) {
                var row = $("#doctorlist_tblist").datagrid("getSelected");
                if (!row) {
                    $.messager.alert('提示', '请选择要编辑的医生！');
                    return;
                }
                $("#doctorlist_user_name").attr("disabled", true);
                $("#doctorlist_user_password").attr("disabled", true);
                $("#doctorlist_user_id").val(row.userid);
                $("#doctorlist_user_name").val(row.username);
                $("#doctorlist_doctor_id").val(row.doctor_id);
                $("#doctorlist_doctor_name").val(row.doctor_name);
                $("#doctorlist_doctor_sex").combobox('setValue', row.sex);
                $("#doctorlist_doctor_birthday").datebox('setValue', row.birthday);
                $("#doctorlist_doctor_title").val(row.title);
                $("#doctorlist_doctor_hospital").combobox('setValue', row.hospital_id);
                $("#doctorlist_doctor_department").combobox('setValue', row.department_id);
                $("#doctorlist_doctor_sort").val(row.sort);
                $("#doctorlist_doctor_fee").val((row.fee * 1).toFixed(2));
                $("#doctorlist_doctor_drugstore").combobox('setValues', row.drugstore.split(','));
                $("#doctorlist_doctor_describe").val(row.describe);
                $("#doctorlist_doctor_img").attr("src", (row.picture + "?" + Math.random() * 100) || "../images/user.jpg");
            }
            $("#doctorlist_addeditwin").window("open");
        },
        Cancel: function () {
            DoctorList.ClearInput();
            $("#doctorlist_addeditwin").window("close");
        },

        SaveDoctor: function () {
            var doctor_user_id = $("#doctorlist_user_id").val();
            var doctor_user_name = $("#doctorlist_user_name").val();
            var doctor_user_password = $("#doctorlist_user_password").val();
            var doctor_id = $("#doctorlist_doctor_id").val();
            var doctor_name = $("#doctorlist_doctor_name").val();
            var doctor_sex = $("#doctorlist_doctor_sex").combobox("getValue");
            var doctor_birthday = $("#doctorlist_doctor_birthday").datebox("getValue");
            var doctor_title = $("#doctorlist_doctor_title").val();
            var doctor_hospital = $("#doctorlist_doctor_hospital").combobox("getValue");
            var doctor_department = $("#doctorlist_doctor_department").combobox("getValue");
            var doctor_sort = $("#doctorlist_doctor_sort").val();
            var doctor_fee = $("#doctorlist_doctor_fee").val();
            var doctor_drugstore = $("#doctorlist_doctor_drugstore").combobox("getValues");
            doctor_drugstore = doctor_drugstore
            var doctor_drugstores = "";
            for (var i = 0; i < doctor_drugstore.length; i++) {
                doctor_drugstores += doctor_drugstore[i] + ",";
            }
            var doctor_describe = $("#doctorlist_doctor_describe").val();
            var doctor_picture = $("#doctorlist_doctor_img").attr("src"); //照片
            if (doctor_picture == "../images/user.jpg") doctor_picture = "";
            if (!doctor_user_name) {
                $.messager.alert('提示', '登录用户名不能为空！');
                return;
            }
            if (!doctor_user_id) {
                if (!doctor_user_password) {
                    $.messager.alert('提示', '登录密码不能为空！');
                    return;
                }
            }
            if (!doctor_name) {
                $.messager.alert('提示', '医生名称不能为空！');
                return;
            }
            if (!doctor_sex) {
                $.messager.alert('提示', '请选择性别！');
                return;
            }
            if (!doctor_birthday) {
                $.messager.alert('提示', '请填写出生日期！');
                return;
            }
            if (!doctor_hospital) {
                $.messager.alert('提示', '请选择所属医院！');
                return;
            }
            if (!doctor_department) {
                $.messager.alert('提示', '请选择所在科室！');
                return;
            }
            if (!doctor_fee) {
                $.messager.alert('提示', '请填写就诊费！');
                return;
            }
            $.ajax({
                type: "post",
                url: "/Handler/BaseInfo/DoctorHandler.ashx",
                dataType: 'json',
                data: {
                    action: "savedoctor",
                    doctor_user_id: doctor_user_id,
                    doctor_user_name: doctor_user_name,
                    doctor_user_password: doctor_user_password,
                    doctor_id: doctor_id,
                    doctor_name: doctor_name,
                    doctor_sex: doctor_sex,
                    doctor_birthday: doctor_birthday,
                    doctor_title: doctor_title,
                    doctor_hospital: doctor_hospital,
                    doctor_department: doctor_department,
                    doctor_sort: doctor_sort,
                    doctor_fee: doctor_fee,
                    doctor_drugstore: doctor_drugstores,
                    doctor_describe: doctor_describe,
                    doctor_picture: doctor_picture
                },
                success: function (res) {
                    if (res) {
                        if (res.ret == 0) {
                            DoctorList.ReLoad();
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
            reader.onload = function (evt) { $("#doctorlist_doctor_img").attr("src", evt.target.result); }
        },
        DelDoctor: function () {

            var row = $("#doctorlist_tblist").datagrid("getSelected");
            if (!row) {
                $.messager.alert('提示', '请选择要删除的用户！');
            }
            $.messager.confirm('确认', '您确定要删除吗？', function (r) {
                if (r) {
                    $.ajax({
                        type: "post",
                        url: "/Handler/BaseInfo/DoctorHandler.ashx",
                        dataType: 'json',
                        data: {
                            action: "deldoctor",
                            doctor_id: row.doctor_id
                        },
                        success: function (res) {
                            if (res) {
                                $.messager.alert('提示', res.msg);
                                if (res.ret == 0) {
                                    DoctorList.ReLoad();
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