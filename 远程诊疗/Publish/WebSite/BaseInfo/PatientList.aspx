<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="PatientList.aspx.cs" Inherits="YCZL.BaseInfo.PatientList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<div class="easyui-layout" data-options="fit:true">
 <div data-options="region:'north'" style="height: 65px">
      <div class="pur_top" id="patientlist_toolbar">
    <div style="padding-bottom: 5px; text-align: right;">
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="PatientList.AddEdit(0);">增加</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="PatientList.AddEdit(1);">修改</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="PatientList.DelPatient();">删除</a>
    </div>
    <div class="remain" id="patientlist_searchtool">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                  病人姓名&nbsp;&nbsp;<input id="patientlist_patientname" name="patientlist_patientname"  type="text" class="easyui-validatebox" style="width:146px;" />
                </td>
                <td>
                    <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="PatientList.ReLoad();">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>
 </div>
    <div data-options="region:'west',title:'',border:false,collapsible:false">
        <table id="patientlist_tblist"></table>
    </div>
</div>



<div id="patientlist_addeditwin" style="padding-top:10px;text-align:center;" class="easyui-window" data-options="title:'病人档案编辑',width:600,height:250,
        modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,resizable:false">
    <table class="tab_search" style="margin-left:auto;margin-right:auto; line-height:25px; "  border="0" cellpadding="0" cellspacing="0">  
     
        <tr><td></td><td></td><td></td><td></td><td></td><td rowspan=4><img  id="patientlist_patient_img" style=" width:100px;"   src="../images/user.jpg" /><br /><input type="file" id="patientlist_patient_picture" name="patientlist_patient_picture" onchange="PatientList.UpDataImg(this)"  style="display:none;"  /></td></tr> 
          
        <tr>
            <td class="s6">病人姓名</td>
            <td style=" text-align:left;">
            <input type="hidden" id="patientlist_patient_id" name="patientlist_patient_id" value="" />
            <input id="patientlist_patient_name" name="patientlist_patient_name" style="width:146px;" type="text" class="easyui-validatebox" />
            </td>            
            <td class="s6">性别</td>
            <td colspan="2" style=" text-align:left;">
            <input id="patientlist_patient_sex" name="patientlist_patient_sex" style="width:150px;" type="text"  class="easyui-combobox" data-options="valueField:'value',textField:'label',editable:false,data:[{value:'1',label:'男'},{value:'2',label:'女'}],  panelHeight:'auto'"/>
            </td>
            </tr>
            <tr>
            <td class="s6">出生日期</td>
            <td style=" text-align:left;">
            <input id="patientlist_patient_birthday" name="patientlist_patient_birthday" type="text"style="width:150px;" class="easyui-datebox" data-options="editable:false" />
            </td>  
            <td class="s6">手机号</td>
            <td  colspan="2"  style=" text-align:left;">
            <input id="patientlist_patient_tel" type="text"  name="patientlist_patient_tel"  style="width:146px;" class="easyui-validatebox"  />
            </td>         
            </tr> 
            <tr>
           <td class="s6">身份证</td>
            <td>
            <input id="patientlist_id_card" type="text" name="patientlist_id_card"  style="width:146px;" class="easyui-validatebox"  />           
            </td>            
            <td class="s6">　社保卡号</td>
            <td>
            <input id="patientlist_ss_card" type="text" name="patientlist_ss_card"  style="width:146px;" class="easyui-validatebox" />
           </td>           
          
            </tr>
         <tr>
            <td class="s6" style=" vertical-align:top; ">详细地址</td>
            <td colspan="6" >
            <textarea rows="2" id="patientlist_patient_address"  name="patientlist_patient_address"  style=" width:100%;"></textarea>
         </td>
        </tr>
        <tr>
            <td align="right" colspan="6" >
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="PatientList.ClearInput();">清空</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="PatientList.SavePatient();">保存</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="PatientList.Cancel();">关闭</a>
            </td>
        </tr>
    </table>
</div>
<!--js-->
<script src="/Scripts/BaseInfo/PatientList.js" type="text/javascript"></script>
<script src="/Scripts/EasyUIExtend/parserinput.js" type="text/javascript"></script>