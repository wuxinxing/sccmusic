$(function (){
    //头像上传
    var addheadurl='/admin/addhead.do';
    $('#headimgsubmit').click(function (){
        // 获取上传的图片文件流
        var uploadImg= $('#uploadheadimg')[0].files[0];
        // 手工生成表单对象，用于接收参数并传递给后台
        var formData = new FormData();
        // 添加图片流进表单对象里
        formData.append('headimg', uploadImg);
        $.ajax({
            url : addheadurl,
            async : false,
            cache : false,
            type : "post",
            dataType:"json",
            contentType : false,
            processData : false,
            data :formData,
            success : function(data) {
                if (data.success) {
                    // alert("上传头像成功！");
                    $('.alert').html('上传头像成功!').addClass('alert-success').show().delay(1000).fadeOut();
                    $(".nav-userface").attr("src",data.user.headImage);
                    $('#img-head1').attr("src",data.user.headImage);

                } else {
                    // alert('上传头像失败！' + data.errMsg);
                    $('.alert').html('上传头像失败!'+ data.errMsg).addClass('alert-danger').show().delay(1000).fadeOut();
                }
            }
        });
    })
    //修改信息
    var inforurl='/admin/addinformation.do';
    $('#infosubmit').click(function (){
        var nickname=$('#update_nickname').val();
        var sex=$('#gender label input:checked').val();
        var introduce=$('#introduce').val();
        var birthday=$('#birthday').val();
        var province=$('#province>option:selected').text();
        var city=$('#citys>option:selected').text();
        var county=$('#county>option:selected').text();
        if (province==='省份'){
            var address='';
        }else if(city==='城市'){
            var address=province;
        }else if(county==='区/县'){
            var address=province+"-"+city;
        }else {
            var address=province+"-"+city+"-"+county;
        }
        $.ajax({
            url:inforurl,
            async:false,
            cache:false,
            type:"post",
            dataType:"json",
            data:{
                nickname:nickname,
                sex:sex,
                introduce:introduce,
                birthday:birthday,
                address:address,
            },
            success:function (data){
                if(data.success){
                    // alert("保存成功!");
                    $('.alert').html('保存成功!').addClass('alert-success').show().delay(1000).fadeOut();
                }else {
                    // alert("保存失败!"+data.errMsg);
                    $('.alert').html('保存失败!').addClass('alert-danger').show().delay(1000).fadeOut();

                }
            }

        })
    })

    //修改密码
    var updatpwdeurl='/admin/updatepwd.do';
    $('#old_password').focus(function (){
        $('#old_password').css("border","2px solid lightblue");
    }).blur(function () {
        $('#old_password').css("border","");
        var old_password=$('#old_password').val();
        $.getJSON("/admin/checkoldpwd.do",{oldpwd:old_password},function (data){
            if (data.success){
                $("#old_pwdMsg").html("√").css("color","green");
            }else {
                $("#old_pwdMsg").html(data.errMsg).css("color","red");
            }
        })
    })

    $('#new_password').focus(function (){
        $('#new_password').css("border","2px solid lightblue");
    }).blur(function () {
        $('#new_password').css("border","");
        var new_password=$('#new_password').val();
        var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Za-z]).*$/;
        if(pPattern.test(new_password)==false){
            $("#new_pwdMsg").html("密码最少6位，包括字母，数字").css("color","red");
        }else {
            $("#new_pwdMsg").html("√").css("color","green");
        }
    })

    $('#con_new_password').focus(function (){
        $('#con_new_password').css("border","2px solid lightblue");
    }).blur(function () {
        var new_password=$('#new_password').val();
        var con_new_password=$('#con_new_password').val();
        $('#con_new_password').css("border","")
        if(con_new_password==""){
            $("#con_new_pwdMsg").html("确认密码不能为空").css("color","red");
        }
        if(new_password!=con_new_password){
            $("#con_new_pwdMsg").html("两次密码输入不一致").css("color","red");
        }else {
            $("#con_new_pwdMsg").html("√").css("color","green");
        }
    })

  $('#newpwdsubmit').click(function (){
      var old_password=$('#old_password').val();
      var new_password=$('#new_password').val();
      var con_new_password=$('#con_new_password').val();
      $.ajax({
          url : updatpwdeurl,
          async : false,
          cache : false,
          type : "post",
          dataType:"json",
          data :{
                oldpassword:old_password,
                newpassword:new_password,
                renewpassword:con_new_password,
          },
          success : function(data) {
              if (data.success) {
                  // alert("修改成功,请重新登录！");
                  $('.alert').html('修改成功,请重新登录!').addClass('alert-success').show().delay(1000).fadeOut();
                  setTimeout(function(){
                      window.location.href='/login.html';
                  }, 1000);

              } else {
                  // alert('修改失败！' + data.errMsg);
                  $('.alert').html('修改失败!').addClass('alert-danger').show().delay(1000).fadeOut();
              }
          }
      })
  })
})