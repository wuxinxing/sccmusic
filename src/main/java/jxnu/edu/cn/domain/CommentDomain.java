package jxnu.edu.cn.domain;

import java.util.Date;

public class CommentDomain {
    private long commentId;
    private long commentUserId;
    private long tocommentId;
    private long commentTouserId;
    private Date commentTime;
    private String commentText;
    private long commentMusicId;
    private long commentDynamicId;
    private int likeTimes;
    private UserDomain userDomain;

    public long getTocommentId() {
        return tocommentId;
    }

    public void setTocommentId(long tocommentId) {
        this.tocommentId = tocommentId;
    }

    public long getCommentTouserId() {
        return commentTouserId;
    }

    public void setCommentTouserId(long commentTouserId) {
        this.commentTouserId = commentTouserId;
    }

    public UserDomain getUserDomain() {
        return userDomain;
    }

    public void setUserDomain(UserDomain userDomain) {
        this.userDomain = userDomain;
    }

    public long getCommentId() {
        return commentId;
    }

    public void setCommentId(long commentId) {
        this.commentId = commentId;
    }

    public long getCommentUserId() {
        return commentUserId;
    }

    public void setCommentUserId(long commentUserId) {
        this.commentUserId = commentUserId;
    }

    public Date getCommentTime() {
        return commentTime;
    }

    public void setCommentTime(Date commentTime) {
        this.commentTime = commentTime;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public long getCommentMusicId() {
        return commentMusicId;
    }

    public void setCommentMusicId(long commentMusicId) {
        this.commentMusicId = commentMusicId;
    }

    public long getCommentDynamicId() {
        return commentDynamicId;
    }

    public void setCommentDynamicId(long commentDynamicId) {
        this.commentDynamicId = commentDynamicId;
    }

    public int getLikeTimes() {
        return likeTimes;
    }

    public void setLikeTimes(int likeTimes) {
        this.likeTimes = likeTimes;
    }

    @Override
    public String toString() {
        return "CommentDomain{" +
                "commentId=" + commentId +
                ", commentUserId=" + commentUserId +
                ", tocommentId=" + tocommentId +
                ", commentTouserId=" + commentTouserId +
                ", commentTime=" + commentTime +
                ", commentText='" + commentText + '\'' +
                ", commentMusicId=" + commentMusicId +
                ", commentDynamicId=" + commentDynamicId +
                ", likeTimes=" + likeTimes +
                ", userDomain=" + userDomain +
                '}';
    }
}
