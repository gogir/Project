<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="RecipeSearch.aspx.cs" Inherits="YCZL.Statistics.RecipeSearch" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<table id="recipesearchlist_tblist"></table>

<div id="recipesearchlist_toolbar" style="padding:5px; overflow:hidden;">
    <div style="text-align:right;">
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="RecipeSearchList.Reload();">查询</a>
    </div>
    <div style="padding-top:5px;" class="pur_top">
        <table class="tab_search" border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>日期</td>
                <td><input id="recipesearchlist_startdate" type="text" class="easyui-datebox" data-options="editable:false,value:GetNowDateString(false)" style="width:100px;" /> - 
                    <input id="recipesearchlist_enddate" type="text" class="easyui-datebox" data-options="editable:false,value:GetNowDateString(false)" style="width:100px;"/>
                 </td>
            </tr>
        </table>
    </div>
</div>
<script src="/Scripts/Statistics/RecipeSearch.js" type="text/javascript"></script>