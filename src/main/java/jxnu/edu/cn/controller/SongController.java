package jxnu.edu.cn.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import jxnu.edu.cn.domain.CollectDomain;
import jxnu.edu.cn.domain.HistoryDomain;
import jxnu.edu.cn.domain.SongDomain;
import jxnu.edu.cn.domain.UserDomain;
import jxnu.edu.cn.service.AlbumService;
import jxnu.edu.cn.service.PlaySongService;
import jxnu.edu.cn.service.UserService;
import jxnu.edu.cn.service.impl.ImplPlaySongService;
import jxnu.edu.cn.util.ImageUtil;
import jxnu.edu.cn.util.UploadUtil;
import jxnu.edu.cn.vo.ImageHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.*;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static java.lang.System.out;

@Controller
public class SongController {
    @Autowired
    private PlaySongService playSongService;
    @Autowired
    private UserService userService;
    @Autowired
    private AlbumService albumService;

    @RequestMapping(value = "/song/addmusic.do")
    @ResponseBody
    public Map<String, Object> AddMusicServlet(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        UploadUtil uploadUtil = new UploadUtil(request);
        ObjectMapper objectMapper = new ObjectMapper();
        UserDomain userDomain = (UserDomain) request.getSession().getAttribute("user");
        if (userDomain == null) {
            map.put("errMsg", "请先登录后再上传！");
            return map;
        }
        String musicStr = uploadUtil.getFormField("musicStr");
        SongDomain music = null;
        String targetBasePath = request.getServletContext().getRealPath("/");
        String musicdir = "";
        try {
            music = objectMapper.readValue(musicStr, SongDomain.class);
            music.setMusicUploaderId(userDomain.getUserId());
            ImageHolder musicimageHolder = uploadUtil.getUploadedFile("music");
            ImageHolder musicPicimageHolder = uploadUtil.getUploadedFile("musicpic");
            ImageHolder mvsourceimageHolder = uploadUtil.getUploadedFile("mvsource");
            switch (music.getMusicTypeId()) {
                case 1:
                    musicdir = "rap";
                    break;
                case 2:
                    musicdir = "pop";
                    break;
                case 3:
                    musicdir = "rock";
                    break;
                case 4:
                    musicdir = "folk";
                    break;
                case 5:
                    musicdir = "edm";
                    break;
            }
            if (musicimageHolder == null) {
                map.put("success", false);
                map.put("errMsg", "上传的歌曲不能为空！");
                return map;
            } else {
                music.setMusicSource(ImageUtil.uploadFile(music.getMusicName(), musicimageHolder, targetBasePath, "music/" + musicdir + "/"));
            }

            if (musicPicimageHolder == null) {
                map.put("success", false);
                map.put("errMsg", "上传的歌曲封面不能为空！");
                return map;
            } else {
                music.setMusicPic(ImageUtil.generateThumbnail(musicPicimageHolder, targetBasePath, "storage/images/"));
            }

            if (mvsourceimageHolder == null) {
                music.setHasMv(0);
            } else {
                music.setHasMv(1);
                music.setMvSource(ImageUtil.uploadFile(mvsourceimageHolder, targetBasePath, "storage/mv/"));
            }
            playSongService.uploadmusic(music);
            albumService.addalbumNumber(music.getAlbumId());
            userService.addUserMusic(userDomain.getUserId());
            map.put("success", true);
            return map;
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("errMsg", e.getMessage());
            return map;
        }
    }

        @RequestMapping(value = "/checkIfUserOwnsSongServlet.do")
        @ResponseBody
        public Map<String, Object> CheckIfUserOwnsSongServlet (long musicId,HttpSession session)
        {
            UserDomain user = (UserDomain) session.getAttribute("user");
            Map<String, Object> model = new HashMap<>();
            try {
                playSongService.checkIfUserOwnsSong(user.getUserId(), musicId);
                model.put("success", true);
            } catch (Exception e) {
                model.put("success", false);
            }
            return model;
        }

        @RequestMapping(value = "/classifySongsServlet.do")
        @ResponseBody
        public Map<String, Object> ClassifySongsServlet (String songType,int index, int pagesize ){
            Map<String, Object> model = new HashMap<String, Object>();
            try {
                List<SongDomain> songDomains = playSongService.querySongsByType(songType, index, pagesize);
                model.put("success", true);
                model.put("songs", songDomains);
            } catch (Exception e) {
                e.printStackTrace();
                model.put("success", false);
            }
            return model;
        }


