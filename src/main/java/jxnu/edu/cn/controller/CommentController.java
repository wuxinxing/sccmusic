package jxnu.edu.cn.controller;

import jxnu.edu.cn.domain.CommentDomain;
import jxnu.edu.cn.domain.LikeDomain;
import jxnu.edu.cn.service.CommentService;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class CommentController {
    @Autowired
    private CommentService commentService;
    @RequestMapping(value = "/addCommentServlet.do")
    @ResponseBody
    public Map<String, Object> AddCommentServlet (long musicId,long userId,String commentText) {
        CommentDomain commentDomain=new CommentDomain();
        commentDomain.setCommentUserId(userId);
        commentDomain.setCommentMusicId(musicId);
        commentDomain.setCommentText(commentText);
        commentDomain.setCommentTime(new Date());
        Map<String,Object> model=new HashMap<String, Object>();
        try {
            commentService.addcomment(commentDomain);
            model.put("success",true);
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
        return model;
    }

    @RequestMapping(value = "/addLikeServlet.do")
    @ResponseBody
    public Map<String, Object> AddLikeServlet (long musicId,long commentId,long userId) {
        LikeDomain likeDomain=new LikeDomain();
        likeDomain.setCommentId(commentId);
        likeDomain.setMusicId(musicId);
        likeDomain.setLikeTime(new Date());
        likeDomain.setUserId(userId);
        Map<String,Object> model=new HashMap<String, Object>();
        try {
            commentService.addlike(likeDomain);
            commentService.addCommentLikeTimes(commentId);
            model.put("success",true);
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
        return model;
    }

    @RequestMapping(value = "/addReplyServlet.do")
    @ResponseBody
    public Map<String, Object> AddReplyServlet ( long musicId,long userId,long touserId,long commentId, String replyText) {
        Map<String,Object> model=new HashMap<String, Object>();
        CommentDomain commentDomain =new CommentDomain();
        commentDomain.setCommentUserId(userId);
        commentDomain.setCommentTouserId(touserId);
        commentDomain.setCommentText(replyText);
        commentDomain.setCommentMusicId(musicId);
        commentDomain.setCommentTime(new Date());
        commentDomain.setTocommentId(commentId);
        try {
            commentService.addreply(commentDomain);
            model.put("success",true);
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
        return model;
    }

    @RequestMapping(value = "/deleteCommentServlet.do")
    @ResponseBody
    public Map<String, Object> DeleteCommentServlet (long commentId) {
        Map<String,Object> model=new HashMap<String, Object>();
        try {
            commentService.deleteCommentByCommentId(commentId);
            model.put("success",true);
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
        return model;
    }

    @RequestMapping(value = "/deleteLikeServlet.do")
    @ResponseBody
    public Map<String, Object> DeleteLikeServlet ( long commentId,@Param("userId") long userID) {
        Map<String,Object> model=new HashMap<String, Object>();
        try {
            commentService.deleteLike(commentId,userID);
            commentService.minusCommentLikeTimes(commentId);
            model.put("success",true);
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
        return model;
    }

    @RequestMapping(value = "/getCommentServlet.do")
    @ResponseBody
    public Map<String, Object> GetCommentServlet (long musicId) {
        Map<String,Object> model=new HashMap<String, Object>();
        try {
             List<CommentDomain> commentDomains = commentService.queryCommentByMusicId(musicId);
            if(!commentDomains.isEmpty()){
                model.put("success",true);
                model.put("comments",commentDomains);
            }else {
                model.put("success",false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
        return model;
    }

    @RequestMapping(value = "/getLikeTimesServlet.do")
    @ResponseBody
    public Map<String, Object> GetLikeTimesServlet (long commentId) {
        Map<String,Object> model=new HashMap<String, Object>();
        try {
            int likeTimes = commentService.getLikeTimesByCommentId(commentId);
            model.put("success",true);
            model.put("likeTimes",likeTimes);
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
        return model;
    }

    @RequestMapping(value = "/getReplyServlet.do")
    @ResponseBody
    public Map<String, Object> GetReplyServlet ( long commentId) {
        Map<String,Object> model=new HashMap<String, Object>();
        try {
            List<CommentDomain> commentDomains = commentService.queryReplyByCommentId(commentId);
            if(!commentDomains.isEmpty()){
                model.put("success",true);
                model.put("replys",commentDomains);
            }else {
                model.put("success",false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
        return model;
    }

    @RequestMapping(value = "/getUserLikeServlet.do")
    @ResponseBody
    public Map<String, Object> GetUserLikeServlet (  long musicId,long userId) {
        Map<String,Object> model=new HashMap<String, Object>();
        try {
            List<LikeDomain> likeDomains = commentService.queryLikeByMusicId(userId, musicId);
            if (!likeDomains.isEmpty()){
                model.put("success",true);
                model.put("likes",likeDomains);
            }else {
                model.put("success",false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            model.put("success",false);
        }
        return model;
    }
}
