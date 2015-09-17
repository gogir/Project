$(function () {
    $("#goodsunfitlist_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        collapsible: true,
        url: '/Handler/BaseInfo/GoodsUnfitHandler.ashx?action=goodsunfitlist',
        pageList: [10, 15, 20, 25, 30, 40, 50],
        pageSize: 20,
        pageNumber: 1,
        remoteSort: true,
        rownumbers: true,
        pagination: true,
        singleSelect: true,
        showFooter: true,
        columns: [
            [
                { field: 'goods_id', title: '药品ID', width: 130, align: 'center', columntype: 'TextColumn', hidden: true },
                { field: 'drugstore_id', title: '药品ID', width: 130, align: 'center', columntype: 'TextColumn', hidden: true },
                { field: 'goods_name', title: '药品名称', width: 130, align: 'left', columntype: 'TextColumn' },
                { field: 'price', title: '价格', width: 80, align: 'left', columntype: 'NumberColumn' },
                { field: 'drugstore_name', title: '药房名称', width: 130, align: 'left', columntype: 'TextColumn' },
                { field: 'barcode', title: '药品条码', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'remark', title: '备注', width: 200, align: 'left', columntype: 'TextColumn' }
            ]
        ],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#goodsunfitlist_tblist').datagrid("selectRow", 0);
            }
        },
        onSelect: function (rowIndex, rowData) {
            if (rowData) {
                GoodsUnfitList.ReLoadUnfitList(rowData.goods_id, rowData.drugstore_id);
            }
        }
    });
    $("#goodsunfitlist_tblist").datagrid("keyUpDown");
    $("#goodsunfitlist_tblist").datagrid("mouseRoll");
    $('#goodsunfitlist_unfitlist').datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: false,
        striped: true,
        fit: true, //自动大小
        fitColumns: false,
        collapsible: true,
        remoteSort: true,
        singleSelect: false,
        columns: [[
                { field: 'goods_id', title: '药品ID', width: 130, align: 'center', columntype: 'TextColumn', hidden: true },
                { field: 'goods_name', title: '药品名称', width: 130, align: 'left', columntype: 'TextColumn' },
                { field: 'price', title: '价格', width: 80, align: 'left', columntype: 'NumberColumn' },
                { field: 'barcode', title: '药品条码', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'remark', title: '备注', width: 200, align: 'left', columntype: 'TextColumn' }
                ]],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#goodsunfitlist_unfitlist').datagrid("selectRow", 0);
            }
        }
    });
    $("#goodsunfitlist_tbunfitlist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: false,
        striped: true,
        fit: true, //自动大小
        fitColumns: false,
        collapsible: true,
        remoteSort: true,
        singleSelect: false,
        columns: [
                 [
                { field: 'goods', checkbox: true },
                { field: 'goods_id', title: '药品ID', width: 130, align: 'center', columntype: 'TextColumn', hidden: true },
                { field: 'goods_name', title: '药品名称', width: 130, align: 'left', columntype: 'TextColumn' },
                { field: 'price', title: '价格', width: 80, align: 'left', columntype: 'NumberColumn' },
                { field: 'drugstore_name', title: '药房名称', width: 130, align: 'left', columntype: 'TextColumn' },
                { field: 'barcode', title: '药品条码', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'remark', title: '备注', width: 200, align: 'left', columntype: 'TextColumn' }
            ]
          ],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#goodsunfitlist_tbunfitlist').datagrid("selectRow", 0);
                var goods_id = $("#goodsunfitlist_goods_id").val();
                var drugstore_id = $("#goodsunfitlist_drugstore_id").val();
                GoodsUnfitList.SetLimit(goods_id, drugstore_id,data.rows);
            }
        }
    });
    $('#goodsunfitlist_search').searchbox({
        searcher: function (value, name) {
            $('#goodsunfitlist_tbunfitlist').datagrid('options').url = '/Handler/BaseInfo/GoodsUnfitHandler.ashx?action=goodsunfitlist&goods_name=' + escape(value);
            $('#goodsunfitlist_tbunfitlist').datagrid("reload");
        }
    });
});

