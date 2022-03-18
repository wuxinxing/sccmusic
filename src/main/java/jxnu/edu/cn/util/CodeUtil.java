package jxnu.edu.cn.util;

import javax.servlet.http.HttpServletRequest;

/**
 *
 */
public class CodeUtil {
	/**
	 * 检查验证码是否和预期相符
	 * 
	 * @param req
	 * @return
	 */
	public static boolean checkVerifyCode(HttpServletRequest req) {
		boolean flag;
		//从session中获取KaptCha生成的验证码
		String verifyCodeExpected = (String) req.getSession()
				.getAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);
		//从表单中获取用户填写的验证码
		String verifyCodeActual =req.getParameter("verifyCode");
		if (verifyCodeActual == null || !verifyCodeActual.equalsIgnoreCase(verifyCodeExpected)) {
			flag=false;
		}else{
			flag=true;
		}
		req.getSession().removeAttribute(com.google.code.kaptcha.Constants.KAPTCHA_SESSION_KEY);
		return flag;
	}
}
