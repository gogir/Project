<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Main.aspx.cs" Inherits="YCZL.Main" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>远程诊疗系统</title>
    <link href="/Style/themes/metro-blue/easyui.css" rel="stylesheet" type="text/css" />
    <link href="/Style/themes/icon.css" rel="stylesheet" type="text/css" />
    <link href="/Style/base.css" rel="stylesheet" type="text/css" />
    <script src="/Scripts/Common/jquery.min.js" type="text/javascript"></script>
    <script src="/Scripts/Common/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="/Scripts/Common/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <script src="/Scripts/Common/jquery.mousewheel.js" type="text/javascript"></script>
    <script src="/Scripts/EasyUIExtend/datagrid.extend.js" type="text/javascript"></script>
    <script src="/Scripts/EasyUIExtend/inputdata.extend.js" type="text/javascript"></script>
    <script src="/Scripts/EasyUIExtend/tree.loadfilter.extend.js" type="text/javascript"></script>
    <script src="/Scripts/AppUtils.js" type="text/javascript"></script>
    <script src="/Scripts/main.js" type="text/javascript"></script>
    <style type="text/css">
        .tabcls
        {
            padding: 5px;
        }
    </style>
</head>
<body class="easyui-layout">
    <div data-options="region:'north'" style="height: 105px">
        <div class="toplogo">
            <div class="logo">
                远程诊疗系统</div>
            <div class="logo_state">
                <ul>
                    <li>登录用户：<%=operator_name%></li>
                    <li>登录时间：<%=DateTime.Now.ToShortDateString() %></li>
                    <li><a href="javascript:void(0);" onclick="javascript:$('#mainbaseinfo_pwddlg').dialog('open');">
                        修改密码</a></li>
                    <li><a href="javascript:loginOut();">退出系统</a></li>
                </ul>
                <input type="hidden" id="hidloginfullname" name="hidloginfullname" value="<%=operator_name %>" />
                <input type="hidden" id="hidloginuserid" name="hidloginuserid" value="<%=operator_id %>" />
            </div>
        </div>
        <div class="topnav">
            <a href="javascript:void(0);" class="easyui-splitbutton" data-options="menu:'#baseinfo'">
                基本环境</a>
            <div id="baseinfo">
                <%--   <div onclick="AddTab('公司管理','/BaseInfo/CompanyList.aspx');" >公司管理</div>--%>
                <%--            <div onclick="AddTab('组织机构','/BaseInfo/DepartmentList.aspx');" >组织机构</div>--%>

            </div>
            <a href="javascript:void(0);" class="easyui-splitbutton" data-options="menu:'#framecontract'">
                医疗就诊</a>
            <div id="framecontract">

            </div>
            <a href="javascript:void(0);" class="easyui-splitbutton" data-options="menu:'#executecontract'">
                药房管理</a>
            <div id="executecontract">


            </div>
            <a href="javascript:void(0);" class="easyui-splitbutton" data-options="menu:'#appraisal'">
                统计分析</a>
            <div id="appraisal">

            </div>
        </div>
    </div>
    <div data-options="region:'west',title:'&nbsp;'" style="width: 151px; background: url('/images/left_bg.jpg') no-repeat;">
        <div class="left_meu">
            <div id="main_baseinfo" class="meu_pi" onclick="MainFunc.ClickBaseInfo();">
                基本环境</div>
            <div id="main_yljz" class="meu_pi" onclick="MainFunc.ClickFrame();">
                医疗就诊</div>
            <div id="main_yfgl" class="meu_pi" onclick="MainFunc.ClickExecute();">
                药房管理</div>
            <div id="main_tjfx" class="meu_pi" onclick="MainFunc.ClickJiXiao();">
                统计分析</div>
            <div id="main_configset" class="meu_pi" onclick="MainFunc.ClickConfigSet();">
                个人设置</div>
        </div>
    </div>
    <div data-options="region:'center'">
        <div id="tabs" class="easyui-tabs" fit="true" border="false">
            <div title="功能导航" data-options="href:'../Navigate/ConfigSetNavigate.aspx'">
            </div>
        </div>
    </div>
    <div data-options="region:'south',border:false" style="height: 25px; background: #DAEEF5;
        text-align: center;" id="south" split="false">
        Copyright ©2015-2016&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="#"
            target="_blank">永业诚信科技有限公司</a>
    </div>
    <div id="processWindow" class="easyui-window" style="height: 100px; width: 300px;"
        data-options="iconCls:'icon-tip',title:'提示消息',
            modal:true,maximizable:false,resizable:false,minimizable:false,collapsible:false,closed:true,closable:false">
        <div id="windowContent" class="general-font">
            <img src="../images/ajax-loader.gif" />
            操作进行中，请稍后...
        </div>
    </div>
    <div id="mainbaseinfo_pwddlg" class="easyui-dialog" title="修改密码" style="width: 350px;
        height: 200px; padding: 10px;" data-options="closed:true,shadow:true,closable:true,modal:true,draggable:false,
			//iconCls: 'icon-save',
			buttons: [{
				text:'保存',
				iconCls:'icon-ok',
				handler:function(){
                    ModiyPwd();
					//$('#mainbaseinfo_pwddlg').dialog('close');
				}
			},{
				text:'取消',
                iconCls:'icon-cancel',
				handler:function(){
					$('#mainbaseinfo_pwddlg').dialog('close');
				}
			}]
		">
        <table>
            <tr>
                <td>
                    原密码：
                </td>
                <td style="padding-right: 20px;">
                    <input type="password" class="easyui-validatebox" validtype="length[0,50]" id="mainbaseinfo_oldpwd"
                        name="mainbaseinfo_oldpwd" title="原密码" style="width: 200px;" /><span style="color: Red;">
                            *</span>
                </td>
            </tr>
            <tr>
                <td>
                    新密码：
                </td>
                <td style="padding-right: 20px;">
                    <input type="password" class="easyui-validatebox" id="mainbaseinfo_newpwd1" validtype="length[0,50]"
                        name="mainbaseinfo_newpwd1" title="新密码" style="width: 200px;" /><span style="color: Red;">
                            *</span>
                </td>
            </tr>
            <tr>
                <td>
                    确认密码：
                </td>
                <td style="padding-right: 20px;">
                    <input type="password" class="easyui-validatebox" validtype="length[0,50]" id="mainbaseinfo_newpwd2"
                        name="mainbaseinfo_newpwd2" title="确认密码" style="width: 200px;" /><span style="color: Red;">
                            *</span>
                </td>
            </tr>
        </table>
    </div>

</body>
</html>