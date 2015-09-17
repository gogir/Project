$(function () {
    $("#visitsearchlist_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        pageList: [10, 15, 20, 25, 30, 40, 50],
        pageSize: 20,
        pageNumber: 1,
        remoteSort: true,
        rownumbers: true,
        pagination: true,
        singleSelect: false,
        showFooter: true,
        columns: [
            [
                { field: 'visit_id', title: '系统编码', width: 100, align: 'center', columntype: 'TextColumn', hidden: true },
                { field: 'starttime', title: '开始时间', width: 120, align: 'center', columntype: 'DateTimeColumn' },
                { field: 'endtime', title: '结束时间', width: 120, align: 'center', columntype: 'DateTimeColumn' },
                { field: 'hospital_name', title: '医院名称', width: 150, align: 'center', columntype: 'TextColumn' },
                { field: 'drugstore_name', title: '药房名称', width: 150, align: 'center', columntype: 'TextColumn' },
                { field: 'patient_name', title: '病人姓名', width: 60, align: 'center', columntype: 'TextColumn' },
                { field: 'sex', title: '性别', width: 60, align: 'center', itemlist: '0=,1=男,2=女', columntype: 'TextColumn' },
                { field: 'userbirthday', title: '年龄', width: 60, align: 'center', columntype: 'TextColumn' },
                { field: 'department_name', title: '科室', width: 80, align: 'center', columntype: 'TextColumn' },
                { field: 'doctor_name', title: '医生', width: 60, align: 'center', columntype: 'TextColumn' },
                { field: 'fee', title: '诊费', width: 60, align: 'center', columntype: 'NumberColumn' },
                { field: 'score', title: '满意度', width: 100, align: 'center', itemlist: '1=非常不满意,2=不满意,3=一般,4=满意,5=非常满意', columntype: 'TextColumn' },
                { field: 'ipaddress', title: '病人就诊位置', width: 100, align: 'center', columntype: 'TextColumn' }
            ]
        ],
        toolbar: "#visitsearchlist_toolbar",
        onLoadSuccess: function (data) {
            $('#visitsearchlist_tblist').datagrid('getCellsSum');
            if (data.total != 0) {
                $('#visitsearchlist_tblist').datagrid("selectRow", 0);
            }
        }
    });
    $("#visitsearchlist_tblist").datagrid("keyUpDown");
    $("#visitsearchlist_tblist").datagrid("mouseRoll");
});


var VisitSearchList = function () {
    return {
        Reload: function () {
            var dtstartdate = $("#visitsearchlist_startdate").datebox("getValue");
            var dtenddate = $("#visitsearchlist_enddate").datebox("getValue");
            var hospital_name = $("#visitsearchlist_hospital").attr("alt");
            if (hospital_name == undefined || !hospital_name) hospital_name = "";
            if (hospital_name == "所有") hospital_name = "";
            var drugstore_name = $("#visitsearchlist_drugstore").attr("alt");
            if (drugstore_name == undefined || !drugstore_name) drugstore_name = "";
            if (drugstore_name == "所有") drugstore_name = "";
            var doctor_name = $("#visitsearchlist_doctor").attr("alt");
            if (doctor_name == undefined || !doctor_name) doctor_name = "";
            if (doctor_name == "所有") doctor_name = "";
            var dtstart = new Date(dtstartdate);
            var dtend = new Date(dtenddate);
            if (dtstart.getTime() > dtend.getTime()) { $.messager.alert('提示', '开始时间不能大于结束时间'); return; }
            $("#visitsearchlist_tblist").datagrid("options").url = "/Handler/Statistics/VisitSearchHandler.ashx?action=visitsearchlist&startdate=" + dtstartdate + "&enddate=" + dtenddate + " &hospital_name=" + escape(hospital_name) + " &drugstore_name=" + escape(drugstore_name) + " &doctor_name=" + escape(doctor_name);
            $("#visitsearchlist_tblist").datagrid("reload");
        }
    }
} ();