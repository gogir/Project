<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GoodsUnfitList.aspx.cs" Inherits="YCZL.BaseInfo.GoodsUnfitList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<div class="easyui-layout" data-options="fit:true">
 <div data-options="region:'north'" style="height: 65px">
      <div class="pur_top" id="goodsunfitlist_toolbar">
    <div style="padding-bottom: 5px; text-align: right;">
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick="GoodsUnfitList.AddEdit(0);">设置</a>
       </div>
    <div class="remain" id="goodsunfitlist_searchtool">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                    药品名称 <input id="goodsunfitlist_goodsname" name="goodsunfitlist_goodsname" type="text" class="easyui-validatebox" style="width:150px;" />
                </td>
                <td>
                  药房名称 <input id="goodsunfitlist_drugstorename" name="goodsunfitlist_drugstorename" type="text" style="width:150px;"class="input-winsame input-window"  
                input-option="id:'visitsearchlist_drugstorewin',
                        inpid:'goodsunfitlist_drugstorename',title:'药房',width:800,height:600,
                        url:'/PopWin/WinDrugStore.aspx'" value="所有"/></td>
                <td>
                    <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="GoodsUnfitList.ReLoad();">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>
 </div>
    <div data-options="region:'west',title:'药品列表',border:false,collapsible:false" style="width:760px;">
        <table id="goodsunfitlist_tblist"></table>
    </div>
    <div data-options="region:'center',title:'禁用药品',border:false" style="padding:5px;">
        <table id="goodsunfitlist_unfitlist"></table>
    </div>
</div>


<div id="goodsunfitlist_addeditwin" style="padding-top:10px;text-align:center;" class="easyui-dialog" data-options="title:'设置禁用药品',width:860,height:500,
        modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,resizable:false,buttons:'#goodsunfitlist_dialogbtn'">  
<div id="tb_Doctor" style="padding:5px; text-align:left; ">
<input class="easyui-searchbox" id="goodsunfitlist_search" name="goodsunfitlist_search" data-options="prompt:'药品名称'" style="width:150px" />
</div>    
 <input type="hidden" id="goodsunfitlist_goods_id" value="" />
 <input type="hidden" id="goodsunfitlist_drugstore_id" value="" />
<table id="goodsunfitlist_tbunfitlist"></table>
</div>
<div id="goodsunfitlist_dialogbtn">
	<a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-ok'" onclick="GoodsUnfitList.SaveGoodsUnfit();">保存</a>
    <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-no'" onclick="GoodsUnfitList.Cancel();">关闭</a>
</div>

<!--js-->
<script src="/Scripts/BaseInfo/GoodsUnfitList.js" type="text/javascript"></script>
<script src="/Scripts/EasyUIExtend/parserinput.js" type="text/javascript"></script>