<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="HospitalList.aspx.cs" Inherits="YCZL.BaseInfo.HospitalList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<div class="easyui-layout" data-options="fit:true">
 <div data-options="region:'north'" style="height: 65px">
      <div class="pur_top" id="hospitallist_toolbar">
    <div style="padding-bottom: 5px; text-align: right;">
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="HospitalList.AddEdit(0);">增加</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="HospitalList.AddEdit(1);">修改</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="HospitalList.DelHospital();">删除</a>       
    </div>
    <div class="remain" id="hospitallist_searchtool">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                  医院名称&nbsp;&nbsp;<input id="hospitallist_hospitalname" name="hospitallist_hospitalname" data-options="prompt:'医院名称'"  type="text" class="easyui-validatebox" style="width:150px;" />
                </td>
                <td>
                    <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="HospitalList.ReLoad();">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>
 </div>
    <div data-options="region:'west',title:'',border:false,collapsible:false">
        <table id="hospitallist_tblist"></table>
    </div>
</div>

<div id="hospitallist_addeditwin" style="padding-top:10px;text-align:center;" class="easyui-window" data-options="title:'医院档案编辑',width:480,height:260,
        modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,resizable:false">
    <table class="tab_search" style="margin-left:auto;margin-right:auto; line-height:25px; "  border="0" cellpadding="0" cellspacing="0">        
        <tr>
            <td class="s6">医院名称</td>
            <td>
            <input type="hidden" id="hospitallist_hospital_id" name="hospitallist_operator_id" value="" />
            <input id="hospitallist_hospital_name" name="hospitallist_hospital_name" style="width:146px;" type="text" class="easyui-validatebox" />
            </td>
            <td class="s6">评分等级</td>
            <td style=" text-align:left;">
           <input id="hospitallist_hospital_grade" name="hospitallist_hospital_grade" style="width:150px;" type="text"  class="easyui-combobox" data-options="valueField:'value',textField:'label',editable:false,data:[{value:'1',label:'一级'},{value:'2',label:'二级'},{value:'3',label:'三级'},{value:'4',label:'四级'},{value:'5',label:'五级'}],  panelHeight:'auto'"/>
            </td>      
            </tr>
            <tr>
            <td class="s6">　联系人</td>
            <td>
            <input id="hospitallist_hospital_linkman" name="hospitallist_hospital_linkman" style="width:146px;" type="text" class="easyui-validatebox" />
            </td>
            <td class="s6">　联系电话</td>
            <td>
            <input id="hospitallist_hospital_linktel" name="hospitallist_hospital_linktel" style="width:146px;" type="text" class="easyui-validatebox" />
            </td>
            </tr>       
        <tr>
           <td class="s6">省</td>
            <td>
            <input id="hospitallist_hospital_province" type="text" style="width:150px;" class="easyui-combobox" 
           data-options="editable:false,valueField:'name',textField:'name',url:'/Handler/BaseInfo/HospitalHandler.ashx?action=province',
                    onSelect: function(rec){    
                        $('#hospitallist_hospital_city').combobox('clear');
                        $('#hospitallist_hospital_city').combobox('loadData',[{'name':''}]);
                        var url = '/Handler/BaseInfo/HospitalHandler.ashx?action=city&provincename='+escape(rec.name)+ '&temp=' + Math.random() * 100;;    
                        $('#hospitallist_hospital_city').combobox('reload', url);    
                    }"/>           
            </td>
            <td class="s6">市</td>
            <td>
            <input id="hospitallist_hospital_city" type="text"  style="width:150px;" class="easyui-combobox"  data-options="editable:false,valueField:'name',textField:'name',
              onSelect: function(rec){    
             $('#hospitallist_hospital_area').combobox('clear');
            $('#hospitallist_hospital_area').combobox('loadData', [{ 'name': ''}]);
            if (rec) {
                var url = '/Handler/BaseInfo/HospitalHandler.ashx?action=area&cityname=' + escape(rec.name) + '&temp=' + Math.random() * 100;
                $('#hospitallist_hospital_area').combobox('reload', url);
            }
            }
            "/>
            </td>
            </tr>
            <tr>
            <td class="s6">区</td>
            <td>
            <input id="hospitallist_hospital_area" type="text" style="width:150px;" class="easyui-combobox" data-options="editable:false,valueField:'name',textField:'name'"/>
           </td>
            <td class="s6">是否签约</td>
            <td>
             <input id="hospitallist_issign" name="hospitallist_issign" style="width:150px;" type="text"  class="easyui-combobox" data-options="valueField:'value',textField:'label',editable:false,data:[{value:'0',label:'否'},{value:'1',label:'是'}],  panelHeight:'auto'"/>
           </td>
        </tr>        
         <tr>
            <td class="s6" style=" vertical-align:top; ">详细地址</td>
            <td colspan="3"  style=" text-align:left;"><input id="hospitallist_hospital_address" name="hospitallist_hospital_address" style="width:100%;" type="text" class="easyui-validatebox" />            
         </td>
           </tr>        
                       
        <tr>
            <td align="right" colspan="6" >
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="HospitalList.ClearInput();">清空</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="HospitalList.SaveHospital();">保存</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="HospitalList.Cancel();">关闭</a>
            </td>
        </tr>
    </table>
</div>
<!--js-->
<script src="/Scripts/BaseInfo/HospitalList.js" type="text/javascript"></script>
<script src="/Scripts/EasyUIExtend/parserinput.js" type="text/javascript"></script>