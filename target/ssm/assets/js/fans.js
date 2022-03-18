$(function(){
    var parauserId = getQueryString("userId");
    var usersongsURL="/getUserSongsServlet.do";
    var Ptr=$('li');
    if (parauserId===""){
        $.getJSON("/user/session.do",function (data) {
            var userId = data.user.userId;
            $('.fanshref').attr('href','/my-fans.html?userId='+userId);
            $('.followhref').attr('href','/myfollow.html?userId='+userId);
            {
                $('#headimg').attr("src", data.user.headImage);
                $('#my_introduce').html(data.user.userIntro);
                $('#my_address').html(data.user.userAddress);
                $('#my_age').html(data.user.age);
                $('#my_sex').html(data.user.sex);
                $('#my_nickname').html(data.user.nickname);
                var songNumbers=data.user.songNumbers;
                $('.my-current > .number').html(songNumbers);
            }
            $.getJSON(usersongsURL,{userId:userId,index:0,pagesize:10},function (data){
                if (data.success){
                    var songNumbers=data.songNumbers;
                    $('.my-current > .number').html(songNumbers);
                }
            })
            $.getJSON("/getUserRelationServlet.do",{userId:userId},function (data){
                if (data.success){
                    $('.my-fans > .number').html(data.countFans);
                    $('.my-follow > .number').html(data.countFollows);
                }
            })
            $.getJSON("/getUserFansUserServlet.do",{userId:userId,index:1,pagesize:5},function (data){
                if (data.success&&data.count!==0){
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
                    $('.relation-list').html("无数据");
                    $('.pages').css("display","none");
                }
            })
            function getPage(n){
                $.getJSON("/getUserFansUserServlet.do",{userId:userId,index:n,pagesize:5},function (data){
                    if (data.success){
                        var swiperHtml="";
                        var userList=data.userList;
                        userList.map(function (item){
                            $.getJSON("/user/session.do",function (data) {
                                var userId=data.user.userId;
                                $.getJSON("/checkRelationServlet.do",{fromUserId:userId,toUserId:item.userId},function (data){
                                    if (userId===item.userId){
                                        swiperHtml='\t\t\t\t<li>\n' +
                                            '\t\t\t\t\t<a href="my.html?userId='+item.userId+'" class="list-headimg"><img src="'+item.headImage+'" ></a>\n' +
                                            '\t\t\t\t\t<div class="info">\n' +
                                            '\t\t\t\t\t<div class="info-username"> \n'+
                                            '\t\t\t\t\t\t<a href="my.html?userId='+item.userId+'" >'+item.nickname+'</a>\n' +
                                            '\t\t\t\t\t</div> \n'+
                                            '\t\t\t\t\t\t<div class="info-box">\n' +
                                            '\t\t\t\t\t\t\t<div class="songs">\n' +
                                            '\t\t\t\t\t\t\t\t作品\n' +
                                            '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                            '\t\t\t\t\t\t\t\t\t\t'+item.user_music+'\n' +
                                            '\t\t\t\t\t\t\t\t\t</span>\n' +
                                            '\t\t\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t\t\t<a href="myfollow.html?userId='+item.userId+'"><div class="userfollow">\n' +
                                            '\t\t\t\t\t\t\t\t关注\n' +
                                            '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                            '\t\t\t\t\t\t\t\t\t\t'+item.followed+'\n' +
                                            '\t\t\t\t\t\t\t\t\t</span>\n' +
                                            '\t\t\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t\t\t</a>\n' +
                                            '\t\t\t\t\t\t\t<a href="my-fans.html?userId='+item.userId+'"><div class="userfans">\n' +
                                            '\t\t\t\t\t\t\t\t粉丝\n' +
                                            '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                            '\t\t\t\t\t\t\t\t\t\t'+item.fans+'\n' +
                                            '\t\t\t\t\t\t\t\t\t</span>\n' +
                                            '\t\t\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t\t\t</a>\n' +
                                            '\t\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t<button type="button" style="display:none;" onclick="listAddRelation(this,'+userId+','+item.userId+')" class="list-follow btn2 button button-block button-rounded button-small">关注</button>\n' +
                                            '\t\t\t\t\t<button type="button" style="display:none;" onclick="listDeleteRelation(this,'+userId+','+item.userId+')" class="list-unfollow btn2 button button-block button-rounded button-small">取消关注</button>\n' +
                                            '\t\t\t\t</li>';
                                    } else if (data.followed){
                                        swiperHtml='\t\t\t\t<li>\n' +
                                            '\t\t\t\t\t<a href="my.html?userId='+item.userId+'" class="list-headimg"><img src="'+item.headImage+'" ></a>\n' +
                                            '\t\t\t\t\t<div class="info">\n' +
                                            '\t\t\t\t\t<div class="info-username"> \n'+
                                             '\t\t\t\t\t\t<a href="my.html?userId='+item.userId+'" >'+item.nickname+'</a>\n' +
                                            '\t\t\t\t\t</div> \n'+
                                            '\t\t\t\t\t\t<div class="info-box">\n' +
                                            '\t\t\t\t\t\t\t<div class="songs">\n' +
                                            '\t\t\t\t\t\t\t\t作品\n' +
                                            '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                            '\t\t\t\t\t\t\t\t\t\t'+item.user_music+'\n' +
                                            '\t\t\t\t\t\t\t\t\t</span>\n' +
                                            '\t\t\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t\t\t<a href="myfollow.html?userId='+item.userId+'"><div class="userfollow">\n' +
                                            '\t\t\t\t\t\t\t\t关注\n' +
                                            '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                            '\t\t\t\t\t\t\t\t\t\t'+item.followed+'\n' +
                                            '\t\t\t\t\t\t\t\t\t</span>\n' +
                                            '\t\t\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t\t\t</a>\n' +
                                            '\t\t\t\t\t\t\t<a href="my-fans.html?userId='+item.userId+'"><div class="userfans">\n' +
                                            '\t\t\t\t\t\t\t\t粉丝\n' +
                                            '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                            '\t\t\t\t\t\t\t\t\t\t'+item.fans+'\n' +
                                            '\t\t\t\t\t\t\t\t\t</span>\n' +
                                            '\t\t\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t\t\t</a>\n' +
                                            '\t\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t<button type="button" style="display:none;" onclick="listAddRelation(this,'+userId+','+item.userId+')" class="list-follow btn2 button button-block button-rounded button-small">关注</button>\n' +
                                            '\t\t\t\t\t<button type="button" style="display:block;" onclick="listDeleteRelation(this,'+userId+','+item.userId+')" class="list-unfollow btn2 button button-block button-rounded button-small">取消关注</button>\n' +
                                            '\t\t\t\t</li>';
                                    }else {
                                        swiperHtml='\t\t\t\t<li>\n' +
                                            '\t\t\t\t\t<a href="my.html?userId='+item.userId+'" class="list-headimg"><img src="'+item.headImage+'" ></a>\n' +
                                            '\t\t\t\t\t<div class="info">\n' +
                                            '\t\t\t\t\t<div class="info-username"> \n'+
                                                 '\t\t\t\t\t\t<a href="my.html?userId='+item.userId+'" >'+item.nickname+'</a>\n' +
                                                '\t\t\t\t\t</div> \n'+
                                            '\t\t\t\t\t\t<div class="info-box">\n' +
                                            '\t\t\t\t\t\t\t<div class="songs">\n' +
                                            '\t\t\t\t\t\t\t\t作品\n' +
                                            '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                            '\t\t\t\t\t\t\t\t\t\t'+item.user_music+'\n' +
                                            '\t\t\t\t\t\t\t\t\t</span>\n' +
                                            '\t\t\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t\t\t<a href="myfollow.html?userId='+item.userId+'"><div class="userfollow">\n' +
                                            '\t\t\t\t\t\t\t\t关注\n' +
                                            '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                            '\t\t\t\t\t\t\t\t\t\t'+item.followed+'\n' +
                                            '\t\t\t\t\t\t\t\t\t</span>\n' +
                                            '\t\t\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t\t\t</a>\n' +
                                            '\t\t\t\t\t\t\t<a href="my-fans.html?userId='+item.userId+'"><div class="userfans">\n' +
                                            '\t\t\t\t\t\t\t\t粉丝\n' +
                                            '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                            '\t\t\t\t\t\t\t\t\t\t'+item.fans+'\n' +
                                            '\t\t\t\t\t\t\t\t\t</span>\n' +
                                            '\t\t\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t\t\t</a>\n' +
                                            '\t\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t</div>\n' +
                                            '\t\t\t\t\t<button type="button" style="display:block;" onclick="listAddRelation(this,'+userId+','+item.userId+')" class="list-follow btn2 button button-block button-rounded button-small">关注</button>\n' +
                                            '\t\t\t\t\t<button type="button" style="display:none;" onclick="listDeleteRelation(this,'+userId+','+item.userId+')" class="list-unfollow btn2 button button-block button-rounded button-small">取消关注</button>\n' +
                                            '\t\t\t\t</li>';
                                    }
                                    $('.relation-list').append(swiperHtml);
                                })
                            })
                        })
                    }
                })
            }
        })
    } else
    {
        $.getJSON("/user/session.do",function (data){
            var userId=data.user.userId
            if (parauserId != userId){
                // {
                //     $('.fanshref').attr('href','/my-fans.html?userId='+parauserId);
                //     $('.followhref').attr('href','/myfollow.html?userId='+parauserId);
                //     $('#headimg').attr("src", data.user.headImage);
                //     $('#my_introduce').html(data.user.userIntro);
                //     $('#my_address').html(data.user.userAddress);
                //     $('#my_age').html(data.user.age);
                //     $('#my_sex').html(data.user.sex);
                //     $('#my_nickname').html(data.user.nickname);
                // }
                $.getJSON("/getUserRelationServlet.do",{userId:parauserId},function (data){
                    if (data.success){
                        $('.my-fans > .number').html(data.countFans);
                        $('.my-follow > .number').html(data.countFollows);
                    }
                })
                $.getJSON(usersongsURL,{userId:parauserId,index:0,pagesize:10},function (data){
                    if (data.success){
                        var songNumbers=data.songNumbers;
                        $('.my-current > .number').html(songNumbers);
                    }
                })
                $('.fanshref').attr('href','/my-fans.html?userId='+parauserId);
                $('.followhref').attr('href','/myfollow.html?userId='+parauserId);
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

                $.getJSON("/getUserFansUserServlet.do",{userId:parauserId,index:1,pagesize:5},function (data){
                    if (data.success&&data.count!==0){
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
                        $('.relation-list').html("无数据");
                        $('.pages').css("display","none");
                    }
                })
                function getPage(n){
                    $.getJSON("/getUserFansUserServlet.do",{userId:parauserId,index:n,pagesize:5},function (data){
                        if (data.success){
                            var swiperHtml="";
                            var userList=data.userList;
                            userList.map(function (item){
                                $.getJSON("/user/session.do",function (data) {
                                    var userId=data.user.userId;
                                    $.getJSON("/checkRelationServlet.do",{fromUserId:userId,toUserId:item.userId},function (data){
                                        if (userId===item.userId){
                                            swiperHtml='\t\t\t\t<li>\n' +
                                                '\t\t\t\t\t<a href="my.html?userId='+item.userId+'" class="list-headimg"><img src="'+item.headImage+'" ></a>\n' +
                                                '\t\t\t\t\t<div class="info">\n' +
                                                '\t\t\t\t\t<div class="info-username"> \n'+
                                                '\t\t\t\t\t\t<a href="my.html?userId='+item.userId+'" >'+item.nickname+'</a>\n' +
                                                '\t\t\t\t\t</div> \n'+
                                                '\t\t\t\t\t\t<div class="info-box">\n' +
                                                '\t\t\t\t\t\t\t<div class="songs">\n' +
                                                '\t\t\t\t\t\t\t\t作品\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t'+item.user_music+'\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t<a href="myfollow.html?userId='+item.userId+'"><div class="userfollow">\n' +
                                                '\t\t\t\t\t\t\t\t关注\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t'+item.followed+'\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t</a>\n' +
                                                '\t\t\t\t\t\t\t<a href="my-fans.html?userId='+item.userId+'"><div class="userfans">\n' +
                                                '\t\t\t\t\t\t\t\t粉丝\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t'+item.fans+'\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t</a>\n' +
                                                '\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t<button type="button" style="display:none;" onclick="listAddRelation(this,'+userId+','+item.userId+')" class="list-follow btn2 button button-block button-rounded button-small">关注</button>\n' +
                                                '\t\t\t\t\t<button type="button" style="display:none;" onclick="listDeleteRelation(this,'+userId+','+item.userId+')" class="list-unfollow btn2 button button-block button-rounded button-small">取消关注</button>\n' +
                                                '\t\t\t\t</li>';
                                        } else if (data.followed){
                                            swiperHtml='\t\t\t\t<li>\n' +
                                                '\t\t\t\t\t<a href="my.html?userId='+item.userId+'" class="list-headimg"><img src="'+item.headImage+'" ></a>\n' +
                                                '\t\t\t\t\t<div class="info">\n' +
                                                '\t\t\t\t\t<div class="info-username"> \n'+
                                                 '\t\t\t\t\t\t<a href="my.html?userId='+item.userId+'" >'+item.nickname+'</a>\n' +
                                                '\t\t\t\t\t</div> \n'+
                                                '\t\t\t\t\t\t<div class="info-box">\n' +
                                                '\t\t\t\t\t\t\t<div class="songs">\n' +
                                                '\t\t\t\t\t\t\t\t作品\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t'+item.user_music+'\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t<a href="myfollow.html?userId='+item.userId+'"><div class="userfollow">\n' +
                                                '\t\t\t\t\t\t\t\t关注\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t'+item.followed+'\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t</a>\n' +
                                                '\t\t\t\t\t\t\t<a href="my-fans.html?userId='+item.userId+'"><div class="userfans">\n' +
                                                '\t\t\t\t\t\t\t\t粉丝\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t'+item.fans+'\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t</a>\n' +
                                                '\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t<button type="button" style="display:none;" onclick="listAddRelation(this,'+userId+','+item.userId+')" class="list-follow btn2 button button-block button-rounded button-small">关注</button>\n' +
                                                '\t\t\t\t\t<button type="button" style="display:block;" onclick="listDeleteRelation(this,'+userId+','+item.userId+')" class="list-unfollow btn2 button button-block button-rounded button-small">取消关注</button>\n' +
                                                '\t\t\t\t</li>';
                                        }else {
                                            swiperHtml='\t\t\t\t<li>\n' +
                                                '\t\t\t\t\t<a href="my.html?userId='+item.userId+'" class="list-headimg"><img src="'+item.headImage+'" ></a>\n' +
                                                '\t\t\t\t\t<div class="info">\n' +
                                                '\t\t\t\t\t<div class="info-username"> \n'+
                                                 '\t\t\t\t\t\t<a href="my.html?userId='+item.userId+'" >'+item.nickname+'</a>\n' +
                                                '\t\t\t\t\t</div> \n'+
                                                '\t\t\t\t\t\t<div class="info-box">\n' +
                                                '\t\t\t\t\t\t\t<div class="songs">\n' +
                                                '\t\t\t\t\t\t\t\t作品\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t'+item.user_music+'\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t<a href="myfollow.html?userId='+item.userId+'"><div class="userfollow">\n' +
                                                '\t\t\t\t\t\t\t\t关注\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t'+item.followed+'\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t</a>\n' +
                                                '\t\t\t\t\t\t\t<a href="my-fans.html?userId='+item.userId+'"><div class="userfans">\n' +
                                                '\t\t\t\t\t\t\t\t粉丝\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t'+item.fans+'\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t</a>\n' +
                                                '\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t<button type="button" style="display:block;" onclick="listAddRelation(this,'+userId+','+item.userId+')" class="list-follow btn2 button button-block button-rounded button-small">关注</button>\n' +
                                                '\t\t\t\t\t<button type="button" style="display:none;" onclick="listDeleteRelation(this,'+userId+','+item.userId+')" class="list-unfollow btn2 button button-block button-rounded button-small">取消关注</button>\n' +
                                                '\t\t\t\t</li>';
                                        }
                                        $('.relation-list').append(swiperHtml);
                                    })
                                })
                            })
                        }
                    })
                }
            }else {
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
                $.getJSON(usersongsURL,{userId:parauserId,index:0,pagesize:10},function (data){
                    if (data.success){
                        var songNumbers=data.songNumbers;
                        $('.my-current > .number').html(songNumbers);
                    }
                })
                $.getJSON("/getUserRelationServlet.do",{userId:parauserId},function (data){
                    if (data.success){
                        $('.my-fans > .number').html(data.countFans);
                        $('.my-follow > .number').html(data.countFollows);
                    }
                })
                $.getJSON("/getUserFansUserServlet.do", {userId: parauserId, index: 1, pagesize: 5}, function (data) {
                    if (data.success && data.count !== 0) {
                        $("#pagination").jqPaginator({
                            totalPages: data.count,
                            visiblePages: 5,
                            currentPage: 1,
                            first: '<li class="first"><a href="javascript:void(0);">首页<\/a><\/li>',
                            prev: '<li class="prev"><a href="javascript:void(0);">前一页<\/a><\/li>',
                            next: '<li class="next"><a href="javascript:void(0);">后一页<\/a><\/li>',
                            last: '<li class="last"><a href="javascript:void(0);">尾页<\/a><\/li>',
                            page: '<li class="page"><a href="javascript:void(0);">{{page}}<\/a><\/li>',
                            onPageChange: function (n) {
                                $("#text").html(n)
                                getPage(n);
                            }
                        });
                    } else {
                        $('.relation-list').html("无数据");
                        $('.pages').css("display","none");
                    }
                })
                function getPage(n) {
                    $.getJSON("/getUserFansUserServlet.do", {
                        userId: parauserId,
                        index: n,
                        pagesize: 5
                    }, function (data) {
                        if (data.success) {
                            var swiperHtml = "";
                            var userList = data.userList;
                            userList.map(function (item) {
                                $.getJSON("/user/session.do", function (data) {
                                    var userId = data.user.userId;
                                    $.getJSON("/checkRelationServlet.do", {
                                        fromUserId: userId,
                                        toUserId: item.userId
                                    }, function (data) {
                                        if (userId===item.userId){
                                            swiperHtml='\t\t\t\t<li>\n' +
                                                '\t\t\t\t\t<a href="my.html?userId='+item.userId+'" class="list-headimg"><img src="'+item.headImage+'" ></a>\n' +
                                                '\t\t\t\t\t<div class="info">\n' +
                                                '\t\t\t\t\t<div class="info-username"> \n'+
                                                '\t\t\t\t\t\t<a href="my.html?userId='+item.userId+'" >'+item.nickname+'</a>\n' +
                                                '\t\t\t\t\t</div> \n'+
                                                '\t\t\t\t\t\t<div class="info-box">\n' +
                                                '\t\t\t\t\t\t\t<div class="songs">\n' +
                                                '\t\t\t\t\t\t\t\t作品\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t'+item.user_music+'\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t<a href="myfollow.html?userId='+item.userId+'"><div class="userfollow">\n' +
                                                '\t\t\t\t\t\t\t\t关注\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t'+item.followed+'\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t</a>\n' +
                                                '\t\t\t\t\t\t\t<a href="my-fans.html?userId='+item.userId+'"><div class="userfans">\n' +
                                                '\t\t\t\t\t\t\t\t粉丝\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t'+item.fans+'\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t</a>\n' +
                                                '\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t<button type="button" style="display:none;" onclick="listAddRelation(this,'+userId+','+item.userId+')" class="list-follow btn2 button button-block button-rounded button-small">关注</button>\n' +
                                                '\t\t\t\t\t<button type="button" style="display:none;" onclick="listDeleteRelation(this,'+userId+','+item.userId+')" class="list-unfollow btn2 button button-block button-rounded button-small">取消关注</button>\n' +
                                                '\t\t\t\t</li>';
                                        } else if (data.followed) {
                                            swiperHtml = '\t\t\t\t<li>\n' +
                                                '\t\t\t\t\t<a href="my.html?userId=' + item.userId + '" class="list-headimg"><img src="' + item.headImage + '" ></a>\n' +
                                                '\t\t\t\t\t<div class="info">\n' +
                                                '\t\t\t\t\t<div class="info-username"> \n'+
                                                '\t\t\t\t\t\t<a href="my.html?userId='+item.userId+'" >'+item.nickname+'</a>\n' +
                                                '\t\t\t\t\t</div> \n'+
                                                '\t\t\t\t\t\t<div class="info-box">\n' +
                                                '\t\t\t\t\t\t\t<div class="songs">\n' +
                                                '\t\t\t\t\t\t\t\t作品\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t' + item.user_music + '\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t<a href="myfollow.html?userId=' + item.userId + '"><div class="userfollow">\n' +
                                                '\t\t\t\t\t\t\t\t关注\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t' + item.followed + '\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t</a>\n' +
                                                '\t\t\t\t\t\t\t<a href="my-fans.html?userId=' + item.userId + '"><div class="userfans">\n' +
                                                '\t\t\t\t\t\t\t\t粉丝\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t' + item.fans + '\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t</a>\n' +
                                                '\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t<button type="button" style="display:none;" onclick="listAddRelation(this,' + userId + ',' + item.userId + ')" class="list-follow btn2 button button-block button-rounded button-small">关注</button>\n' +
                                                '\t\t\t\t\t<button type="button" style="display:block;" onclick="listDeleteRelation(this,' + userId + ',' + item.userId + ')" class="list-unfollow btn2 button button-block button-rounded button-small">取消关注</button>\n' +
                                                '\t\t\t\t</li>';
                                        } else {
                                            swiperHtml = '\t\t\t\t<li>\n' +
                                                '\t\t\t\t\t<a href="my.html?userId=' + item.userId + '" class="list-headimg"><img src="' + item.headImage + '" ></a>\n' +
                                                '\t\t\t\t\t<div class="info">\n' +
                                                '\t\t\t\t\t<div class="info-username"> \n'+
                                                '\t\t\t\t\t\t<a href="my.html?userId='+item.userId+'" >'+item.nickname+'</a> \n' +
                                                '\t\t\t\t\t</div> \n'+
                                                '\t\t\t\t\t\t<div class="info-box">\n' +
                                                '\t\t\t\t\t\t\t<div class="songs">\n' +
                                                '\t\t\t\t\t\t\t\t作品\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t' + item.user_music + '\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t<a href="myfollow.html?userId=' + item.userId + '"><div class="userfollow">\n' +
                                                '\t\t\t\t\t\t\t\t关注\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t' + item.followed + '\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t</a>\n' +
                                                '\t\t\t\t\t\t\t<a href="my-fans.html?userId=' + item.userId + '"><div class="userfans">\n' +
                                                '\t\t\t\t\t\t\t\t粉丝\n' +
                                                '\t\t\t\t\t\t\t\t<span class="number">\n' +
                                                '\t\t\t\t\t\t\t\t\t\t' + item.fans + '\n' +
                                                '\t\t\t\t\t\t\t\t\t</span>\n' +
                                                '\t\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t\t\t</a>\n' +
                                                '\t\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t</div>\n' +
                                                '\t\t\t\t\t<button type="button" style="display:block;" onclick="listAddRelation(this,' + userId + ',' + item.userId + ')" class="list-follow btn2 button button-block button-rounded button-small">关注</button>\n' +
                                                '\t\t\t\t\t<button type="button" style="display:none;" onclick="listDeleteRelation(this,' + userId + ',' + item.userId + ')" class="list-unfollow btn2 button button-block button-rounded button-small">取消关注</button>\n' +
                                                '\t\t\t\t</li>';
                                        }
                                        $('.relation-list').append(swiperHtml);
                                    })
                                })
                            })


                        }
                    })
                }
            }
        })
    }



    for (i=1;i<Ptr.length+1;i++) {
        Ptr[i-1].className = (i%2===0)?"bg":"";
    }


    listAddRelation=function(obj,fromUserId,toUserId){
        $.getJSON("/addRelationServlet.do",{fromUserId:fromUserId,toUserId:toUserId},function (data) {
            if (data.success){
                $(obj).css("display","none");
                $(obj).next().css("display","");
                $('.alert').html('关注成功').addClass('alert-success').show().delay(1000).fadeOut();
                return 0;
            }else {
                $('.alert').html('操作失败').addClass('alert-success').show().delay(1000).fadeOut();
                return 1;
            }
        })
    }

    listDeleteRelation=function(obj,fromUserId,toUserId){
        $.getJSON("/deleteRelationServlet.do",{fromUserId:fromUserId,toUserId:toUserId},function (data) {
            if (data.success){
                $(obj).css("display","none");
                $(obj).prev().css("display","");
                $('.alert').html('取消关注成功').addClass('alert-success').show().delay(1000).fadeOut();
                return 0;
            }else {
                $('.alert').html('操作失败').addClass('alert-success').show().delay(1000).fadeOut();
                return 1;
            }
        })
    }
})