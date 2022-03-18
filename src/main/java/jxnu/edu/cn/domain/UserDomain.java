package jxnu.edu.cn.domain;

import java.util.Date;

public class UserDomain {
    private long userId;
    private String username;
    private String nickname;
    private String password;
    private Integer age;
    private String sex;
    private Date birthday;
    private String email;
    private String headImage;
    private int userStatus;
    private String userTag;
    private String userIntro;
    private String userAddress;
    private int followed;
    private int fans;
    private int userMusic;

    public long getUserId() {
        return userId;
    }

    public void setUserId(long userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Date getBirthday() {
        return birthday;
    }

    public void setBirthday(Date birthday) {
        this.birthday = birthday;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getHeadImage() {
        return headImage;
    }

    public void setHeadImage(String headImage) {
        this.headImage = headImage;
    }

    public int getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(int userStatus) {
        this.userStatus = userStatus;
    }

    public String getUserTag() {
        return userTag;
    }

    public void setUserTag(String userTag) {
        this.userTag = userTag;
    }

    public String getUserIntro() {
        return userIntro;
    }

    public void setUserIntro(String userIntro) {
        this.userIntro = userIntro;
    }

    public String getUserAddress() {
        return userAddress;
    }

    public void setUserAddress(String userAddress) {
        this.userAddress = userAddress;
    }

    public int getFollowed() {
        return followed;
    }

    public void setFollowed(int followed) {
        this.followed = followed;
    }

    public int getFans() {
        return fans;
    }

    public void setFans(int fans) {
        this.fans = fans;
    }

    public int getUserMusic() {
        return userMusic;
    }

    public void setUserMusic(int userMusic) {
        this.userMusic = userMusic;
    }

    @Override
    public String toString() {
        return "UserDomain{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", nickname='" + nickname + '\'' +
                ", password='" + password + '\'' +
                ", age=" + age +
                ", sex='" + sex + '\'' +
                ", birthday=" + birthday +
                ", email='" + email + '\'' +
                ", headImage='" + headImage + '\'' +
                ", userStatus=" + userStatus +
                ", userTag='" + userTag + '\'' +
                ", userIntro='" + userIntro + '\'' +
                ", userAddress='" + userAddress + '\'' +
                ", followed=" + followed +
                ", fans=" + fans +
                ", userMusic=" + userMusic +
                '}';
    }

}