        @RequestMapping(value = "/collectServlet.do")
        @ResponseBody
        public Map<String, Object> CollectServlet (long id,HttpSession session){
            UserDomain user = (UserDomain) session.getAttribute("user");
            Map<String, Object> model = new HashMap<String, Object>();
            try {
                playSongService.addCollect(user.getUserId(), id);
                playSongService.addCollecttimes(id);
                model.put("addcollect", true);
            } catch (Exception e) {
                e.printStackTrace();
                model.put("addcollect", false);
            }
            return model;
        }

        @RequestMapping(value = "/countSongsServlet.do")
        @ResponseBody
        public Map<String, Object> CountSongsServlet (String more, HttpSession session){
            Map<String, Object> model = new HashMap<String, Object>();
            UserDomain user = (UserDomain) session.getAttribute("user");
            try {
                int count = 0;
                switch (more) {
                    case "hot-recommand":
                        count = playSongService.countRecomSongs();
                        break;
                    case "rap":
                        count = playSongService.countSongsByType("说唱");
                        break;
                    case "pop":
                        count = playSongService.countSongsByType("流行");
                        break;
                    case "rock":
                        count = playSongService.countSongsByType("摇滚");
                        break;
                    case "folk":
                        count = playSongService.countSongsByType("民谣");
                        break;
                    case "edm":
                        count = playSongService.countSongsByType("电子");
                        break;
                    case "mysongs":
                        count = playSongService.countUserSongs(user.getUserId());
                        break;
                    case "mycollect":
                        count = playSongService.countUserCollects(user.getUserId());
                        break;
                    case "myhistory":
                        count = playSongService.countUserHistorys(user.getUserId());
                        break;
                    default:
                        break;
                }
                int size = (int) Math.ceil(count / 15.0);
                model.put("success", true);
                model.put("count", size);
            } catch (Exception e) {
                e.printStackTrace();
                model.put("success", false);
            }
            return model;
        }

