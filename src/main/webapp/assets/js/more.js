$(function (){
    var more =getQueryString("more");
    var moreURL="/moreServlet.do";
    var countSongsURL="/countSongsServlet.do";

    if (more==="hot-recommand"){
        $('h2').html("<i class=\"fa fa-music red more-title\"></i>单曲推荐");
    }else if(more==="rap"){
        $('h2').html("<i class=\"fa fa-music red more-title\"></i>说唱");
    }else if(more==="pop"){
        $('h2').html("<i class=\"fa fa-music red more-title\"></i>流行");
    }else if(more==="rock"){
        $('h2').html("<i class=\"fa fa-music red more-title\"></i>摇滚");
    }else if(more==="folk"){
        $('h2').html("<i class=\"fa fa-music red more-title\"></i>民谣");
    }else if(more==="edm"){
        $('h2').html("<i class=\"fa fa-music red more-title\"></i>电子");
    }else if(more==="mysongs"){
        $('h2').html("<i class=\"fa fa-music red more-title\"></i>我的歌曲");
    }else if(more==="mycollect"){
        $('h2').html("<i class=\"fa fa-music red more-title\"></i>收藏作品");
    }else if(more==="myhistory"){
        $('h2').html("<i class=\"fa fa-history red\"></i>播放历史");
    }
    $.getJSON(countSongsURL,{more:more},function (data){
        if (data.success && data.count!==0){
            $("#pagination").jqPaginator({
                totalPages: data.count,
                visiblePages: 5,
                currentPage: 1,
                first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                prev: '<li class="prev"><a href="javascript:void(0);">前一页<\/a><\/li>',
                next: '<li class="next"><a href="javascript:void(0);">后一页<\/a><\/li>',
                last: '<li class="last"><a href="javascript:void(0);">尾页<\/a><\/li>',
                page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                onPageChange: function(n) {
                    $("#text").html(n)
                    getPage(n);
                }
            });
        }else {
            $('.more-music').html("暂无音乐");
            $('.pages').css("display","none");
        }
    })

    function getPage(n){
        $.getJSON(moreURL,{more:more,index:n,pagesize:15},function (data){
            if (data.success){
                var swiperHtml="";
                var songList=data.songs;
                if (more==="mycollect"){
                    songList.map(function (item,index){
                        var author =item.userDomain.nickname;
                        var songName =item.songDomain.musicName;
                        var songId =item.songDomain.musicId;
                        var songCover =item.songDomain.musicPic;
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
                }else if (more==="myhistory"){
                    songList.map(function (item,index){
                        var author =item.userDomain.nickname;
                        var songName =item.songDomain.musicName;
                        var songId =item.songDomain.musicId;
                        var songCover =item.songDomain.musicPic;
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
                }else if (more==="mysongs"){
                    songList.map(function (item,index){
                        var author =item.userDomain.nickname;
                        var songName =item.musicName;
                        var songId =item.musicId;
                        var songCover =item.musicPic;
                        swiperHtml+='\t\t\t\t\t<li>\n' +
                            '\t\t\t\t\t\t<div class="u-cover">\n' +
                            '\t\t\t\t\t\t\t<img\n' +
                            '\t\t\t\t\t\t\t\tsrc="'+item.musicPic+'">\n' +
                            '\t\t\t\t\t\t\t<a title="'+item.musicName+' - '+item.userDomain.nickname+'" href="song.html?id='+item.musicId+'" class="msk"></a>\n' +
                            '\t\t\t\t\t\t</div>\n' +
                            '\t\t\t\t\t\t<p class="dec">\n' +
                            '\t\t\t\t\t\t\t<a title="'+item.musicName+' - '+item.userDomain.nickname+'" href="song.html?id='+item.musicId+'">'+item.musicName+'</a>\n' +
                            '\t\t\t\t\t\t</p>\n' +
                            '\t\t\t\t\t\t<div class="played-info">'+item.musicPlayedtimes+'次播放</div>\n' +
                            '\t\t\t\t\t</li>';
                    })
                }else{
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
                }
                $('.more-music').html(swiperHtml);
            }
        })
    }
})
