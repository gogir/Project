<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MedBaseSearch.aspx.cs" Inherits="YCZL.MedBaseSearch" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html  class="panel-fit" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
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
</head>
<body class="easyui-layout layout panel-noscroll easyui-fluid">



<div data-options="region:'center'" style=" width:100%; height:100%">

<div class="easyui-layout" data-options="fit:true">
    <div data-options="region:'west',title:'知识类别',collapsible:false" style="width:250px; height:500px; padding-top:5px;">
        <ul id="medbaselist_categorytree" style=" height:100%"></ul>
    </div>
    <div data-options="region:'center'" style="padding:5px; height:500px;">
        <table id="medbaselist_tb"></table>
    </div>
</div>

<div class="pur_top" id="medbaselist_toolbar">
    <div class="remain" id="medbaselist_searchtool">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                     类别&nbsp;&nbsp;<input id="medbaselist_medsearch_basesort" name="medbaselist_medsearch_basesort" type="text" class="easyui-validatebox"  />
                </td>
                 <td>
                     适宜性别&nbsp;&nbsp;<input id="medbaselist_medsearch_suitsex" name="medbaselist_medsearch_suitsex" style="width:154px;" type="text"  class="easyui-combobox" data-options="valueField:'label',textField:'label',editable:false,data:[{value:'0',label:'全部'},{value:'1',label:'男'},{value:'2',label:'女'}],panelHeight:'auto'"/>            
                </td>
                 <td>
                     适宜人群&nbsp;&nbsp;<input id="medbaselist_medsearch_suitpeople" name="medbaselist_medsearch_suitpeople" type="text" class="easyui-validatebox"  />
                </td>
                 <td>
                     适宜季节&nbsp;&nbsp;<input id="medbaselist_medsearch_suitseason" name="medbaselist_medsearch_suitseason" type="text" class="easyui-validatebox"  />
                </td>
                 <td>
                     主题&nbsp;&nbsp;<input id="medbaselist_medsearch_title" name="medbaselist_medsearch_title" type="text" class="easyui-validatebox"  />
                </td>
                <td>
                    <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="MedBaseList.ReLoad();">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>


</div>
<script type="text/javascript" src="Scripts/BaseInfo/MedBaseList.js" language="javascript"></script>

</body>
</html>
