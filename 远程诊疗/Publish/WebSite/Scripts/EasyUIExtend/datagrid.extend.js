(function () {
    $.extend($.fn.datagrid.methods, {
        //table键盘数字键上下移动，不支持可多选的datagrid
        keyUpDown: function (jq) {
            return jq.each(function () {
                var grid = $(this);
                var opts = grid.datagrid('options');
                if (!opts.singleSelect) return;

                grid.datagrid('getPanel').panel('panel').attr('tabindex', 1).focus().bind("keydown", function (e) {
                    switch (e.keyCode) {
                        case 38: // up  datagrid-row-selected  datagrid-row
                            var selected = grid.datagrid('getSelected');
                            if (selected) {
                                var index = grid.datagrid('getRowIndex', selected);
                                grid.datagrid('selectRow', index - 1 < 0 ? 0 : index - 1);
                            } else {
                                var rows = grid.datagrid('getRows');
                                grid.datagrid('selectRow', rows.length - 1);
                            }
                            break;
                        case 40: // down
                            var selected = grid.datagrid('getSelected');
                            var rows = grid.datagrid('getRows');
                            if (selected) {
                                var index = grid.datagrid('getRowIndex', selected);
                                if (index + 1 == rows.length)
                                    grid.datagrid('selectRow', index);
                                else
                                    grid.datagrid('selectRow', index + 1);
                            } else {
                                grid.datagrid('selectRow', 0);
                            }

                            break;
                    }
                });
            });
        },
        //鼠标滚动，不支持可多选的datagrid
        mouseRoll: function (jq) {
            return jq.each(function () {
                //debugger
                var grid = $(this);
                var opts = grid.datagrid('options');

                if (!opts.singleSelect) return;
                grid.datagrid('getPanel').attr('tabindex', 0).focus().bind("mousewheel", function (e, delta) {

                    var rows = grid.datagrid('getRows');
                    if (rows.length == 0)
                        return;
                    //                    var options = grid.datagrid('getPager').data("pagination").options;

                    //                    var pageNumber = options.pageNumber;
                    //                    var total = options.total;
                    //                    var max = Math.ceil(total / options.pageSize) || 1;

                    var selected = grid.datagrid('getSelected');
                    if (selected) {
                        var index = grid.datagrid('getRowIndex', selected);
                        if (delta > 0) {    //上滚
                            if (index - 1 >= 0)
                                grid.datagrid('selectRow', index - 1);
                            else {
                            }
                        }
                        else {          //下滚
                            var rowIndex = grid.datagrid('getData').rows.length;
                            if (index == (rowIndex - 1))
                                grid.datagrid('selectRow', rowIndex - 1);
                            else
                                grid.datagrid('selectRow', index + 1);
                        }
                    }
                    else {
                        grid.datagrid('selectRow', 0);
                    }
                    //                    //上滚
                    //                    if (delta > 0) {
                    //                        var selected = grid.datagrid('getSelected');
                    //                        if (selected) {
                    //                            var index = grid.datagrid('getRowIndex', selected);
                    //                            alert(index);
                    //                            if (index == 0) {
                    //                                //if(pageNumber !=
                    //                                grid.datagrid('selectRow', index);
                    //                            }
                    //                            else {
                    //                                grid.datagrid('selectRow', index - 1);
                    //                            }
                    //                        }
                    //                    }
                    //                    //下滚
                    //                    else {
                    //                        var rowIndex = grid.datagrid('getData').rows.length;
                    //                        var selected = grid.datagrid('getSelected');
                    //                        if (selected) {
                    //                            var index = grid.datagrid('getRowIndex', selected);
                    //                            if (index == (rowIndex - 1)) {
                    //                                grid.datagrid('selectRow', rowIndex - 1);
                    //                            }
                    //                            else {
                    //                                grid.datagrid('selectRow', index + 1);
                    //                            }
                    //                        }
                    //                    }
                });
            });
        },

        //表格合计
        getCellsSum: function (jq) {
            var nofrozencolumns = $(jq).datagrid('options').columns[0];
            var frozencolumns = $(jq).datagrid('options').frozenColumns[0];
            var columns = new Array();
            var rows = $(jq).datagrid("getRows");
            var footer = new Array();
            footer['sum'] = "";
            var firstcolum = "";

            if (frozencolumns && frozencolumns.length > 0) {
                for (var i = 0; i < frozencolumns.length; i++) {
                    columns.push(frozencolumns[i]);
                }
            }
            if (nofrozencolumns && nofrozencolumns.length > 0) {
                for (var i = 0; i < nofrozencolumns.length; i++) {
                    columns.push(nofrozencolumns[i]);
                }
            }

            for (var i = 0; i < columns.length; i++) {
                var column = columns[i];
                var str = "";
                if (column.checkbox) continue;
                if (column.hidden) continue;
                if (!column.sum) continue;
                if (!column.sum) continue;
                footer['sum'] += '"' + column.field + '":"' + sumTotal(column.field) + '",';
            }

            var footerObj = new Array();

            if (footer['sum'] != "") {
                var tmp = '{' + footer['sum'].substring(0, footer['sum'].length - 1) + "}";
                var obj = eval('(' + tmp + ')');
                footerObj.push(obj);
            }

            if (footerObj.length > 0) {
                $(jq).datagrid('reloadFooter', footerObj);
            }

            function sum(filed) {
                var sumNum = 0;
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i][filed])
                        sumNum += Number(rows[i][filed]);
                }
                return '"' + filed + '":"' + sumNum.toFixed(2) + '"';
            }

            function sumTotal(filed) {
                var sumNum = 0;
                for (var i = 0; i < rows.length; i++) {
                    if (rows[i][filed])
                        sumNum += Number(rows[i][filed]);
                }
                return sumNum.toFixed(2);
            }
        },

        editCell: function (jq, param) {
            return jq.each(function () {
                var opts = $(this).datagrid('options');
                var fields = $(this).datagrid('getColumnFields', true).concat($(this).datagrid('getColumnFields'));
                for (var i = 0; i < fields.length; i++) {
                    var col = $(this).datagrid('getColumnOption', fields[i]);
                    col.editor1 = col.editor;
                    if (fields[i] != param.field) {
                        col.editor = null;
                    }
                }
                $(this).datagrid('beginEdit', param.index);
                for (var i = 0; i < fields.length; i++) {
                    var col = $(this).datagrid('getColumnOption', fields[i]);
                    col.editor = col.editor1;
                }
                var editor = $(this).datagrid('getEditor', { index: param.index, field: param.field });
                if (editor != undefined && editor != null) {
                    //var target = $(editor.target);
                    //var tep = target[editor.type];
                    //var tep1 = tep('textbox');
                    //$(editor.target)[editor.type]('textbox').select();
                    $(editor.target).select();
                }
            });
        }
    });

})(jQuery);
