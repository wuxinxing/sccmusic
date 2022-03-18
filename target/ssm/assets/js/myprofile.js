$(function() {
    $.getJSON("/user/session.do",function (data){
        if(data.success){
            $(".nav-userface").attr("src",data.user.headImage);
            $('#headimg').attr("src",data.user.headImage);
            $('#img-head1').attr("src",data.user.headImage);
            $('#my_introduce').html(data.user.userIntro);
            $('#introduce').val(data.user.userIntro);
            $('#my_address').html(data.user.userAddress);
            if (data.user.userAddress===""){
                $('#province>option:selected').text("");
                $('#citys>option:selected').text("");
                $('#county>option:selected').text("");
            }else {
                $('#province>option:selected').text(data.user.userAddress.split("-")[0]);
                $('#citys>option:selected').text(data.user.userAddress.split("-")[1]);
                $('#county>option:selected').text(data.user.userAddress.split("-")[2])
            }
            $('#my_age').html(data.user.age);
            $('#birthday').val(data.birthday);
            $('#my_sex').html(data.user.sex);
            if(data.user.sex=="男"){
                $('#gender input[value="男"]').attr("checked",true);
            }else {
                $('#gender input[value="女"]').attr("checked",true);
            }
            $('#my_nickname').html(data.user.nickname);
            $('#update_nickname').val(data.user.nickname);

        }else {
            $(".nav-userface").attr("src",data.imgBasePathe);
        }
    })

});