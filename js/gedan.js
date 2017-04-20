(function () {
    var headerTabsHeight = $('.headerTabs').height();
    function initHeight() {
        $('section.gedan').css('margin-top', headerTabsHeight)
    }
    initHeight();
    $(window).on('resize', function () {
        initHeight()
    })

    function getSongsListsJson(loadHtml, limit, offset) {
        limit = limit || 6;
        var local = 'api/topPlayList.json';
        var server = 'http://musicapi.duapp.com/api.php';
        var $gedan = $('#gedan');
        $gedan.append('<p id="loading">正在加载...</p>')
        $.ajax({
            url: server + "?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=" + offset + "&limit=" + limit,
            success: function (data) {
                if (data.code == 200) {
                	$('#loading').remove();
                    loadHtml(data.playlists); //回调方式取得ajax异步请求的数据；
                }
            }
        });
    }
    var offset = 0;
    var limit = 6


    getSongsListsJson(function (data) {
        createSongs(data)
    }, limit, offset);


    function createSongs(data) {
        var $gedan = $('#gedan');
        var $gedanItemHtml = $('#temp-gedan-item').html();
        for (var i = 0; i < data.length; i++) {
            $($gedanItemHtml).find('.motal').html(data[i].playCount > 10000 ? parseInt(data[i].playCount / 10000) + '万' : data[i].playCount).end()
                .find('.songs-pic img').attr('src', data[i].coverImgUrl).end()
                .find('p').html(data[i].name).end()
                .find('#gotoDetails').attr('href', '#page/details.html?id=' + data[i].id + '&img=' + data[i].coverImgUrl).end()
                .appendTo($gedan)
        }
    }


    $(window).on('scroll', function () {
        var deviceHeight = $(window).height() - headerTabsHeight;
        var scroHeight = $(window).scrollTop();
        var docHeight = $('#view').height();
       /* console.log('scroHeight' + scroHeight)
        console.log('deviceHeight' + deviceHeight)
        console.log('docHeight' + docHeight)*/

        if (deviceHeight + scroHeight >= docHeight) {
            offset += limit;
            getSongsListsJson(function (data) {
                createSongs(data);
            }, limit, offset);

        }

    })


})()


    	