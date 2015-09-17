<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="OperatorList.aspx.cs" Inherits="YCZL.BaseInfo.OperatorList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<div class="easyui-layout" data-options="fit:true">
 <div data-options="region:'north'" style="height: 65px">
      <div class="pur_top" id="operatorlist_toolbar">
    <div style="padding-bottom: 5px; text-align: right;">
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="OperatorList.AddEdit(0);">增加</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="OperatorList.AddEdit(1);">修改</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="OperatorList.DelOperator();">删除</a>
        <%--<a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="OperatorList.SaveLimit();">权限保存</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="OperatorList.SendEmail();">邮件发送</a>--%>
        <a href="javascript:void(0);" id="operatorlist_btnnostop" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="OperatorList.StopOperator(0);">启用</a>
       <a href="javascript:void(0);" id="operatorlist_btnstop" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="OperatorList.StopOperator(1);">停用</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-reload'" onclick="OperatorList.ReLoad();">刷新</a>
    </div>
    <div class="remain" id="operatorlist_searchtool">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                  用户名&nbsp;&nbsp;<input id="operatorlist_operatorname" name="operatorlist_operatorname" data-options="prompt:'用户名'"  type="text" class="easyui-validatebox" style="width:150px;" />
                </td>
                <td>
                    <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="OperatorList.ReLoad();">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>
 </div>
    <div data-options="region:'west',title:'',border:false,collapsible:false" >
        <table id="operatorlist_tblist"></table>
    </div>
   <%-- <div data-options="region:'center',title:'',border:false" style="padding:5px;">
        <table id="operatorlist_sysfunc"></table>
    </div>--%>
</div>



<div id="operatorlist_addeditwin" style="padding-top:10px;text-align:center;" class="easyui-window" data-options="title:'操作员档案编辑',width:300,height:230,
        modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,resizable:false">
    <table class="tab_search" style="margin-left:auto;margin-right:auto; line-height:25px; "  border="0" cellpadding="0" cellspacing="0">
        
        <tr>
            <td class="s6">用户名</td>
            <td>
            <input type="hidden" id="operatorlist_operator_id" name="operatorlist_operator_id" value="" />
            <input id="operatorlist_username" name="operatorlist_operator_name" style="width:150px;" type="text" class="easyui-validatebox" />
            </td>
            </tr>       
        <tr>
            <td class="s6">登录密码</td>
            <td><input id="operatorlist_password" name="operatorlist_password" type="password" style="width:150px;" class="easyui-validatebox"  /></td>
        </tr>
        
         <tr>
            <td class="s6" style=" vertical-align:top; ">操作员</td>
            <td><input id="operatorlist_operator_name" name="operatorlist_operator_name" style="width:150px;" type="text" class="easyui-validatebox" />            
         </td>
        </tr>

         <tr>
            <td class="s6" style=" vertical-align:top; ">登录角色</td>
            <td>
            <select id="operatorlist_usertype" style="width:150px; height:25px; margin-bottom:20px; " class="input-winsame input-window"><option value="0">系统后台</option><option value="1">药房</option><option value="2">药剂师</option><option value="3">医生</option></select>

             </td>
        </tr>

        
        <tr>
            <td align="center" colspan="2" >
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="OperatorList.SaveOperator();">保存</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="OperatorList.Cancel();">关闭</a>
            </td>
        </tr>
    </table>
</div>
<!--js-->
<script src="/Scripts/BaseInfo/OperatorList.js" type="text/javascript"></script>
<script src="/Scripts/EasyUIExtend/parserinput.js" type="text/javascript"></script>