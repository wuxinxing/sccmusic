package jxnu.edu.cn.test;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import jxnu.edu.cn.dao.User;
import jxnu.edu.cn.domain.UserDomain2;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:applicationContext.xml")
public class test2 {

    @Autowired
    private User user;
    @Test
    public void test() {
        QueryWrapper<UserDomain2> wrapper = new QueryWrapper<>();
        wrapper.gt("user_id",2);
        List<UserDomain2> userDomain2s = user.selectList(wrapper);
        for (UserDomain2 userDomain2 : userDomain2s) {
            System.out.println(userDomain2);
        }
    }
    @Test
    public void test2() {
        UserDomain2 userDomain2=new UserDomain2();
        userDomain2.setBirthday(new Date());
        userDomain2.setUsername("zhangsan");
        userDomain2.setPassword("123456789");
        int insert = user.insert(userDomain2);
        System.out.println(insert);
    }
    @Test
    public void test3() {
        int i = user.deleteBatchIds(Arrays.asList(8L,7L));
    }
    @Test
    public void test4() {
        UserDomain2 userDomain2=new UserDomain2();
        userDomain2.setUserId(5l);
        userDomain2.setAge(55);
        user.updateById(userDomain2);
    }
    @Test
    public void test5() {
        List<UserDomain2> userDomain2s = user.selectList(null);
        for (UserDomain2 userDomain2 : userDomain2s) {
            System.out.println(userDomain2);
        }
    }



}
