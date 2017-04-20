var audioControler = {
	flag:true,
	server : 'http://musicapi.duapp.com/api.php',
	playAudio:function (music){console.log(music)
		var $play = $('.play');
		$play.find('.songname').html(music.name).end()
		     .find('.ar').html(music.ar[0].name).end()
		     .find('.pic img').attr('src','img/default.gif');
	
		$.ajax({
		type:"get",
		url:this.server + "?type=url&id=" + music.id,
		success:function(data){console.log('fff'+this.flag)
			if(data.code == 200){
				var audio = $('#audio')[0];
				audio.src = data.data[0].url;
				audio.play();
				audio.pause();
				$play.find('.pic img').attr('src',music.al.picUrl);
				var flag = false;
				$('#pause').on('click',function(){
					if(flag){
						$(this).addClass('hide');$('#play').removeClass('hide');
						$('#audio')[0].pause();flag = false;
					}
				})
				$('#play').on('click',function(){
					if(!flag){
						$(this).addClass('hide');$('#pause').removeClass('hide');
						$('#audio')[0].play();flag = true;
					}
				})
				$('#play').removeClass('hide');
				$('#pause').addClass('hide');
				
				}
			}
		});
	}
	
};

(function(){
	

	$('#audio')[0].onended = function(){
		$('#next').trigger('click');
	}
	
	
})()




