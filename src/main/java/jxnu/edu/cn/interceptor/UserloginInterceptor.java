package jxnu.edu.cn.interceptor;

import jxnu.edu.cn.domain.UserDomain;
import jxnu.edu.cn.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class UserloginInterceptor implements HandlerInterceptor {
    @Autowired
    private UserService userService;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Cookie[] cookies=request.getCookies();
        String uname=null;
        String upwd=null;
        UserDomain userDomain=null;
        if(cookies!=null){
            for (Cookie c:cookies){
                if ("username".equals(c.getName())){
                    uname=c.getValue();
                }
                if ("password".equals(c.getName())){
                    upwd=c.getValue();
                }
            }
        }
        if(uname!=null){
            UserDomain user = new UserDomain();
            user.setUsername(uname);
            user.setPassword(upwd);
            userDomain=userService.findUser(user);
            request.getSession().setAttribute("user",userDomain);
        }
        return true;
    }
}
