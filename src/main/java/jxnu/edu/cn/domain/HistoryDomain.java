package jxnu.edu.cn.domain;

import java.util.Date;

public class HistoryDomain {
    private long historyId;
    private long historyUserId;
    private long musicId;
    private Date playTime;
    private SongDomain songDomain;
    private UserDomain userDomain;

    public long getHistoryUserId() {
        return historyUserId;
    }

    public void setHistoryUserId(long userId) {
        this.historyUserId = userId;
    }

    public SongDomain getSongDomain() {
        return songDomain;
    }

    public void setSongDomain(SongDomain songDomain) {
        this.songDomain = songDomain;
    }

    public UserDomain getUserDomain() {
        return userDomain;
    }

    public void setUserDomain(UserDomain userDomain) {
        this.userDomain = userDomain;
    }

    public long getHistoryId() {
        return historyId;
    }

    public void setHistoryId(long historyId) {
        this.historyId = historyId;
    }
    public long getMusicId() {
        return musicId;
    }

    public void setMusicId(long musicId) {
        this.musicId = musicId;
    }

    public Date getPlayTime() {
        return playTime;
    }

    public void setPlayTime(Date playTime) {
        this.playTime = playTime;
    }

    @Override
    public String toString() {
        return "HistoryDomain{" +
                "historyId=" + historyId +
                ", userId=" + historyUserId +
                ", musicId=" + musicId +
                ", playTime=" + playTime +
                ", songDomain=" + songDomain +
                ", userDomain=" + userDomain +
                '}';
    }
}
