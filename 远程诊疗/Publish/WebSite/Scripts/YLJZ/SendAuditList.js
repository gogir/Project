$(function () {
    $("#sendauditlist_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        collapsible: true,
        url: '/Handler/YLJZ/SendAuditHandler.ashx?action=sendauditlist&startdate=' + GetNowDateString(false) + "&enddate=" + GetNowDateString(false),
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
                { field: 'patient_name', title: '病人名称', width: 100, align: 'center', columntype: 'center' },
                { field: 'department_id', title: '科室名称', width: 80, align: 'left', halign: 'center' },
                { field: 'diagnosis', title: '诊断病因', width: 150, align: 'left', halign: 'center' },
                { field: 'doctor_id', title: '医生名称', width: 100, align: 'left', halign: 'center' },
                { field: 'drugstore_id', title: '药店名称', width: 130, align: 'left', halign: 'center' },
                { field: 'recipe_time', title: '处方时间', width: 130, align: 'center', halign: 'DateTimeColumn' }, 
                { field: 'drug_audit', title: '审核状态', width: 80, align: 'center', columntype: 'TextColumn', itemlist: '0=未审核,1=审核通过,2=审核未通过' },                
                { field: 'send_audit', title: '发药状态', width: 80, align: 'center', columntype: 'TextColumn', itemlist: '0=未发药,1=已发药' },
                { field: 'send_time', title: '发药时间', width: 130, align: 'center', halign: 'DateTimeColumn' },
                { field: 'send_auditer', title: '发药人', width: 100, align: 'center', columntype: 'TextColumn' },
                { field: 'send_condition', title: '发药意见', width: 150, align: 'left', halign: 'center' }
            ]
        ],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#sendauditlist_tblist').datagrid("selectRow", 0);
            }
        },
        toolbar: "#sendauditlist_toolbar"
    });
    $("#sendauditlist_tblist").datagrid("keyUpDown");
    $("#sendauditlist_tblist").datagrid("mouseRoll");
});

var SendAuditList = function () {
    return {
        ReLoad: function () {
            var dtstartdate = $("#sendauditlist_startdate").datebox("getValue");
            var dtenddate = $("#sendauditlist_enddate").datebox("getValue");
            var saudit = $("#sendauditlist_saudit").datebox("getValue");
            if (saudit == undefined || !saudit) saudit = "";
            if (saudit == "-1") saudit = "";
            var dtstart = new Date(dtstartdate);
            var dtend = new Date(dtenddate);
            if (dtstart.getTime() > dtend.getTime()) { $.messager.alert('提示', '开始时间不能大于结束时间'); return; }
            $("#sendauditlist_tblist").datagrid("options").url = '/Handler/YLJZ/SendAuditHandler.ashx?action=sendauditlist&saudit=' + saudit + '&startdate=' + dtstartdate + "&enddate=" + dtenddate,
            $("#sendauditlist_tblist").datagrid("reload");
        },
        ClearInput: function () {
            $("#sendauditlist_audit").combobox('setValue', "");
            $("#sendauditlist_recipe_id").val("");
            $("#sendauditlist_drug_condition").val("");
        },
        Cancel: function () {
            SendAuditList.ClearInput();
            $("#sendauditlist_auditwin").window("close");
        },
        AuditWin: function () {
            SendAuditList.ClearInput();
            var row = $("#sendauditlist_tblist").datagrid("getSelected");
            if (!row) {
                $.messager.alert('提示', '请选择要审核的处方！');
                return;
            }
           
            $("#sendauditlist_audit").combobox('setValue', row.send_audit);
            $("#sendauditlist_recipe_id").val(row.recipe_id);
            $("#sendauditlist_drug_condition").val(row.send_condition);

            $("#sendauditlist_auditwin").window("open");
        },
        SaveAudit: function () {
            var send_audit = $("#sendauditlist_audit").combobox('getValue');
            var recipe_id = $("#sendauditlist_recipe_id").val();
            var send_condition = $("#sendauditlist_drug_condition").val();
            $.ajax({
                type: "post",
                url: "/Handler/YLJZ/SendAuditHandler.ashx",
                dataType: 'json',
                data: {
                    action: "savesendaudit",
                    recipe_id: recipe_id,
                    send_audit: send_audit,
                    send_condition: send_condition
                },
                success: function (res) {
                    if (res) {
                        if (res.ret == 0) {
                            SendAuditList.Cancel();
                            SendAuditList.ReLoad();
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
        Delete: function () {


        }
    }

} ();