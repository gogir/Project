<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="YFGLNavigate.aspx.cs" Inherits="YCZL.Navigate.YFGLNavigate" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<div class="easyui-layout" fit="true" >
                <div data-options="region:'center',border:false"">
                    <div id="tab_content" class="func_m">
                        <div class="func_pi contant_in" onclick="AddTab('处方发药登记','/YLJZ/SendAuditList.aspx');">处方发药登记</div>
                    </div>
</div>
                <div data-options="region:'south',border:false" style="height:105px;">
                    <div id="tab_content_report" class="func_b">
                       <div class="b_l"><img src="../images/s_b.png" /><p>查询与报表</p></div>
                       <div class="b_r"> </div>  
                    </div>
                </div>
</div>