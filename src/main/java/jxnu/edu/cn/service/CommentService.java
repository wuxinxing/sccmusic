package jxnu.edu.cn.service;

import jxnu.edu.cn.domain.CommentDomain;
import jxnu.edu.cn.domain.LikeDomain;

import java.util.List;

public interface CommentService {
    public long addcomment(CommentDomain commentDomain);
    public long addreply(CommentDomain commentDomain);
    public List<CommentDomain> queryCommentByMusicId(long musicId);
    public List<CommentDomain> queryReplyByCommentId(long commentId);
    public int deleteCommentByCommentId(long commentId) ;
    public long addlike(LikeDomain likeDomain);
    public int deleteLike(long commentId,long userId);
    public int addCommentLikeTimes(long commentId);
    public int minusCommentLikeTimes(long commentId);
    public int getLikeTimesByCommentId(long commentId);
    public List<LikeDomain> queryLikeByMusicId(long userId,long musicId);
}
