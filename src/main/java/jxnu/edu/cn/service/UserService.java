package jxnu.edu.cn.service;



import jxnu.edu.cn.domain.RelationDomain;
import jxnu.edu.cn.domain.UserDomain;
import jxnu.edu.cn.vo.ImageHolder;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLException;
import java.util.List;

public interface UserService {
    public UserDomain findUser(UserDomain userDomain);
    public int insertUser(UserDomain user);
    public String addHeadimg(UserDomain userDomain, ImageHolder imageHolder, String targetBasePath, String targetRelativeAddr) throws Exception;
    public int updateinformation(UserDomain user) ;
    public int updatepwd(UserDomain user) ;
    public int countUserFollows(long userId);
    public int countUserFans(long userId);
    public long addRelation(RelationDomain relationDomain);
    public int deleteRelation(long fromUserId,long toUserId);
    public int checkIffollowed(long fromUserId,long toUserId);
    public int addUserFollowed(long userId);
    public int addUserFans(long userId);
    public int minusUserFollowed(long userId);
    public int minusUserFans(long userId);
    public int addUserMusic(long userId);
    public int minusUserMusic(long userId);
    public List<UserDomain> getUserFollowedUser(long userId,int index,int pagesize);
    public List<UserDomain> getUserFansUser(long userId,int index,int pagesize);

}
