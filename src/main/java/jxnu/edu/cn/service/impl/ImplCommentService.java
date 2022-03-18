package jxnu.edu.cn.service.impl;

import jxnu.edu.cn.dao.CommentDao;
import jxnu.edu.cn.domain.CommentDomain;
import jxnu.edu.cn.domain.LikeDomain;
import jxnu.edu.cn.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("CommentService")
public class ImplCommentService implements CommentService {
    @Autowired
    private CommentDao commentDao;

    @Override
    public long addcomment(CommentDomain commentDomain)   {
        return commentDao.insertcomment(commentDomain);
    }

    @Override
    public long addreply(CommentDomain commentDomain)   {
        return commentDao.insertreply(commentDomain);
    }

    @Override
    public List<CommentDomain> queryCommentByMusicId(long musicId)   {
        return commentDao.queryCommentByMusicId(musicId);
    }

    @Override
    public List<CommentDomain> queryReplyByCommentId(long commentId)   {
        return commentDao.queryReplyByCommentId(commentId);
    }

    @Override
    public int deleteCommentByCommentId(long commentId)   {
        return commentDao.deleteCommentByCommentId(commentId);
    }

    @Override
    public long addlike(LikeDomain likeDomain)   {
        return commentDao.insertLike(likeDomain);
    }

    @Override
    public int deleteLike(long commentId, long userId)   {
        return commentDao.deleteLike(commentId,userId);
    }

    @Override
    public int addCommentLikeTimes(long commentId)   {
        return commentDao.updateAddCommentLikeTimes(commentId);
    }

    @Override
    public int minusCommentLikeTimes(long commentId)   {
        return commentDao.updateMinusCommentLikeTimes(commentId);
    }

    @Override
    public int getLikeTimesByCommentId(long commentId)   {
        return commentDao.queryLikeTimesByCommentId(commentId);
    }

    @Override
    public List<LikeDomain> queryLikeByMusicId(long userId, long musicId)   {
        return commentDao.queryLikeByMusicId(userId,musicId);
    }
}
