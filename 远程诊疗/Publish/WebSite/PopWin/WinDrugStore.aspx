<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WinDrugStore.aspx.cs" Inherits="YCZL.PopWin.WinDrugStore" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<table id="tabDrugStoreList"></table>
<!--tb-->
<div id="tb_DrugStore" style="padding:5px;">
<input class="easyui-searchbox" id="drugstore_search" name="drugstore_search" data-options="prompt:'药房名称'" style="width:150px" />
</div>
<!---->
<script type="text/javascript">
    $(function () {
        $("#tabDrugStoreList").datagrid({
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
                { field: 'drugstore_name', title: '药房名称', width: 150, align: 'left', columntype: 'TextColumn' },
                { field: 'linkman', title: '联系人', width: 80, align: 'center', columntype: 'TextColumn' },
                { field: 'linktel', title: '联系电话', width: 100, align: 'center', columntype: 'TextColumn' },
                { field: 'province', title: '省', width: 100, align: 'center', columntype: 'TextColumn' },
                { field: 'city', title: '市', width: 80, align: 'center', columntype: 'TextColumn' },
                { field: 'area', title: '区', width: 80, align: 'center', columntype: 'TextColumn' },
                { field: 'address', title: '地址', width: 100, align: 'center', columntype: 'TextColumn' }
            ]
            ],
            toolbar: "#tb_DrugStore",
            onDblClickRow: function () {
                var row = $('#tabDrugStoreList').datagrid('getSelected');
                $("#" + $.getParentInpId()).val(row.drugstore_name);
                $("#" + $.getParentInpId()).attr("alt", row.drugstore_name);
                $.closeWin();
            },
            onLoadSuccess: function (data) {
                $('#tabDrugStoreList').datagrid('insertRow', {
                    index: 0, // 索引从0开始
                    row: {
                        drugstore_id: "",
                        drugstore_name: '所有'
                    }
                });
                $('#tabDrugStoreList').datagrid("selectRow", 0);
            }
        });
        $("#" + $.getWinId()).attr("tabindex", 0).focus().bind("keydown", function (event) {
            var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
            if (keyCode == 13) {
                var row = $('#tabDrugStoreList').datagrid('getSelected');
                $("#" + $.getParentInpId()).val(row.drugstore_name);
                $("#" + $.getParentInpId()).attr("alt", row.drugstore_name);
                $.closeWin();
            }
        });

        $("#tabDrugStoreList").datagrid("keyUpDown");
        $("#tabDrugStoreList").datagrid("mouseRoll");
        //搜索
        $('#drugstore_search').searchbox({
            searcher: function (value, name) {
                $('#tabDrugStoreList').datagrid('options').url = '/Handler/BaseInfo/DrugStoreHandler.ashx?action=drugstorelist&drugstore_name=' + escape(value);
                $('#tabDrugStoreList').datagrid("reload");
            }
        });
    });
</script>
