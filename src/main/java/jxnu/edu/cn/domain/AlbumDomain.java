package jxnu.edu.cn.domain;

import java.util.Date;

public class AlbumDomain {
    private long albumId;
    private String albumName;
    private String albumIntroduce;
    private int albumNumber;
    private long albumCreaterId;
    private Date albumCreatetime;
    private String albumPic;

    public long getAlbumId() {
        return albumId;
    }

    public void setAlbumId(long albumId) {
        this.albumId = albumId;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public String getAlbumIntroduce() {
        return albumIntroduce;
    }

    public void setAlbumIntroduce(String albumIntroduce) {
        this.albumIntroduce = albumIntroduce;
    }

    public int getAlbumNumber() {
        return albumNumber;
    }

    public void setAlbumNumber(int albumNumber) {
        this.albumNumber = albumNumber;
    }

    public long getAlbumCreaterId() {
        return albumCreaterId;
    }

    public void setAlbumCreaterId(long albumCreaterId) {
        this.albumCreaterId = albumCreaterId;
    }

    public Date getAlbumCreatetime() {
        return albumCreatetime;
    }

    public void setAlbumCreatetime(Date albumCreatetime) {
        this.albumCreatetime = albumCreatetime;
    }

    public String getAlbumPic() {return albumPic;}

    public void setAlbumPic(String albumPic) {this.albumPic = albumPic;}

    @Override
    public String toString() {
        return "AlbumDomain{" +
                "albumId=" + albumId +
                ", albumName='" + albumName + '\'' +
                ", albumIntroduce='" + albumIntroduce + '\'' +
                ", albumNumber=" + albumNumber +
                ", albumCreaterId=" + albumCreaterId +
                ", albumCreatetime=" + albumCreatetime +
                ", albumPic='" + albumPic + '\'' +
                '}';
    }
}
