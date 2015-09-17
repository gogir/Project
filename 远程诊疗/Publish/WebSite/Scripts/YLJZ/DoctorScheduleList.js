$(function () {
    $("#doctorschedulelist_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        collapsible: true,
        url: '/Handler/YLJZ/DoctorScheduleHandler.ashx?action=doctorschedulelist&startdate=' + GetNowDateString(false) + '&enddate=' + GetNowDateString(false),
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
                { field: 'sh_id', title: '医生编号', width: 130, align: 'center', columntype: 'TextColumn', hidden: true },
                { field: 'doctor_name', title: '医生名称', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'busdate', title: '工作日期', width: 100, align: 'center', columntype: 'DateColumn' },
                { field: 'startdate', title: '开始时间', width: 80, align: 'center', columntype: 'DateColumn' },
                { field: 'enddate', title: '结束时间', width: 80, align: 'center', columntype: 'DateColumn' },
                { field: 'maxnum', title: '预约上限', width: 80, align: 'center', columntype: 'TextColumn' }
            ]
        ],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#doctorschedulelist_tblist').datagrid("selectRow", 0);
            }
        }
    });
    $("#doctorschedulelist_tblist").datagrid("keyUpDown");
    $("#doctorschedulelist_tblist").datagrid("mouseRoll");
});

var DoctorScheduleList = function () {
    return {
        ReLoad: function () {
            DoctorScheduleList.Cancel();
            var doctor_name = $("#doctorschedulelist_doctorname").attr("alt");
            if (doctor_name == undefined || !doctor_name) doctor_name = "";
            if (doctor_name == "所有") doctor_name = "";
            var dtstartdate = $("#doctorschedulelist_search_startdate").datebox("getValue");
            var dtenddate = $("#doctorschedulelist_search_enddate").datebox("getValue");
            var dtstart = new Date(dtstartdate);
            var dtend = new Date(dtenddate);
            if (dtstart.getTime() > dtend.getTime()) { $.messager.alert('提示', '开始时间不能大于结束时间'); return; }
            $("#doctorschedulelist_tblist").datagrid("options").url = "/Handler/YLJZ/DoctorScheduleHandler.ashx?action=doctorschedulelist&doctor_name=" + escape(doctor_name) + '&startdate=' + dtstartdate + "&enddate=" + dtenddate;
            $("#doctorschedulelist_tblist").datagrid("reload");
        },
        ClearInput: function () {
            $("#doctorschedulelist_sh_id").val("");
            $("#doctorschedulelist_doctor_id").val("");
            $("#doctorschedulelist_doctor_name").val("");
            $("#doctorschedulelist_doctor_name").attr("value", "");
            $("#doctorschedulelist_doctor_name").attr("disabled", false);
            $("#doctorschedulelist_date").datebox("setValue", "");
            $("#doctorschedulelist_startdate").timespinner("setValue", "");
            $("#doctorschedulelist_enddate").timespinner("setValue", "");
            $("#doctorschedulelist_maxnum").val("");
        },
        AddEdit: function (type) {
            DoctorScheduleList.ClearInput();
            if (type != 0) {
                var row = $("#doctorschedulelist_tblist").datagrid("getSelected");
                if (!row) {
                    $.messager.alert('提示', '请选择要编辑的医生！');
                    return;
                }
                $("#doctorschedulelist_sh_id").val(row.sh_id);
                $("#doctorschedulelist_doctor_id").val(row.doctor_id)
                $("#doctorschedulelist_doctor_name").val(row.doctor_name)
                $("#doctorschedulelist_doctor_name").attr("disabled", true);
                $("#doctorschedulelist_date").datebox("setValue", row.busdate);
                $("#doctorschedulelist_startdate").timespinner("setValue", row.startdate);
                $("#doctorschedulelist_enddate").timespinner("setValue", row.enddate);
                $("#doctorschedulelist_maxnum").val(row.maxnum);
            }
            $("#doctorschedulelist_addeditwin").window("open");
        },
        Cancel: function () {
            DoctorScheduleList.ClearInput();
            $("#doctorschedulelist_addeditwin").window("close");
        },

        Save: function () {
            var sh_id = $("#doctorschedulelist_sh_id").val();
            var doctors_id = $("#doctorschedulelist_doctor_id").val();
            var doctor_id = doctors_id || $("#doctorschedulelist_doctor_name").attr("value");
            if (doctor_id == undefined || !doctor_id) doctor_id = "";
            if (doctor_id == "所有") doctor_id = "";
            var busdate = $("#doctorschedulelist_date").datebox("getValue");
            var startdate = $("#doctorschedulelist_startdate").timespinner("getValue");
            var enddate = $("#doctorschedulelist_enddate").timespinner("getValue");
            var maxnum = $("#doctorschedulelist_maxnum").val();
            if (!doctor_id) {
                $.messager.alert('提示', '医生不能为空，请选择医生！');
                return;
            }
            if (!busdate) {
                $.messager.alert('提示', '工作日期不能为空！');
                return;
            }
            if (!startdate) {
                $.messager.alert('提示', '请设置开始日期！');
                return;
            }
            if (!enddate) {
                $.messager.alert('提示', '请填设置结束日期！');
                return;
            }

            $.ajax({
                type: "post",
                url: "/Handler/YLJZ/DoctorScheduleHandler.ashx",
                dataType: 'json',
                data: {
                    action: "savedoctorschedule",
                    sh_id: sh_id,
                    doctor_id: doctor_id,
                    busdate: busdate,
                    startdate: startdate,
                    enddate: enddate,
                    maxnum: maxnum
                },
                success: function (res) {
                    if (res) {
                        if (res.ret == 0) {
                            DoctorScheduleList.ReLoad();
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
        Del: function () {
            var row = $("#doctorschedulelist_tblist").datagrid("getSelected");
            if (!row) {
                $.messager.alert('提示', '请选择要删除的用户！');
            }
            $.messager.confirm('确认', '您确定要删除吗？', function (r) {
                if (r) {
                    $.ajax({
                        type: "post",
                        url: "/Handler/YLJZ/DoctorScheduleHandler.ashx",
                        dataType: 'json',
                        data: {
                            action: "deldoctor",
                            sh_id: row.sh_id
                        },
                        success: function (res) {
                            if (res) {
                                $.messager.alert('提示', res.msg);
                                if (res.ret == 0) {
                                    DoctorScheduleList.ReLoad();
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