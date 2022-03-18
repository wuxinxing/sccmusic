$(function (){
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $("#submit").trigger("click");
        }
    });
    var regUrl = '/user/register.do';
    var uPattern = /^[a-zA-Z0-9_-]{6,20}$/;
    var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z]).*$/;
    var ePattern=/^(\w)+@((\w)+\.)+(\w)+$/;
    $('#username').focus(function (){
        $('#username').css("border","2px solid lightblue");
    }).blur(function () {
        $('#username').css("border","");
        var userName = $('#username').val();
        $.getJSON("/user/userexist.do",{name:userName},function (data){
            if (uPattern.test(userName) == false) {
                $("#nameMsg").html("用户名长度为6到20位").css("color", "red");
                return ;
            }
            if (data.success){
                $("#nameMsg").html("该用户名可用").css("color", "green");
            }else{
                $("#nameMsg").html("该用户名已经被注册").css("color", "red");
            }
        })
    })
    $('#pwd').focus(function (){
        $('#pwd').css("border","2px solid lightblue");
    }).blur(function () {
        $('#pwd').css("border","");
         var password=$('#pwd').val();
            if (pPattern.test(password) == false) {
                $("#pwdMsg").html("密码最少6位，包括字母，数字").css("color","red");
                return;
            }else
            {
                $("#pwdMsg").html("√").css("color","green");
                return;
            }
        })
    $('#repwd').focus(function (){
        $('#repwd').css("border","2px solid lightblue");
    }).blur(function (){
        $('#repwd').css("border","");
        var password=$('#pwd').val();
        var conpassword=$('#repwd').val();
        if (conpassword==""){
            $("#conpwdMsg").html("确认密码不能为空").css("color","red");
        }
        else if (password!=conpassword) {
            $("#conpwdMsg").html("两次密码不一致").css("color","red");
            return;
        }else
        {
            $("#conpwdMsg").html("√").css("color","green");
            return;
        }
    })
    $('#email').focus(function (){
        $('#email').css("border","2px solid lightblue");
    }).blur(function (){
        $('#email').css("border","");
        var email=$("#email").val();
        if (ePattern.test(email) == false) {
            $("#EmailMsg").html("请输入正确的邮箱地址").css("color","red");
            return;
        }else
        {
            $("#EmailMsg").html("√").css("color","green");
            return;
        }
    })
    $('#j_captcha').focus(function (){
        $('#j_captcha').css("border","2px solid lightblue");
    }).blur(function (){
        $('#j_captcha').css("border","");
    })

    $('#submit').click(function (){
        var userName = $('#username').val();
        var password=$('#pwd').val();
        if (!userName) {
            $("#nameMsg").html("用户名不能为空").css("color", "red");
            return;
        }
        if (!uPattern.test(userName)) {
            $("#nameMsg").html("用户名长度为6到20位").css("color", "red");
            return;
        }

        if (!password) {
            // alert('请输入密码!');
            $('.alert').html('请输入密码!').addClass('alert-success').show().delay(1000).fadeOut();
            return;
        }
        if (!pPattern.test(password) ) {
            $("#pwdMsg").html("密码最少6位，包括字母，数字").css("color","red");
            return;
        }

        var rePassword = $('#repwd').val();
        if (!rePassword) {
            // alert('请输入确认密码!');
            $('.alert').html('请输入确认密码!').addClass('alert-success').show().delay(1000).fadeOut();
            return;
        }
        if (password != rePassword) {
            // alert('密码不一致!');
            $('.alert').html('密码不一致!').addClass('alert-success').show().delay(1000).fadeOut();
            return;
        }
        var email=$("#email").val();
        if (!email) {
            // alert('请输入邮箱!');
            $('.alert').html('请输入邮箱!').addClass('alert-success').show().delay(1000).fadeOut();
            return;
        }
        if (!ePattern.test(email)) {
            $("#EmailMsg").html("请输入正确的邮箱地址").css("color","red");
            return;
        }


        var verifyCodeActual = $('#j_captcha').val();
        if (!verifyCodeActual) {
            // alert('请输入验证码!');
            $('.alert').html('请输入验证码!').addClass('alert-success').show().delay(1000).fadeOut();
            return;
        }

        $.ajax({
            url: regUrl,
            async: false,
            cache: false,
            type: "post",
            dataType: 'json',
            data: {
                name: userName,
                pwd: password,
                email:email,
                verifyCode: verifyCodeActual
            },
            success: function (data) {
                if (data.success) {
                    // alert("注册成功!");
                    $('.alert').html("注册成功!").addClass('alert-success').show().delay(1000).fadeOut();
                    window.location.href = '/login.html';
                } else {
                    // alert("注册失败!"+ data.error);
                    $('.alert').html("注册失败!"+ data.error).addClass('alert-success').show().delay(1000).fadeOut();
                    $("#captcha_img").click();
                }
            }
        });
    })
})