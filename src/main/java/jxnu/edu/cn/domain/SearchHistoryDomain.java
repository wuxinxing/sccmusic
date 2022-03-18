package jxnu.edu.cn.domain;

import java.util.Date;

public class SearchHistoryDomain {
    private long searchHistoryId;
    private long searchHistoryUserId;
    private String searchHistoryText;
    private Date searchHistoryTime;

    public long getSearchHistoryId() {
        return searchHistoryId;
    }

    public void setSearchHistoryId(long searchHistoryId) {
        this.searchHistoryId = searchHistoryId;
    }

    public long getSearchHistoryUserId() {
        return searchHistoryUserId;
    }

    public void setSearchHistoryUserId(long searchHistoryUserId) {
        this.searchHistoryUserId = searchHistoryUserId;
    }

    public String getSearchHistoryText() {
        return searchHistoryText;
    }

    public void setSearchHistoryText(String searchHistoryText) {
        this.searchHistoryText = searchHistoryText;
    }

    public Date getSearchHistoryTime() {
        return searchHistoryTime;
    }

    public void setSearchHistoryTime(Date searchHistoryTime) {
        this.searchHistoryTime = searchHistoryTime;
    }

    @Override
    public String toString() {
        return "SearchHistoryDomain{" +
                "searchHistoryId=" + searchHistoryId +
                ", searchHistoryUserId=" + searchHistoryUserId +
                ", searchHistoryText='" + searchHistoryText + '\'' +
                ", searchHistoryTime=" + searchHistoryTime +
                '}';
    }
}
