//grid假分页
function pagerFilter(data) {
    if (typeof data.length == 'number' && typeof data.splice == 'function') { // 判断数据是否是数组
        data = {
            total: data.total,
            rows: data
        }
    }
    var dg = $(this);
    var opts = dg.datagrid('options');
    var pager = dg.datagrid('getPager');
    pager.pagination({
        onSelectPage: function (pageNum, pageSize) {
            opts.pageNumber = pageNum;
            opts.pageSize = pageSize;
            pager.pagination('refresh', {
                pageNumber: pageNum,
                pageSize: pageSize
            });
            dg.datagrid('loadData', data);
        }
    });
    if (!data.originalRows) {
        data.originalRows = (data.rows);
    }
    var start = (opts.pageNumber - 1) * parseInt(opts.pageSize);
    var end = start + parseInt(opts.pageSize);
    data.rows = (data.originalRows.slice(start, end));
    return data;
}

//对象字符串的转化
var Convert = {
    StringToJSON: function (str) {
        var a;
        eval('a=' + str + ';');
        return a;
    },
    ToJSONString: function (obj) {
        switch (typeof (obj)) {
            case 'object':
                var ret = [];
                if (obj instanceof Array) {
                    for (var i = 0, len = obj.length; i < len; i++) {
                        ret.push(Convert.ToJSONString(obj[i]));
                    }
                    return '[' + ret.join(',') + ']';
                }
                else if (obj instanceof RegExp) {
                    return obj.toString();
                }
                else {
                    for (var a in obj) {
                        ret.push(a + ':' + Convert.ToJSONString(obj[a]));
                    }
                    return '{' + ret.join(',') + '}';
                }
            case 'function':
                return 'function() {}';
            case 'number':
                return obj.toString();
            case 'string':
                return "\"" + obj.replace(/(\\|\")/g, "\\$1").replace(/\n|\r|\t/g, function (a) { return ("\n" == a) ? "" : ""; }) + "\"";
            case 'boolean':
                return obj.toString();
            default:
                return obj.toString();

        }
    }
};

//js按照本地格式显示一个日期对象的日期部分
function dateFormat(str) {
    if (str)
        return new Date(str.replace(/-/g, "/")).toLocaleDateString();
    else
        return str;
}

function IsValidEmail(email) {
    var reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return reg.test(email);
}

function IsValidMobilePhone(mobilephone) {
    var reg = /^1[3|4|5|6|7|8][0-9]\d{8}$/;
    return reg.test(mobilephone);
}
function GetNowDateString(longdate) {
    var nowdate = new Date();
    var y = nowdate.getFullYear();
    var m = nowdate.getMonth() + 1;
    var d = nowdate.getDate();
    if (longdate != true) {
        return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
    }
    else {
        var h = nowdate.getHours();
        var mm = nowdate.getMinutes();
        var s = nowdate.getSeconds();
        return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d) + ' ' + (h < 10 ? ('0' + h) : h) + ':' + (mm < 10 ? ('0' + mm) : mm) + ':' + (s < 10 ? ('0' + s) : s);
    }
}
