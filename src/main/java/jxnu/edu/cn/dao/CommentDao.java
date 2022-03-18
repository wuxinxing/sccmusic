package jxnu.edu.cn.dao;

import jxnu.edu.cn.domain.CommentDomain;
import jxnu.edu.cn.domain.LikeDomain;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CommentDao {
    public long insertcomment(CommentDomain commentDomain) ;
    public long insertreply(CommentDomain commentDomain) ;
    public List<CommentDomain> queryCommentByMusicId(long musicId) ;
    public List<CommentDomain> queryReplyByCommentId(long commentId) ;
    public int deleteCommentByCommentId(long commentId) ;
    public long insertLike(LikeDomain likeDomain) ;
    public int deleteLike(@Param("commentId") long commentId,@Param("userId") long userId) ;
    public int updateAddCommentLikeTimes(long commentId) ;
    public int updateMinusCommentLikeTimes(long commentId) ;
    public int queryLikeTimesByCommentId(long commentId) ;
    public List<LikeDomain> queryLikeByMusicId(@Param("userId") long userId,@Param("musicId") long musicId) ;
}