var GoodsUnfitList = function () {
    return {
        ReLoad: function () {
            var goodsunfit_name = $("#goodsunfitlist_goodsname").val();
            var drugstore_name = $("#goodsunfitlist_drugstorename").attr("alt");
            if (drugstore_name == undefined || !drugstore_name) drugstore_name = "";
            if (drugstore_name == "所有") drugstore_name = "";
            $("#goodsunfitlist_tblist").datagrid("options").url = "/Handler/BaseInfo/GoodsUnfitHandler.ashx?action=goodsunfitlist&goods_name=" + escape(goodsunfit_name) + "&drugstore_name=" + escape(drugstore_name);
            $("#goodsunfitlist_tblist").datagrid("reload");
        },
        ReLoadUnfitList: function (goods_id, drugstore_id) {
            $("#goodsunfitlist_unfitlist").datagrid("options").url = "/Handler/BaseInfo/GoodsUnfitHandler.ashx?action=unfitlist&goods_id=" + escape(goods_id) + "&drugstore_id=" + escape(drugstore_id);
            $("#goodsunfitlist_unfitlist").datagrid("reload");
        },
        AddEdit: function (type) {
            $("#goodsunfitlist_search").val("");
            if (type == 0) {
                var row = $("#goodsunfitlist_tblist").datagrid("getSelected");
                if (!row) {
                    $.messager.alert('提示', '请选择要设置的药品！');
                    return;
                }
                GoodsUnfitList.SetUnfitList();
                $("#goodsunfitlist_goods_id").val(row.goods_id);
                $("#goodsunfitlist_drugstore_id").val(row.drugstore_id);
                //setTimeout(function (){GoodsUnfitList.SetLimit(row.goods_id,row.drugstore_id)}, 10000);
            }
            $("#goodsunfitlist_addeditwin").window("open");
        },
        SetUnfitList: function () {
            $("#goodsunfitlist_tbunfitlist").datagrid("options").url = "/Handler/BaseInfo/GoodsUnfitHandler.ashx?action=goodsunfitlist&temp=" + Math.random() * 100; ;
            $("#goodsunfitlist_tbunfitlist").datagrid("reload");
        },
        SetLimit: function (goods_id, drugstore_id, allrows) {
            $.ajax({
                type: "post",
                url: "/Handler/BaseInfo/GoodsUnfitHandler.ashx?action=unfitlist",
                dataType: 'json',
                async: false,
                data: {
                    goods_id: goods_id,
                    drugstore_id: drugstore_id
                },
                success: function (res) {
                    if (res) {
                        $('#goodsunfitlist_tbunfitlist').datagrid('clearChecked');
                        var rows = res.rows;
                        for (var i = 0; i < rows.length; i++) {
                            var goods_id = rows[i].goods_id2.replace(/[ ]/g, "");
                            $('#goodsunfitlist_tbunfitlist').datagrid('selectRecord', goods_id);
                            for (var j = 0; j < allrows.length; j++) {
                                if (allrows[j].goods_id.replace(/[ ]/g, "") == goods_id) {
                                    $('#goodsunfitlist_tbunfitlist').datagrid('checkRow', j);
                                    break;
                                }
                            }
                        }
                    }
                }
            })
        },
        Cancel: function () {
            $("#goodsunfitlist_addeditwin").window("close");
            $("#goodsunfitlist_dialogbtn").dialog("close");
        },
        SaveGoodsUnfit: function () {
            var goods_id = $("#goodsunfitlist_goods_id").val();
            var drugstore_id = $("#goodsunfitlist_drugstore_id").val();

            var rows = $('#goodsunfitlist_tbunfitlist').datagrid('getChecked');
            if (!rows) {
                $.messager.alert('提示', '请勾选药品！');
                return;
            }
            var limits = "";
            for (var i = 0; i < rows.length; i++) {
                limits += rows[i].goods_id + ",";
            }
            if (!limits) {
                $.messager.alert('提示', '请勾选需要设置的药品！');
                return;
            }
            if (limits)
                limits = limits.substr(0, limits.length - 1);
            $.ajax({
                type: "post",
                url: "/Handler/BaseInfo/GoodsUnfitHandler.ashx",
                dataType: 'json',
                data: {
                    action: "savegoodsunfitlimit",
                    goods_id: goods_id,
                    drugstore_id: drugstore_id,
                    limits: limits
                },
                success: function (res) {
                    if (res) {
                        $.messager.alert('提示', res.msg);
                        if (res.ret == 0) {
                            GoodsUnfitList.Cancel();
                            GoodsUnfitList.ReLoadLimit(goods_id, drugstore_id);
                        }
                        else $.messager.alert('提示', res.msg);
                    }
                    else {
                        $.messager.alert('提示', '操作失败，请刷新后再试！');
                    }
                }
            });
        }
    }
} ();