package jxnu.edu.cn.test;

import jxnu.edu.cn.dao.PlaySongDao;
import jxnu.edu.cn.domain.HistoryDomain;
import jxnu.edu.cn.domain.SongDomain;
import jxnu.edu.cn.domain.UserDomain;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class test4 {
    public static void main(String[] args) throws IOException {
        InputStream resourceAsStream = Resources.getResourceAsStream("sqlMapConfig.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
        SqlSession sqlSession=sqlSessionFactory.openSession(true);
        PlaySongDao mapper = sqlSession.getMapper(PlaySongDao.class);
        List<SongDomain> songDomains = mapper.querySongsByalbumId(1,0,3);
        SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
        Date date=songDomains.get(0).getAlbumDomain().getAlbumCreatetime();
        System.out.println(songDomains.size());
        System.out.println(sdf.format(date));
        sqlSession.close();
    }
}
