$(function (){
    var addmusicurl='/song/addmusic.do';
    function updatealbum(){
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
    }
    updatealbum();

    $('.deletealbum').click(function (){
        var albumId= $('#album>option:selected').val();
        zdconfirm(" ","删除此专辑您专辑下的歌也会全部被删除,您确定要删除吗?",function (r){
            if (r){
                $.getJSON("/deleteAlbum.do",{albumId:albumId},function (data){
                    if(data.success){
                        updatealbum();
                        $('.alert').html('删除成功').addClass('alert-success').show().delay(1000).fadeOut();
                    }else {
                        $('.alert').html('删除失败').addClass('alert-success').show().delay(1000).fadeOut();
                    }
                })
            }
        })
    })
    $('#uploadmusic').change(function (){
        var fileurl = URL.createObjectURL( $('#uploadmusic')[0].files[0]);
        $('.music-resourse').html($('#uploadmusic')[0].files[0].name);
        var audioElement =new Audio(fileurl);
        audioElement.addEventListener("loadedmetadata",function (_event){
            var duration=audioElement.duration;
            if (duration < 60) {
                var s = parseInt(duration);
                $('#musictime').html(gettime(s));
            } else if (duration < 3600) {
                var m = parseInt(duration / 60);
                var s = parseInt(duration % 60);
                $('#musictime').html(gettime(m)+':'+gettime(s));
            } else if (duration < 86400) {
                var h = parseInt(duration / 3600);
                var min = duration - h * 3600;
                var m = parseInt(min / 60);
                $('#musictime').html(gettime(h)+':'+gettime(min)+':'+gettime(m));
            }
        })
    })

    $('#uploadmusicpic').change(function (){
        $('.musicpic-resourse').html($('#uploadmusicpic')[0].files[0].name);
    })
    $('#uploadmv').change(function (){
        $('.mv-resourse').html($('#uploadmv')[0].files[0].name);
    })

   $("#submit").click(function (){
       var music = {};
       music.musicName=$('#musicname').val();
       music.musicIntroduce=$('#musicintro').val();
       music.musicTypeId=$('#musictype>option:selected').val();
       music.albumId=$('#album>option:selected').val();
       music.musicPlaybackTime=$('#musictime').html();
       var formData = new FormData();
       var uploadmusic=$('#uploadmusic')[0].files[0];
       var uploadmusicpic=$('#uploadmusicpic')[0].files[0];
       var uploadmv=$('#uploadmv')[0].files[0];
       formData.append('musicStr',JSON.stringify(music));
       formData.append('music',uploadmusic);
       formData.append('musicpic',uploadmusicpic);
       formData.append('mvsource',uploadmv);
       $.ajax({
           url:addmusicurl,
           async:false,
           cache:false,
           type:"post",
           dataType:"json",
           contentType : false,
           processData : false,
           data:formData,
           success:function (data){
               if(data.success){
                   $('.alert').html('上传成功').addClass('alert-success').show().delay(1000).fadeOut();
               }else {
                   $('.alert').html('上传失败').addClass('alert-success').show().delay(1000).fadeOut();
               }
           }
       })
   })
})

function gettime(a){
    var t=a;
    if(t<10){
        t='0'+t;
    }
    return t;
}

function newalbum(){
    var features="height=2000,width=2500,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no"
    var features22=""
 window.open("newalbum.html","newwindow",features22)

}
