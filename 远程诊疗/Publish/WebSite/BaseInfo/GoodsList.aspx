<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="GoodsList.aspx.cs" Inherits="YCZL.BaseInfo.GoodsList" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<div class="easyui-layout" data-options="fit:true">
 <div data-options="region:'north'" style="height: 65px">
      <div class="pur_top" id="goodslist_toolbar">
    <div style="padding-bottom: 5px; text-align: right;">
    <%=YCZL.Utils.AppUtils.GetOperatorType()=="1"? "<a href=\"javascript:void(0);\" class=\"easyui-linkbutton\" data-options=\"iconCls:'icon-add'\" onclick=\"GoodsList.AddEdit(0);\">增加</a>&nbsp;<a href=\"javascript:void(0);\" class=\"easyui-linkbutton\" data-options=\"iconCls:'icon-edit'\" onclick=\"GoodsList.AddEdit(1);\">修改</a>":""%>
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-undo'" onclick="GoodsList.Import();">导入</a>        
        <a href="javascript:void(0);" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="GoodsList.DelGoods();">删除</a>
    </div>
    <div class="remain" id="goodslist_searchtool">
        <table border="0" cellpadding="0" cellspacing="0">
            <tr>
                <td>
                  药品名称&nbsp;&nbsp;<input id="goodslist_goodsname"  name="goodslist_goodstname" data-options="prompt:'药品名称'" type="text" class="easyui-validatebox" style="width:146px;" />
                </td>
                <td>
                  药房名称&nbsp;&nbsp;<input id="goodslist_drugstorename"  name="goodslist_drugstorename" data-options="prompt:'药房名称'" type="text"   style="width:146px;"              
                   class="input-winsame input-window"  
                input-option="id:'goodslist_drugstorewin',
                        inpid:'goodslist_drugstorename',title:'药房',width:800,height:500,
                        url:'/PopWin/WinDrugStore.aspx'" value="所有"/>
                </td>
                <td>
                    <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-search'" onclick="GoodsList.ReLoad();">查询</a>
                </td>
            </tr>
        </table>
    </div>
</div>
 </div>
    <div data-options="region:'west',title:'',border:false,collapsible:false">
        <table id="goodslist_tblist"></table>
    </div>
</div>



<div id="goodslist_addeditwin" style="padding-top:10px;text-align:center;" class="easyui-window" data-options="title:'药品档案编辑',width:500,height:250,
        modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,resizable:false">
    <table class="tab_search" style="margin-left:auto;margin-right:auto; line-height:25px; "  border="0" cellpadding="0" cellspacing="0">  
       
        <tr>
            <td class="s6">药品名称</td>
            <td style=" text-align:left;">
            <input type="hidden" id="goodslist_goods_id" name="goodslist_goods_id" value="" />
            <input id="goodslist_goods_name" name="goodslist_goods_name" style="width:150px;" type="text" class="easyui-validatebox" />
            </td>            
            <%--<td class="s6">药房</td>
            <td style=" text-align:left;">
            <input id="goodslist_goods_drugstore" name="goodslist_goods_drugstore" style="width:154px;" type="text"  class="easyui-combobox"  data-options="editable:false,valueField:'id',textField:'name',url:'/Handler/BaseInfo/GoodsHandler.ashx?action=drugstorelist'"/>
            </td>--%>
             <td class="s6">　条码</td>
            <td style=" text-align:left;">
            <input id="goodslist_goods_barcode" name="goodslist_goods_barcode" type="text"style="width:150px;" class="easyui-validatebox" />
            </td> 
            </tr>
            <tr>            
            <td class="s6">拼音码</td>
            <td  style=" text-align:left;">
            <input id="goodslist_goods_py" type="text"  name="goodslist_goods_py"  style="width:150px;" class="easyui-validatebox"  />
            </td>
             <td class="s6">规格</td>
            <td>
            <input id="goodslist_goods_spec" type="text" name="goodslist_goods_spec"  style="width:150px;" class="easyui-validatebox"  />           
            </td>   
            </tr> 
            <tr>                      
            <td class="s6">单位</td>
            <td>
            <input id="goodslist_goods_unit" type="text" name="goodslist_goods_unit"  style="width:150px;" class="easyui-validatebox" />
           </td>           
          <td class="s6">剂型</td>
            <td>
            <input id="goodslist_goods_dosageform" type="text" name="goodslist_goods_dosageform"  style="width:150px;" class="easyui-validatebox"  />           
            </td>  
            </tr>
            <tr>                     
            <td class="s6">用法用量</td>
            <td colspan="3">
            <input id="goodslist_goods_usage" type="text" name="goodslist_goods_usage"  style="width:99%;" class="easyui-validatebox" />
           </td>
            </tr>
         <tr>
            <td class="s6" style=" vertical-align:top; ">备注</td>
            <td colspan="3" >
            <textarea rows="2" id="goodslist_goods_remark"  name="goodslist_goods_remark"  style=" width:99%;"></textarea>
         </td>
        </tr>
        <tr>
            <td align="right" colspan="6" >
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="GoodsList.ClearInput();">清空</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="GoodsList.SaveGoods();">保存</a>
                <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-cancel'" onclick="GoodsList.Cancel();">关闭</a>
            </td>
        </tr>
    </table>
</div>
<div  id="goodslist_Excl" style="padding-top:10px;text-align:center;" class="easyui-window" data-options="title:'选择导入文件路径',width:330,height:100,
        modal:true,closed:true,minimizable:false,maximizable:false,collapsible:false,resizable:false">

<input id="goodslist_exclimport" onchange='GoodsList.UpData(this)' type="file" />
<input id="goodslist_exclimport_value" type="text " style=" display:none" />
 <a href="javascript:;" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="GoodsList.ExclImport()">确定</a>
</div>

<!--js-->
<script src="/Scripts/BaseInfo/GoodsList.js" type="text/javascript"></script>
<script src="/Scripts/EasyUIExtend/parserinput.js" type="text/javascript"></script>