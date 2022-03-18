package jxnu.edu.cn.domain;

import java.util.Date;

public class SongDomain {
    private long musicId;
    private String musicName;
    private String musicIntroduce;
    private long collectTimes;
    private long commentTimes;
    private Date uploadTime;
    private long musicUploaderId;
    private int musicTypeId;
    private String musicSource;
    private String musicPic;
    private long albumId;
    private int hasMv;
    private String mvSource;
    private String musicTag;
    private int musicRights;
    private long musicPlayedtimes;
    private  String musicPlaybackTime;
    private MusicTypeDomain musicTypeDomain;
    private AlbumDomain albumDomain;
    private UserDomain userDomain;

    public String getMusicPlaybackTime() {
        return musicPlaybackTime;
    }

    public void setMusicPlaybackTime(String musicPlaybackTime) {
        this.musicPlaybackTime = musicPlaybackTime;
    }

    public String getMvSource() {
        return mvSource;
    }

    public void setMvSource(String mvSource) {
        this.mvSource = mvSource;
    }

    public UserDomain getUserDomain() {
        return userDomain;
    }

    public void setUserDomain(UserDomain userDomain) {
        this.userDomain = userDomain;
    }

    public MusicTypeDomain getMusicTypeDomain() {
        return musicTypeDomain;
    }

    public void setMusicTypeDomain(MusicTypeDomain musicTypeDomain) {
        this.musicTypeDomain = musicTypeDomain;
    }

    public AlbumDomain getAlbumDomain() {
        return albumDomain;
    }

    public void setAlbumDomain(AlbumDomain albumDomain) {
        this.albumDomain = albumDomain;
    }

    public long getMusicId() {
        return musicId;
    }

    public void setMusicId(long musicId) {
        this.musicId = musicId;
    }

    public String getMusicName() {
        return musicName;
    }

    public void setMusicName(String musicName) {
        this.musicName = musicName;
    }

    public String getMusicIntroduce() {
        return musicIntroduce;
    }

    public void setMusicIntroduce(String musicIntroduce) {
        this.musicIntroduce = musicIntroduce;
    }

    public long getCollectTimes() {
        return collectTimes;
    }

    public void setCollectTimes(long collectTimes) {
        this.collectTimes = collectTimes;
    }

    public long getCommentTimes() {
        return commentTimes;
    }

    public void setCommentTimes(long commentTimes) {
        this.commentTimes = commentTimes;
    }

    public Date getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(Date uploadTime) {
        this.uploadTime = uploadTime;
    }

    public long getMusicUploaderId() {
        return musicUploaderId;
    }

    public void setMusicUploaderId(long musicUploaderId) {
        this.musicUploaderId = musicUploaderId;
    }

    public int getMusicTypeId() {
        return musicTypeId;
    }

    public void setMusicTypeId(int musicTypeId) {
        this.musicTypeId = musicTypeId;
    }

    public String getMusicSource() {
        return musicSource;
    }

    public void setMusicSource(String musicSource) {
        this.musicSource = musicSource;
    }

    public String getMusicPic() {
        return musicPic;
    }

    public void setMusicPic(String musicPic) {
        this.musicPic = musicPic;
    }

    public long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(long albumId) {
        this.albumId = albumId;
    }

    public int getHasMv() {
        return hasMv;
    }

    public void setHasMv(int hasMv) {
        this.hasMv = hasMv;
    }

    public String getMusicTag() {
        return musicTag;
    }

    public void setMusicTag(String musicTag) {
        this.musicTag = musicTag;
    }

    public int getMusicRights() {
        return musicRights;
    }

    public void setMusicRights(int musicRights) {
        this.musicRights = musicRights;
    }

    public long getMusicPlayedtimes() {
        return musicPlayedtimes;
    }

    public void setMusicPlayedtimes(long musicPlayedtimes) {
        this.musicPlayedtimes = musicPlayedtimes;
    }

    @Override
    public String toString() {
        return "SongDomain{" +
                "musicId=" + musicId +
                ", musicName='" + musicName + '\'' +
                ", musicIntroduce='" + musicIntroduce + '\'' +
                ", collectTimes=" + collectTimes +
                ", commentTimes=" + commentTimes +
                ", uploadTime=" + uploadTime +
                ", musicUploaderId=" + musicUploaderId +
                ", musicTypeId=" + musicTypeId +
                ", musicSource='" + musicSource + '\'' +
                ", musicPic='" + musicPic + '\'' +
                ", albumId=" + albumId +
                ", hasMv=" + hasMv +
                ", mvSource='" + mvSource + '\'' +
                ", musicTag='" + musicTag + '\'' +
                ", musicRights=" + musicRights +
                ", musicPlayedtimes=" + musicPlayedtimes +
                ", musicPlaybackTime='" + musicPlaybackTime + '\'' +
                ", musicTypeDomain=" + musicTypeDomain +
                ", albumDomain=" + albumDomain +
                ", userDomain=" + userDomain +
                '}';
    }
}
