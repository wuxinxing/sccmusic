$(function(){
	var songURL="/playSongServlet.do";
	var timerecomURL="/timeRecomSongsServlet.do";
	var hotrecomURL="/hotRecomSongsServlet.do";
	var addcollectURL="/collectServlet.do";
	var removecollectURL="/removeCollectServlet.do";
	var id=getQueryString("id");
	$.getJSON(songURL,{id:id},function (data){
		if (data.success){
			if(data.collected){
				$('#collect').css("display","none");
				$('#collected').css("display","");
			}
			var date=data.song.uploadTime;
			var odate =new Date(date);
			var fullYear=odate.getFullYear();
			var month=odate.getMonth()+1;
			var day=odate.getDate();
			var uploadTime= fullYear +'年'+month +'月'+day+'日';
			var nickName=data.song.userDomain.nickname;
			var musicName=data.song.musicName;
			var musicIntroduce=data.song.musicIntroduce;
		$("title").html(musicName);
		$("h2").html(musicName);
		$(".author").html('<a href="my.html?userId='+data.song.userDomain.userId+'"> '+nickName+'</a>');
		$(".date").html(uploadTime);
		$(".music-intro").html(musicIntroduce);
		var musicSource =data.song.musicSource;
		var musicPic =data.song.musicPic;
			var ap = new APlayer({
				element: document.getElementById('music-player'), // Optional, player element
				narrow: false,                                    // Optional, narrow style
				autoplay: false,                                   // Optional, autoplay song(s), not supported by mobile browsers
				showlrc: 0,                                       // Optional, show lrc, can be 0, 1, 2, see: ###With lrc
				mutex: true,                                      // Optional, pause other players when this player playing
				theme: '#B72712',                                 // Optional, theme color, default: #b7daff
				mode: 'circulation',                              // Optional, play mode, `random` `single` `circulation`(loop) `order`(no loop), default: `circulation`
				preload: 'metadata',                              // Optional, the way to load music, can be 'none' 'metadata' 'auto', default: 'auto'
				listmaxheight: '513px',                           // Optional, max height of play list
				music: {                                          // Required, music info
					title: musicName,                                 // Required, music title
					author: nickName,                          // Required, music author
					url: musicSource,  // Required, music url
					pic: musicPic // Optional, music picture
				}
			});
			$('#download').click(function (){
				window.location.href="DownloadmusicServlet?musicsource="+musicSource;
			})
		}
	})
	$.getJSON(timerecomURL,{index: 0,pagesize: 5},function (data) {
		if (data.success) {
			var swiperHtml = "";
			var songList = data.songs;
			songList.map(function (item, index) {
				var author = item.userDomain.nickname;
				var songName = item.musicName;
				var songId = item.musicId;
				var userheadImage = item.userDomain.headImage;
				var playedtimes = item.musicPlayedtimes;
				swiperHtml+='\t\t\t\t\t\t<li class="artist-song">\n' +
					'\t\t\t\t\t\t\t<div class="avatar">\n' +
					'\t\t\t\t\t\t\t\t<img src="'+userheadImage+'">\n' +
					'\t\t\t\t\t\t\t</div>\n' +
					'\t\t\t\t\t\t\t<div class="info">\n' +
					'\t\t\t\t\t\t\t\t<h3>'+songName+'</h3>\n' +
					'\t\t\t\t\t\t\t\t<p>'+author+' / <span>'+playedtimes+'</span>次播放</p>\n' +
					'\t\t\t\t\t\t\t</div>\n' +
					'\t\t\t\t\t\t\t<a href="song.html?id='+songId+'" title="Refrain" class="cover-link"></a>\n' +
					'\t\t\t\t\t\t</li>';
			})
			$('.newsongs').html(swiperHtml);
		}
	})

	$.getJSON("/checkIfUserOwnsSongServlet.do",{musicId:id},function (data){
		if (data.success){
			$('#delete').removeAttr("style").attr('onclick','deleteSong('+id+')');

		}
	})
	$.getJSON(hotrecomURL,{index:0,pagesize:5},function (data){
		if(data.success){
			var swiperHtml="";
			var songList=data.songs;
			songList.map(function (item,index){
				var author = item.userDomain.nickname;
				var songName = item.musicName;
				var songId = item.musicId;
				var userheadImage = item.userDomain.headImage;
				var playedtimes = item.musicPlayedtimes;
				swiperHtml+='\t\t\t\t\t\t<li class="artist-song">\n' +
					'\t\t\t\t\t\t\t<div class="avatar">\n' +
					'\t\t\t\t\t\t\t\t<img src="'+userheadImage+'">\n' +
					'\t\t\t\t\t\t\t</div>\n' +
					'\t\t\t\t\t\t\t<div class="info">\n' +
					'\t\t\t\t\t\t\t\t<h3>'+songName+'</h3>\n' +
					'\t\t\t\t\t\t\t\t<p>'+author+' / <span>'+playedtimes+'</span>次播放</p>\n' +
					'\t\t\t\t\t\t\t</div>\n' +
					'\t\t\t\t\t\t\t<a href="song.html?id='+songId+'" title="Refrain" class="cover-link"></a>\n' +
					'\t\t\t\t\t\t</li>';
			})
			$('.hotsongs').html(swiperHtml);
		}
	})
	$('.collectbutton').click(function (){
		$.getJSON("/user/session.do",function (data){
			if(data.success){
			$.getJSON(addcollectURL,{id:id},function (data){
				if(data.addcollect){
					$('.alert').html('收藏成功').addClass('alert-success').show().delay(1000).fadeOut();
					$('#collect').css("display","none");
					$('#collected').css("display","");
				}else{
					$('.alert').html('收藏失败').addClass('alert-danger').show().delay(1000).fadeOut();
				}
			})
			}else {
				$('.alert').html('请先登录').addClass('alert-danger').show().delay(1000).fadeOut();
			}
		})
	})
	$('.collectedbutton').click(function (){

		$.getJSON(removecollectURL,{id:id},function (data){
			if(data.removecollect){
				$('.alert').html('取消收藏成功').addClass('alert-success').show().delay(1000).fadeOut();
				$('#collected').css("display","none");
				$('#collect').css("display","");
			}else{
				$('.alert').html('取消收藏失败').addClass('alert-danger').show().delay(1000).fadeOut();
			}
		})
	})
	deleteSong=function (id){
		zdconfirm('','确定要删除歌曲吗?',function (r){
			if (r){
				$.getJSON('/deleteMusicServlet.do',{musicId:id},function (data){
					if (data.success){
						$('.alert').html('删除歌曲成功').addClass('alert-success').show().delay(1000).fadeOut();
						window.setInterval(function (){
							window.location.href="/index.html";
						},1000)
					}
				})
			}
		})
	}
})
