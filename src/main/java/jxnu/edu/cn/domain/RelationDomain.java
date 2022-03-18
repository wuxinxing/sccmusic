package jxnu.edu.cn.domain;

import java.util.Date;

public class RelationDomain {
    private long relationId;
    private long fromUserId;
    private long toUserId;
    private int rel;
    private Date relationTime;

    public long getRelationId() {
        return relationId;
    }

    public void setRelationId(long relationId) {
        this.relationId = relationId;
    }

    public long getFromUserId() {
        return fromUserId;
    }

    public void setFromUserId(long fromUserId) {
        this.fromUserId = fromUserId;
    }

    public long getToUserId() {
        return toUserId;
    }

    public void setToUserId(long toUserId) {
        this.toUserId = toUserId;
    }

    public int getRel() {
        return rel;
    }

    public void setRel(int rel) {
        this.rel = rel;
    }

    public Date getRelationTime() {
        return relationTime;
    }

    public void setRelationTime(Date relationTime) {
        this.relationTime = relationTime;
    }

    @Override
    public String toString() {
        return "RelationDomain{" +
                "relationId=" + relationId +
                ", fromUserId=" + fromUserId +
                ", toUserId=" + toUserId +
                ", rel=" + rel +
                ", relationTime=" + relationTime +
                '}';
    }
}
