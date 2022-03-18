$(function (){
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $("#submit").trigger("click");
        }
    });
    var loginurl="/user/login.do";
    $('#username').focus(function (){
        $('#username').css("border","2px solid lightblue");
    }).blur(function (){
        $('#username').css("border","");
    })
    $('#pwd').focus(function (){
        $('#pwd').css("border","2px solid lightblue");
    }).blur(function (){
        $('#pwd').css("border","");
    })
    $('#j_captcha').focus(function (){
        $('#j_captcha').css("border","2px solid lightblue");
    }).blur(function (){
        $('#j_captcha').css("border","");
    })
    $("#submit").click(function (){
        var userName = $('#username').val();
        var password = $('#pwd').val();
        var verifyCode = $('#j_captcha').val();
        // 访问后台进行登录验证
        $.ajax({
            url:loginurl,
            async:false,
            cache:false,
            type:"post",
            dataType:"json",
            data:{
                userName:userName,
                password:password,
                verifyCode:verifyCode,
            },
            success:function (data){
                if(data.success){
                    window.location.href="/index.html";
                }else {
                    // alert("登录失败!"+data.error);
                    $('.alert').html("登录失败!"+data.error).addClass('alert-success').show().delay(1000).fadeOut();
                    $("#captcha_img").click();
                }
            }
        })
    })


})