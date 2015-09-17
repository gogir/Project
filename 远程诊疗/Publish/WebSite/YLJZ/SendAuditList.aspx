<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="SendAuditList.aspx.cs" Inherits="YCZL.YLJZ.SendAuditList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<table id="sendauditlist_tblist"></table>
<!--tb-->
<div id="sendauditlist_toolbar" style="padding:5px; overflow:hidden;">
    <div style="text-align:right;">
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="SendAuditList.ReLoad();">查询</a>
        <a href="javascript:void(0);" id="sendauditlist_btnaudit" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" onclick="SendAuditList.AuditWin();">发药</a>
       <%-- <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="SendAuditList.Delete();">删除</a>--%>
    </div>
    <div style="padding-top:5px;" class="pur_top">
        <table class="tab_search" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>发药日期</td>
                <td class="s6">
                <input id="sendauditlist_startdate" name="sendauditlist_startdate" type="text" class="easyui-datebox" data-options="editable:false,value:GetNowDateString(false)" style="width:100px;" /> - 
                <input id="sendauditlist_enddate" name="sendauditlist_enddate" type="text" class="easyui-datebox" data-options="editable:false,value:GetNowDateString(false)" style="width:100px;" /> 
                </td>

                  <td class="s5">发药状态</td>
                <td class="s6"><select id="sendauditlist_saudit" class="easyui-combobox" style="width:90px;" data-options="editable:false,panelHeight:'auto'"  > 
                        <option value="-1" selected="selected" >全部</option>   
                        <option value="0" >未发药</option>   
                        <option value="1" >已发药</option> 
                </select>  
            </td>
            </tr>
        </table>
    </div>
</div>

<div id="sendauditlist_auditwin" style="padding:5px;" class="easyui-window" data-options="title:'处方发药',width:400,height:200,modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false">

    <table style=" width:100%; text-align:left;" class="tab_search pur_dl" border="0" cellpadding="0" cellspacing="0">
     <tr style=" display:none">           
            <td style=" width:56px;">发药状态</td>
            <td>
            <input type=hidden id="sendauditlist_recipe_id" value="" />
            <select id="sendauditlist_audit" class="easyui-combobox"   data-options="panelHeight:'auto',editable:false">    
                        <option value="0" >未发药</option>   
                        <option value="1" >已发药</option> 
                </select>
            </td>
        </tr>
        <tr>
         <td>发药情况说明</td>
         <td> <textarea id="sendauditlist_drug_condition" rows=3  style=" width:96%;"  ></textarea>
         </td>
        </tr>
         <tr>
            <td colspan=2 style="padding-top:5px;" align="right">
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" onclick="SendAuditList.SaveAudit();">保存</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="SendAuditList.Cancel();">关闭</a>
                &nbsp;&nbsp;
            </td>
        </tr>
    </table>
</div>
<script src="/Scripts/YLJZ/SendAuditList.js" type="text/javascript"></script>
