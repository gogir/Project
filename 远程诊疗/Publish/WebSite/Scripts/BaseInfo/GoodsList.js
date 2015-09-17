$(function () {
    $("#goodslist_tblist").datagrid({
        loadMsg: "数据加载中，请稍后……",
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        collapsible: true,
        url: '../Handler/BaseInfo/GoodsHandler.ashx?action=goodslist',
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
                { field: 'goods_name', title: '药品名称', width: 130, align: 'left', columntype: 'TextColumn' },
                { field: 'drugstore_name', title: '药房名称', width: 130, align: 'left', columntype: 'TextColumn' },
                { field: 'barcode', title: '药品条码', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'py', title: '拼音码', width: 80, align: 'left', columntype: 'DateColumn' },
                { field: 'spec', title: '规格', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'price', title: '价格', width: 80, align: 'center', columntype: 'NumberColumn' },
                { field: 'goods_unit', title: '单位', width: 60, align: 'left', columntype: 'TextColumn' },
                { field: 'dosageform', title: '剂型', width: 130, align: 'left', columntype: 'TextColumn' },
                { field: 'usage', title: '用法用量', width: 130, align: 'left', columntype: 'TextColumn' },
                { field: 'remark', title: '备注', width: 200, align: 'left', columntype: 'TextColumn' }
            ]
        ],
        onLoadSuccess: function (data) {
            if (data.total != 0) {
                $('#goodslist_tblist').datagrid("selectRow", 0);
            }
        }
    });
    $("#goodslist_tblist").datagrid("keyUpDown");
    $("#goodslist_tblist").datagrid("mouseRoll");
});

