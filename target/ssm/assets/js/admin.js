$(function() {
    $.getJSON("/user/session.do",function (data){
        if(data.success){
            $(".nav-userface").attr("src",data.user.headImage);
            $(".nav-user").css("display","block");
            $(".nav-noneuser").css("display","none");
        }else {
            $(".nav-user").css("display","none");
            $(".nav-noneuser").css("display","block");
        }
    })

    $("#logout").click(function (){
        $.getJSON("/user/logout.do",function (data){
            if(data.success){
                window.location.href="/index.html";
            }
        })
    })
$('.search-input').focus(function (){
    $(document).keyup(function(event){
        if(event.keyCode ==13){
            $("#search").trigger("click");
        }
    });
    }
)
    $('#search').click(function (){
        var searchkey=  $('.search-input').val();
        if (!$.trim(searchkey)==''){
            window.location.href='search.html?searchkey='+searchkey;
        }
    })
    var  searchkey=getUrlParam('searchkey');
    $('.search-input').val(searchkey);
});

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURI(r[2]);
    return null; //返回参数值
}