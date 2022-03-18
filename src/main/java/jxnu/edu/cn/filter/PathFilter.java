package jxnu.edu.cn.filter;

import jxnu.edu.cn.domain.UserDomain;

import javax.servlet.*;
import javax.servlet.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

@WebFilter("/*")
public class PathFilter implements Filter {
    public void init(FilterConfig config) throws ServletException {

    }

    public void destroy() {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws ServletException, IOException {
        HttpServletRequest request1=(HttpServletRequest) request;
        String path = request1.getRequestURI();
        HttpSession session = request1.getSession();
        HttpServletResponse response1= (HttpServletResponse) response;
        response1.setDateHeader("Expires", -1);				//告诉浏览器数据能够缓存多长时间，-1或0表示不缓存
        response1.setHeader("Cache_Control", "no-cache");	//支持HTTP 1.1，告诉浏览器要不要缓存数据，如“no-cache”
        response1.setHeader("Pragma", "no-cache");
        if (path.contains("my")||path.contains("musicupload")){
            UserDomain user = (UserDomain) session.getAttribute("user");
            if (user!=null){
                chain.doFilter(request, response);
            }else {
                response1.sendRedirect("/login.html");
            }
        }else {
        chain.doFilter(request, response);
        }
    }
}