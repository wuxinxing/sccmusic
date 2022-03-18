$(function (){
    var historyURL="/songHistoryServlet.do"
    var collectURL="/getUserCollectedServlet.do";
    var usersongsURL="/getUserSongsServlet.do";
    var parauserId = getQueryString("userId");
    if (parauserId===""){
    $.getJSON("/user/session.do",function (data) {
        var userId = data.user.userId
        $('.fanshref').attr('href','/my-fans.html?userId='+userId);
        $('.followhref').attr('href','/myfollow.html?userId='+userId);
        {
        $('#headimg').attr("src", data.user.headImage);
        $('#my_introduce').html(data.user.userIntro);
        $('#my_address').html(data.user.userAddress);
        $('#my_age').html(data.user.age);
        $('#my_sex').html(data.user.sex);
        $('#my_nickname').html(data.user.nickname);
        }
        $.getJSON(historyURL,{userId:userId,index:0,pagesize:10},function (data){
            if(data.success){
                var swiperHtml="";
                var songList=data.songs;
                songList.map(function (item,index){
                    swiperHtml+='\t\t\t\t\t<li>\n' +
                        '\t\t\t\t\t\t<div class="u-cover">\n' +
                        '\t\t\t\t\t\t\t<img\n' +
                        '\t\t\t\t\t\t\t\tsrc="'+item.songDomain.musicPic+'">\n' +
                        '\t\t\t\t\t\t\t<a title="'+item.songDomain.musicName+' - '+item.userDomain.nickname+'" href="song.html?id='+item.songDomain.musicId+'" class="msk"></a>\n' +
                        '\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t<p class="dec">\n' +
                        '\t\t\t\t\t\t\t<a title="'+item.songDomain.musicName+' - '+item.userDomain.nickname+'" href="song.html?id='+item.songDomain.musicId+'">'+item.songDomain.musicName+'</a>\n' +
                        '\t\t\t\t\t\t</p>\n' +
                        '\t\t\t\t\t\t<div class="played-info"><a href="my.html?userId='+item.userDomain.userId+'">'+item.userDomain.nickname+'</a></div>\n' +
                        '\t\t\t\t\t</li>';
                })
                $('.music-history').html(swiperHtml);
            }
        })
        $.getJSON(collectURL,{userId:userId,index:0,pagesize:10},function (data){
            if(data.success){
                var swiperHtml="";
                var songList=data.songs;
                songList.map(function (item,index){
                    swiperHtml+='\t\t\t\t\t<li>\n' +
                        '\t\t\t\t\t\t<div class="u-cover">\n' +
                        '\t\t\t\t\t\t\t<img\n' +
                        '\t\t\t\t\t\t\t\tsrc="'+item.songDomain.musicPic+'">\n' +
                        '\t\t\t\t\t\t\t<a title="'+item.songDomain.musicName+' - '+item.userDomain.nickname+'" href="song.html?id='+item.songDomain.musicId+'" class="msk"></a>\n' +
                        '\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t<p class="dec">\n' +
                        '\t\t\t\t\t\t\t<a title="'+item.songDomain.musicName+' - '+item.userDomain.nickname+'" href="song.html?id='+item.songDomain.musicId+'">'+item.songDomain.musicName+'</a>\n' +
                        '\t\t\t\t\t\t</p>\n' +
                        '\t\t\t\t\t\t<div class="played-info"><a href="my.html?userId='+item.userDomain.userId+'">'+item.userDomain.nickname+'</a></div>\n' +
                        '\t\t\t\t\t</li>';
                })
                $('.mycollect').html(swiperHtml);
            }
        })
            $.getJSON(usersongsURL,{userId:userId,index:0,pagesize:10},function (data){
                if (data.success){
                    var swiperHtml="";
                    var songList=data.songs;
                    var songNumbers=data.songNumbers;
                    $('.my-current > .number').html(songNumbers);
                    songList.map(function (item,index){
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
                    $('.usersongs').html(swiperHtml);
                }
            })
        $.getJSON("/getUserRelationServlet.do",{userId:userId},function (data){
            if (data.success){
                $('.my-fans > .number').html(data.countFans);
                $('.my-follow > .number').html(data.countFollows);
            }
        })
        })
    } else
    {
        $.getJSON("/user/session.do",function (data){
            var userId=data.user.userId
            if (parauserId != userId){
                $('.fanshref').attr('href','/my-fans.html?userId='+parauserId);
                $('.followhref').attr('href','/myfollow.html?userId='+parauserId);
                $('.usersonglist').html("<i class=\"fa fa-music red \"></i>他的歌曲");
                $.getJSON("/getUserServlet.do",{userId:parauserId},function (data){
                    if (data.success){
                        $('#headimg').attr("src", data.user.headImage);
                        $('#my_introduce').html(data.user.userIntro);
                        $('#my_address').html(data.user.userAddress);
                        $('#my_age').html(data.user.age);
                        $('#my_sex').html(data.user.sex);
                        $('#my_nickname').html(data.user.nickname);
                    }else {
                        $('.alert').html('用户不存在').addClass('alert-success').show().delay(1000).fadeOut();
                    }
                })
                $('.edit').css("display","none");
                $.getJSON("/checkRelationServlet.do",{fromUserId:userId,toUserId:parauserId},function (data){
                    if (data.success){
                        if (data.followed){
                            $('.un-follow').css("display","");
                        }else {
                            $('.follow').css("display","");
                        }
                    }
                })
                $('.follow').click(function (){
                    addRelation(userId,parauserId);
                });
                $('.un-follow').click(function (){
                    deleteRelation(userId,parauserId);
                });
            }
            {
                $('.fanshref').attr('href','/my-fans.html?userId='+parauserId);
                $('.followhref').attr('href','/myfollow.html?userId='+parauserId);
                $('#headimg').attr("src", data.user.headImage);
                $('#my_introduce').html(data.user.userIntro);
                $('#my_address').html(data.user.userAddress);
                $('#my_age').html(data.user.age);
                $('#my_sex').html(data.user.sex);
                $('#my_nickname').html(data.user.nickname);
            }
            $.getJSON(historyURL,{userId:parauserId,index:0,pagesize:10},function (data){
                if(data.success){
                    var swiperHtml="";
                    var songList=data.songs;
                    songList.map(function (item,index){
                        swiperHtml+='\t\t\t\t\t<li>\n' +
                            '\t\t\t\t\t\t<div class="u-cover">\n' +
                            '\t\t\t\t\t\t\t<img\n' +
                            '\t\t\t\t\t\t\t\tsrc="'+item.songDomain.musicPic+'">\n' +
                            '\t\t\t\t\t\t\t<a title="'+item.songDomain.musicName+' - '+item.userDomain.nickname+'" href="song.html?id='+item.songDomain.musicId+'" class="msk"></a>\n' +
                            '\t\t\t\t\t\t</div>\n' +
                            '\t\t\t\t\t\t<p class="dec">\n' +
                            '\t\t\t\t\t\t\t<a title="'+item.songDomain.musicName+' - '+item.userDomain.nickname+'" href="song.html?id='+item.songDomain.musicId+'">'+item.songDomain.musicName+'</a>\n' +
                            '\t\t\t\t\t\t</p>\n' +
                            '\t\t\t\t\t\t<div class="played-info"><a href="my.html?userId='+item.userDomain.userId+'">'+item.userDomain.nickname+'</a></div>\n' +
                            '\t\t\t\t\t</li>';
                    })
                    $('.music-history').html(swiperHtml);
                }
            })
            $.getJSON(collectURL,{userId:parauserId,index:0,pagesize:10},function (data){
                if(data.success){
                    var swiperHtml="";
                    var songList=data.songs;
                    songList.map(function (item,index){
                        swiperHtml+='\t\t\t\t\t<li>\n' +
                            '\t\t\t\t\t\t<div class="u-cover">\n' +
                            '\t\t\t\t\t\t\t<img\n' +
                            '\t\t\t\t\t\t\t\tsrc="'+item.songDomain.musicPic+'">\n' +
                            '\t\t\t\t\t\t\t<a title="'+item.songDomain.musicName+' - '+item.userDomain.nickname+'" href="song.html?id='+item.songDomain.musicId+'" class="msk"></a>\n' +
                            '\t\t\t\t\t\t</div>\n' +
                            '\t\t\t\t\t\t<p class="dec">\n' +
                            '\t\t\t\t\t\t\t<a title="'+item.songDomain.musicName+' - '+item.userDomain.nickname+'" href="song.html?id='+item.songDomain.musicId+'">'+item.songDomain.musicName+'</a>\n' +
                            '\t\t\t\t\t\t</p>\n' +
                            '\t\t\t\t\t\t<div class="played-info"><a href="my.html?userId='+item.userDomain.userId+'">'+item.userDomain.nickname+'</a></div>\n' +
                            '\t\t\t\t\t</li>';
                    })
                    $('.mycollect').html(swiperHtml);
                }
            })
            $.getJSON(usersongsURL,{userId:parauserId,index:0,pagesize:10},function (data){
                if (data.success){
                    var swiperHtml="";
                    var songList=data.songs;
                    var songNumbers=data.songNumbers;
                    $('.my-current > .number').html(songNumbers);
                    songList.map(function (item,index){
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
                    $('.usersongs').html(swiperHtml);
                }
            })
            $.getJSON("/getUserRelationServlet.do",{userId:parauserId},function (data){
                if (data.success){
                    $('.my-fans > .number').html(data.countFans);
                    $('.my-follow > .number').html(data.countFollows);
                }
            })

        })
    }


})
addRelation= function (fromUserId,toUserId){
    $.getJSON("/addRelationServlet.do",{fromUserId:fromUserId,toUserId:toUserId},function (data) {
        if (data.success){
            $('.follow').css("display","none");
            $('.un-follow').css("display","");
            $('.alert').html('关注成功').addClass('alert-success').show().delay(1000).fadeOut();
            return 0;
        }else {
            $('.alert').html('操作失败').addClass('alert-success').show().delay(1000).fadeOut();
            return 1;
        }
    })
}
deleteRelation=function (fromUserId,toUserId){
    $.getJSON("/deleteRelationServlet.do",{fromUserId:fromUserId,toUserId:toUserId},function (data) {
        if (data.success){
            $('.follow').css("display","");
            $('.un-follow').css("display","none");
            $('.alert').html('取消关注成功').addClass('alert-success').show().delay(1000).fadeOut();
            return 0;
        }else {
            $('.alert').html('操作失败').addClass('alert-success').show().delay(1000).fadeOut();
            return 1;
        }
    })
}