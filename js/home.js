(function () {
    /************请求json数据************/
    function getCache() {//取得缓存时间以及判断什么时候使用缓存数据;
        if (!localStorage.playlists) {
            return false;
        }
        if (new Date().getTime() - localStorage.cacheTime >= 10 * 60 * 500) {
            return false;
          
        }
        return true;
    }

    function getSongsListsJson(loadHtml, limit) {
        if (getCache()){
            /*console.log('访问缓存');*/
            loadHtml(JSON.parse(localStorage.playlists));
        } else {
           /* console.log('访问网络');*/
            limit = limit || 6;
            var local = 'api/topPlayList.json';
            var server = 'http://musicapi.duapp.com/api.php';
            var $songs = $('.recommend-song');
            $songs.append('<p class="rotate"></p>')
         
            $.ajax({
                url: server + "?type=topPlayList&cat=%E5%85%A8%E9%83%A8&offset=0&limit=" + limit,
                success: function (data) {
                    if (data.code == 200) {
                    	$songs.find('.rotate').remove();
                        loadHtml(data.playlists); //回调方式取得ajax异步请求的数据；
                        localStorage.playlists = JSON.stringify(data.playlists); //保存请求回来的数据到缓存里；

                        localStorage.cacheTime = new Date().getTime(); //记录缓存时间
                    }
                }
            });
        }

    }


    getSongsListsJson(function (data) {
        var $songs = $('.songs');
        var $songsItemHtml = $('#temp-songs-item').html();
        for (var i = 0; i < data.length; i++) {
            $($songsItemHtml).find('.motal').html(data[i].playCount > 10000 ? parseInt(data[i].playCount / 10000) + '万' : data[i].playCount).end()
                .find('.songs-pic img').attr('src', data[i].coverImgUrl).end()
                .find('p').html(data[i].name).end()
                .find('#gotoDetails').attr('href', '#pages/details.html?id=' + data[i].id + '&img=' + data[i].coverImgUrl).end()
                .appendTo($songs)
        }
       
    }, 12)


    $('#gotoDetails').on('click', function () {
      
        route('details', $('#view'))
    })

    initHeight();
    $(window).on('resize', function () {
        initHeight()
    })


    function initHeight() {
     
        $('#tabs-container').css('margin-top', $('.headerTabs').height());

    }


})()
    
    