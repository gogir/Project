<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MedBaseList.aspx.cs" Inherits="YCZL.BaseInfo.MedBaseList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<div class="easyui-layout" data-options="fit:true">
    <div data-options="region:'west',title:'知识类别',collapsible:false" style="width:250px; padding-top:5px;">
        <ul id="medbaselist_categorytree"></ul>
    </div>
    <div data-options="region:'center'" style="padding:5px;">
        <table id="medbaselist_tb"></table>
    </div>
</div>

<div class="pur_top" id="medbaselist_toolbar">
    <div style="padding-bottom: 5px; text-align: right;">
                <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="MedBaseList.AddEditMedBase(0);">增加知识</a>
                <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="MedBaseList.AddEditMedBase(1);">编辑知识</a>
        <a id="companylist_btnRefresh" href="javascript:void(0)" onclick="MedBaseList.ReLoad();"iconcls="icon-reload" class="easyui-linkbutton">刷新</a>
    </div>
    <div class="remain" id="medbaselist_searchtool">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                     类别&nbsp;&nbsp;<input id="medbaselist_medsearch_basesort" name="medbaselist_medsearch_basesort" type="text" class="easyui-validatebox"  />
                </td>
                 <td>
                     适宜性别&nbsp;&nbsp;<input id="medbaselist_medsearch_suitsex" name="medbaselist_medsearch_suitsex" style="width:154px;" type="text"  class="easyui-combobox" data-options="valueField:'label',textField:'label',editable:false,data:[{value:'0',label:'全部'},{value:'1',label:'男'},{value:'2',label:'女'}],panelHeight:'auto'"/>            
                </td>
                 <td>
                     适宜人群&nbsp;&nbsp;<input id="medbaselist_medsearch_suitpeople" name="medbaselist_medsearch_suitpeople" type="text" class="easyui-validatebox"  />
                </td>
                 <td>
                     适宜季节&nbsp;&nbsp;<input id="medbaselist_medsearch_suitseason" name="medbaselist_medsearch_suitseason" type="text" class="easyui-validatebox"  />
                </td>
                 <td>
                     主题&nbsp;&nbsp;<input id="medbaselist_medsearch_title" name="medbaselist_medsearch_title" type="text" class="easyui-validatebox"  />
                </td>
                <td>
                    <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="MedBaseList.ReLoad();">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>

<div id="medbaselist_medbasewin" style="padding-top:10px;" class="easyui-window" data-options="title:'新增编辑知识',width:900,height:520,modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false">
    <table class="tab_search" border="0" cellpadding="0" cellspacing="0">
        <tr>
        <td class="s1">类别</td>
         <td>
            <input type="hidden" id="medbaselist_base_id" value="" />            
            <input type="text" id="medbaselist_basesort" style="width:140px;" class="easyui-validatebox" />
         </td>
         <td class="s1">适宜性别</td>
            <td >
             <input id="medbaselist_suitsex" name="medbaselist_suitsex" style="width:144px;" type="text"  class="easyui-combobox" data-options="valueField:'label',textField:'label',editable:false,data:[{value:'0',label:'全部'},{value:'1',label:'男'},{value:'2',label:'女'}],  panelHeight:'auto'"/>
             </td>
            <td class="s1">适宜人群</td>
            <td >
            <input id="medbaselist_suitpeople" type="text" class="easyui-validatebox" style="width:140px;"  /></td>
            <td class="s1">适宜季节</td>
            <td>
            <input id="medbaselist_suitseason" type="text" class="easyui-validatebox" style="width:140px;" /></td>
        </tr>
        <tr>
            <td class="s1">主题</td>
            <td colspan=7><input id="medbaselist_title"  type="text" style=" width:100%;" class="easyui-validatebox" /></td>
           </tr>
            <tr>
            <td class="s1">内容</td>
            <td colspan=7>
            <textarea id="medbaselist_text"  style=" width:100%; height:350px;" ></textarea>            
            </td>
        </tr>
        <tr>
            <td colspan="8" align="right">
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="MedBaseList.SaveMedBase();">保存</a> 
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="MedBaseList.CancelMedBase();">关闭</a>
            </td>
        </tr>
    </table>
</div>
<!--js-->
<script type="text/javascript" src="/Scripts/BaseInfo/MedBaseList.js" language="javascript"></script>
