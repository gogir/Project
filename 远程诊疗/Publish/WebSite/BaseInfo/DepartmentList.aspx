<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DepartmentList.aspx.cs" Inherits="YCZL.BaseInfo.DepartmentList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<div class="easyui-layout" data-options="fit:true">
 <div data-options="region:'north'" style="height: 65px">
      <div class="pur_top" id="department_toolbar">
    <div style="padding-bottom: 5px; text-align: right;">
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="DepartmentList.AddEdit(0);">增加</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="DepartmentList.AddEdit(1);">修改</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="DepartmentList.DelDepartment();">删除</a>
    </div>
    <div class="remain" id="department_searchtool">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                  科室名称&nbsp;&nbsp;<input id="departmentlist_departmentname" name="departmentlist_departmentname" data-options="prompt:'科室名称'"  type="text" class="easyui-validatebox" style="width:150px;" />
                </td>
                <td>
                    <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="DepartmentList.ReLoad();">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>
 </div>
    <div data-options="region:'west',title:'',border:false,collapsible:false" >
        <table id="department_tblist"></table>
    </div>
    <div data-options="region:'center',title:'',border:false" style="padding:5px;">
        <table id="department_sysfunc"></table>
    </div>
</div>
<div id="department_addeditwin" style="padding-top:10px;text-align:center;" class="easyui-window" data-options="title:'科室编辑',width:300,height:150,
        modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,resizable:false">
    <table class="tab_search" style="margin-left:auto;margin-right:auto; line-height:25px; "  border="0" cellpadding="0" cellspacing="0">        
        <tr>
            <td class="s6">科室名称</td>
            <td>
            <input type="hidden" id="departmentlist_department_id" name="departmentlist_department_id" value="" />
            <input id="departmentlist_department_name" name="departmentlist_department_name" style="width:150px;" type="text" class="easyui-validatebox" />
            </td>
            </tr>       
        <tr>
            <td class="s6">科室描述</td>
            <td><input id="departmentlist_department_remark" name="departmentlist_department_remark" type="text" style="width:150px;" class="easyui-validatebox"  /></td>
        </tr>        
        <tr>
            <td align="center" colspan="2" >
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="DepartmentList.ClearInput();">清空</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="DepartmentList.SaveDepartment();">保存</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="DepartmentList.Cancel();">关闭</a>
            </td>
        </tr>
    </table>
</div>
<!--js-->
<script src="/Scripts/BaseInfo/DepartmentList.js" type="text/javascript"></script>
<script src="/Scripts/EasyUIExtend/parserinput.js" type="text/javascript"></script>