$(function (){
    var recomURL="/recomSongsServlet.do";
    var timerecomURL="/timeRecomSongsServlet.do";
    var hotrecomURL="/hotRecomSongsServlet.do"
    var classifysongsURL="/classifySongsServlet.do";
    $.getJSON(recomURL,{index:0,pagesize:8},function (data){
        if(data.success){
            var swiperHtml="";
            var songList=data.songs;
            songList.map(function (item,index){
            var author =item.userDomain.nickname;
            var songName =item.musicName;
            var songId =item.musicId;
            var songCover =item.musicPic;
            swiperHtml+='\t\t\t\t\t\t\t\t<li>\n' +
                '\t\t\t\t\t\t\t\t\t<div class="u-cover">\n' +
                '\t\t\t\t\t\t\t\t\t\t<img src="'+songCover+'">\n' +
                '\t\t\t\t\t\t\t\t\t\t<a title="'+songName+' - '+author+'" href="song.html?id='+songId+'" class="msk"></a>\n' +
                '\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t<p class="dec">\n' +
                '\t\t\t\t\t\t\t\t\t\t<a title="'+songName+' - '+author+'" href="song.html?id='+songId+'">'+songName+'</a>\n' +
                '\t\t\t\t\t\t\t\t\t</p>\n' +
                '\t\t\t\t\t\t\t\t\t<div class="author"><a href="my.html?userId='+item.userDomain.userId+'"> '+author+'</a></div>\n' +
                '\t\t\t\t\t\t\t\t</li>';
            })
            $('.recomsong').html(swiperHtml);
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
    $.getJSON(classifysongsURL,{songType:"说唱",index:0,pagesize:5},function (data){
        if (data.success){
            var swiperHtml="";
            var rank=1;
            var songList=data.songs;
            songList.map(function (item,index){
                var date=item.uploadTime;
                var odate =new Date(date);
                var fullYear=odate.getFullYear();
                var month=odate.getMonth()+1;
                var day=odate.getDate();
                var uploadTime= fullYear +'-'+month +'-'+day;
                swiperHtml+='\t\t\t\t\t\t\t\t\t\t<li class="music-list-item">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t<div class="title">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t<div class="title_wrap">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="rank">'+rank+'</span>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="song.html?id='+item.musicId+'" title="'+item.musicName+'">'+item.musicName+'</a>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t<div class="info">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t<span class="date">'+uploadTime+'</span>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t<span class="avatar"><img src="'+item.userDomain.headImage+'"></span>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t</li>';
                rank++;
            })
            $('.rap-rank').html(swiperHtml);
        }
    })
    $.getJSON(classifysongsURL,{songType:"流行",index:0,pagesize:5},function (data){
        if (data.success){
            var swiperHtml="";
            var rank=1;
            var songList=data.songs;
            songList.map(function (item,index){
                var date=item.uploadTime;
                var odate =new Date(date);
                var fullYear=odate.getFullYear();
                var month=odate.getMonth()+1;
                var day=odate.getDate();
                var uploadTime= fullYear +'-'+month +'-'+day;
                swiperHtml+='\t\t\t\t\t\t\t\t\t\t<li class="music-list-item">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t<div class="title">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t<div class="title_wrap">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="rank">'+rank+'</span>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="song.html?id='+item.musicId+'" title="'+item.musicName+'">'+item.musicName+'</a>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t<div class="info">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t<span class="date">'+uploadTime+'</span>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t<span class="avatar"><img src="'+item.userDomain.headImage+'"></span>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t</li>';
                rank++;
            })
            $('.pop-rank').html(swiperHtml);
        }
    })
    $.getJSON(classifysongsURL,{songType:"民谣",index:0,pagesize:5},function (data){
        if (data.success){
            var swiperHtml="";
            var rank=1;
            var songList=data.songs;
            songList.map(function (item,index){
                var date=item.uploadTime;
                var odate =new Date(date);
                var fullYear=odate.getFullYear();
                var month=odate.getMonth()+1;
                var day=odate.getDate();
                var uploadTime= fullYear +'-'+month +'-'+day;
                swiperHtml+='\t\t\t\t\t\t\t\t\t\t<li class="music-list-item">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t<div class="title">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t<div class="title_wrap">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="rank">'+rank+'</span>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="song.html?id='+item.musicId+'" title="'+item.musicName+'">'+item.musicName+'</a>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t<div class="info">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t<span class="date">'+uploadTime+'</span>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t<span class="avatar"><img src="'+item.userDomain.headImage+'"></span>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t</li>';
                rank++;
            })
            $('.folk-rank').html(swiperHtml);
        }
    })
    $.getJSON(classifysongsURL,{songType:"电子",index:0,pagesize:5},function (data){
        if (data.success){
            var swiperHtml="";
            var rank=1;
            var songList=data.songs;
            songList.map(function (item,index){
                var date=item.uploadTime;
                var odate =new Date(date);
                var fullYear=odate.getFullYear();
                var month=odate.getMonth()+1;
                var day=odate.getDate();
                var uploadTime= fullYear +'-'+month +'-'+day;
                swiperHtml+='\t\t\t\t\t\t\t\t\t\t<li class="music-list-item">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t<div class="title">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t<div class="title_wrap">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t<span class="rank">'+rank+'</span>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t\t<a href="song.html?id='+item.musicId+'" title="'+item.musicName+'">'+item.musicName+'</a>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t<div class="info">\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t<span class="date">'+uploadTime+'</span>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t\t<span class="avatar"><img src="'+item.userDomain.headImage+'"></span>\n' +
                    '\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                    '\t\t\t\t\t\t\t\t\t\t</li>';
                rank++;
            })
            $('.edm-rank').html(swiperHtml);
        }
    })
})