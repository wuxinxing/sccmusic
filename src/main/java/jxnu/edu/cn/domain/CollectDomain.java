package jxnu.edu.cn.domain;

import java.util.Date;

public class CollectDomain {
    private long collectId;
    private long collectorUserId;
    private long collectMusicId;
    private Date collectTime;
    private UserDomain userDomain;
    private SongDomain songDomain;

    public UserDomain getUserDomain() {
        return userDomain;
    }

    public void setUserDomain(UserDomain userDomain) {
        this.userDomain = userDomain;
    }

    public SongDomain getSongDomain() {
        return songDomain;
    }

    public void setSongDomain(SongDomain songDomain) {
        this.songDomain = songDomain;
    }

    public long getCollectId() {
        return collectId;
    }

    public void setCollectId(long collectId) {
        this.collectId = collectId;
    }

    public long getCollectorUserId() {
        return collectorUserId;
    }

    public void setCollectorUserId(long collectorUserId) {
        this.collectorUserId = collectorUserId;
    }

    public long getCollectMusicId() {
        return collectMusicId;
    }

    public void setCollectMusicId(long collectMusicId) {
        this.collectMusicId = collectMusicId;
    }

    public Date getCollectTime() {
        return collectTime;
    }

    public void setCollectTime(Date collectTime) {
        this.collectTime = collectTime;
    }

    @Override
    public String toString() {
        return "CollectDomain{" +
                "collectId=" + collectId +
                ", collectorUserId=" + collectorUserId +
                ", collectMusicId=" + collectMusicId +
                ", collectTime=" + collectTime +
                ", userDomain=" + userDomain +
                ", songDomain=" + songDomain +
                '}';
    }
}
