package jxnu.edu.cn.domain;

import java.util.Date;

public class LikeDomain {
    private long likeId;
    private long musicId;
    private long commentId;
    private long userId;
    private Date likeTime;

    public long getLikeId() {
        return likeId;
    }

    public void setLikeId(long likeId) {
        this.likeId = likeId;
    }

    public long getMusicId() {
        return musicId;
    }

    public void setMusicId(long musicId) {
        this.musicId = musicId;
    }

    public long getCommentId() {
        return commentId;
    }

    public void setCommentId(long commentId) {
        this.commentId = commentId;
    }

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public Date getLikeTime() {
        return likeTime;
    }

    public void setLikeTime(Date likeTime) {
        this.likeTime = likeTime;
    }

    @Override
    public String toString() {
        return "LikeDomain{" +
                "likeId=" + likeId +
                ", musicId=" + musicId +
                ", commentId=" + commentId +
                ", userId=" + userId +
                ", likeTime=" + likeTime +
                '}';
    }
}
