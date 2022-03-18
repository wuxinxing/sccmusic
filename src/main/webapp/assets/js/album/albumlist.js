$(function (){
    var albumId=getUrlParam("albumId");
    $.getJSON("/countalbumsongs.do",{albumId:albumId},function (data){
        if(data.success && data.songsnumber!==0){
            $('.pages').css("display","block");
           $('#pagination').jqPaginator({
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
                   getAlbumPage(n);
               }
           })
            $('.album-number').html(data.songsnumber);
        }else {
            $('.pages').css("display","none");
            $('#search_songsnumber').html("0");
        }
    })

    function getAlbumPage(n){
        $.getJSON("/queryalbumsongs.do",{albumId:albumId,index:n,pagesize:10},function (data){
            if(data.success){
                var swiperHtml="";
                var songList=data.songs;
                $('.release-time').html(data.time);
                songList.map(function (item,index){
                    $('.album-name').html(item.albumDomain.albumName);
                    $('.singer-name').html(item.userDomain.nickname);
                    $('.album-introduction').html(item.albumDomain.albumIntroduce);
                    $('#album-img').attr("src",item.albumDomain.albumPic);
                    var musicId=item.musicId;
                    swiperHtml+='<div class="songs-nav">\n' +
                        '            <div class="song-name"><a href="song.html?id='+item.musicId+'">'+item.musicName+'</a></div>\n' +
                        '            <div class="song-button">\n' +
                        '                <div id="buttons">\n' +
                        '                    <button type="button"  title="收藏" onclick="collect('+musicId+')" id="collect" class="iconbtn collectbutton"><span class="icon iconfont collecticon">&#xe66f;</span></button>\n' +
                        '                    <button type="button" title="取消收藏" onclick="collected('+musicId+')" id="collected" class="iconbtn collectedbutton" style="display: none; color: red;"><span class="icon iconfont collectedicon">&#xe66f;</span></button>\n' +
                        '                    <button type="button" title="添加到歌单" class="iconbtn addbutton"><span class="icon iconfont addicon">&#xe664;</span></button>\n' +
                        '                    <button type="button" title="下载" id="download" class="iconbtn downloadbutton"><span class="icon iconfont downloadicon">&#xe666;</span></button>\n' +
                        '                </div>\n' +
                        '            </div>\n' +
                        '            <div class="song-singer"><a href="my.html?userId='+item.userDomain.userId+'">'+item.userDomain.nickname+'</a></div>\n' +
                        '            <div class="song-time"><span>'+item.musicPlaybackTime+'</span></div>\n' +
                        '        </div>'
                })
                $('.album-songs').html(swiperHtml);

                $('.songs-nav').hover(function (){
                    $('.songs-nav:hover #buttons').css("display","block");
                    var musicId=$('.songs-nav:hover #musicid').html();
                    var musicSource=$('.songs-nav:hover #musicsource').html();
                    $('.songs-nav:hover #buttons #download').click(function (){
                        window.location.href="DownloadmusicServlet?musicsource="+musicSource;
                    })
                    $.getJSON("/playSongServlet.do",{id:musicId},function (data){
                        if (data.success) {
                            if (data.collected) {
                                $('.songs-nav:hover #buttons #collect').css("display", "none");
                                $('.songs-nav:hover #buttons #collected').css("display", "");
                            }}})

                },function (){
                    $('.songs-nav #buttons').css("display","none");
                })
            }
        })
    }

    collect=function (musicId){
        $.getJSON("/user/session.do",function (data){
            if(data.success){
                $.getJSON("/collectServlet.do",{id:musicId},function (data){
                    if(data.addcollect){
                        $('.alert').html('收藏成功').addClass('alert-success').show().delay(1000).fadeOut();
                        $('.songs-nav:hover #buttons #collect').css("display","none");
                        $('.songs-nav:hover #buttons #collected').css("display","");
                    }else{
                        $('.alert').html('收藏失败').addClass('alert-danger').show().delay(1000).fadeOut();
                    }
                })
            }else {
                $('.alert').html('请先登录').addClass('alert-danger').show().delay(1000).fadeOut();
            }
        })
    }

    collected=function (musicId){
        $.getJSON("/removeCollectServlet.do",{id:musicId},function (data){
            if(data.removecollect){
                $('.alert').html('取消收藏成功').addClass('alert-success').show().delay(1000).fadeOut();
                $('.songs-nav:hover #buttons #collected').css("display","none");
                $('.songs-nav:hover #buttons #collect').css("display","");
            }else{
                $('.alert').html('取消收藏失败').addClass('alert-danger').show().delay(1000).fadeOut();
            }
        })
    }


})