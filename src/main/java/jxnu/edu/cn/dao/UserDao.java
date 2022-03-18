package jxnu.edu.cn.dao;

import jxnu.edu.cn.domain.RelationDomain;
import jxnu.edu.cn.domain.UserDomain;
import org.apache.ibatis.annotations.Param;

import java.sql.SQLException;
import java.util.List;

public interface UserDao {
    public UserDomain findUser(UserDomain userDomain);
    public int insertUser(UserDomain userDomain);
    public int updateHeadImage(UserDomain userDomain);
    public int updateinformation(UserDomain user);
    public int updatepwd(UserDomain user);
    public int queryCountUserFollows(long userId);
    public int queryCountUserFans(long userId);
    public long insertRelation(RelationDomain relationDomain);
    public int deleteRelation(@Param("fromUserId")long fromUserId, @Param("toUserId") long toUserId);
    public int queryIfFollowed(@Param("fromUserId")long fromUserId,@Param("toUserId") long toUserId);
    public int updateAddUserFollowed(long userId);
    public int updateAddUserFans(long userId);
    public int updateMinusUserFollowed(long userId);
    public int updateMinusUserFans(long userId);
    public int updateAddUserMusic(long userId);
    public int updateMinusUserMusic(long userId);
    public List<UserDomain> queryUserFollowedUser(@Param("userId")long userId,@Param("index")int index,@Param("pagesize")int pagesize);
    public List<UserDomain> queryUserFansUser(@Param("userId")long userId,@Param("index")int index,@Param("pagesize")int pagesize);
}

