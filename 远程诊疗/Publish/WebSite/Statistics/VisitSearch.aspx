<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="VisitSearch.aspx.cs" Inherits="YCZL.Statistics.VisitSearch" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<table id="visitsearchlist_tblist"></table>

<div id="visitsearchlist_toolbar" style="padding:5px; overflow:hidden;">
    <div style="text-align:right;">
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="VisitSearchList.Reload();">查询</a>
    </div>
    <div style="padding-top:5px;" class="pur_top">
        <table class="tab_search" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>就诊日期</td>
                <td><input id="visitsearchlist_startdate" type="text" class="easyui-datebox" data-options="editable:false,value:GetNowDateString(false)" style="width:100px;" /> - 
                    <input id="visitsearchlist_enddate" type="text" class="easyui-datebox" data-options="editable:false,value:GetNowDateString(false)" style="width:100px;"/>
                 </td>
                 <td>医院</td>
                 <td>
                    <input readonly="readonly" type="text" class="input-winsame input-window" style="width: 150px;"
                        id="visitsearchlist_hospital" input-option="id:'visitsearchlist_hospitalwin',
                        inpid:'visitsearchlist_hospital',title:'医院',width:800,height:600,
                        url:'/PopWin/WinHospital.aspx'" value="所有"/>
                   </td>
                 <td>药房</td>
                <td><input readonly="readonly" id="visitsearchlist_drugstore" type="text" style="width:150px;"  class="input-winsame input-window"  
                input-option="id:'visitsearchlist_drugstorewin',
                        inpid:'visitsearchlist_drugstore',title:'药房',width:800,height:600,
                        url:'/PopWin/WinDrugStore.aspx'" value="所有"/></td>
                 <td>医生</td>
                <td><input readonly="readonly" id="visitsearchlist_doctor" type="text"  style="width:150px;"  class="input-winsame input-window" 
                input-option="id:'visitsearchlist_doctorwin',
                        inpid:'visitsearchlist_doctor',title:'医生',width:600,height:500,
                        url:'/PopWin/WinDoctor.aspx'" value="所有"/></td>
            </tr>
        </table>
    </div>
</div>
<script src="/Scripts/Statistics/VisitSearch.js" type="text/javascript"></script>
<script src="/Scripts/EasyUIExtend/parserinput.js" type="text/javascript"></script>