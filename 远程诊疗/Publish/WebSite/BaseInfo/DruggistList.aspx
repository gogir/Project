<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DruggistList.aspx.cs" Inherits="YCZL.BaseInfo.DruggistList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<div class="easyui-layout" data-options="fit:true">
 <div data-options="region:'north'" style="height: 65px">
      <div class="pur_top" id="druggistlist_toolbar">
    <div style="padding-bottom: 5px; text-align: right;">
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="DruggistList.AddEdit(0);">增加</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="DruggistList.AddEdit(1);">修改</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="DruggistList.DelDruggist();">删除</a>
    </div>
    <div class="remain" id="druggistlist_searchtool">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                  药剂师姓名&nbsp;&nbsp;<input id="druggistlist_druggistname" name="druggistlist_ddruggistname" type="text" data-options="prompt:'药剂师姓名'" class="easyui-validatebox" style="width:146px;" />
                </td>
                <td>
                    <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="DruggistList.ReLoad();">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>
 </div>
    <div data-options="region:'west',title:'',border:false,collapsible:false">
        <table id="druggistlist_tblist"></table>
    </div>
</div>



<div id="druggistlist_addeditwin" style="padding-top:10px;text-align:center;" class="easyui-window" data-options="title:'药剂师档案编辑',width:460,height:200,
        modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,resizable:false">
    <table class="tab_search" style="margin-left:auto;margin-right:auto; line-height:25px; "  border="0" cellpadding="0" cellspacing="0">  
     
           <tr>
            <td class="s6">用户名</td>
            <td style=" text-align:left;">
             <input type="hidden" id="druggistlist_user_id" name="druggistlist_user_id" value="" />
            <input id="druggistlist_user_name" name="druggistlist_user_name" style="width:146px;" type="text" class="easyui-validatebox" />
            </td>            
            <td class="s6">　密码</td>
            <td><input id="druggistlist_user_password" name="druggistlist_user_password" type="password" style="width:146px;" class="easyui-validatebox"  /></td>
            </tr>
        <tr>
            <td class="s6">药剂师名称</td>
            <td style=" text-align:left;">
            <input type="hidden" id="druggistlist_druggist_id" name="druggistlist_druggist_id" value="" />
            <input id="druggistlist_druggist_name" name="druggistlist_druggist_name" style="width:146px;" type="text" class="easyui-validatebox" />
            </td>            
            <td class="s6">性别</td>
            <td colspan="2" style=" text-align:left;">
            <input id="druggistlist_druggist_sex" name="druggistlist_druggist_sex" style="width:150px;" type="text"  class="easyui-combobox" data-options="valueField:'value',textField:'label',editable:false,data:[{value:'1',label:'男'},{value:'2',label:'女'}],  panelHeight:'auto'"/>
            </td>
            </tr>
            <tr>
            <td class="s6">出生日期</td>
            <td style=" text-align:left;">
            <input id="druggistlist_druggist_birthday" name="druggistlist_druggist_birthday" type="text"style="width:150px;" class="easyui-datebox" data-options="editable:false" />
            </td>  
            <td class="s6">职称</td>
            <td  colspan="2"  style=" text-align:left;">
            <input id="druggistlist_druggist_title" type="text"  style="width:146px;" class="easyui-validatebox"  />
            </td>         
            </tr> 
            <tr>
           <td class="s6">所属医院</td>
            <td>
            <input id="druggistlist_druggist_hospital" type="text" style="width:150px;" class="easyui-combobox"  data-options="editable:false,valueField:'id',textField:'name',url:'/Handler/BaseInfo/DruggistHandler.ashx?action=druggisthospitallist'"/>           
            </td>             
            </tr>
        <tr>
            <td align="right" colspan="6" >
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="DruggistList.ClearInput();">清空</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="DruggistList.SaveDruggist();">保存</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="DruggistList.Cancel();">关闭</a>
            </td>
        </tr>
    </table>
</div>
<!--js-->
<script src="/Scripts/BaseInfo/DruggistList.js" type="text/javascript"></script>
<script src="/Scripts/EasyUIExtend/parserinput.js" type="text/javascript"></script>