    @RequestMapping(value = "/deleteMusicServlet.do")
    @ResponseBody
    public Map<String, Object> DeleteMusicServlet (long musicId,HttpSession session) {
        UserDomain user = (UserDomain) session.getAttribute("user");
        Map<String,Object> model =new HashMap<>();
        try {
            playSongService.deleteSong(musicId);
            userService.minusUserMusic(user.getUserId());
            model.put("success",true);
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
     return model;
    }

    @RequestMapping(value = "/DownloadmusicServlet")
    @ResponseBody
    public void DownloadmusicServlet (HttpServletRequest request, HttpServletResponse response) {
        try {
            // path是指欲下载的文件的路径。
            String targetBasePath=request.getServletContext().getRealPath("/");
            String musicsource=request.getParameter("musicsource");
            String path=targetBasePath+musicsource;
            File file = new File(path);
            // 取得文件名。
            String filename = file.getName();
            filename= URLEncoder.encode(filename,"utf-8");
//                System.out.println("filename="+filename);
            // 取得文件的后缀名。
            String ext = filename.substring(filename.lastIndexOf(".") + 1).toUpperCase();

            // 以流的形式下载文件。
            InputStream fis = new BufferedInputStream(new FileInputStream(path));
            byte[] buffer = new byte[fis.available()];
            fis.read(buffer);
            fis.close();
            // 清空response
            response.reset();
            // 设置response的Header
//                String mimeType = getServletContext().getMimeType(filename);
//                response.setHeader("Content-type",mimeType);
            response.addHeader("Content-Disposition", "attachment;filename=" + new String(filename.getBytes()).replace("+"," "));
            response.addHeader("Content-Length", "" + file.length());
            OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
            response.setContentType("application/octet-stream");
            toClient.write(buffer);
            toClient.flush();
            toClient.close();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    @RequestMapping(value = "/getUserCollectedServlet.do")
    @ResponseBody
    public Map<String, Object> getUserCollectedServlet (int index,int pagesize,long userId) {
        Map<String, Object> model = new HashMap<String, Object>();
        List<CollectDomain> collectDomains = playSongService.queryuserCollectedSong(userId, index, pagesize);
        model.put("success",true);
        model.put("songs",collectDomains);
     return model;
    }

    @RequestMapping(value = "/getUserSongsServlet.do")
    @ResponseBody
    public Map<String, Object> GetUserSongsServlet (int index,int pagesize,long userId) {
        Map<String,Object> model=new HashMap<>();
        List<SongDomain> songDomains = playSongService.queryUsersongs(userId, index, pagesize);
        int songNumbers = playSongService.countUserSongs(userId);
        model.put("success",true);
        model.put("songNumbers",songNumbers);
        model.put("songs",songDomains);
        return model;
    }

    @RequestMapping(value = "/hotRecomSongsServlet.do")
    @ResponseBody
    public Map<String, Object> HotRecomSongsServlet (int index,int pagesize) {
        List<SongDomain> songDomains=null;
        Map<String,Object> model=new HashMap<String, Object>();
        songDomains = playSongService.querySongOrderByPlayedTimes(index, pagesize);
        model.put("success",true);
        model.put("songs",songDomains);
        return model;
    }

    @RequestMapping(value = "/moreServlet.do")
    @ResponseBody
    public Map<String, Object> MoreServlet (int index,int pagesize,String more, HttpSession session) {
        UserDomain user = (UserDomain) session.getAttribute("user");
        Map<String, Object> model = new HashMap<String, Object>();
        switch (more) {
            case "hot-recommand":
                try {
                    List<SongDomain> songDomains = playSongService.querySongOrderByPlayedTimes((index - 1) * 15, pagesize);
                    model.put("success", true);
                    model.put("songs", songDomains);
                } catch (Exception e) {
                    e.printStackTrace();
                    model.put("success", false);
                }
                break;
            case "rap":
                try {
                    List<SongDomain> songDomains = playSongService.querySongsByType("说唱", (index - 1) * 15, pagesize);
                    model.put("success", true);
                    model.put("songs", songDomains);
                } catch (Exception e) {
                    e.printStackTrace();
                    model.put("success", false);
                }
                break;
            case "pop":
                try {
                    List<SongDomain> songDomains = playSongService.querySongsByType("流行", (index - 1) * 15, pagesize);
                    model.put("success", true);
                    model.put("songs", songDomains);
                } catch (Exception e) {
                    e.printStackTrace();
                    model.put("success", false);
                }
                break;
            case "rock":
                try {
                    List<SongDomain> songDomains = playSongService.querySongsByType("摇滚", (index - 1) * 15, pagesize);
                    model.put("success", true);
                    model.put("songs", songDomains);
                } catch (Exception e) {
                    e.printStackTrace();
                    model.put("success", false);
                }
                break;
            case "folk":
                try {
                    List<SongDomain> songDomains = playSongService.querySongsByType("民谣", (index - 1) * 15, pagesize);
                    model.put("success", true);
                    model.put("songs", songDomains);
                } catch (Exception e) {
                    e.printStackTrace();
                    model.put("success", false);
                }
                break;
            case "edm":
                try {
                    List<SongDomain> songDomains = playSongService.querySongsByType("电子", (index - 1) * 15, pagesize);
                    model.put("success", true);
                    model.put("songs", songDomains);
                } catch (Exception e) {
                    e.printStackTrace();
                    model.put("success", false);
                }
                break;
            case "mysongs":
                try {
                    List<SongDomain> songDomains = playSongService.queryUsersongs(user.getUserId(), (index - 1) * 15, pagesize);
                    model.put("success", true);
                    model.put("songs", songDomains);
                } catch (Exception e) {
                    e.printStackTrace();
                    model.put("success", false);
                }
                break;
            case "mycollect":
                try {
                    List<CollectDomain> collectDomains = playSongService.queryuserCollectedSong(user.getUserId(), (index - 1) * 15, pagesize);
                    model.put("success", true);
                    model.put("songs", collectDomains);
                } catch (Exception e) {
                    e.printStackTrace();
                    model.put("success", false);
                }
                break;
            case "myhistory":
                try {
                    List<HistoryDomain> historyDomains = playSongService.querySongHistory(user.getUserId(), (index - 1) * 15, pagesize);
                    model.put("success", true);
                    model.put("songs", historyDomains);
                } catch (Exception e) {
                    e.printStackTrace();
                    model.put("success", false);
                }
                break;
        }

        return model;
    }

    @RequestMapping(value = "/playSongServlet.do")
    @ResponseBody
    public Map<String, Object> PlaySongServlet (HttpServletRequest request) {
        String idstr = request.getParameter("id");
        Map<String, Object> model = new HashMap<String, Object>();
        if(!idstr.equals("")){
            HttpSession session = request.getSession();
            UserDomain user = (UserDomain) session.getAttribute("user");
            long id = 0;
            try {
                id = Long.parseLong(idstr);
            } catch (NumberFormatException e) {
                e.printStackTrace();
            }
            SongDomain songDomain = null;
            try {
                songDomain = playSongService.querySongById(id);
                playSongService.addPlaySongTimes(id);
                model.put("success", true);
                model.put("song", songDomain);
            } catch (Exception e) {
                e.printStackTrace();
                model.put("success", false);
            }
            if (user != null) {
                try {
                    playSongService.addHistory(user.getUserId(), id);
                    int i = playSongService.queryCollectBySongId(user.getUserId(), id);
                    if (i == 0) {
                        model.put("collected", false);
                    } else {
                        model.put("collected", true);
                    }
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
           return model;
        }
        model.put("success", false);
        return model;
    }

    @RequestMapping(value = "/recomSongsServlet.do")
    @ResponseBody
    public Map<String, Object> RecomSongsServlet (int index,int pagesize) {
        List<SongDomain> songDomains=null;
        Map<String,Object> model=new HashMap<String, Object>();
        try {
            songDomains = playSongService.querySongOrderByPlayedTimes(index, pagesize);
            model.put("success",true);
            model.put("songs",songDomains);
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
        return model;
    }

    @RequestMapping(value = "/removeCollectServlet.do")
    @ResponseBody
    public Map<String, Object> RemoveCollectServlet (long id, HttpSession session) {
        UserDomain user = (UserDomain) session.getAttribute("user");
        Map<String, Object> model = new HashMap<String, Object>();
        try {
            playSongService.removeCollect(user.getUserId(),id);
            playSongService.minusCollecttimes(id);
            model.put("removecollect",true);
        } catch (Exception e) {
            e.printStackTrace();
            model.put("removecollect",false);
        }
        return model;
    }

    @RequestMapping(value = "/song/countsearchsingers.do")
    @ResponseBody
    public Map<String, Object> countsearchsingersServlet (String searchkey) {
        Map<String,Object> map=new HashMap<String,Object>();
        int count=playSongService.countSearchsingers(searchkey);
        int size= (int) Math.ceil(count/10.0);
        map.put("success",true);
        map.put("count",size);
        map.put("singersnumber",count);
        return map;
    }

    @RequestMapping(value = "/song/countsearchsongs.do")
    @ResponseBody
    public Map<String, Object> countsearchsongsServlet (String searchkey) {
            Map<String,Object> map=new HashMap<String,Object>();
            int count=playSongService.countSearchsongs(searchkey);
            int size= (int) Math.ceil(count/3.0);
            map.put("success",true);
            map.put("count",size);
            map.put("songsnumber",count);

        return map;
    }

    @RequestMapping(value = "/song/searchsingers.do")
    @ResponseBody
    public Map<String, Object> SearchsingersServlet (int index,int pagesize,String searchkey) {
        Map<String,Object> map=new HashMap<String,Object>();
        List<UserDomain> users=playSongService.querySingersBySearchkey((index-1)*10,pagesize,searchkey);
        map.put("success",true);
        map.put("singers",users);
        return map;
    }

    @RequestMapping(value = "/song/searchsongs.do")
    @ResponseBody
    public Map<String, Object> SearchsongsServlet (int index,int pagesize,String searchkey) {
        Map<String,Object> map=new HashMap<String,Object>();
        List<SongDomain> songs=playSongService.querySongsBySearchkey((index-1)*3,pagesize,searchkey);
        map.put("success",true);
        map.put("songs",songs);
        return map;
    }

    @RequestMapping(value = "/songHistoryServlet.do")
    @ResponseBody
    public Map<String, Object> SongHistoryServlet (long userId,int index,int pagesize) {
        Map<String,Object> model =new HashMap<>();
        List<HistoryDomain> historySongs=null;
        try {
            historySongs = playSongService.querySongHistory(userId, index, pagesize);
            model.put("success",true);
            model.put("songs",historySongs);
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
        return model;
    }

    @RequestMapping(value = "/timeRecomSongsServlet.do")
    @ResponseBody
    public Map<String, Object> TimeRecomSongsServlet (int index,int pagesize) {
        Map<String ,Object> model =new HashMap<>();
        List<SongDomain> songDomains=null;
        try {
            songDomains = playSongService.querySongOrderByTime(index, pagesize);
            model.put("success",true);
            model.put("songs",songDomains);
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
        return model;
    }

    @RequestMapping(value = "/countalbumsongs.do")
    @ResponseBody
    public Map<String, Object> countalbumsongs (long albumId) {
        Map<String ,Object> model =new HashMap<>();
        int songsnumber = playSongService.countAlbumsongs(albumId);
        int size=(int) Math.ceil(songsnumber/10.0);
        model.put("success",true);
        model.put("count",size);
        model.put("songsnumber",songsnumber);
        return model;
    }


    @RequestMapping(value = "/queryalbumsongs.do")
    @ResponseBody
    public Map<String, Object>queryalbumsongs (long albumId,int index,int pagesize) {
        Map<String ,Object> model =new HashMap<>();
        List<SongDomain> songDomains = playSongService.querySongsByalbumId(albumId,(index-1)*10,pagesize);
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        Date date=songDomains.get(0).getAlbumDomain().getAlbumCreatetime();
        model.put("success",true);
        model.put("songs",songDomains);
        model.put("time",sdf.format(date));
        return model;
    }
}
