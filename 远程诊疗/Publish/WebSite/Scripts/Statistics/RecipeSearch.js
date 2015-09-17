$(function () {
    $("#recipesearchlist_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        url: '/Handler/Statistics/RecipeSearchHandler.ashx?action=recipesearchlist',
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
                { field: 'recipe_id', title: '系统编码', width: 100, align: 'center', columntype: 'TextColumn',hidden: true },
                { field: 'recipe_time', title: '时间', width: 130, align: 'center', columntype: 'DateTimeColumn' },
                { field: 'department_name', title: '科室', width: 80, align: 'left', columntype: 'TextColumn' },
                { field: 'username', title: '病人姓名', width: 60, align: 'center', columntype: 'TextColumn' },
                { field: 'usersex', title: '性别', width: 60, align: 'center', itemlist: '0=,1=男,2=女', columntype: 'TextColumn' },
                {field: 'address', title: '住址', width: 200, align: 'left', columntype: 'TextColumn' },
                { field: 'doctor_name', title: '医生', width: 60, align: 'center', columntype: 'TextColumn' },
                { field: 'goods_name', title: '药品名称', width: 150, align: 'center', columntype: 'TextColumn' },
                { field: 'qty', title: '数量', width: 60, align: 'center', columntype: 'positiveInt', decimaldigits: 0 },
                { field: 'price', title: '价格', width: 60, align: 'center', columntype: 'NumberColumn' },
                { field: 'qty_send', title: '发药数量', width: 60, align: 'center', columntype: 'positiveInt',decimaldigits:0 },
                { field: 'drug_audit', title: '审核状态', width: 60, align: 'center',itemlist: '0=未审核,1=审核通过,2=审核未通过', columntype: 'TextColumn' }
            ]
        ],
        toolbar: "#recipesearchlist_toolbar",
        onLoadSuccess: function (data) {
            $('#recipesearchlist_tblist').datagrid('getCellsSum');
            if (data.total != 0) {
                $('#recipesearchlist_tblist').datagrid("selectRow", 0);
            }
        }
    });
    $("#recipesearchlist_tblist").datagrid("keyUpDown");
    $("#recipesearchlist_tblist").datagrid("mouseRoll");
});
var RecipeSearchList = function () {
    return {
        Reload: function () {
            var dtstartdate = $("#recipesearchlist_startdate").datebox("getValue");
            var dtenddate = $("#recipesearchlist_enddate").datebox("getValue");
            var dtstart = new Date(dtstartdate);
            var dtend = new Date(dtenddate);
            if (dtstart.getTime() > dtend.getTime()) { $.messager.alert('提示', '开始时间不能大于结束时间'); return; }
            $("#recipesearchlist_tblist").datagrid("options").url = "/Handler/Statistics/RecipeSearchHandler.ashx?action=recipesearchlist&startdate=" + dtstartdate + "&enddate=" + dtenddate;
            $("#recipesearchlist_tblist").datagrid("reload");
        }
    }
} ();