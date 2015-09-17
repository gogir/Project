$(function () {
    $("#drugauditlist_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        collapsible: true,
        url: '/Handler/YLJZ/DrugAuditHandler.ashx?action=drugauditlist&startdate=' + GetNowDateString(false) + "&enddate=" + GetNowDateString(false),
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
                { field: 'drugaudit_time', title: '审核时间', width: 130, align: 'center', halign: 'DateTimeColumn' },
                { field: 'drug_auditer', title: '审核人', width: 100, align: 'center', columntype: 'TextColumn' },
                { field: 'drug_condition', title: '审核意见', width: 150, align: 'left', halign: 'center' }
            ]
        ],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#drugauditlist_tblist').datagrid("selectRow", 0);
            }
        },
        toolbar: "#drugauditlist_toolbar"        
    });
    $("#drugauditlist_tblist").datagrid("keyUpDown");
    $("#drugauditlist_tblist").datagrid("mouseRoll");
});

var DrugAuditList = function () {
    return {
        ReLoad: function () {
            var dtstartdate = $("#drugauditlist_startdate").datebox("getValue");
            var dtenddate = $("#drugauditlist_enddate").datebox("getValue");
            var saudit = $("#drugauditlist_saudit").datebox("getValue");
            if (saudit == undefined || !saudit) saudit = "";
            if (saudit == "-1") saudit = "";
           var dtstart = new Date(dtstartdate);
           var dtend = new Date(dtenddate);
            if (dtstart.getTime() > dtend.getTime()) { $.messager.alert('提示', '开始时间不能大于结束时间'); return; }
            $("#drugauditlist_tblist").datagrid("options").url = '/Handler/YLJZ/DrugAuditHandler.ashx?action=drugauditlist&saudit=' + saudit + '&startdate=' + dtstartdate + "&enddate=" + dtenddate,
            $("#drugauditlist_tblist").datagrid("reload");
        },
        ClearInput: function () {
            $("#drugauditlist_audit").combobox('setValue', "");
            $("#drugauditlist_recipe_id").val("");
            $("#drugauditlist_drug_condition").val("");
        },
        Cancel: function () {
            DrugAuditList.ClearInput();
            $("#drugauditlist_auditwin").window("close");
        },
        AuditWin: function () {
            DrugAuditList.ClearInput();
            var row = $("#drugauditlist_tblist").datagrid("getSelected");
            if (!row) {
                $.messager.alert('提示', '请选择要审核的处方！');
                return;
            }
            drug_audit = row.drug_audit;
            if (row.drug_audit == 0) drug_audit = "";
            $("#drugauditlist_audit").combobox('setValue', drug_audit);
            $("#drugauditlist_recipe_id").val(row.recipe_id);
            $("#drugauditlist_drug_condition").val(row.drug_condition);

            $("#drugauditlist_auditwin").window("open");
        },
        SaveAudit: function () {
            var drug_audit = $("#drugauditlist_audit").combobox('getValue');
            var recipe_id = $("#drugauditlist_recipe_id").val();
            var drug_condition = $("#drugauditlist_drug_condition").val();
            $.ajax({
                type: "post",
                url: "/Handler/YLJZ/DrugAuditHandler.ashx",
                dataType: 'json',
                data: {
                    action: "savedrugaudit",
                    recipe_id: recipe_id,
                    drug_audit: drug_audit,
                    drug_condition: drug_condition
                },
                success: function (res) {
                    if (res) {
                        if (res.ret == 0) {
                            DrugAuditList.Cancel();
                            DrugAuditList.ReLoad();
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