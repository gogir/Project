<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TJFXNavigate.aspx.cs" Inherits="YCZL.Navigate.TJFXNavigate" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<div class="easyui-layout" fit="true" >
                <div data-options="region:'center',border:false"">
                    <div id="tab_content" class="func_m">
                        <div class="func_pi contant_in" onclick="AddTab('就诊记录查询','/Statistics/VisitSearch.aspx');">就诊记录查询</div>
                        <div class="func_pi contant_in" onclick="AddTab('医生工作流统计','/Statistics/OrganizationList.aspx');">医生工作流统计</div>
                        <div class="func_pi contant_in" onclick="AddTab('医生满意度统计','/Statistics/OrganizationList.aspx');">医生满意度统计</div>
                        <div class="func_pi contant_in" onclick="AddTab('药房就诊量统计','/Statistics/OrganizationList.aspx');">药房就诊量统计</div>
                        <div class="func_pi contant_in" onclick="AddTab('就诊记录统计','/Statistics/OrganizationList.aspx');">就诊记录统计</div>
                        <div class="func_pi contant_in" onclick="AddTab('病人就诊分析','/Statistics/OrganizationList.aspx');">病人就诊分析</div>
                        <div class="func_pi contant_in" onclick="AddTab('病人就诊统计','/Statistics/OrganizationList.aspx');">病人就诊统计</div>
                        <div class="func_pi contant_in" onclick="AddTab('处方记录查询','/Statistics/RecipeSearch.aspx');">处方记录查询</div>
                        <div class="func_pi contant_in" onclick="AddTab('处方费用统计月报表','/Statistics/OrganizationList.aspx');">处方费用统计月报表</div>
                        <div class="func_pi contant_in" onclick="AddTab('处方药品排名统计','/Statistics/OrganizationList.aspx');">处方药品排名统计</div>
                        <div class="func_pi contant_in" onclick="AddTab('医生处方金额统计','/Statistics/OrganizationList.aspx');">医生处方金额统计</div>
                        <div class="func_pi contant_in" onclick="AddTab('病人平均等待时间统计','/Statistics/OrganizationList.aspx');">病人平均等待时间统计</div>
                        <div class="func_pi contant_in" onclick="AddTab('看诊时间长度统计','/Statistics/OrganizationList.aspx');">看诊时间长度统计</div>
                        <div class="func_pi contant_in" onclick="AddTab('服务诊疗点位置分布','/Statistics/OrganizationList.aspx');">服务诊疗点位置分布</div>
                    </div>
</div>
                <div data-options="region:'south',border:false" style="height:105px;">
                    <div id="tab_content_report" class="func_b">
                       <div class="b_l"><img src="../images/s_b.png" /><p>查询与报表</p></div>
                       <div class="b_r"> </div>  
                    </div>
                </div>
</div>
