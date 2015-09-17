$(function () {
    //类型tree
    $('#medbaselist_categorytree').tree({
        url: '/Handler/BaseInfo/MedBaseHandler.ashx?action=basesortlist',
        parentField: "parid",
        textFiled: 'name',
        idFiled: 'id',
        lines: true,
        onClick: function (node) {
            MedBaseList.ReLoad(node.name);
        }
    });

    //根据类型得到的客户信息
    $("#medbaselist_tb").datagrid({
        loadMsg: "数据加载中，请稍后……",
        url: '/Handler/BaseInfo/MedBaseHandler.ashx?action=medbaselist',
        nowrap: true,
        striped: true,
        fit: true,
        fitColumns: false,
        collapsible: true,
        pageList: [20, 25, 30, 40, 50],
        pageSize: 20,
        pageNumber: 1,
        remoteSort: true,
        rownumbers: true,
        pagination: true,
        singleSelect: true,
        showFooter: true,
        columns: [
            [
                { field: 'basesort', title: '类别', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'suitsex', title: '适宜性别', width: 100, align: 'center', columntype: 'TextColumn' },
                { field: 'suitpeople', title: '适宜人群', width: 100, align: 'left', columntype: 'TextColumn' },
                { field: 'suitseason', title: '适宜季节', width: 100, align: 'center', columntype: 'TextColumn' },
                { field: 'title', title: '主题', width: 200, align: 'left', columntype: 'TextColumn' },
                { field: 'content', title: '内容', width: 500, align: 'left', columntype: 'TextColumn' }
            ]
        ],
        onDblClickRow: function (rowIndex, rowData) {
            MedBaseList.AddEditMedBase(1, rowData);
        },
        toolbar: "#medbaselist_toolbar"
    });
});

var MedBaseList = function () {
    return {
        ReLoad: function (basesort) {
            var medbase_basesort = basesort || $('#medbaselist_medsearch_basesort').val();
            var medbase_suitsex = $("#medbaselist_medsearch_suitsex").combobox("getValue");
            if (medbase_suitsex == undefined || !medbase_suitsex) medbase_suitsex = "";
            if (medbase_suitsex == "全部") medbase_suitsex = "";
            var medbase_suitpeople = $("#medbaselist_medsearch_suitpeople").val();
            var medbase_suitseason = $("#medbaselist_medsearch_suitseason").val();
            var medbase_title = $("#medbaselist_medsearch_title").val();
            $("#medbaselist_tb").datagrid("options").url = "/Handler/BaseInfo/MedBaseHandler.ashx?action=medbaselist&medbase_basesort=" + escape(medbase_basesort) + "&medbase_suitsex=" + escape(medbase_suitsex) + "&medbase_suitpeople=" + escape(medbase_suitpeople) + "&medbase_suitseason=" + escape(medbase_suitseason) + "&medbase_title=" + escape(medbase_title);
            $("#medbaselist_tb").datagrid("reload");
        },

        ReloadMedBaseType: function () {
            $("#medbaselist_categorytree").tree("reload");
        },
        CleanMedBaseInput: function () {
            $('#medbaselist_base_id').val("");
            $('#medbaselist_basesort').val("");
            $("#medbaselist_suitsex").combobox("setValue", "");
            $('#medbaselist_suitpeople').val("");
            $('#medbaselist_suitseason').val("");
            $('#medbaselist_title').val("");
            $('#medbaselist_text').val("");
        },
        CancelMedBase: function () {
            MedBaseList.CleanMedBaseInput();
            $("#medbaselist_medbasewin").window("close");
        },
        AddEditMedBase: function (type, row) {
            MedBaseList.CleanMedBaseInput();
            if (type != 0) {
                if (!row) {
                    row = $("#medbaselist_tb").datagrid("getSelected");
                }
                if (!row) {
                    $.messager.alert('提示', '请选择要编辑修改的商品信息！');
                    return;
                }
                $('#medbaselist_base_id').val(row.base_id);
                $('#medbaselist_basesort').val(row.basesort);
                $("#medbaselist_suitsex").combobox("setValue", row.suitsex);
                $('#medbaselist_suitpeople').val(row.suitpeople);
                $('#medbaselist_suitseason').val(row.suitpeople);
                $('#medbaselist_title').val(row.title);
                $('#medbaselist_text').val(row.content);
            }
            $("#medbaselist_medbasewin").window("open");
        },
        SaveMedBase: function () {
            var medbase_base_id = $('#medbaselist_base_id').val();
            var medbase_basesort = $('#medbaselist_basesort').val();
            var medbase_suitsex = $("#medbaselist_suitsex").combobox("getValue");
            var medbase_suitpeople = $('#medbaselist_suitpeople').val();
            var medbase_suitseason = $('#medbaselist_suitseason').val();
            var medbase_title = $('#medbaselist_title').val();
            var medbase_text = $('#medbaselist_text').val();
            if (!medbase_basesort) {
                $.messager.alert('提示', '类型不能为空！');
                return;
            }
            if (!medbase_suitsex) {
                $.messager.alert('提示', '适宜性别不能为空！');
                return;
            } if (!medbase_suitpeople) {
                $.messager.alert('提示', '适宜人群不能为空！');
                return;
            }
            if (!medbase_suitseason) {
                $.messager.alert('提示', '适宜季节不能为空！');
                return;
            } if (!medbase_title) {
                $.messager.alert('提示', '主题不能为空！');
                return;
            } if (!medbase_text) {
                $.messager.alert('提示', ' 内容不能为空！');
                return;
            }
            $.ajax({
                type: "post",
                url: "/Handler/BaseInfo/MedBaseHandler.ashx",
                dataType: 'json',
                data: {
                    action: "savemedbase",
                    medbase_id: medbase_base_id,
                    medbase_basesort: medbase_basesort,
                    medbase_suitsex: medbase_suitsex,
                    medbase_suitpeople: medbase_suitpeople,
                    medbase_suitseason: medbase_suitseason,
                    medbase_title: medbase_title,
                    medbase_text: medbase_text
                },
                success: function (res) {
                    if (res) {
                        $.messager.alert('提示', res.msg);
                        if (res.ret == 0) {
                            $("#medbaselist_medbasewin").window("close");
                            MedBaseList.ReLoad();
                            $("#medbaselist_categorytree").tree("reload");
                        } else if (res.ret == 10000) {
                            top.location = '/Login.aspx';
                        }
                    }
                    else {
                        $.messager.alert('提示', '操作失败，请刷新后再试！');
                    }
                }
            });
        },
        DeleteMedBase: function () {
            var row = $("#medbaselist_tb").datagrid("getSelected");
            if (!row) {
                $.messager.alert('提示', '请选择你要删除的商品！');
                return;
            }
            $.messager.confirm('提示', '删除后不可恢复，您确认想要删除吗？', function (r) {
                if (r) {
                    $.ajax({
                        type: "post",
                        url: "/Handler/BaseInfo/MedBaseHandler.ashx",
                        dataType: 'json',
                        data: {
                            action: "delmedbase",
                            medbase_id: row.base_id
                        },
                        success: function (res) {
                            if (res) {
                                $.messager.alert('提示', res.msg);
                                if (res.ret == 0) {
                                    MedBaseList.ReLoad();
                                }
                                else if (res.ret == 10000) {
                                    top.location = '/Login.aspx';
                                }
                            }
                            else {
                                $.messager.alert('提示', '操作失败，请刷新后再试！');
                            }
                        }
                    });
                }
            });
        }
    }
} ();