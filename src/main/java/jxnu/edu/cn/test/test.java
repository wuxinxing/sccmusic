package jxnu.edu.cn.test;

import jxnu.edu.cn.config.Springconfiguration;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class test
{
    public static void main(String[] args) {
        //ApplicationContext app=new ClassPathXmlApplicationContext("applicationContext.xml");
        ApplicationContext app=new AnnotationConfigApplicationContext(Springconfiguration.class);
    }
}
