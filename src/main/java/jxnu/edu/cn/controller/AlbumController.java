package jxnu.edu.cn.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jxnu.edu.cn.domain.AlbumDomain;
import jxnu.edu.cn.domain.UserDomain;
import jxnu.edu.cn.service.AlbumService;
import jxnu.edu.cn.util.ImageUtil;
import jxnu.edu.cn.util.UploadUtil;
import jxnu.edu.cn.vo.ImageHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class AlbumController {
    @Autowired
    private AlbumService albumService;

    @RequestMapping(value = "/quick")
    public void save(){
        System.out.println("13");
    }

    @RequestMapping(value = "/AddalbumServlet")
    @ResponseBody
    public Map<String, Object> AddalbumServlet (HttpServletRequest request,HttpSession session){
        Map<String,Object> map=new HashMap<String,Object>();
        UploadUtil uploadUtil=new UploadUtil(request);
        ObjectMapper objectMapper = new ObjectMapper();
        UserDomain userDomain= (UserDomain) session.getAttribute("user");
        if(userDomain==null)
        {
            map.put("success",false);
            return map;
        }
        String albumStr=uploadUtil.getFormField("albumStr");
        AlbumDomain album=null;
        String targetBasePath=request.getServletContext().getRealPath("/");
        try {
            album=objectMapper.readValue(albumStr, AlbumDomain.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        album.setAlbumCreaterId(userDomain.getUserId());
        try {
            ImageHolder albumimageHolder=uploadUtil.getUploadedFile("albumpic");
            if(albumimageHolder==null){
                map.put("success", false);
                map.put("errMsg","上传的专辑封面不能为空");
                return map;
            }else {
                album.setAlbumPic(ImageUtil.generateThumbnail(albumimageHolder,targetBasePath,"storage/album/"));
            }
            album.setAlbumCreatetime(new Date());
            albumService.addalbum(album);
            map.put("success", true);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("errMsg", e.toString());
        }
        return map;
    }

    @RequestMapping(value = "/GetalbumsServlet")
    @ResponseBody
    public Map<String, Object> GetalbumsServlet (HttpSession session){
        Map<String,Object> map=new HashMap<String,Object>();
        UserDomain userDomain=(UserDomain) session.getAttribute("user");
        if(userDomain==null)
        {
            map.put("success", false);
            map.put("errMsg", "未登录");
            return map;
        }
        try {
            List<AlbumDomain> albumDomains=albumService.queryalbumById(userDomain.getUserId());
            map.put("success", true);
            map.put("albums", albumDomains);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("errMsg", "内部错误");
        }
        return map;
    }

    @RequestMapping(value = "/deleteAlbum.do")
    @ResponseBody
    public Map<String, Object> DeleteAlbum (long albumId){
        Map<String,Object> map=new HashMap<String,Object>();
        albumService.deleteAlbumByAlbumId(albumId);
        map.put("success",true);
        return map;
    }
}
