package jxnu.edu.cn.util;

import jxnu.edu.cn.vo.ImageHolder;
import net.coobird.thumbnailator.Thumbnails;
import net.coobird.thumbnailator.geometry.Positions;

import javax.imageio.ImageIO;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Random;

public class ImageUtil {
	private static String waterMarkBasePath = Thread.currentThread().getContextClassLoader().getResource("").getPath();
	private static final SimpleDateFormat sDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
	private static final Random r = new Random();


	/**
	 * 处理缩略图，并返回新生成图片的相对值路径
	 * @param thumbnail
	 * @param targetBasePath  目标基路径
	 * @param targetRelativeAddr  相对路径
	 * @return
	 */
	public static String generateThumbnail(ImageHolder thumbnail, String targetBasePath, String targetRelativeAddr) {
		// 获取不重复的随机名
		String realFileName = getRandomFileName();
		// 获取文件的扩展名如png,jpg等
		String extension = getFileExtension(thumbnail.getImageName());
		// 获取文件存储的相对路径(带文件名)
		String relativeAddr = targetRelativeAddr + realFileName + extension;
//		System.out.println("current relativeAddr is :" + relativeAddr);
		// 获取文件要保存到的目标路径
		File dest = new File(targetBasePath+ relativeAddr);
		/*System.out.println("current complete addr is :" +targetBasePath + relativeAddr);
		System.out.println("basePath is :" + targetBasePath);
		System.out.println("waterMarkBasePath:"+waterMarkBasePath);*/
		// 调用Thumbnails生成带有水印的图片
		try {
			Thumbnails.of(thumbnail.getImage()).size(150, 150).toFile(dest);
		} catch (IOException e) {

			throw new RuntimeException("创建缩略图失败generateThumbnail：" + e.toString());
		}
		// 返回图片相对路径地址
		return relativeAddr;
	}

/**
*上传文件:音乐，视频等
*/
	public static String uploadFile(ImageHolder thumbnail, String targetBasePath, String targetRelativeAddr) {
		String realFileName = getRandomFileName();
		String extension = getFileExtension(thumbnail.getImageName());
		String relativeAddr = targetRelativeAddr + realFileName + extension;
		File dest = new File(targetBasePath+ relativeAddr);
		InputStream in=thumbnail.getImage();
		int len=0;
		byte b[]=new byte[1024];
		try {
			FileOutputStream out=new FileOutputStream(dest);
			while ((len=in.read(b))>0){
				out.write(b,0,len);
			}
			in.close();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException(e.toString());
		}
		return relativeAddr;
	}

	public static String uploadFile(String FileName,ImageHolder thumbnail, String targetBasePath, String targetRelativeAddr) {
		String extension = getFileExtension(thumbnail.getImageName());
		String relativeAddr = targetRelativeAddr + FileName + extension;
		File dest = new File(targetBasePath+ relativeAddr);
		InputStream in=thumbnail.getImage();
		int len=0;
		byte b[]=new byte[1024];
		try {
			FileOutputStream out=new FileOutputStream(dest);
			while ((len=in.read(b))>0){
				out.write(b,0,len);
			}
			in.close();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException(e.toString());
		}
		return relativeAddr;
	}

	/**
	 * 处理详情图,原图不压缩，并返回新生成图片的相对值路径
	 * @param thumbnail
	 * @param targetBasePath
	 * @param targetRelativeAddr
	 * @return
	 */
	public static String generateNormalImg(ImageHolder thumbnail,String targetBasePath, String targetRelativeAddr) {
		// 获取不重复的随机名
		String realFileName = getRandomFileName();
		// 获取文件的扩展名如png,jpg等
		String extension = getFileExtension(thumbnail.getImageName());

		// 获取文件存储的相对路径(带文件名)
		String relativeAddr = targetRelativeAddr + realFileName + extension;
		System.out.println("current relativeAddr is :" + relativeAddr);
		// 获取文件要保存到的目标路径
		File dest = new File(targetBasePath + relativeAddr);
		System.out.println("current complete addr is :" + targetBasePath + relativeAddr);
		// 调用Thumbnails生成带有水印的图片
		try {
			Thumbnails.of(thumbnail.getImage()).scale(1f)
					.watermark(Positions.BOTTOM_RIGHT, ImageIO.read(new File(waterMarkBasePath + "/watermark.jpg")), 0.75f)
					.outputQuality(0.9f).toFile(dest);
		} catch (IOException e) {
			System.out.println(e.toString());
			throw new RuntimeException("创建原始大小图片失败：" + e.toString());
		}
		// 返回图片相对路径地址，便于图片迁移
		return relativeAddr;
	}


	/**
	 * 获取输入文件流的扩展名
	 * 
	 * @param
	 * @return
	 */
	private static String getFileExtension(String fileName) {
		return fileName.substring(fileName.lastIndexOf("."));
	}

	/**
	 * 生成随机文件名，当前年月日小时分钟秒钟+五位随机数
	 * 
	 * @return
	 */
	public static String getRandomFileName() {
		// 获取随机的五位数
		int rannum = r.nextInt(89999) + 10000;
		String nowTimeStr = sDateFormat.format(new Date());
		return nowTimeStr + rannum;
	}


}
