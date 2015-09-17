<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="BaseInfoNavigate.aspx.cs" Inherits="YCZL.Navigate.BaseInfoNavigate" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<div class="easyui-layout" fit="true" >
                <div data-options="region:'center',border:false"">
                    <div id="tab_content" class="func_m">
                        <div class="func_pi contant_in" onclick="AddTab('用户管理','/BaseInfo/OperatorList.aspx');">用户管理</div>
                        <div class="func_pi contant_in" onclick="AddTab('医院档案','/BaseInfo/HospitalList.aspx');">医院档案</div>
                        <div class="func_pi contant_in" onclick="AddTab('科室档案','/BaseInfo/DepartmentList.aspx');">科室档案</div>
                        <div class="func_pi contant_in" onclick="AddTab('医生档案','/BaseInfo/DoctorList.aspx');">医生档案</div>
                        <div class="func_pi contant_in" onclick="AddTab('药剂师档案','/BaseInfo/DruggistList.aspx');">药剂师档案</div>
                        <div class="func_pi contant_in" onclick="AddTab('病人档案','/BaseInfo/PatientList.aspx');">病人档案</div>
                        <div class="func_pi contant_in" onclick="AddTab('药房档案','/BaseInfo/DrugStoreList.aspx');">药房档案</div>
                        <div class="func_pi contant_in" onclick="AddTab('药品档案','/BaseInfo/GoodsList.aspx');">药品档案</div>
                        <div class="func_pi contant_in" onclick="AddTab('药品配伍禁忌','/BaseInfo/GoodsUnfitList.aspx');">药品配伍禁忌</div>
                        <div class="func_pi contant_in" onclick="AddTab('医疗知识库','/BaseInfo/MedBaseList.aspx');">医疗知识库</div>
                    </div>
</div>
                <div data-options="region:'south',border:false" style="height:105px;">
                    <div id="tab_content_report" class="func_b">
                       <div class="b_l"><img src="../images/s_b.png" /><p>查询与报表</p></div>
                       <div class="b_r"> </div>  
                    </div>
                </div>
</div>