var GoodsList = function () {
    return {
        ReLoad: function () {
            GoodsList.Cancel();
            var goods_name = $("#goodslist_goodsname").val();
            var drugstore_name = $("#goodslist_drugstorename").attr("alt");
            if (drugstore_name == undefined || !drugstore_name) drugstore_name = "";
            if (drugstore_name == "所有") drugstore_name = "";
            $("#goodslist_tblist").datagrid("options").url = "/Handler/BaseInfo/GoodsHandler.ashx?action=goodslist&goods_name=" + escape(goods_name) + "&drugstore_name=" + escape(drugstore_name);
            $("#goodslist_tblist").datagrid("reload");
        },

        ClearInput: function () {
            $("#goodslist_goods_id").val("");
            $("#goodslist_goods_name").val("");
            $("#goodslist_goods_barcode").val("");
            $("#goodslist_goods_py").val("");
            $("#goodslist_goods_spec").val("");
            $("#goodslist_goods_unit").val("");
            $("#goodslist_goods_dosageform").val("");
            $("#goodslist_goods_usage").val("");
            $("#goodslist_goods_remark").val("");
        },
        Import: function () {
            $("#goodslist_Excl").window("open");
        },
        ExclImport: function () {
            var obj = $("#goodslist_exclimport_value").val();
            $.ajax({
                loadMsg: "数据加载中，请稍后……",
                type: "post",
                url: "/Handler/BaseInfo/GoodsHandler.ashx",
                dataType: 'json',
                data: {
                    action: "goodsexcl",
                    goodsexcl: obj
                },
                success: function (res) {
                    if (res) {
                        if (res.ret == 0) {
                            GoodsList.ReLoad();
                            $.messager.alert('提示', res.msg);
                        }
                        else $.messager.alert('提示', res.msg);
                    }
                    else {
                        $.messager.alert('提示', '读取文件失败，请刷新后再试！');
                    }
                }
            });
        },
        UpData: function (even) {
            var v = even.value;
            if (v == '' || v == null) {
                $.messager.alert('提示', "请选择所要导入的文件！");
            } else {
                var index = v.indexOf('.');
                if (index < 0) {
                    $.messager.alert('提示', "导入的文件格式不正确，请选择Excel文件(*.xls)！");
                } else {
                    var ext = v.substring(index + 1, v.length);
                    if (ext != "xls") {
                        $.messager.alert('提示', "导入的文件格式不正确，请选择Excel文件(*.xls)！");
                    } else {
                        var data = even.files[0];
                        var reader = new FileReader();
                        reader.readAsDataURL(data);
                        reader.onload = function (evt) {
                            var datas = evt.target.result; datas = datas.split(',');
                            $.ajax({
                                type: "post",
                                url: "/Handler/BaseInfo/GoodsHandler.ashx",
                                dataType: 'json',
                                data: {
                                    action: "goodsupdata",
                                    goodsupdata: datas[1]
                                },
                                success: function (res) {
                                    if (res) {
                                        if (res.ret == 0) {
                                            $("#goodslist_exclimport_value").val(res.msg);
                                            $.messager.alert('提示', '读取文件成功！');
                                        }
                                    }
                                    else {
                                        $.messager.alert('提示', '读取文件失败，请刷新后再试！');
                                    }
                                }
                            });
                        }
                    }
                }
            }


        },
        AddEdit: function (type) {

            GoodsList.ClearInput();
            if (type != 0) {
                var row = $("#goodslist_tblist").datagrid("getSelected");
                if (!row) {
                    $.messager.alert('提示', '请选择要编辑的药品！');
                    return;
                }
                $("#goodslist_goods_id").val(row.goods_id);
                $("#goodslist_goods_name").val(row.goods_name);
                $("#goodslist_goods_barcode").val(row.barcode);
                $("#goodslist_goods_py").val(row.py);
                $("#goodslist_goods_spec").val(row.spec);
                $("#goodslist_goods_unit").val(row.goods_unit);
                $("#goodslist_goods_dosageform").val(row.dosageform);
                $("#goodslist_goods_usage").val(row.usage);
                $("#goodslist_goods_remark").val(row.remark);
            }
            $("#goodslist_addeditwin").window("open");
        },

        Cancel: function () {
            GoodsList.ClearInput();
            $("#goodslist_addeditwin").window("close");
        },

        SaveGoods: function () {
            var goods_id = $("#goodslist_goods_id").val();
            var goods_name = $("#goodslist_goods_name").val();
            var goods_barcode = $("#goodslist_goods_barcode").val();
            var goods_py = $("#goodslist_goods_py").val();
            var goods_spec = $("#goodslist_goods_spec").val();
            var goods_unit = $("#goodslist_goods_unit").val();
            var goods_dosageform = $("#goodslist_goods_dosageform").val();
            var goods_usage = $("#goodslist_goods_usage").val();
            var goods_remark = $("#goodslist_goods_remark").val();
            if (!goods_name) {
                $.messager.alert('提示', '药品名称不能为空！');
                return;
            }
            if (!goods_barcode) {
                $.messager.alert('提示', '药品条码不能为空！');
                return;
            }
            $.ajax({
                type: "post",
                url: "/Handler/BaseInfo/GoodsHandler.ashx",
                dataType: 'json',
                data: {
                    action: "savegoods",
                    goods_id: goods_id,
                    goods_name: goods_name,
                    goods_barcode: goods_barcode,
                    goods_py: goods_py,
                    goods_spec: goods_spec,
                    goods_unit: goods_unit,
                    goods_dosageform: goods_dosageform,
                    goods_usage: goods_usage,
                    goods_remark: goods_remark
                },
                success: function (res) {
                    if (res) {
                        if (res.ret == 0) {
                            GoodsList.ReLoad();
                            $.messager.alert('提示', res.msg);
                        } else if (res.ret == 10000) {
                            top.location = '/Login.aspx';
                        }
                        else $.messager.alert('提示', res.msg);
                    }
                    else {
                        $.messager.alert('提示', '操作失败，请刷新后再试！');
                    }
                }
            });
        },
        DelGoods: function () {
            var row = $("#goodslist_tblist").datagrid("getSelected");
            if (!row) {
                $.messager.alert('提示', '请选择要删除的用户！');
            }
            $.messager.confirm('确认', '您确定要删除吗？', function (r) {
                if (r) {
                    $.ajax({
                        type: "post",
                        url: "/Handler/BaseInfo/GoodsHandler.ashx",
                        dataType: 'json',
                        data: {
                            action: "delgoods",
                            goods_id: row.goods_id
                        },
                        success: function (res) {
                            if (res) {
                                $.messager.alert('提示', res.msg);
                                if (res.ret == 0) {
                                    GoodsList.ReLoad();
                                } else if (res.ret == 10000) {
                                    top.location = '/Login.aspx';
                                }
                                else $.messager.alert('提示', res.msg);
                            }
                            else {
                                $.messager.alert('提示', '删除失败，请刷新后再试！');
                            }
                        }
                    });
                }
            });
        }
    }
} ();