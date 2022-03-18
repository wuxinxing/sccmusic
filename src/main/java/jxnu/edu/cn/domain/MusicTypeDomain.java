package jxnu.edu.cn.domain;

public class MusicTypeDomain {
    private int musicTypeId;
    private String musicType;
    private int musicNumber;

    public int getMusicTypeId() {
        return musicTypeId;
    }

    public void setMusicTypeId(int musicTypeId) {
        this.musicTypeId = musicTypeId;
    }

    public String getMusicType() {
        return musicType;
    }

    public void setMusicType(String musicType) {
        this.musicType = musicType;
    }

    public int getMusicNumber() {
        return musicNumber;
    }

    public void setMusicNumber(int musicNumber) {
        this.musicNumber = musicNumber;
    }

    @Override
    public String toString() {
        return "MusicTypeDomain{" +
                "musicTypeId=" + musicTypeId +
                ", musicType='" + musicType + '\'' +
                ", musicNumber=" + musicNumber +
                '}';
    }
}
