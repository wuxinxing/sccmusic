$(function () {
    var musicId=getQueryString("id");
    $.getJSON("/user/session.do", function (data) {
        if (data.success){
            var sessionUserId=data.user.userId;
            var sessionUserHeadImage=data.user.headImage;
            $('.comment-send').css("display","");
            $('.comment-send .user-face img').attr('src',sessionUserHeadImage);
        }else {
            $('.comment-send').css("display","none");
        }
        $.getJSON("/getCommentServlet.do",{musicId:musicId},function (data){
            if (data.success){
                $('.comment-span').css("display","");
                var swiperHtml="";
                var comments=data.comments;
                comments.map(function (item,index){
                    var date=item.commentTime;
                    var commentId=item.commentId;
                    var odate =new Date(date);
                    var fullYear=odate.getFullYear();
                    var month=odate.getMonth()+1;
                    var day=odate.getDay();
                    var hour=odate.getHours();
                    var minute=odate.getMinutes();
                    var commentTime= fullYear +'-'+month +'-'+day+' '+hour+':'+minute;
                    if(item.commentUserId===sessionUserId){
                        swiperHtml='\t\t\t<div class="list-item" comment_id="'+commentId+'" person_id="'+item.commentUserId+'">\n' +
                            '\t\t\t\t<div class="user-face">\n' +
                            '\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="'+item.userDomain.headImage+'" ></a>\n' +
                            '\t\t\t\t</div>\n' +
                            '\t\t\t\t<div class="con">\n' +
                            '\t\t\t\t\t<div class="user">\n' +
                            '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>'+item.userDomain.nickname+'</a>\n' +
                            '\t\t\t\t\t</div>\n' +
                            '\t\t\t\t\t<p class="text">'+item.commentText+'</p>\n' +
                            '\t\t\t\t\t<div class="info">\n' +
                            '\t\t\t\t\t\t<span class="time">\n' +
                            '\t\t\t\t\t\t\t'+commentTime+'\n' +
                            '\t\t\t\t\t\t</span>\n' +
                            '\t\t\t\t\t\t<span class="reply" onclick="comment_reply(this,'+commentId+','+item.commentUserId+')">\n' +
                            '\t\t\t\t\t\t\t回复\n' +
                            '\t\t\t\t\t\t</span>\n' +
                            '\t\t\t<span class="delete" onclick="delete_comment('+commentId+')">\n' +
                            '\t\t\t\t删除\n' +
                            '\t\t\t</span>'+
                            '\t\t\t\t\t</div>\n' +
                            '\t\t\t\t\t<div class="reply-box">\n' +
                            '\t\t\t\t\t</div>\n' +
                            '\t\t\t\t</div>\n' +
                            '\t\t\t</div>';
                    }else {
                        swiperHtml = '\t\t\t<div class="list-item" comment_id="' + commentId + '" person_id="' + item.commentUserId + '">\n' +
                            '\t\t\t\t<div class="user-face">\n' +
                            '\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '" ></a>\n' +
                            '\t\t\t\t</div>\n' +
                            '\t\t\t\t<div class="con">\n' +
                            '\t\t\t\t\t<div class="user">\n' +
                            '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                            '\t\t\t\t\t</div>\n' +
                            '\t\t\t\t\t<p class="text">' + item.commentText + '</p>\n' +
                            '\t\t\t\t\t<div class="info">\n' +
                            '\t\t\t\t\t\t<span class="time">\n' +
                            '\t\t\t\t\t\t\t' + commentTime + '\n' +
                            '\t\t\t\t\t\t</span>\n' +
                            '\t\t\t\t\t\t<span class="reply" onclick="comment_reply(this,' + commentId + ',' + item.commentUserId + ')">\n' +
                            '\t\t\t\t\t\t\t回复\n' +
                            '\t\t\t\t\t\t</span>\n' +
                            '\t\t\t\t\t</div>\n' +
                            '\t\t\t\t\t<div class="reply-box">\n' +
                            '\t\t\t\t\t</div>\n' +
                            '\t\t\t\t</div>\n' +
                            '\t\t\t</div>';
                    }
                    $('.comment-list').append(swiperHtml);
                    $.getJSON('/getReplyServlet.do',{commentId:commentId},function (data){
                        if (data.success){
                            var replys=data.replys;
                            replys.map(function (item,index){
                                var replycommentid=item.commentId;
                                var date=item.commentTime;
                                var odate =new Date(date);
                                var fullYear=odate.getFullYear();
                                var month=odate.getMonth()+1;
                                var day=odate.getDay();
                                var hour=odate.getHours();
                                var minute=odate.getMinutes();
                                var replyTime= fullYear +'-'+month +'-'+day+' '+hour+':'+minute;
                                if(item.commentUserId===sessionUserId){
                                    swiperHtml = '\t\t\t\t\t<div class="reply-item" comment_id="' + item.commentId + '" person_id="' + item.commentuserId + '">\n' +
                                        '                        <div class="user-face">\n' +
                                        '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '"  alt=""></a>\n' +
                                        '                        </div>\n' +
                                        '\t\t\t\t\t\t<div class="reply-con">\n' +
                                        '\t\t\t\t\t\t\t<div class="user">\n' +
                                        '\t\t\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                        '\t\t\t\t\t\t\t\t<p class="text-con">' + item.commentText + '</p>\n' +
                                        '\t\t\t\t\t\t\t</div>\n' +
                                        '\t\t\t\t\t\t</div>\n' +
                                        '\t\t\t\t\t\t<div class="info">\n' +
                                        '\t\t\t\t\t\t\t<span class="time">\n' +
                                        '\t\t\t\t\t\t\t\t' + replyTime + '\n' +
                                        '\t\t\t\t\t\t\t</span>\n' +
                                        '\t\t\t\t\t\t\t<span class="reply" onclick="reply(this,' + commentId + ',' + item.commentUserId + ',' + '\'' + item.userDomain.nickname + '\'' + ')">\n' +
                                        '\t\t\t\t\t\t\t\t回复\n' +
                                        '\t\t\t\t\t\t\t</span>\n' +
                                        '\t\t\t<span class="delete" onclick="delete_comment('+item.commentId+')">\n' +
                                        '\t\t\t\t删除\n' +
                                        '\t\t\t</span>'+
                                        '\t\t\t\t\t\t</div>\n' +
                                        '\t\t\t\t\t</div>';
                                }else {
                                    swiperHtml = '\t\t\t\t\t<div class="reply-item" comment_id="' + item.commentId + '" person_id="' + item.commentuserId + '">\n' +
                                        '                        <div class="user-face">\n' +
                                        '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '"  alt=""></a>\n' +
                                        '                        </div>\n' +
                                        '\t\t\t\t\t\t<div class="reply-con">\n' +
                                        '\t\t\t\t\t\t\t<div class="user">\n' +
                                        '\t\t\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                        '\t\t\t\t\t\t\t\t<p class="text-con">' + item.commentText + '</p>\n' +
                                        '\t\t\t\t\t\t\t</div>\n' +
                                        '\t\t\t\t\t\t</div>\n' +
                                        '\t\t\t\t\t\t<div class="info">\n' +
                                        '\t\t\t\t\t\t\t<span class="time">\n' +
                                        '\t\t\t\t\t\t\t\t' + replyTime + '\n' +
                                        '\t\t\t\t\t\t\t</span>\n' +
                                        '\t\t\t\t\t\t\t<span class="reply" onclick="reply(this,' + commentId + ',' + item.commentUserId + ',' + '\'' + item.userDomain.nickname + '\'' + ')">\n' +
                                        '\t\t\t\t\t\t\t\t回复\n' +
                                        '\t\t\t\t\t\t\t</span>\n' +
                                        '\t\t\t\t\t\t</div>\n' +
                                        '\t\t\t\t\t</div>';
                                }
                                $(".list-item[comment_id='"+commentId+"'] .reply-box").append(swiperHtml);
                            })
                        }
                    })
                })
            }else {
                $('.comment-span').css("display","none");
            }
        });
    })

    $('.comment-submit').click(function (){
        if($('.comment-textarea').val().trim()===""){
            $('.alert').html('请输入内容!').addClass('alert-success').show().delay(1000).fadeOut();
        }else{
            $.getJSON("/user/session.do",function (data){
                if (data.success){
                    var commentText = $('.comment-textarea').val();
                    var userId= data.user.userId;
                    $.getJSON("/addCommentServlet.do",{userId:userId,musicId:musicId,commentText:commentText},function (data){
                        if(data.success){
                            $('.alert').html('评论成功!').addClass('alert-success').show().delay(1000).fadeOut();
                            $.getJSON("/user/session.do", function (data) {
                                if (data.success){
                                    var sessionUserId=data.user.userId;
                                    var sessionUserHeadImage=data.user.headImage;
                                    $('.comment-send').css("display","");
                                    $('.comment-send .user-face img').attr('src',sessionUserHeadImage);
                                }else {
                                    $('.comment-send').css("display","none");
                                }
                                $('.comment-list').html(" ");
                                $.getJSON("/user/session.do", function (data) {
                                    if (data.success){
                                        var sessionUserId=data.user.userId;
                                        var sessionUserHeadImage=data.user.headImage;
                                        $('.comment-send').css("display","");
                                        $('.comment-send .user-face img').attr('src',sessionUserHeadImage);
                                    }else {
                                        $('.comment-send').css("display","none");
                                    }
                                    $.getJSON("/getCommentServlet.do",{musicId:musicId},function (data){
                                        if (data.success){
                                            $('.comment-span').css("display","");
                                            var swiperHtml="";
                                            var comments=data.comments;
                                            comments.map(function (item,index){
                                                var date=item.commentTime;
                                                var commentId=item.commentId;
                                                var odate =new Date(date);
                                                var fullYear=odate.getFullYear();
                                                var month=odate.getMonth()+1;
                                                var day=odate.getDay();
                                                var hour=odate.getHours();
                                                var minute=odate.getMinutes();
                                                var commentTime= fullYear +'-'+month +'-'+day+' '+hour+':'+minute;
                                                if(item.commentUserId===sessionUserId){
                                                    swiperHtml='\t\t\t<div class="list-item" comment_id="'+commentId+'" person_id="'+item.commentUserId+'">\n' +
                                                        '\t\t\t\t<div class="user-face">\n' +
                                                        '\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="'+item.userDomain.headImage+'" ></a>\n' +
                                                        '\t\t\t\t</div>\n' +
                                                        '\t\t\t\t<div class="con">\n' +
                                                        '\t\t\t\t\t<div class="user">\n' +
                                                        '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>'+item.userDomain.nickname+'</a>\n' +
                                                        '\t\t\t\t\t</div>\n' +
                                                        '\t\t\t\t\t<p class="text">'+item.commentText+'</p>\n' +
                                                        '\t\t\t\t\t<div class="info">\n' +
                                                        '\t\t\t\t\t\t<span class="time">\n' +
                                                        '\t\t\t\t\t\t\t'+commentTime+'\n' +
                                                        '\t\t\t\t\t\t</span>\n' +
                                                        '\t\t\t\t\t\t<span class="reply" onclick="comment_reply(this,'+commentId+','+item.commentUserId+')">\n' +
                                                        '\t\t\t\t\t\t\t回复\n' +
                                                        '\t\t\t\t\t\t</span>\n' +
                                                        '\t\t\t<span class="delete" onclick="delete_comment('+commentId+')">\n' +
                                                        '\t\t\t\t删除\n' +
                                                        '\t\t\t</span>'+
                                                        '\t\t\t\t\t</div>\n' +
                                                        '\t\t\t\t\t<div class="reply-box">\n' +
                                                        '\t\t\t\t\t</div>\n' +
                                                        '\t\t\t\t</div>\n' +
                                                        '\t\t\t</div>';
                                                }else {
                                                    swiperHtml = '\t\t\t<div class="list-item" comment_id="' + commentId + '" person_id="' + item.commentUserId + '">\n' +
                                                        '\t\t\t\t<div class="user-face">\n' +
                                                        '\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '" ></a>\n' +
                                                        '\t\t\t\t</div>\n' +
                                                        '\t\t\t\t<div class="con">\n' +
                                                        '\t\t\t\t\t<div class="user">\n' +
                                                        '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                                        '\t\t\t\t\t</div>\n' +
                                                        '\t\t\t\t\t<p class="text">' + item.commentText + '</p>\n' +
                                                        '\t\t\t\t\t<div class="info">\n' +
                                                        '\t\t\t\t\t\t<span class="time">\n' +
                                                        '\t\t\t\t\t\t\t' + commentTime + '\n' +
                                                        '\t\t\t\t\t\t</span>\n' +
                                                        '\t\t\t\t\t\t<span class="reply" onclick="comment_reply(this,' + commentId + ',' + item.commentUserId + ')">\n' +
                                                        '\t\t\t\t\t\t\t回复\n' +
                                                        '\t\t\t\t\t\t</span>\n' +
                                                        '\t\t\t\t\t</div>\n' +
                                                        '\t\t\t\t\t<div class="reply-box">\n' +
                                                        '\t\t\t\t\t</div>\n' +
                                                        '\t\t\t\t</div>\n' +
                                                        '\t\t\t</div>';
                                                }
                                                $('.comment-list').append(swiperHtml);
                                                $.getJSON('/getReplyServlet.do',{commentId:commentId},function (data){
                                                    if (data.success){
                                                        var replys=data.replys;
                                                        replys.map(function (item,index){
                                                            var replycommentid=item.commentId;
                                                            var date=item.commentTime;
                                                            var odate =new Date(date);
                                                            var fullYear=odate.getFullYear();
                                                            var month=odate.getMonth()+1;
                                                            var day=odate.getDay();
                                                            var hour=odate.getHours();
                                                            var minute=odate.getMinutes();
                                                            var replyTime= fullYear +'-'+month +'-'+day+' '+hour+':'+minute;
                                                            if(item.commentUserId===sessionUserId){
                                                                swiperHtml = '\t\t\t\t\t<div class="reply-item" comment_id="' + item.commentId + '" person_id="' + item.commentuserId + '">\n' +
                                                                    '                        <div class="user-face">\n' +
                                                                    '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '"  alt=""></a>\n' +
                                                                    '                        </div>\n' +
                                                                    '\t\t\t\t\t\t<div class="reply-con">\n' +
                                                                    '\t\t\t\t\t\t\t<div class="user">\n' +
                                                                    '\t\t\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                                                    '\t\t\t\t\t\t\t\t<p class="text-con">' + item.commentText + '</p>\n' +
                                                                    '\t\t\t\t\t\t\t</div>\n' +
                                                                    '\t\t\t\t\t\t</div>\n' +
                                                                    '\t\t\t\t\t\t<div class="info">\n' +
                                                                    '\t\t\t\t\t\t\t<span class="time">\n' +
                                                                    '\t\t\t\t\t\t\t\t' + replyTime + '\n' +
                                                                    '\t\t\t\t\t\t\t</span>\n' +
                                                                    '\t\t\t\t\t\t\t<span class="reply" onclick="reply(this,' + commentId + ',' + item.commentUserId + ',' + '\'' + item.userDomain.nickname + '\'' + ')">\n' +
                                                                    '\t\t\t\t\t\t\t\t回复\n' +
                                                                    '\t\t\t\t\t\t\t</span>\n' +
                                                                    '\t\t\t<span class="delete" onclick="delete_comment('+item.commentId+')">\n' +
                                                                    '\t\t\t\t删除\n' +
                                                                    '\t\t\t</span>'+
                                                                    '\t\t\t\t\t\t</div>\n' +
                                                                    '\t\t\t\t\t</div>';
                                                            }else {
                                                                swiperHtml = '\t\t\t\t\t<div class="reply-item" comment_id="' + item.commentId + '" person_id="' + item.commentuserId + '">\n' +
                                                                    '                        <div class="user-face">\n' +
                                                                    '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '"  alt=""></a>\n' +
                                                                    '                        </div>\n' +
                                                                    '\t\t\t\t\t\t<div class="reply-con">\n' +
                                                                    '\t\t\t\t\t\t\t<div class="user">\n' +
                                                                    '\t\t\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                                                    '\t\t\t\t\t\t\t\t<p class="text-con">' + item.commentText + '</p>\n' +
                                                                    '\t\t\t\t\t\t\t</div>\n' +
                                                                    '\t\t\t\t\t\t</div>\n' +
                                                                    '\t\t\t\t\t\t<div class="info">\n' +
                                                                    '\t\t\t\t\t\t\t<span class="time">\n' +
                                                                    '\t\t\t\t\t\t\t\t' + replyTime + '\n' +
                                                                    '\t\t\t\t\t\t\t</span>\n' +
                                                                    '\t\t\t\t\t\t\t<span class="reply" onclick="reply(this,' + commentId + ',' + item.commentUserId + ',' + '\'' + item.userDomain.nickname + '\'' + ')">\n' +
                                                                    '\t\t\t\t\t\t\t\t回复\n' +
                                                                    '\t\t\t\t\t\t\t</span>\n' +
                                                                    '\t\t\t\t\t\t</div>\n' +
                                                                    '\t\t\t\t\t</div>';
                                                            }
                                                            $(".list-item[comment_id='"+commentId+"'] .reply-box").append(swiperHtml);
                                                        })
                                                    }
                                                })
                                            })
                                        }else {
                                            $('.comment-span').css("display","none");
                                        }
                                    });
                                })
                            })
                        }else {
                            $('.alert').html('评论失败!').addClass('alert-success').show().delay(1000).fadeOut();
                        }
                    })
                }else {
                    $('.alert').html('请先登录!').addClass('alert-success').show().delay(1000).fadeOut();
                }
            })
        }
    })

    comment_reply = function (obj,comment_id, person_id) {
        $('.reply-send').remove();
        $.getJSON("/user/session.do", function (data) {
            if (data.success){
                $(obj).parent().parent().parent().append('\t\t<div class="reply-send">\n' +
                    '\t\t\t<div class="user-face">\n' +
                    '\t\t\t<img class="img" src="'+data.user.headImage+'" >\n' +
                    '\t\t\t</div>\n' +
                    '\t\t<textarea class="reply-textarea" rows="2" cols="60" name="msg"></textarea>\n' +
                    '\t\t<button type="submit" class="reply-submit button button-block button-small">回复</button>\n' +
                    '\t\t</div>');
            }else {
                $('.alert').html('请先登录!').addClass('alert-success').show().delay(1000).fadeOut();
            }
        })

        $(".comment-list").off("click");
        $('.comment-list').on("click",".reply-submit",function(){
            // alert($(this).prev().val());
            var replyText = $(this).prev().val();
            if(replyText.trim()===""){
                $('.alert').html('请输入内容!').addClass('alert-success').show().delay(1000).fadeOut();
            }else {
                $.getJSON("/user/session.do", function (data) {
                    if (data.success) {
                        var userId = data.user.userId;
                        $.getJSON('/addReplyServlet.do', {
                            commentId: comment_id,
                            userId: userId,
                            touserId: person_id,
                            replyText: replyText,
                            musicId: musicId
                        }, function (data) {
                            if (data.success) {
                                $('.alert').html('评论成功!').addClass('alert-success').show().delay(1000).fadeOut();
                                $('.comment-list').html(" ");
                                $.getJSON("/user/session.do", function (data) {
                                    if (data.success){
                                        var sessionUserId=data.user.userId;
                                        var sessionUserHeadImage=data.user.headImage;
                                        $('.comment-send').css("display","");
                                        $('.comment-send .user-face img').attr('src',sessionUserHeadImage);
                                    }else {
                                        $('.comment-send').css("display","none");
                                    }
                                    $.getJSON("/getCommentServlet.do",{musicId:musicId},function (data){
                                        if (data.success){
                                            $('.comment-span').css("display","");
                                            var swiperHtml="";
                                            var comments=data.comments;
                                            comments.map(function (item,index){
                                                var date=item.commentTime;
                                                var commentId=item.commentId;
                                                var odate =new Date(date);
                                                var fullYear=odate.getFullYear();
                                                var month=odate.getMonth()+1;
                                                var day=odate.getDay();
                                                var hour=odate.getHours();
                                                var minute=odate.getMinutes();
                                                var commentTime= fullYear +'-'+month +'-'+day+' '+hour+':'+minute;
                                                if(item.commentUserId===sessionUserId){
                                                    swiperHtml='\t\t\t<div class="list-item" comment_id="'+commentId+'" person_id="'+item.commentUserId+'">\n' +
                                                        '\t\t\t\t<div class="user-face">\n' +
                                                        '\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="'+item.userDomain.headImage+'" ></a>\n' +
                                                        '\t\t\t\t</div>\n' +
                                                        '\t\t\t\t<div class="con">\n' +
                                                        '\t\t\t\t\t<div class="user">\n' +
                                                        '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>'+item.userDomain.nickname+'</a>\n' +
                                                        '\t\t\t\t\t</div>\n' +
                                                        '\t\t\t\t\t<p class="text">'+item.commentText+'</p>\n' +
                                                        '\t\t\t\t\t<div class="info">\n' +
                                                        '\t\t\t\t\t\t<span class="time">\n' +
                                                        '\t\t\t\t\t\t\t'+commentTime+'\n' +
                                                        '\t\t\t\t\t\t</span>\n' +
                                                        '\t\t\t\t\t\t<span class="reply" onclick="comment_reply(this,'+commentId+','+item.commentUserId+')">\n' +
                                                        '\t\t\t\t\t\t\t回复\n' +
                                                        '\t\t\t\t\t\t</span>\n' +
                                                        '\t\t\t<span class="delete" onclick="delete_comment('+commentId+')">\n' +
                                                        '\t\t\t\t删除\n' +
                                                        '\t\t\t</span>'+
                                                        '\t\t\t\t\t</div>\n' +
                                                        '\t\t\t\t\t<div class="reply-box">\n' +
                                                        '\t\t\t\t\t</div>\n' +
                                                        '\t\t\t\t</div>\n' +
                                                        '\t\t\t</div>';
                                                }else {
                                                    swiperHtml = '\t\t\t<div class="list-item" comment_id="' + commentId + '" person_id="' + item.commentUserId + '">\n' +
                                                        '\t\t\t\t<div class="user-face">\n' +
                                                        '\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '" ></a>\n' +
                                                        '\t\t\t\t</div>\n' +
                                                        '\t\t\t\t<div class="con">\n' +
                                                        '\t\t\t\t\t<div class="user">\n' +
                                                        '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                                        '\t\t\t\t\t</div>\n' +
                                                        '\t\t\t\t\t<p class="text">' + item.commentText + '</p>\n' +
                                                        '\t\t\t\t\t<div class="info">\n' +
                                                        '\t\t\t\t\t\t<span class="time">\n' +
                                                        '\t\t\t\t\t\t\t' + commentTime + '\n' +
                                                        '\t\t\t\t\t\t</span>\n' +
                                                        '\t\t\t\t\t\t<span class="reply" onclick="comment_reply(this,' + commentId + ',' + item.commentUserId + ')">\n' +
                                                        '\t\t\t\t\t\t\t回复\n' +
                                                        '\t\t\t\t\t\t</span>\n' +
                                                        '\t\t\t\t\t</div>\n' +
                                                        '\t\t\t\t\t<div class="reply-box">\n' +
                                                        '\t\t\t\t\t</div>\n' +
                                                        '\t\t\t\t</div>\n' +
                                                        '\t\t\t</div>';
                                                }
                                                $('.comment-list').append(swiperHtml);
                                                $.getJSON('/getReplyServlet.do',{commentId:commentId},function (data){
                                                    if (data.success){
                                                        var replys=data.replys;
                                                        replys.map(function (item,index){
                                                            var replycommentid=item.commentId;
                                                            var date=item.commentTime;
                                                            var odate =new Date(date);
                                                            var fullYear=odate.getFullYear();
                                                            var month=odate.getMonth()+1;
                                                            var day=odate.getDay();
                                                            var hour=odate.getHours();
                                                            var minute=odate.getMinutes();
                                                            var replyTime= fullYear +'-'+month +'-'+day+' '+hour+':'+minute;
                                                            if(item.commentUserId===sessionUserId){
                                                                swiperHtml = '\t\t\t\t\t<div class="reply-item" comment_id="' + item.commentId + '" person_id="' + item.commentuserId + '">\n' +
                                                                    '                        <div class="user-face">\n' +
                                                                    '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '"  alt=""></a>\n' +
                                                                    '                        </div>\n' +
                                                                    '\t\t\t\t\t\t<div class="reply-con">\n' +
                                                                    '\t\t\t\t\t\t\t<div class="user">\n' +
                                                                    '\t\t\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                                                    '\t\t\t\t\t\t\t\t<p class="text-con">' + item.commentText + '</p>\n' +
                                                                    '\t\t\t\t\t\t\t</div>\n' +
                                                                    '\t\t\t\t\t\t</div>\n' +
                                                                    '\t\t\t\t\t\t<div class="info">\n' +
                                                                    '\t\t\t\t\t\t\t<span class="time">\n' +
                                                                    '\t\t\t\t\t\t\t\t' + replyTime + '\n' +
                                                                    '\t\t\t\t\t\t\t</span>\n' +
                                                                    '\t\t\t\t\t\t\t<span class="reply" onclick="reply(this,' + commentId + ',' + item.commentUserId + ',' + '\'' + item.userDomain.nickname + '\'' + ')">\n' +
                                                                    '\t\t\t\t\t\t\t\t回复\n' +
                                                                    '\t\t\t\t\t\t\t</span>\n' +
                                                                    '\t\t\t<span class="delete" onclick="delete_comment('+item.commentId+')">\n' +
                                                                    '\t\t\t\t删除\n' +
                                                                    '\t\t\t</span>'+
                                                                    '\t\t\t\t\t\t</div>\n' +
                                                                    '\t\t\t\t\t</div>';
                                                            }else {
                                                                swiperHtml = '\t\t\t\t\t<div class="reply-item" comment_id="' + item.commentId + '" person_id="' + item.commentuserId + '">\n' +
                                                                    '                        <div class="user-face">\n' +
                                                                    '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '"  alt=""></a>\n' +
                                                                    '                        </div>\n' +
                                                                    '\t\t\t\t\t\t<div class="reply-con">\n' +
                                                                    '\t\t\t\t\t\t\t<div class="user">\n' +
                                                                    '\t\t\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                                                    '\t\t\t\t\t\t\t\t<p class="text-con">' + item.commentText + '</p>\n' +
                                                                    '\t\t\t\t\t\t\t</div>\n' +
                                                                    '\t\t\t\t\t\t</div>\n' +
                                                                    '\t\t\t\t\t\t<div class="info">\n' +
                                                                    '\t\t\t\t\t\t\t<span class="time">\n' +
                                                                    '\t\t\t\t\t\t\t\t' + replyTime + '\n' +
                                                                    '\t\t\t\t\t\t\t</span>\n' +
                                                                    '\t\t\t\t\t\t\t<span class="reply" onclick="reply(this,' + commentId + ',' + item.commentUserId + ',' + '\'' + item.userDomain.nickname + '\'' + ')">\n' +
                                                                    '\t\t\t\t\t\t\t\t回复\n' +
                                                                    '\t\t\t\t\t\t\t</span>\n' +
                                                                    '\t\t\t\t\t\t</div>\n' +
                                                                    '\t\t\t\t\t</div>';
                                                            }
                                                            $(".list-item[comment_id='"+commentId+"'] .reply-box").append(swiperHtml);
                                                        })
                                                    }
                                                })
                                            })
                                        }else {
                                            $('.comment-span').css("display","none");
                                        }
                                    });
                                })

                            } else {
                                $('.alert').html('评论失败!').addClass('alert-success').show().delay(1000).fadeOut();
                            }
                        })
                    } else {
                        $('.alert').html('请先登录!').addClass('alert-success').show().delay(1000).fadeOut();
                    }
                })
            }
        });
    }
    delete_comment = function (comment_id){
          zdconfirm('','确定要删除评论吗?',function (r){
               if (r){
                   $.getJSON("/deleteCommentServlet.do",{commentId:comment_id},function (data){
                       if (data.success){
                           $('.alert').html('删除评论成功!').addClass('alert-success').show().delay(1000).fadeOut();
                           $('.comment-list').html(" ");
                           $.getJSON("/user/session.do", function (data) {
                               if (data.success){
                                   var sessionUserId=data.user.userId;
                                   var sessionUserHeadImage=data.user.headImage;
                                   $('.comment-send').css("display","");
                                   $('.comment-send .user-face img').attr('src',sessionUserHeadImage);
                               }else {
                                   $('.comment-send').css("display","none");
                               }
                               $.getJSON("/getCommentServlet.do",{musicId:musicId},function (data){
                                   if (data.success){
                                       $('.comment-span').css("display","");
                                       var swiperHtml="";
                                       var comments=data.comments;
                                       comments.map(function (item,index){
                                           var date=item.commentTime;
                                           var commentId=item.commentId;
                                           var odate =new Date(date);
                                           var fullYear=odate.getFullYear();
                                           var month=odate.getMonth()+1;
                                           var day=odate.getDay();
                                           var hour=odate.getHours();
                                           var minute=odate.getMinutes();
                                           var commentTime= fullYear +'-'+month +'-'+day+' '+hour+':'+minute;
                                           if(item.commentUserId===sessionUserId){
                                               swiperHtml='\t\t\t<div class="list-item" comment_id="'+commentId+'" person_id="'+item.commentUserId+'">\n' +
                                                   '\t\t\t\t<div class="user-face">\n' +
                                                   '\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="'+item.userDomain.headImage+'" ></a>\n' +
                                                   '\t\t\t\t</div>\n' +
                                                   '\t\t\t\t<div class="con">\n' +
                                                   '\t\t\t\t\t<div class="user">\n' +
                                                   '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>'+item.userDomain.nickname+'</a>\n' +
                                                   '\t\t\t\t\t</div>\n' +
                                                   '\t\t\t\t\t<p class="text">'+item.commentText+'</p>\n' +
                                                   '\t\t\t\t\t<div class="info">\n' +
                                                   '\t\t\t\t\t\t<span class="time">\n' +
                                                   '\t\t\t\t\t\t\t'+commentTime+'\n' +
                                                   '\t\t\t\t\t\t</span>\n' +
                                                   '\t\t\t\t\t\t<span class="reply" onclick="comment_reply(this,'+commentId+','+item.commentUserId+')">\n' +
                                                   '\t\t\t\t\t\t\t回复\n' +
                                                   '\t\t\t\t\t\t</span>\n' +
                                                   '\t\t\t<span class="delete" onclick="delete_comment('+commentId+')">\n' +
                                                   '\t\t\t\t删除\n' +
                                                   '\t\t\t</span>'+
                                                   '\t\t\t\t\t</div>\n' +
                                                   '\t\t\t\t\t<div class="reply-box">\n' +
                                                   '\t\t\t\t\t</div>\n' +
                                                   '\t\t\t\t</div>\n' +
                                                   '\t\t\t</div>';
                                           }else {
                                               swiperHtml = '\t\t\t<div class="list-item" comment_id="' + commentId + '" person_id="' + item.commentUserId + '">\n' +
                                                   '\t\t\t\t<div class="user-face">\n' +
                                                   '\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '" ></a>\n' +
                                                   '\t\t\t\t</div>\n' +
                                                   '\t\t\t\t<div class="con">\n' +
                                                   '\t\t\t\t\t<div class="user">\n' +
                                                   '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                                   '\t\t\t\t\t</div>\n' +
                                                   '\t\t\t\t\t<p class="text">' + item.commentText + '</p>\n' +
                                                   '\t\t\t\t\t<div class="info">\n' +
                                                   '\t\t\t\t\t\t<span class="time">\n' +
                                                   '\t\t\t\t\t\t\t' + commentTime + '\n' +
                                                   '\t\t\t\t\t\t</span>\n' +
                                                   '\t\t\t\t\t\t<span class="reply" onclick="comment_reply(this,' + commentId + ',' + item.commentUserId + ')">\n' +
                                                   '\t\t\t\t\t\t\t回复\n' +
                                                   '\t\t\t\t\t\t</span>\n' +
                                                   '\t\t\t\t\t</div>\n' +
                                                   '\t\t\t\t\t<div class="reply-box">\n' +
                                                   '\t\t\t\t\t</div>\n' +
                                                   '\t\t\t\t</div>\n' +
                                                   '\t\t\t</div>';
                                           }
                                           $('.comment-list').append(swiperHtml);
                                           $.getJSON('/getReplyServlet.do',{commentId:commentId},function (data){
                                               if (data.success){
                                                   var replys=data.replys;
                                                   replys.map(function (item,index){
                                                       var replycommentid=item.commentId;
                                                       var date=item.commentTime;
                                                       var odate =new Date(date);
                                                       var fullYear=odate.getFullYear();
                                                       var month=odate.getMonth()+1;
                                                       var day=odate.getDay();
                                                       var hour=odate.getHours();
                                                       var minute=odate.getMinutes();
                                                       var replyTime= fullYear +'-'+month +'-'+day+' '+hour+':'+minute;
                                                       if(item.commentUserId===sessionUserId){
                                                           swiperHtml = '\t\t\t\t\t<div class="reply-item" comment_id="' + item.commentId + '" person_id="' + item.commentuserId + '">\n' +
                                                               '                        <div class="user-face">\n' +
                                                               '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '"  alt=""></a>\n' +
                                                               '                        </div>\n' +
                                                               '\t\t\t\t\t\t<div class="reply-con">\n' +
                                                               '\t\t\t\t\t\t\t<div class="user">\n' +
                                                               '\t\t\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                                               '\t\t\t\t\t\t\t\t<p class="text-con">' + item.commentText + '</p>\n' +
                                                               '\t\t\t\t\t\t\t</div>\n' +
                                                               '\t\t\t\t\t\t</div>\n' +
                                                               '\t\t\t\t\t\t<div class="info">\n' +
                                                               '\t\t\t\t\t\t\t<span class="time">\n' +
                                                               '\t\t\t\t\t\t\t\t' + replyTime + '\n' +
                                                               '\t\t\t\t\t\t\t</span>\n' +
                                                               '\t\t\t\t\t\t\t<span class="reply" onclick="reply(this,' + commentId + ',' + item.commentUserId + ',' + '\'' + item.userDomain.nickname + '\'' + ')">\n' +
                                                               '\t\t\t\t\t\t\t\t回复\n' +
                                                               '\t\t\t\t\t\t\t</span>\n' +
                                                               '\t\t\t<span class="delete" onclick="delete_comment('+item.commentId+')">\n' +
                                                               '\t\t\t\t删除\n' +
                                                               '\t\t\t</span>'+
                                                               '\t\t\t\t\t\t</div>\n' +
                                                               '\t\t\t\t\t</div>';
                                                       }else {
                                                           swiperHtml = '\t\t\t\t\t<div class="reply-item" comment_id="' + item.commentId + '" person_id="' + item.commentuserId + '">\n' +
                                                               '                        <div class="user-face">\n' +
                                                               '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '"  alt=""></a>\n' +
                                                               '                        </div>\n' +
                                                               '\t\t\t\t\t\t<div class="reply-con">\n' +
                                                               '\t\t\t\t\t\t\t<div class="user">\n' +
                                                               '\t\t\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                                               '\t\t\t\t\t\t\t\t<p class="text-con">' + item.commentText + '</p>\n' +
                                                               '\t\t\t\t\t\t\t</div>\n' +
                                                               '\t\t\t\t\t\t</div>\n' +
                                                               '\t\t\t\t\t\t<div class="info">\n' +
                                                               '\t\t\t\t\t\t\t<span class="time">\n' +
                                                               '\t\t\t\t\t\t\t\t' + replyTime + '\n' +
                                                               '\t\t\t\t\t\t\t</span>\n' +
                                                               '\t\t\t\t\t\t\t<span class="reply" onclick="reply(this,' + commentId + ',' + item.commentUserId + ',' + '\'' + item.userDomain.nickname + '\'' + ')">\n' +
                                                               '\t\t\t\t\t\t\t\t回复\n' +
                                                               '\t\t\t\t\t\t\t</span>\n' +
                                                               '\t\t\t\t\t\t</div>\n' +
                                                               '\t\t\t\t\t</div>';
                                                       }
                                                       $(".list-item[comment_id='"+commentId+"'] .reply-box").append(swiperHtml);
                                                   })
                                               }
                                           })
                                       })
                                   }else {
                                       $('.comment-span').css("display","none");
                                   }
                               });
                           })
                       }else {
                           $('.alert').html('删除评论失败!').addClass('alert-success').show().delay(1000).fadeOut();
                       }
                   })
               }
          })
    }
   reply = function (obj,comment_id, person_id, username) {
        $('.reply-send').remove();
       $.getJSON("/user/session.do", function (data) {
           if (data.success){
               $(obj).parent().parent().append('\t\t<div class="reply-send">\n' +
                   '\t\t\t<div class="user-face">\n' +
                   '\t\t\t<img class="img" src="'+data.user.headImage+'" >\n' +
                   '\t\t\t</div>\n' +
                   '\t\t<textarea class="reply-textarea" rows="2" cols="60" name="msg"></textarea>\n' +
                   '\t\t<button type="submit" class="reply-submit button button-block button-small">回复</button>\n' +
                   '\t\t</div>');
           }else {
               $('.alert').html('请先登录!').addClass('alert-success').show().delay(1000).fadeOut();
           }
       })
       $(".comment-list").off("click");
       $('.comment-list').on("click",".reply-submit",function(){
           var replyText = $(this).prev().val();
           if(replyText.trim()===""){
               $('.alert').html('请输入内容!').addClass('alert-success').show().delay(1000).fadeOut();
           }else {
               replyText="回复 @"+username+": "+replyText;
               $.getJSON("/user/session.do", function (data) {
                   if (data.success) {
                       var userId = data.user.userId;
                       $.getJSON('/addReplyServlet.do', {
                           commentId: comment_id,
                           userId: userId,
                           touserId: person_id,
                           replyText: replyText,
                           musicId: musicId
                       }, function (data) {
                           if (data.success) {
                               $('.alert').html('回复评论成功!').addClass('alert-success').show().delay(1000).fadeOut();
                               $('.comment-list').html(" ");
                               $.getJSON("/user/session.do", function (data) {
                                   if (data.success){
                                       var sessionUserId=data.user.userId;
                                       var sessionUserHeadImage=data.user.headImage;
                                       $('.comment-send').css("display","");
                                       $('.comment-send .user-face img').attr('src',sessionUserHeadImage);
                                   }else {
                                       $('.comment-send').css("display","none");
                                   }
                                   $.getJSON("/getCommentServlet.do",{musicId:musicId},function (data){
                                       if (data.success){
                                           $('.comment-span').css("display","");
                                           var swiperHtml="";
                                           var comments=data.comments;
                                           comments.map(function (item,index){
                                               var date=item.commentTime;
                                               var commentId=item.commentId;
                                               var odate =new Date(date);
                                               var fullYear=odate.getFullYear();
                                               var month=odate.getMonth()+1;
                                               var day=odate.getDay();
                                               var hour=odate.getHours();
                                               var minute=odate.getMinutes();
                                               var commentTime= fullYear +'-'+month +'-'+day+' '+hour+':'+minute;
                                               if(item.commentUserId===sessionUserId){
                                                   swiperHtml='\t\t\t<div class="list-item" comment_id="'+commentId+'" person_id="'+item.commentUserId+'">\n' +
                                                       '\t\t\t\t<div class="user-face">\n' +
                                                       '\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="'+item.userDomain.headImage+'" ></a>\n' +
                                                       '\t\t\t\t</div>\n' +
                                                       '\t\t\t\t<div class="con">\n' +
                                                       '\t\t\t\t\t<div class="user">\n' +
                                                       '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>'+item.userDomain.nickname+'</a>\n' +
                                                       '\t\t\t\t\t</div>\n' +
                                                       '\t\t\t\t\t<p class="text">'+item.commentText+'</p>\n' +
                                                       '\t\t\t\t\t<div class="info">\n' +
                                                       '\t\t\t\t\t\t<span class="time">\n' +
                                                       '\t\t\t\t\t\t\t'+commentTime+'\n' +
                                                       '\t\t\t\t\t\t</span>\n' +
                                                       '\t\t\t\t\t\t<span class="reply" onclick="comment_reply(this,'+commentId+','+item.commentUserId+')">\n' +
                                                       '\t\t\t\t\t\t\t回复\n' +
                                                       '\t\t\t\t\t\t</span>\n' +
                                                       '\t\t\t<span class="delete" onclick="delete_comment('+commentId+')">\n' +
                                                       '\t\t\t\t删除\n' +
                                                       '\t\t\t</span>'+
                                                       '\t\t\t\t\t</div>\n' +
                                                       '\t\t\t\t\t<div class="reply-box">\n' +
                                                       '\t\t\t\t\t</div>\n' +
                                                       '\t\t\t\t</div>\n' +
                                                       '\t\t\t</div>';
                                               }else {
                                                   swiperHtml = '\t\t\t<div class="list-item" comment_id="' + commentId + '" person_id="' + item.commentUserId + '">\n' +
                                                       '\t\t\t\t<div class="user-face">\n' +
                                                       '\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '" ></a>\n' +
                                                       '\t\t\t\t</div>\n' +
                                                       '\t\t\t\t<div class="con">\n' +
                                                       '\t\t\t\t\t<div class="user">\n' +
                                                       '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                                       '\t\t\t\t\t</div>\n' +
                                                       '\t\t\t\t\t<p class="text">' + item.commentText + '</p>\n' +
                                                       '\t\t\t\t\t<div class="info">\n' +
                                                       '\t\t\t\t\t\t<span class="time">\n' +
                                                       '\t\t\t\t\t\t\t' + commentTime + '\n' +
                                                       '\t\t\t\t\t\t</span>\n' +
                                                       '\t\t\t\t\t\t<span class="reply" onclick="comment_reply(this,' + commentId + ',' + item.commentUserId + ')">\n' +
                                                       '\t\t\t\t\t\t\t回复\n' +
                                                       '\t\t\t\t\t\t</span>\n' +
                                                       '\t\t\t\t\t</div>\n' +
                                                       '\t\t\t\t\t<div class="reply-box">\n' +
                                                       '\t\t\t\t\t</div>\n' +
                                                       '\t\t\t\t</div>\n' +
                                                       '\t\t\t</div>';
                                               }
                                               $('.comment-list').append(swiperHtml);
                                               $.getJSON('/getReplyServlet.do',{commentId:commentId},function (data){
                                                   if (data.success){
                                                       var replys=data.replys;
                                                       replys.map(function (item,index){
                                                           var replycommentid=item.commentId;
                                                           var date=item.commentTime;
                                                           var odate =new Date(date);
                                                           var fullYear=odate.getFullYear();
                                                           var month=odate.getMonth()+1;
                                                           var day=odate.getDay();
                                                           var hour=odate.getHours();
                                                           var minute=odate.getMinutes();
                                                           var replyTime= fullYear +'-'+month +'-'+day+' '+hour+':'+minute;
                                                           if(item.commentUserId===sessionUserId){
                                                               swiperHtml = '\t\t\t\t\t<div class="reply-item" comment_id="' + item.commentId + '" person_id="' + item.commentuserId + '">\n' +
                                                                   '                        <div class="user-face">\n' +
                                                                   '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '"  alt=""></a>\n' +
                                                                   '                        </div>\n' +
                                                                   '\t\t\t\t\t\t<div class="reply-con">\n' +
                                                                   '\t\t\t\t\t\t\t<div class="user">\n' +
                                                                   '\t\t\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                                                   '\t\t\t\t\t\t\t\t<p class="text-con">' + item.commentText + '</p>\n' +
                                                                   '\t\t\t\t\t\t\t</div>\n' +
                                                                   '\t\t\t\t\t\t</div>\n' +
                                                                   '\t\t\t\t\t\t<div class="info">\n' +
                                                                   '\t\t\t\t\t\t\t<span class="time">\n' +
                                                                   '\t\t\t\t\t\t\t\t' + replyTime + '\n' +
                                                                   '\t\t\t\t\t\t\t</span>\n' +
                                                                   '\t\t\t\t\t\t\t<span class="reply" onclick="reply(this,' + commentId + ',' + item.commentUserId + ',' + '\'' + item.userDomain.nickname + '\'' + ')">\n' +
                                                                   '\t\t\t\t\t\t\t\t回复\n' +
                                                                   '\t\t\t\t\t\t\t</span>\n' +
                                                                   '\t\t\t<span class="delete" onclick="delete_comment('+item.commentId+')">\n' +
                                                                   '\t\t\t\t删除\n' +
                                                                   '\t\t\t</span>'+
                                                                   '\t\t\t\t\t\t</div>\n' +
                                                                   '\t\t\t\t\t</div>';
                                                           }else {
                                                               swiperHtml = '\t\t\t\t\t<div class="reply-item" comment_id="' + item.commentId + '" person_id="' + item.commentuserId + '">\n' +
                                                                   '                        <div class="user-face">\n' +
                                                                   '\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'><img src="' + item.userDomain.headImage + '"  alt=""></a>\n' +
                                                                   '                        </div>\n' +
                                                                   '\t\t\t\t\t\t<div class="reply-con">\n' +
                                                                   '\t\t\t\t\t\t\t<div class="user">\n' +
                                                                   '\t\t\t\t\t\t\t\t<a href="my.html?userId="'+item.userDomain.userId+'>' + item.userDomain.nickname + '</a>\n' +
                                                                   '\t\t\t\t\t\t\t\t<p class="text-con">' + item.commentText + '</p>\n' +
                                                                   '\t\t\t\t\t\t\t</div>\n' +
                                                                   '\t\t\t\t\t\t</div>\n' +
                                                                   '\t\t\t\t\t\t<div class="info">\n' +
                                                                   '\t\t\t\t\t\t\t<span class="time">\n' +
                                                                   '\t\t\t\t\t\t\t\t' + replyTime + '\n' +
                                                                   '\t\t\t\t\t\t\t</span>\n' +
                                                                   '\t\t\t\t\t\t\t<span class="reply" onclick="reply(this,' + commentId + ',' + item.commentUserId + ',' + '\'' + item.userDomain.nickname + '\'' + ')">\n' +
                                                                   '\t\t\t\t\t\t\t\t回复\n' +
                                                                   '\t\t\t\t\t\t\t</span>\n' +
                                                                   '\t\t\t\t\t\t</div>\n' +
                                                                   '\t\t\t\t\t</div>';
                                                           }
                                                           $(".list-item[comment_id='"+commentId+"'] .reply-box").append(swiperHtml);
                                                       })
                                                   }
                                               })
                                           })
                                       }else {
                                           $('.comment-span').css("display","none");
                                       }
                                   });
                               })
                           } else {
                               $('.alert').html('评论失败!').addClass('alert-success').show().delay(1000).fadeOut();
                           }
                       })
                   } else {
                       $('.alert').html('请先登录!').addClass('alert-success').show().delay(1000).fadeOut();
                   }
               })
           }
       });
    }
    $(document).on("click",".info",function(){
        $('.comment-like').off('click').click(function(){
           var commentId= $(this).parent().parent().parent().attr('comment_id');
           if (commentId===undefined){
              commentId= $(this).parent().parent().attr('comment_id');
           }
           $(this).removeClass('comment-like').addClass('comment-liked');
            addlike(commentId);
        })
    })


    $(document).on("click",".info",function(){
        $('.comment-liked').off('click').click(function(){
            var commentId= $(this).parent().parent().parent().attr('comment_id');
            if (commentId===undefined){
                commentId= $(this).parent().parent().attr('comment_id');
            }
            $(this).removeClass('comment-liked').addClass('comment-like');
            deletelike(commentId);
        })
    })

    deletelike = function (comment_id){
        $.getJSON("/user/session.do",function (data){
            if (data.success){
                var userId=data.user.userId;
                $.getJSON("/deleteLikeServlet.do",{commentId:comment_id,userId:userId},function (data){
                    if (data.success){
                        $.getJSON("/getLikeTimesServlet.do",{commentId:comment_id},function (data){
                            if (data.success){
                                $('.list-item[comment_id='+comment_id+'] > .con > .info > .comment-like > .like-number').html(data.likeTimes);
                                $('.reply-item[comment_id='+comment_id+'] > .info > .comment-like > .like-number').html(data.likeTimes);
                            }
                        })
                    }
                })
            }else {
                $('.alert').html('请先登录!').addClass('alert-success').show().delay(1000).fadeOut();
            }
        })
    }
    addlike = function (comment_id){
        $.getJSON("/user/session.do",function (data){
            if (data.success){
                var userId=data.user.userId;
                $.getJSON("/addLikeServlet.do",{commentId:comment_id,userId:userId,musicId:musicId},function (data){
                    if (data.success){
                        $.getJSON("/getLikeTimesServlet.do",{commentId:comment_id},function (data){
                            if (data.success){
                                $('.list-item[comment_id='+comment_id+'] > .con > .info > .comment-liked > .like-number').html(data.likeTimes);
                                $('.reply-item[comment_id='+comment_id+'] > .info > .comment-liked > .like-number').html(data.likeTimes);
                            }
                        })
                    }
                })
            }else {
                $('.alert').html('请先登录!').addClass('alert-success').show().delay(1000).fadeOut();
            }
        })
    }
})
