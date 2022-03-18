$(function (){
    //获取url中的参数
    var searchSongsUrl='/song/searchsongs.do';
    var searchSingersUrl='/song/searchsingers.do';
    var  searchkey=getUrlParam('searchkey');

    $.getJSON("/song/countsearchsongs.do",{searchkey:searchkey},function (data){
        if (data.success && data.count!==0){
            $('.pages').css("display","block");
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
                    getSearchSongsPage(n);
                }});
            $('#search_songsnumber').html(data.songsnumber);
        }else {
            $('.pages').css("display","none");
            $('#search_keyword').html(searchkey);
            $('#search_songsnumber').html("0");
            $('.music-search-input').val(searchkey);
        }
    })


    function getSearchSongsPage(n){
        $.getJSON(searchSongsUrl,{searchkey:searchkey,index:n,pagesize:3},function (data){
            if (data.success){
                var swiperHtml="";
                var songList=data.songs;
                songList.map(function (item,index){
                    var musicId=item.musicId;
                    swiperHtml+='<div class="songs-nav">\n' +
                        '\t\t\t\t\t<span id="musicid" style="display: none">'+item.musicId+'</span><span id="musicsource" style="display: none">'+item.musicSource+'</span>\n' +
                        '\t\t\t\t\t<div class="song-name"><a href="song.html?id='+item.musicId+'">'+item.musicName+'</a></div>\n' +
                        '\t\t\t\t\t<div class="song-button">\n' +
                        '\t\t\t\t\t<div id="buttons">\n' +
                        '\t\t\t\t\t\t<button type="button"  title="收藏" onclick="collect('+musicId+')" id="collect" class="iconbtn collectbutton"><span class="icon iconfont collecticon">&#xe66f;</span></button>\n' +
                        '\t\t\t\t\t\t<button type="button" title="取消收藏" onclick="collected('+musicId+')" id="collected" class="iconbtn collectedbutton" style="display: none; color: red;"><span class="icon iconfont collectedicon">&#xe66f;</span></button>\n' +
                        '\t\t\t\t\t\t<button type="button" title="添加到歌单" class="iconbtn addbutton"><span class="icon iconfont addicon">&#xe664;</span></button>\n' +
                        '\t\t\t\t\t\t<button type="button" title="下载" id="download" class="iconbtn downloadbutton"><span class="icon iconfont downloadicon">&#xe666;</span></button>\n' +
                        '\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t<div class="song-singer"><a href="my.html?userId="'+item.userDomain.userId+'>'+item.userDomain.nickname+'</a></div>\n' +
                        '\t\t\t\t\t<div class="song-album"><a href="album.html?albumId='+item.albumId+'">《'+item.albumDomain.albumName+'》</a></div>\n' +
                        '\t\t\t\t\t<div class="song-time"><span>'+item.musicPlaybackTime+'</span></div>\n' +
                        '\t\t\t\t</div>'
                })
                $('.search-songs').html(swiperHtml);
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
                $('.music-search-input').val(searchkey);
                $('#search_keyword').html(searchkey);
            }
        })
    }

    function getsingersPage(n){
        $.getJSON(searchSingersUrl,{index:n,pagesize:10,searchkey:searchkey},function (data){
            if (data.success){
                $('.search-input').val(searchkey);
                var swiperHtml="";
                var userList=data.singers;
                userList.map(function (item,index){
                    swiperHtml+='<li>\n' +
                        '\t\t\t\t\t<div class="singer-pic">\n' +
                        '\t\t\t\t\t\t<a href="my.html?userId='+item.userId+'"><img src="'+item.headImage+'"></a>\n' +
                        '\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t<p class="singer-name">\n' +
                        '\t\t\t\t\t\t<a href="my.html?userId='+item.userId+'">'+item.nickname+'</a>\n' +
                        '\t\t\t\t\t</p>\n' +
                        '\t\t\t\t</li>';
                })
                $('.search-singers').html(swiperHtml);
                $('.music-search-input').val(searchkey);
                $('#search_keyword').html(searchkey);
            }
        })
    }


    $('#ul-music-search').click(function (){
        var searchkey=  $('.music-search-input').val();
        if (!$.trim(searchkey)==''){
            window.location.href='search.html?searchkey='+searchkey;
        }
    })

    $('.music-search-input').focus(function (){
            $(document).keyup(function(event){
                if(event.keyCode ==13){
                    $("#ul-music-search").trigger("click");
                }
            });
        }
    )

    $('#song-btn').click(function(){
        $('.search-singers').css("display","none");
        $('.search-songs').css("display","block");
        $('#head').css("display","none");
        $('#song-btn').addClass("active");
        $('#singer-btn').removeClass("active");
        $('#search-point-lastword').html("首单曲");
        $('.search-point-songsnumber').attr('id',"search_songsnumber");
        $.getJSON("/song/countsearchsongs.do",{searchkey:searchkey},function (data){
            if (data.success && data.count!==0){
                $('.pages').css("display","block");
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
                    }});
                $('#search_songsnumber').html(data.songsnumber);
            }else {
                $('#search_songsnumber').html("0");
                $('.pages').css("display","none");
                $('#search_keyword').html(searchkey);
                $('.music-search-input').val(searchkey);
            }
        })
    })


    $('#singer-btn').click(function(){
        $('.search-songs').css("display","none");
        $('.search-singers').css("display","block");
        $('#singer-btn').addClass("active");
        $('#song-btn').removeClass("active");
        $('#search-point-lastword').html("个歌手");
        $('.search-point-songsnumber').attr('id',"search_singersnumber");
        $.getJSON("/song/countsearchsingers.do",{searchkey:searchkey},function (data){
            $('.pages').css("display","block");
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
                        getsingersPage(n);
                    }});
                $('#search_singersnumber').html(data.singersnumber);
            }else {
                $('.pages').css("display","none");
                $('#search_singersnumber').html("0");
                $('#search_keyword').html(searchkey);
                $('.music-search-input').val(searchkey);
            }
        })
    })


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
