<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DoctorList.aspx.cs" Inherits="YCZL.BaseInfo.DoctorList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<div class="easyui-layout" data-options="fit:true">
 <div data-options="region:'north'" style="height: 65px">
      <div class="pur_top" id="doctorlist_toolbar">
    <div style="padding-bottom: 5px; text-align: right;">
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="DoctorList.AddEdit(0);">增加</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="DoctorList.AddEdit(1);">修改</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="DoctorList.DelDoctor();">删除</a>
    </div>
    <div class="remain" id="doctorlist_searchtool">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                  医生姓名&nbsp;&nbsp;<input id="doctorlist_doctorname" name="doctorlist_doctorname" type="text" data-options="prompt:'医生姓名'" class="easyui-validatebox" style="width:146px;" />
                </td>
                <td>
                 医院姓名&nbsp;&nbsp;
                <input readonly="readonly" type="text" class="input-winsame input-window" style="width: 150px;"
                        id="doctorlist_hospital" input-option="id:'doctorlist_hospitalwin',
                        inpid:'doctorlist_hospital',title:'医院',width:800,height:600,
                        url:'/PopWin/WinHospital.aspx'" value="所有"/>
                 </td>
                <td>
                    <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="DoctorList.ReLoad();">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>
 </div>
    <div data-options="region:'west',title:'',border:false,collapsible:false">
        <table id="doctorlist_tblist"></table>
    </div>
</div>

<div id="doctorlist_addeditwin" style="padding-top:10px;text-align:center;" class="easyui-window" data-options="title:'医生档案编辑',width:650,height:320,
        modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,resizable:false">
    <table class="tab_search" style="margin-left:auto;margin-right:auto; line-height:25px; "  border="0" cellpadding="0" cellspacing="0">  
     
        <tr><td></td><td></td><td></td><td></td><td></td><td rowspan="5">
            <img  id="doctorlist_doctor_img" style=" width:100px;"   src="../images/user.jpg" /><br />
            <input type="file" id="doctorlist_doctor_picture" name="doctorlist_doctor_picture" onchange="DoctorList.UpDataImg(this)"  style="display:none;"  />
            </td></tr> 
           <tr>
            <td class="s6">用户名</td>
            <td style=" text-align:left;">
             <input type="hidden" id="doctorlist_user_id" name="doctorlist_user_id" value="" />
            <input id="doctorlist_user_name" name="doctorlist_user_name" style="width:146px;" type="text" class="easyui-validatebox" />
            </td>            
            <td class="s6">密码</td>
            <td><input id="doctorlist_user_password" name="doctorlist_user_password" type="password" style="width:146px;" class="easyui-validatebox"  /></td>
            </tr>
        <tr>
            <td class="s6">医生姓名</td>
            <td style=" text-align:left;">
            <input type="hidden" id="doctorlist_doctor_id" name="doctorlist_doctor_id" value="" />
            <input id="doctorlist_doctor_name" name="doctorlist_doctor_name" style="width:146px;" type="text" class="easyui-validatebox" />
            </td>            
            <td class="s6">性别</td>
            <td colspan="2" style=" text-align:left;">
            <input id="doctorlist_doctor_sex" name="doctorlist_doctor_sex" style="width:150px;" type="text"  class="easyui-combobox" data-options="valueField:'value',textField:'label',editable:false,data:[{value:'1',label:'男'},{value:'2',label:'女'}],  panelHeight:'auto'"/>
            </td>
            </tr>
            <tr>
            <td class="s6">出生日期</td>
            <td style=" text-align:left;">
            <input id="doctorlist_doctor_birthday" name="doctorlist_doctor_birthday" type="text"style="width:150px;" class="easyui-datebox" data-options="editable:false" />
            </td>  
            <td class="s6">职称</td>
            <td  colspan="2"  style=" text-align:left;">
            <input id="doctorlist_doctor_title" type="text"  style="width:146px;" class="easyui-validatebox"  />
            </td>         
            </tr> 
            <tr>
           <td class="s6">所属医院</td>
            <td>
            <input id="doctorlist_doctor_hospital" type="text" style="width:150px;" class="easyui-combobox"  data-options="editable:false,valueField:'id',textField:'name',url:'/Handler/BaseInfo/DoctorHandler.ashx?action=doctorhospitallist'"/>           
            </td>            
            <td class="s6">科室</td>
            <td>
            <input id="doctorlist_doctor_department" type="text" style="width:150px;" class="easyui-combobox" data-options="editable:false,valueField:'id',textField:'name',url:'/Handler/BaseInfo/DoctorHandler.ashx?action=doctordepartmentlist'"/>
           </td>  
            </tr>
            <tr>
            <td class="s6">诊疗费</td>
            <td>
            <input id="doctorlist_doctor_fee" type="text"  style="width:146px;" class="easyui-validatebox" />
            </td>
            <td class="s6">　就诊药房</td>
            <td>
            <input id="doctorlist_doctor_drugstore" type="text" style="width:150px;"  class="easyui-combobox"  
             data-options="editable:false,multiple:true,valueField:'id', textField:'name',url:'/Handler/BaseInfo/DoctorHandler.ashx?action=doctordrugstorelist'"/>
             </td> 
           <td class="s6">　类别</td>
            <td>
            <input id="doctorlist_doctor_sort" type="text" style="width:146px;" class="easyui-validatebox" />           
            </td>
        </tr>
         <tr>
            <td class="s6" style=" vertical-align:top; ">专业介绍</td>
            <td colspan="6" >
            <textarea rows="3" id="doctorlist_doctor_describe"  name="doctorlist_doctor_address"  style=" width:100%;"></textarea>
         </td>
        </tr>

        <tr>
            <td align="right" colspan="6" >
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="DoctorList.ClearInput();">清空</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="DoctorList.SaveDoctor();">保存</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="DoctorList.Cancel();">关闭</a>
            </td>
        </tr>
    </table>
</div>
<%--
<div id="doctorlist_ChenBoxWin" data-options="title:'药房选择',width:650,height:300,modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,resizable:false">
<table id="operatorlist_sysfunc"></table>
</div>
--%>


<!--js-->
<script src="../Scripts/BaseInfo/DoctorList.js" type="text/javascript"></script>
<script src="/Scripts/EasyUIExtend/parserinput.js" type="text/javascript"></script>