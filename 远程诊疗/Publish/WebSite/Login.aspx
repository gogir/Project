<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="YCZL.Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title></title>
    <link href="Style/login.css" rel="stylesheet" type="text/css" />
     <link href="Style/themes/metro-blue/easyui.css" rel="stylesheet" type="text/css" />
    <link href="/Style/themes/icon.css" rel="stylesheet" type="text/css" />
    <script src="/Scripts/Common/jquery.min.js" type="text/javascript"></script>
    <script src="/Scripts/Common/jquery.easyui.min.js" type="text/javascript"></script>
    <script src="/Scripts/Common/easyui-lang-zh_CN.js" type="text/javascript"></script>
    <script src="Scripts/login.js" type="text/javascript"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="gxz">
        <div id="login_mind">
            <ul class="information_list">
            </ul>
            <!-- 分割线 -->
            <form id="loginForm">
            <ul id="write_box">
                <li>
                    <label>
                        用 户</label>
                    <input type="text" name="username" id="username" value="<%=username %>" class="cominp"
                        onkeydown="UserIDKeyDown(event);" />
                </li>
                <li>
                    <label>
                        密 码</label>
                    <input type="password" class="cominp" name="password" id="password" onkeydown="PasswordKeyDown(event);" />
                </li>
                <li>
                    <label>
                        验证码</label>
                    <input type="text" class="validateinp" id="verifytext" name="verifytext" onkeydown="VerifytextKeyDown(event);"
                        onfocus="onFocusValidate();" maxlength="4" />
                    <img class="validateimg" id="LoI_ValidateCodeImage" src="#" onclick="refresh();"
                        alt="点击切换验证码" style="display: none;" />
                </li>
                <li>
                    <input type="button" id="login_button" name="login_button" value="登录系统" class="login_button" />
                </li>
            </ul>
            </form>
        </div>
    </div>
    </form>
    <!---->
</body>
</html>

