<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WinHospital.aspx.cs" Inherits="YCZL.PopWin.WinHospital" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<table id="tabHospitalList"></table>
<!--tb-->
<div id="tb_Hospital" style="padding:5px;">
<input class="easyui-searchbox" id="hospital_search" name="hospital_search" data-options="prompt:'医院名称'" style="width:150px" />
</div>
<!---->
<script type="text/javascript">
    $(function () {
        $("#tabHospitalList").datagrid({
            loadMsg: "数据加载中，请稍后……",
            nowrap: true,
            striped: true,
            fit: true,
            fitColumns: true,
            collapsible: true,
            url: '/Handler/BaseInfo/HospitalHandler.ashx?action=hospitallist',
            pageList: [10, 15, 20, 25, 30, 40, 50],
            pageSize: 10,
            pageNumber: 1,
            remoteSort: true,
            rownumbers: true,
            pagination: true,
            singleSelect: true,
            showFooter: true,
            columns: [
                [
                    { field: 'hospital_name', title: '医院名称', width: 150, align: 'left', columntype: 'TextColumn' },
                    { field: 'linkman', title: '联系人', width: 80, align: 'center', columntype: 'TextColumn' },
                    { field: 'linktel', title: '联系电话', width: 100, align: 'center', columntype: 'TextColumn' },
                    { field: 'province', title: '省', width: 100, align: 'center', columntype: 'TextColumn' },
                    { field: 'city', title: '市', width: 80, align: 'center', columntype: 'TextColumn' },
                    { field: 'area', title: '区', width: 80, align: 'center', columntype: 'TextColumn' },
                    { field: 'address', title: '地址', width: 200, align: 'left', columntype: 'TextColumn' },
//                    { field: 'grade', title: '评分等级', width: 100, align: 'center', columntype: 'TextColumn' },
//                    { field: 'issign', title: '是否签约', width: 60, align: 'center', columntype: 'TextColumn' }
                ]
            ],
            toolbar: "#tb_Hospital",
            onDblClickRow: function () {
                var row = $('#tabHospitalList').datagrid('getSelected');
                $("#" + $.getParentInpId()).val(row.hospital_name);
                $("#" + $.getParentInpId()).attr("alt", row.hospital_name);
                $.closeWin();
            },
            onLoadSuccess: function (data) {
                $('#tabHospitalList').datagrid('insertRow', {
                    index: 0, // 索引从0开始
                    row: {
                        hospital_id: "",
                        hospital_name: '所有'
                    }
                });
                $('#tabHospitalList').datagrid("selectRow", 0);
            }
        });
        $("#" + $.getWinId()).attr("tabindex", 0).focus().bind("keydown", function (event) {
            var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
            if (keyCode == 13) {
                var row = $('#tabHospitalList').datagrid('getSelected');
                $("#" + $.getParentInpId()).val(row.hospital_name);
                $("#" + $.getParentInpId()).attr("alt", row.hospital_name);
                $.closeWin();
            }
        });

        $("#tabHospitalList").datagrid("keyUpDown");
        $("#tabHospitalList").datagrid("mouseRoll");
        //搜索
        $('#hospital_search').searchbox({
            searcher: function (value, name) {
                $('#tabHospitalList').datagrid('options').url = '/Handler/BaseInfo/HospitalHandler.ashx?action=hospitallist&hospital_name=' + escape(value);
                $('#tabHospitalList').datagrid("reload");
            }
        });
    });
</script>

