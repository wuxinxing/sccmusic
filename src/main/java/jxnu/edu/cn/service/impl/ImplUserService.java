package jxnu.edu.cn.service.impl;
import jxnu.edu.cn.dao.UserDao;
import jxnu.edu.cn.domain.RelationDomain;
import jxnu.edu.cn.domain.UserDomain;
import jxnu.edu.cn.service.UserService;
import jxnu.edu.cn.util.ImageUtil;
import jxnu.edu.cn.vo.ImageHolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.sql.SQLException;
import java.util.List;

@Service("UserService")
public class ImplUserService implements UserService {
    @Autowired
    private UserDao userDao;
    @Override
    public UserDomain findUser(UserDomain userDomain) {
        return userDao.findUser(userDomain);
    }

    @Override
    public int insertUser(UserDomain user) {
        return userDao.insertUser(user);
    }

    @Override
    public String addHeadimg(UserDomain userDomain, ImageHolder imageHolder, String targetBasePath, String targetRelativeAddr) throws Exception {
        String headImage=null;
            // 存储图片
        headImage= ImageUtil.generateThumbnail( imageHolder, targetBasePath, targetRelativeAddr);
        userDomain.setHeadImage(headImage);
            // 更新店铺的图片地址
        userDao.updateHeadImage(userDomain);
        return headImage;
    }

    @Override
    public int updateinformation(UserDomain user) {
        return userDao.updateinformation(user);
    }

    @Override
    public int updatepwd(UserDomain user) {
        return userDao.updatepwd(user);
    }

    @Override
    public int countUserFollows(long userId) {
        return userDao.queryCountUserFollows(userId);
    }

    @Override
    public int countUserFans(long userId) {
        return userDao.queryCountUserFans(userId);
    }

    @Override
    public long addRelation(RelationDomain relationDomain) {
        return userDao.insertRelation(relationDomain);
    }

    @Override
    public int deleteRelation(long fromUserId, long toUserId) {
        return userDao.deleteRelation(fromUserId,toUserId);
    }

    @Override
    public int checkIffollowed(long fromUserId, long toUserId) {
        return userDao.queryIfFollowed(fromUserId,toUserId);
    }

    @Override
    public int addUserFollowed(long userId) {
        return userDao.updateAddUserFollowed(userId);
    }

    @Override
    public int addUserFans(long userId) {
        return userDao.updateAddUserFans(userId);
    }

    @Override
    public int minusUserFollowed(long userId) {
        return userDao.updateMinusUserFollowed(userId);
    }

    @Override
    public int minusUserFans(long userId) {
        return userDao.updateMinusUserFans(userId);
    }

    @Override
    public int addUserMusic(long userId) {
        return userDao.updateAddUserMusic(userId);
    }

    @Override
    public int minusUserMusic(long userId) {
        return userDao.updateMinusUserMusic(userId);
    }

    @Override
    public List<UserDomain> getUserFollowedUser(long userId, int index, int pagesize) {
        return userDao.queryUserFollowedUser(userId,index,pagesize);
    }

    @Override
    public List<UserDomain> getUserFansUser(long userId, int index, int pagesize) {
        return userDao.queryUserFansUser(userId,index,pagesize);
    }
}
