<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="WinDoctor.aspx.cs" Inherits="YCZL.PopWin.WinDoctor" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<table id="tabDoctorList"></table>
<!--tb-->
<div id="tb_Doctor" style="padding:5px;">
<input class="easyui-searchbox" id="doctor_search" name="doctor_search" data-options="prompt:'医生名称'" style="width:150px" />
</div>
<!---->
<script type="text/javascript">
    $(function () {
        $("#tabDoctorList").datagrid({
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
                { field: 'doctor_name', title: '医生名称', width: 80, align: 'center', columntype: 'TextColumn' },
                { field: 'sex', title: '性别', width: 60, align: 'center', itemlist: '0="",1=男,2=女', columntype: 'TextColumn' },
                { field: 'birthday', title: '出生日期', width: 80, align: 'center', columntype: 'DateColumn' },
                { field: 'hospital_name', title: '所属医院', width: 100, align: 'center', columntype: 'TextColumn' },
                { field: 'title', title: '职称', width: 80, align: 'center', columntype: 'TextColumn' },
                { field: 'fee', title: '诊疗费', width: 60, align: 'center', columntype: 'NumberColumn' },
                { field: 'department_name', title: '科室', width: 80, align: 'center', columntype: 'TextColumn' }
            ]
            ],
            toolbar: "#tb_Doctor",
            onDblClickRow: function () {
                var row = $('#tabDoctorList').datagrid('getSelected');
                $("#" + $.getParentInpId()).val(row.doctor_name);
                $("#" + $.getParentInpId()).attr("alt", row.doctor_name);
                $("#" + $.getParentInpId()).attr("value", row.doctor_id);
                $.closeWin();
            },
            onLoadSuccess: function (data) {
                $('#tabDoctorList').datagrid('insertRow', {
                    index: 0, // 索引从0开始                  
                    row: {
                        doctor_id: "",
                        doctor_name: '所有'
                    }
                });
                $('#tabDoctorList').datagrid("selectRow", 0);
            }
        });
        $("#" + $.getWinId()).attr("tabindex", 0).focus().bind("keydown", function (event) {
            var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
            if (keyCode == 13) {
                var row = $('#tabDoctorList').datagrid('getSelected');
                $("#" + $.getParentInpId()).val(row.doctor_name);
                $("#" + $.getParentInpId()).attr("alt", row.doctor_name);
                $("#" + $.getParentInpId()).attr("value", row.doctor_id);
                $.closeWin();
            }
        });

        $("#tabDoctorList").datagrid("keyUpDown");
        $("#tabDoctorList").datagrid("mouseRoll");
        //搜索
        $('#doctor_search').searchbox({
            searcher: function (value, name) {
                $('#tabDoctorList').datagrid('options').url = '/Handler/BaseInfo/DoctorHandler.ashx?action=doctorlist&doctor_name=' + escape(value);
                $('#tabDoctorList').datagrid("reload");
            }
        });
    });
</script>
