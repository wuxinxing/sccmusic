package jxnu.edu.cn.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jxnu.edu.cn.domain.RelationDomain;
import jxnu.edu.cn.domain.UserDomain;
import jxnu.edu.cn.service.UserService;
import jxnu.edu.cn.service.impl.ImplUserService;
import jxnu.edu.cn.util.CodeUtil;
import jxnu.edu.cn.util.UploadUtil;
import jxnu.edu.cn.vo.ImageHolder;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.ServletContext;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/user/login.do")
    @ResponseBody
    public Map<String, Object> loginServlet(String userName, String password, HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<String, Object>();
        UserDomain domain = null;
        //验证码校验
        if (!CodeUtil.checkVerifyCode(request)) {
            map.put("success", false);
            map.put("error", "验证码错误");
            return map;
        }
        // 非空校验
        if (userName == null || userName.trim().equals("") || password == null || password.trim().equals("")) {
            map.put("success", false);
            map.put("error", "用户名和密码均不能为空");
            return map;
        }
        try {
            UserDomain userDomain = new UserDomain();
            userDomain.setUsername(userName);
            userDomain.setPassword(password);
            domain = userService.findUser(userDomain);

            //用户名密码正确
            if (domain != null) {
                map.put("success", true);
                request.getSession().setAttribute("user", domain);
                Cookie sessionid = new Cookie("JSESSIONID", request.getSession().getId());
                Cookie uname = new Cookie("username", userName);
                Cookie upwd = new Cookie("password", password);
                sessionid.setMaxAge(60 * 60 * 24 * 7);
                uname.setMaxAge(60 * 60 * 24 * 7);
                upwd.setMaxAge(60 * 60 * 24 * 7);
                response.addCookie(sessionid);
                response.addCookie(uname);
                response.addCookie(upwd);
            } else {
                map.put("success", false);
                map.put("error", "用户名或密码错误");
            }

        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("error", "内部错误");
        }
        return map;
    }

    @RequestMapping(value = "/user/register.do")
    @ResponseBody
    public Map<String, Object> registerServlet(String name, String pwd, String email, HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> model = new HashMap<String, Object>();
        if (!CodeUtil.checkVerifyCode(request)) {
            model.put("success", false);
            model.put("error", "验证码错误");
            return model;
        }
        if (name == null || name.trim().equals("") ||
                email == null || email.trim().equals("") ||
                pwd == null || pwd.trim().equals("")) {
            model.put("success", false);
            model.put("error", "用户名,密码，邮箱不能为空");
            return model;
        }
        //查找该用户名是否已经被注册

        UserDomain userDomain = new UserDomain();
        userDomain.setUsername(name);
        UserDomain u = userService.findUser(userDomain);
        if (u != null) {
            model.put("success", false);
            model.put("error", "该用户名已经被注册");
            return model;
        }
        UserDomain user = new UserDomain();
        user.setPassword(pwd);
        user.setUsername(name);
        user.setNickname(name);
        user.setEmail(email);
        user.setHeadImage("user-images/109951163326451516.jpg");
        int cnt = userService.insertUser(user);
        model.put("success", true);

        return model;
    }

    @RequestMapping(value = "/user/logout.do")
    @ResponseBody
    public Map<String, Object> logoutServlet(HttpServletRequest request, HttpServletResponse response) {
        Map<String, Object> map = new HashMap<>();
        request.getSession().invalidate();
        Cookie uname = new Cookie("username", null);
        Cookie upwd = new Cookie("password", null);
        uname.setMaxAge(-1);
        upwd.setMaxAge(-1);
        response.addCookie(uname);
        response.addCookie(upwd);
        map.put("success", true);
        return map;
    }

    @RequestMapping(value = "/getUserServlet.do")
    @ResponseBody
    public Map<String, Object> GetUserServlet(long userId) {
        Map<String, Object> map = new HashMap<String, Object>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            UserDomain user = new UserDomain();
            user.setUserId(userId);
            UserDomain userDomain = userService.findUser(user);
            String birthday = sdf.format(userDomain.getBirthday());
            map.put("success", true);
            map.put("user", userDomain);
            map.put("birthday", birthday);
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
        }
        return map;
    }

    @RequestMapping(value = "/getUserFollowedUserServlet.do")
    @ResponseBody
    public Map<String, Object> GetUserFollowedUserServlet(long userId,int index,int pagesize,HttpServletResponse response) {
        Map<String, Object> model = new HashMap<String, Object>();
        List<UserDomain> userFollowedUser = userService.getUserFollowedUser(userId, (index - 1) * 5, pagesize);
        int countUserFollows = userService.countUserFollows(userId);
        int count = (int) Math.ceil(countUserFollows / 5.0);
        model.put("success", true);
        model.put("userList", userFollowedUser);
        model.put("count", count);
        response.setCharacterEncoding("UTF-8");
        return model;
    }

    @RequestMapping(value = "/getUserRelationServlet.do")
    @ResponseBody
    public Map<String, Object> GetUserRelationServlet(long userId) {
        Map<String, Object> model = new HashMap<>();
        int countFollows = userService.countUserFollows(userId);
        int countFans = userService.countUserFans(userId);
        model.put("success", true);
        model.put("countFollows", countFollows);
        model.put("countFans", countFans);
        return model;
    }

    @RequestMapping(value = "/getUserFansUserServlet.do")
    @ResponseBody
    public Map<String, Object> GetUserFansUserServlet(long userId,int index,int pagesize,HttpServletResponse response) {
        Map<String, Object> model = new HashMap<String, Object>();
        List<UserDomain> userFansUser = userService.getUserFansUser(userId, (index - 1) * 5, pagesize);
        int countUserFans = userService.countUserFans(userId);
        int count = (int) Math.ceil(countUserFans / 5.0);
        model.put("success", true);
        model.put("userList", userFansUser);
        model.put("count", count);
        response.setCharacterEncoding("UTF-8");
        return model;
    }

    @RequestMapping(value = "/user/session.do", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> GetSessionUserServlet(HttpSession session) {
        UserDomain userDomain = (UserDomain) session.getAttribute("user");
        Map<String, Object> map = new HashMap<String, Object>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        if (userDomain != null) {
            if (userDomain.getBirthday() != null) {
                String birthday = sdf.format(userDomain.getBirthday());
                map.put("birthday", birthday);
            }
            map.put("success", true);
            map.put("user", userDomain);
        } else {
            map.put("success", false);
            map.put("imgBasePath", "user-images/109951163326451516.jpg");
        }
        return map;
    }

    @RequestMapping(value = "/deleteRelationServlet.do"
    )
    @ResponseBody
    public Map<String, Object> DeleteRelationServlet(long fromUserId,long toUserId) {
        Map<String, Object> model = new HashMap<String, Object>();
        try {
            userService.deleteRelation(fromUserId,toUserId);
            userService.minusUserFollowed(fromUserId);
            userService.minusUserFans(toUserId);
            model.put("success",true);
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
        return model;
    }

    @RequestMapping(value = "/user/userexist.do")
    @ResponseBody
    public Map<String, Object> CheckUserIsExistServlet(String name) {
        Map<String, Object> map = new HashMap<String, Object>();
        UserDomain domain = null;
        UserDomain userDomain = new UserDomain();
        userDomain.setUsername(name);
        domain = userService.findUser(userDomain);
        if (domain != null) {
            map.put("success", false);
            map.put("error", "该用户名已经被注册");
            return map;
        } else {
            map.put("success", true);
            return map;
        }
    }

    @RequestMapping(value = "/checkRelationServlet.do")
    @ResponseBody
    public Map<String, Object> CheckRelationServlet(long fromUserId,long toUserId) {
        Map<String, Object> model = new HashMap<String, Object>();
        int i = userService.checkIffollowed(fromUserId, toUserId);
        model.put("success", true);
        if (i == 0) {
            model.put("followed", false);
        } else {
            model.put("followed", true);
        }
        return model;
    }

    @RequestMapping(value = "/addRelationServlet.do"
    )
    @ResponseBody
    public Map<String, Object> AddRelationServlet(long fromUserId,long toUserId) {
        Map<String, Object> model = new HashMap<String, Object>();
        RelationDomain relationDomain = new RelationDomain();
        relationDomain.setFromUserId(fromUserId);
        relationDomain.setToUserId(toUserId);
        relationDomain.setRel(1);
        userService.addRelation(relationDomain);
        userService.addUserFollowed(fromUserId);
        userService.addUserFans(toUserId);
        model.put("success", true);
        return model;
    }

    @RequestMapping(value = "/admin/addhead.do")
    @ResponseBody
    public Map<String, Object> addheadimgServlet(HttpServletRequest request, HttpSession session) {
        Map<String,Object> map=new HashMap<String,Object>();
        ObjectMapper objectMapper=new ObjectMapper();
        UploadUtil uploadUtil=new UploadUtil(request);
        UserDomain userDomain=(UserDomain) session.getAttribute("user");
        if(userDomain==null)
        {
            map.put("errMsg", "请先登录后再上传！");
            return map;
        }
        String targetBasePath=request.getServletContext().getRealPath("/");
        String headimgBasePath=targetBasePath+userDomain.getHeadImage();
        try {
            ImageHolder imageHolder=uploadUtil.getUploadedFile("headimg");
            String addheadimg=userService.addHeadimg(userDomain,imageHolder,targetBasePath,"user-images/");
            userDomain.setHeadImage(addheadimg);
            map.put("success",true);
            map.put("user",userDomain);
            request.getSession().setAttribute("user",userDomain);
            if (!headimgBasePath.contains("109951163326451516.jpg")){
                uploadUtil.deleteFile(headimgBasePath);
            }
            return map;
        } catch (Exception e) {
            e.printStackTrace();
            map.put("success", false);
            map.put("errMsg", e.getMessage());
            return map;
        }
    }

    @RequestMapping(value = "/admin/addinformation.do")
    @ResponseBody
    public Map<String, Object> addinformationServlet(HttpServletRequest request) {
        Map<String, Object> map = new HashMap<String, Object>();
        UserDomain userDomain = (UserDomain) request.getSession().getAttribute("user");
        if (userDomain == null) {
            map.put("success", false);
            map.put("errMsg", "请先登录后再编辑！");
            return map;
        }
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Date birthday = sdf.parse(request.getParameter("birthday"));
//            java.sql.Date birthday =new java.sql.Date(date.getTime());
            userDomain.setNickname(request.getParameter("nickname"));
            userDomain.setSex(request.getParameter("sex"));
            userDomain.setUserIntro(request.getParameter("introduce"));
            userDomain.setBirthday(birthday);
            userDomain.setUserAddress(request.getParameter("address"));
            userDomain.setAge(BirthdaygetAge(birthday));
            userService.updateinformation(userDomain);
            map.put("success", true);
            request.getSession().setAttribute("user", userDomain);
            return map;
        } catch (ParseException e) {
            e.printStackTrace();
            map.put("success", false);
            return map;
        }
    }

    private int BirthdaygetAge(Date date) {
        Calendar calendar = Calendar.getInstance();
        int nowyear = calendar.get(Calendar.YEAR);
        int nowmonth = calendar.get(Calendar.MONTH);
        int nowday = calendar.get(Calendar.DAY_OF_MONTH);
        calendar.setTime(date);
        int birthyear = calendar.get(Calendar.YEAR);
        int birthmonth = calendar.get(Calendar.MONTH);
        int birthday = calendar.get(Calendar.DAY_OF_MONTH);
        int age = nowyear - birthyear;
        if (birthmonth > nowmonth) {
            age--;
        }
        if (birthmonth == nowmonth) {
            if (birthday > nowday) {
                age--;
            }
        }
        if (age < 0) {
            age = 0;
        }
        return age;
    }

    @RequestMapping(value = "/admin/checkoldpwd.do")
    @ResponseBody
    public Map<String, Object> checkoldpwdServlet(String oldpwd,HttpSession session) {
        Map<String, Object> map = new HashMap<String, Object>();
        UserDomain userDomain = (UserDomain) session.getAttribute("user");
        if (userDomain.getPassword().equals(oldpwd)) {
            map.put("success", true);
            return map;
        } else {
            map.put("success", false);
            map.put("errMsg", "原密码输入错误");
            return map;
        }
    }

    @RequestMapping(value = "/admin/updatepwd.do")
    @ResponseBody
    public Map<String, Object> updaterepwdServlet(@Param("oldpassword")String oldpwd,@Param("newpassword")String newpwd,
    @Param("renewpassword")String renewpwd,HttpSession session) {
        Map<String, Object> map = new HashMap<String, Object>();
        UserDomain userDomain = (UserDomain) session.getAttribute("user");
        if (oldpwd == null || oldpwd.trim().equals("")
                || newpwd == null || newpwd.trim().equals("")
                || renewpwd == null || renewpwd.trim().equals("")) {
            map.put("success", false);
            map.put("errMsg", "原密码,新密码，重复密码不能为空！");
            return map;
        }
        if (!oldpwd.equals(userDomain.getPassword())) {
            map.put("success", false);
            map.put("errMsg", "原密码输入错误！");
            return map;
        }
        if (!newpwd.equals(renewpwd)) {
            map.put("success", false);
            map.put("errMsg", "两次密码输入不一致！");
            return map;
        }
        userDomain.setPassword(newpwd);
        userService.updatepwd(userDomain);
        map.put("success", true);
        return map;
    }
}







