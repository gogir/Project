<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DoctorScheduleList.aspx.cs" Inherits="YCZL.YLJZ.DoctorScheduleList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<div class="easyui-layout" data-options="fit:true">
 <div data-options="region:'north'" style="height: 65px">
      <div class="pur_top" id="doctorschedulelist_toolbar">
    <div style="padding-bottom: 5px; text-align: right;">
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="DoctorScheduleList.AddEdit(0);">增加</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-edit'" onclick="DoctorScheduleList.AddEdit(1);">修改</a>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="DoctorScheduleList.Del();">删除</a>
    </div>
    <div class="remain" id="doctorschedulelist_searchtool">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>工作日期&nbsp;&nbsp;<input id="doctorschedulelist_search_startdate" type="text" class="easyui-datebox" data-options="editable:false,value:GetNowDateString(false)" style="width:100px;" /> - 
                    <input id="doctorschedulelist_search_enddate" type="text" class="easyui-datebox" data-options="editable:false,value:GetNowDateString(false)" style="width:100px;"/>
                 </td>
                <td>
                  医生姓名&nbsp;&nbsp;
                      <input readonly="readonly" id="doctorschedulelist_doctorname" type="text" class="input-winsame input-window" style="width: 146px;"
           class="input-winsame input-window" input-option="id:'doctorschedulelist_doctorwin','audit':'0',
                        inpid:'doctorschedulelist_doctorname',title:'医生',width:600,height:500,
                        url:'/PopWin/WinDoctor.aspx'" value="所有"/>
                </td>
                <td>
                    <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="DoctorScheduleList.ReLoad();">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>
 </div>
    <div data-options="region:'west',title:'',border:false,collapsible:false">
        <table id="doctorschedulelist_tblist"></table>
    </div>
</div>

<div id="doctorschedulelist_addeditwin" style="padding-top:10px;text-align:center;" class="easyui-window" data-options="title:'医生预约排班设置',width:530,height:200,
        modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,resizable:false">
    <table class="tab_search" style="margin-left:auto;margin-right:auto; line-height:25px; "  border="0" cellpadding="0" cellspacing="0"> 
        <tr>
            <td class="s6">医生姓名</td>
            <td style=" text-align:left;">
            <input type="hidden" id="doctorschedulelist_sh_id" name="doctorschedulelist_sh_id" value="" />
            <input type="hidden" id="doctorschedulelist_doctor_id" name="doctorschedulelist_doctor_id" value="" />
             <input readonly="readonly" id="doctorschedulelist_doctor_name" type="text" class="input-winsame input-window" style="width: 146px;"
           class="input-winsame input-window" input-option="id:'doctorschedulelist_doctorwin','audit':'0',
                        inpid:'doctorschedulelist_doctor_name',title:'医生',width:600,height:500,
                        url:'/PopWin/WinDoctor.aspx'" value="所有"/>
            </td>            
            <td class="s6">　工作日期</td>
            <td colspan="2" style=" text-align:left;">
            <input id="doctorschedulelist_date" name="doctorschedulelist_date" style="width:150px;" type="text"  class="easyui-datebox" data-options="editable:false"/>
            </td>
            </tr>
            <tr>
            <td class="s6">开始时间</td>
            <td style=" text-align:left;">
            <input id="doctorschedulelist_startdate" class="easyui-timespinner"  style="width:150px;" data-options="min:'08:00',showSeconds:false,editable:false" />  
            </td>  
            <td class="s6">结束时间</td>
            <td  colspan="2"  style=" text-align:left;">
            <input id="doctorschedulelist_enddate" type="text" style="width:150px;" class="easyui-timespinner" data-options="min:'08:00',showSeconds:false,editable:false"   />
            </td>         
            </tr> 
            <tr>
           <td class="s6">预约上限</td>
            <td>
            <input id="doctorschedulelist_maxnum" type="text" style="width:146px;" class="easyui-validatebox" />           
            </td>
            </tr>
        <tr>
            <td align="right" colspan="6" >
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="DoctorScheduleList.ClearInput();">清空</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="DoctorScheduleList.Save();">保存</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="DoctorScheduleList.Cancel();">关闭</a>
            </td>
        </tr>
    </table>
</div>
<!--js-->
<script src="/Scripts/YLJZ/DoctorScheduleList.js" type="text/javascript"></script>
<script src="/Scripts/EasyUIExtend/parserinput.js" type="text/javascript"></script>