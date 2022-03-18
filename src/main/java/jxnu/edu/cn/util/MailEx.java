package jxnu.edu.cn.util;

import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

import javax.servlet.http.HttpServletRequest;
import java.net.MalformedURLException;

public class MailEx {

    public static void sendRegMail(HttpServletRequest request,String userEmail,String randomID) throws EmailException, MalformedURLException{
        // Create the email message

        HtmlEmail email = new HtmlEmail();
        email.setHostName("smtp.163.com");
        email.addTo(userEmail, userEmail);
        email.setFrom("wxx20211110@163.com", "wxx");
        email.setAuthentication("wxx20211110", "TGBMPCNQJECYZQIQ");
        email.setSubject("bookStroe Regist ok!");
        //生成激活url

        String path = request.getContextPath();
        String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";

        String urlString=basePath +"user/activity.html?randomID="+randomID;
        System.out.println(urlString);

        String htmlMsg="<html><body>dear user, reg successful!<a href=\""+urlString+"\">activity</a></body></html>";

        System.out.println(htmlMsg);
        email.setHtmlMsg(htmlMsg);
        // set the alternative message
        email.setTextMsg("Your email client does not support HTML messages");

        // send the email
        email.send();


        System.out.println("The HtmlEmail send sucessful!!!");
    }
}
