$(function (){
    var addalbumurl='/AddalbumServlet';
    $('#albumsubmit').click(function (){
        var album={};
        album.albumName=$('#albumname').val();
        album.albumIntroduce=$('#albumintro').val();
        var uploadalbumpic=$('#uploadalbum')[0].files[0];
        var formData=new FormData();
        formData.append('albumStr',JSON.stringify(album));
        formData.append('albumpic',uploadalbumpic);
        $.ajax({
            url:addalbumurl,
            async:false,
            cache:false,
            type:"post",
            dataType:"json",
            contentType : false,
            processData : false,
            data:formData,
            success:function (data){
                if(data.success){
                    $.getJSON("/GetalbumsServlet",function (data){
                        if(data.success){
                            var swiperHtml="";
                            var albumList=data.albums;
                            albumList.map(function (item,index){
                                swiperHtml+='<option id="choosetest"value="'+item.albumId+'">'+item.albumName+'</option>'
                            })
                            $('#album').html(swiperHtml);
                        }
                    })
                    $('.alert').html('提交成功').addClass('alert-success').show().delay(1000).fadeOut();
                    $('.musicupload-box').css("display","block");
                    $('.newalbum-box').css("display","none");
                }else {
                    // $('.alert').html('提交失败'+data.errMsg).addClass('alert-success').show().delay(1000).fadeOut();
                    alert('提交失败'+data.errMsg);
                }
            }
        })
    })
})