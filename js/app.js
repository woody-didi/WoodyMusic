/**
 * Created by woody on 2017/3/21.
 */
function getUrlParams() {
    var params = {};
    var url = window.location.href;

    var p = url.split("#");
    if (p.length == 2)
        p = p[1];
    else
        p = url;

    p = p.split("?");
    if (p.length < 2) {
        params.anchor = p[0];
        return params;
    }

    params.anchor = p[0];
    p = p[1].split("&");

    for (var i = 0; i < p.length; i++) {
        var kv = p[i].split("=");
        params[kv[0]] = kv[1];
    }
    return params;
}

function loadJs(js) {
    var url = 'js/' + js + '.js';
    $.ajax({
        url: url,
        dataType: 'script'
    });
}

function route(page, view) {
    view = view || $('#view');
    var url = 'pages/' + page + '.html';
    $.ajax({
        url: url,
        success: function (data) {
            view.html(data);
            loadJs(page);
        }
    });
}


$(function () {

    route('tabs', $('#view'))
   route('audio',$('#globle'));


});