<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DrugAuditList.aspx.cs" Inherits="YCZL.YLJZ.DrugAuditList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<table id="drugauditlist_tblist"></table>
<!--tb-->
<div id="drugauditlist_toolbar" style="padding:5px; overflow:hidden;">
    <div style="text-align:right;">
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="DrugAuditList.ReLoad();">查询</a>
        <a href="javascript:void(0);" id="drugauditlist_btnaudit" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" onclick="DrugAuditList.AuditWin();">审核</a>
       <%-- <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="drugauditlist.Delete();">删除</a>--%>
    </div>
    <div style="padding-top:5px;" class="pur_top">
        <table class="tab_search" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>审核日期</td>
                <td class="s6">
                <input id="drugauditlist_startdate" name="drugauditlist_startdate" type="text" class="easyui-datebox" data-options="editable:false,value:GetNowDateString(false)" style="width:100px;" /> - 
                <input id="drugauditlist_enddate" name="drugauditlist_enddate" type="text" class="easyui-datebox" data-options="editable:false,value:GetNowDateString(false)" style="width:100px;" /> 
                </td>

                  <td class="s5">审核状态</td>
                <td class="s6"><select id="drugauditlist_saudit" class="easyui-combobox" style="width:90px;" data-options="editable:false,panelHeight:'auto'"  > 
                        <option value="-1" selected="selected" >全部</option>   
                        <option value="0" >未审核</option>   
                        <option value="1" >审核通过</option> 
                        <option value="2" >审核未通过</option>     
                </select>  
            </td>
            </tr>
        </table>
    </div>
</div>

<div id="drugauditlist_auditwin" style="padding:5px;" class="easyui-window" data-options="title:'处方审核',width:400,height:200,modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false">

    <table style=" width:100%; text-align:left;" class="tab_search pur_dl" border="0" cellpadding="0" cellspacing="0">
  <tr style=" display:none">              
            <td style=" width:56px;">审核状态</td>
            <td>
            <input type=hidden id="drugauditlist_recipe_id" value="" />
            <select id="drugauditlist_audit" class="easyui-combobox" data-options="panelHeight:'auto',editable:false">   
                    <option value="1">审核通过</option>   
                    <option value="2">审核未通过</option>
                </select>
            </td>
        </tr>
        <tr>
         <td>审核意见</td>
         <td> <textarea id="drugauditlist_drug_condition" rows=3  style=" width:96%;"  ></textarea>
         </td>
        </tr>
         <tr>
            <td colspan=2 style="padding-top:5px;" align="right">
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" onclick="DrugAuditList.SaveAudit();">保存</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="DrugAuditList.Cancel();">关闭</a>
                &nbsp;&nbsp;
            </td>
        </tr>
    </table>
    
</div>


<script src="/Scripts/YLJZ/DrugAuditList.js" type="text/javascript"></script>
