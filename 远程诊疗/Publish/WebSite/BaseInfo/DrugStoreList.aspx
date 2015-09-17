<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DrugStoreList.aspx.cs" Inherits="YCZL.BaseInfo.DrugStoreList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<div class="easyui-layout" data-options="fit:true">
 <div data-options="region:'north'" style="height: 65px">
      <div class="pur_top" id="drugstorelist_toolbar">
    <div style="padding-bottom: 5px; text-align: right;">
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="DrugStoreList.AddEdit(0);">增加</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="DrugStoreList.AddEdit(1);">修改</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="DrugStoreList.DelDrugStore();">删除</a>
    </div>
    <div class="remain" id="drugstorelist_searchtool">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                  药房名称&nbsp;&nbsp;<input id="drugstorelist_drugstorename" name="drugstorelist_drugstorename" data-options="prompt:'药房名称'"  type="text" class="easyui-validatebox" style="width:150px;" />
                </td>
                <td>
                    <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="DrugStoreList.ReLoad();">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>
 </div>
    <div data-options="region:'west',title:'',border:false,collapsible:false">
        <table id="drugstorelist_tblist"></table>
    </div>
</div>

<div id="drugstorelist_addeditwin" style="padding-top:10px;text-align:center;" class="easyui-window" data-options="title:'药房档案编辑',width:500,height:260,
        modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,resizable:false">
    <table class="tab_search" style="margin-left:auto;margin-right:auto; line-height:25px; "  border="0" cellpadding="0" cellspacing="0">  
    <tr>
            <td class="s6">用户名</td>
            <td style=" text-align:left;">
             <input type="hidden" id="drugstorelist_user_id" name="drugstorelist_user_id" value="" />
            <input id="drugstorelist_user_name" name="drugstorelist_user_name" style="width:146px;" type="text" class="easyui-validatebox" />
            </td>            
            <td class="s6">密码</td>
            <td><input id="drugstorelist_user_password" name="drugstorelist_user_password" type="password" style="width:146px;" class="easyui-validatebox"  /></td>
           
        </tr>  
        <tr>
            <td class="s6">药房名称</td>
            <td>
            <input type="hidden" id="drugstorelist_drugstore_id" name="drugstorelist_drugstore_id" value="" />
            <input id="drugstorelist_drugstore_name" name="drugstorelist_drugstore_name" style="width:146px;" type="text" class="easyui-validatebox" />
            </td>
             <td class="s6">评分等级</td>
            <td style=" text-align:left;">
            <input id="drugstorelist_drugstore_grade" name="drugstorelist_drugstore_grade" style="width:150px;" type="text"  class="easyui-combobox" data-options="valueField:'value',textField:'label',editable:false,data:[{value:'1',label:'一级'},{value:'2',label:'二级'},{value:'3',label:'三级'},{value:'4',label:'四级'},{value:'5',label:'五级'}],  panelHeight:'auto'"/>
            </td>   
            </tr>
        <tr>
            <td class="s6">　联系人</td>
            <td>
            <input id="drugstorelist_drugstore_linkman" name="drugstorelist_drugstore_linkman" style="width:146px;" type="text" class="easyui-validatebox" />
            </td>
            <td class="s6">　联系电话</td>
            <td>
            <input id="drugstorelist_drugstore_linktel" name="drugstorelist_drugstore_linktel" style="width:146px;" type="text" class="easyui-validatebox" />
            </td>
            </tr>       
        <tr>
           <td class="s6">省</td>
            <td>
            <input id="drugstorelist_drugstore_province" type="text" style="width:150px;" class="easyui-combobox" 
           data-options="editable:false,valueField:'name',textField:'name',url:'/Handler/BaseInfo/HospitalHandler.ashx?action=province',
                    onSelect: function(rec){    
                        $('#drugstorelist_drugstore_city').combobox('clear');
                        $('#drugstorelist_drugstore_city').combobox('loadData',[{'name':''}]);
                        var url = '/Handler/BaseInfo/HospitalHandler.ashx?action=city&provincename='+escape(rec.name)+ '&temp=' + Math.random() * 100;;    
                        $('#drugstorelist_drugstore_city').combobox('reload', url);    
                    }"/>           
            </td>
            <td class="s6">市</td>
            <td>
            <input id="drugstorelist_drugstore_city" type="text"  style="width:150px;" class="easyui-combobox"  data-options="editable:false,valueField:'name',textField:'name',
              onSelect: function(rec){    
             $('#drugstorelist_drugstore_area').combobox('clear');
            $('#drugstorelist_drugstore_area').combobox('loadData', [{ 'name': ''}]);
            if (rec) {
                var url = '/Handler/BaseInfo/HospitalHandler.ashx?action=area&cityname=' + escape(rec.name) + '&temp=' + Math.random() * 100;
                $('#drugstorelist_drugstore_area').combobox('reload', url);
            }
            }
            "/>
            </td>
          
        </tr>        
         <tr>
           <td class="s6">区</td>
            <td>
            <input id="drugstorelist_drugstore_area" type="text" style="width:150px;" class="easyui-combobox" data-options="editable:false,valueField:'name',textField:'name'"/>
           </td>
              <td class="s6">是否签约</td>
            <td>
             <input id="drugstorelist_issign" name="drugstorelist_issign" style="width:150px;" type="text"  class="easyui-combobox" data-options="valueField:'value',textField:'label',editable:false,data:[{value:'0',label:'否'},{value:'1',label:'是'}],  panelHeight:'auto'"/>
            </td>  
        </tr>        
         <tr>
         <td class="s6" style=" vertical-align:top; ">地址</td>
            <td colspan="3" style=" text-align:left;">
            <input id="drugstorelist_drugstore_address" name="drugstorelist_drugstore_address" style="width:100%;" type="text" class="easyui-validatebox" /></td>
             
        </tr>         
        <tr>
            <td align="right" colspan="6" >
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="DrugStoreList.ClearInput();">清空</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="DrugStoreList.SaveDrugStore();">保存</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="DrugStoreList.Cancel();">关闭</a>
            </td>
        </tr>
    </table>
</div>
<!--js-->
<script src="/Scripts/BaseInfo/DrugStoreList.js" type="text/javascript"></script>
<script src="/Scripts/EasyUIExtend/parserinput.js" type="text/javascript"></script>
