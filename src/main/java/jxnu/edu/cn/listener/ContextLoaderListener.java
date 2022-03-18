package jxnu.edu.cn.listener;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class ContextLoaderListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        ServletContext servletContext = sce.getServletContext();
        String contextConfigLocation = servletContext.getInitParameter("contextConfigLocation");
        ApplicationContext app=new ClassPathXmlApplicationContext(contextConfigLocation);
        servletContext.setAttribute("app",app);
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {

    }
}
