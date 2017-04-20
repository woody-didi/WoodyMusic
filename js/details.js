(function () {

    function getSongsListsJson(loadHtml, id) {
      
            var local = 'api/playlist.json';
            var server = 'https://api.imjad.cn/cloudmusic';
            var $song_detal = $('.song-detal');

            $song_detal.append('<p id="spin">正在加载...</p>')

            console.log(server + "?type=playlist&id=" + id)

            $.ajax({
                url: server + "?type=playlist&id=" + id,
                success: function (data) {
                    if (data.code == 200) {
                    	$('#spin').remove();
                        loadHtml(data.playlist); //回调方式取得ajax异步请求的数据；
                        
                    }
                }
            });
       

    }


   
    
   var id = getUrlParams().id;
    getSongsListsJson(function (data) { 
    	 
    	var img = getUrlParams().img;
        var $songDetal = $('.song-detal');
        var $song = $('.bot-songs ul');
        var next = {};
        var $topPicHtml = $('#temp-top-pic').html();
        var $songItemHtml = $('#temp-song-item').html();  
        for (var i = 0; i < data.tracks.length; i++) {
            $($songItemHtml).find('.song-name').html(data.tracks[i].name).end()
                .find('.author').html(data.tracks[i].ar[0].name).end()
                .find('.num').html(i + 1).end()
                .on('click',function(){
                	next.self = $(this).index();
//              	var selectSong = $('.bot-songs').find('li').eq($(this).index()).html();
//                  $('.prevs').find('ul').append($(this));
                	next.num = $(this).index();
                	$(this).parent().find('.num,.song-name,.author').removeClass('numcolor');
                	$(this).find('.num,.song-name,.author').addClass('numcolor');
                	$('.play').slideDown();
                	audioControler.playAudio(data.tracks[$(this).index()]);
                }).appendTo($song);
        }; 
	     $('#next').on('click',function(){
	     	$('.bot-songs').find('.num,.song-name,.author').removeClass('numcolor').end()
	     	               .find('li').eq(++next.self).find('.num,.song-name,.author').addClass('numcolor');
	      	audioControler.playAudio(data.tracks[++next.num]);
	      
	     });
	    

        

        var srcUrl = img + '==/' + data.coverImgId_str + '.jpg';
        $($topPicHtml).find('.arPic').attr('src', data.creator.avatarUrl).end()
            .find('.songPic').attr('src', srcUrl).end()
            .find('span').html(data.creator.nickname).end()
            .find('.txt').html(data.name).end()
            .appendTo($songDetal);
        $('.top-bar .txt').html(data.name);
        $("#bg").attr('src', srcUrl);

    }, id)

	 
    $('#toHome').on('click', function () {
        route('tabs', $('#view'))
    })


    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 0) {
            $('.top-bar').addClass('bgc').find('span').text($('.txt').text())
        } else {
            $('.top-bar').removeClass('bgc').find('span').text('歌单')
        }

    })

})()

    	