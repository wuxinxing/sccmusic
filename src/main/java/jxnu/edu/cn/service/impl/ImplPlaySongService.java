package jxnu.edu.cn.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jxnu.edu.cn.dao.PlaySongDao;
import jxnu.edu.cn.domain.CollectDomain;
import jxnu.edu.cn.domain.HistoryDomain;
import jxnu.edu.cn.domain.SongDomain;
import jxnu.edu.cn.domain.UserDomain;
import jxnu.edu.cn.service.PlaySongService;
import jxnu.edu.cn.util.JedisPoolUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;
import java.util.Date;
import java.util.List;

@Service("PlaySongService")
public class ImplPlaySongService implements PlaySongService {
    @Autowired
    private PlaySongDao songDao;
    @Override
    public SongDomain querySongById(long id)  {
        return  songDao.querySongByID(id);
    }
    public List<SongDomain> querySongOrderById(int index,int pagesize) {
        return songDao.querySongOrderById(index,pagesize);
    }

    @Override
    public List<SongDomain> querySongOrderByPlayedTimes(int index, int pagesize)  {
        return songDao.querySongOrderByPlayedTimes(index,pagesize);
    }

    @Override
    public List<SongDomain> querySongOrderByPlayedTimesFromRedis(int index, int pagesize)   {
        List<SongDomain> songDomains=null;
        Jedis jedis= JedisPoolUtils.getJedis();
        String typeJson=jedis.get("songJson");
        ObjectMapper objectMapper=new ObjectMapper();
        if (typeJson==null || typeJson.trim().length()==0){
            //从数据库读取
            List<SongDomain> typeDomainList=querySongOrderByPlayedTimes(index,pagesize);
            //转json

            try {
                typeJson=objectMapper.writeValueAsString(typeDomainList);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            jedis.set("songJson",typeJson);
            jedis.close();

        }else {
            System.out.println("jedis");
        }
        try {
            songDomains=objectMapper.readValue(typeJson, new TypeReference<List<SongDomain>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return songDomains;
    }

    @Override
    public List<SongDomain> querySongOrderByTime(int index, int pagesize){
        return songDao.querySongOrderByTime(index,pagesize);
    }

    @Override
    public List<SongDomain> querySongOrderByTimeFromRedis(int index, int pagesize)   {
        List<SongDomain> songDomains=null;
        Jedis jedis= JedisPoolUtils.getJedis();
        String typeJson=jedis.get("songJson");
        ObjectMapper objectMapper=new ObjectMapper();
        System.out.println(typeJson);
        if (typeJson==null || typeJson.trim().length()==0){
            //从数据库读取
            List<SongDomain> typeDomainList=querySongOrderByTime(index,pagesize);
            //转json

            try {
                typeJson=objectMapper.writeValueAsString(typeDomainList);
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
            jedis.set("songJson",typeJson);
            jedis.close();

        }else {
            System.out.println("jedis");
        }
        try {
            songDomains=objectMapper.readValue(typeJson, new TypeReference<List<SongDomain>>() {});
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return songDomains;
    }

    @Override
    public List<HistoryDomain> querySongHistory(long userId, int index, int pagesize)   {
        return songDao.querySongHistory(userId,index,pagesize);
    }

    @Override
    public long addHistory(long userId, long musicId)   {
        HistoryDomain historyDomain=new HistoryDomain();
        historyDomain.setHistoryUserId(userId);
        historyDomain.setMusicId(musicId);
        historyDomain.setPlayTime(new Date());
        return songDao.addHistory(historyDomain);
    }

    @Override
    public int addPlaySongTimes(long id) {
        return songDao.upadtePlaySongTimes(id);
    }

    @Override
    public int queryCollectBySongId(long songId, long userId) {
        List<CollectDomain> maps =songDao.queryCollectBySongId(songId,userId);
        if(maps.isEmpty()){
            return 0;
        }else {
            return 1;
        }
    }

    @Override
    public long addCollect(long userId, long songId)   {
        CollectDomain collectDomain = new CollectDomain();
        collectDomain.setCollectorUserId(userId);
        collectDomain.setCollectTime(new Date());
        collectDomain.setCollectMusicId(songId);
        return songDao.addCollect(collectDomain);
    }

    @Override
    public int addCollecttimes(long songId)   {
        return songDao.addCollecttimes(songId);
    }

    @Override
    public int minusCollecttimes( long songId)   {
        return songDao.minusCollecttimes(songId);
    }

    @Override
    public int removeCollect(long userId, long songId)   {
        return songDao.removeCollect(userId,songId);
    }

    @Override
    public List<CollectDomain> queryuserCollectedSong(long userId, int index, int pagesize)   {
        return songDao.queryUserCollectedSong(userId,index,pagesize);
    }

    @Override
    public List<SongDomain> queryUsersongs(long userId, int index, int pagesize)   {
        return songDao.queryUsersongs(userId,index,pagesize);
    }

    @Override
    public int countRecomSongs()   {
        return songDao.countRecomSongs();
    }

    @Override
    public int countSongsByType(String type)   {
        return songDao.countSongsByType(type);
    }

    @Override
    public int countUserSongs(long userId)   {
        return songDao.countUserSongs(userId);
    }

    @Override
    public int countUserHistorys(long userId)   {
        return songDao.countUserHistorys(userId);
    }

    @Override
    public int countUserCollects(long userId)   {
        return songDao.countUserCollects(userId);
    }

    @Override
    public List<SongDomain> querySongsByType(String type, int index, int pagesize)   {
        return songDao.querySongsByType(type,index,pagesize);
    }
    @Override
    public int uploadmusic(SongDomain musicDomain)   {
        Date date=new Date();
        musicDomain.setUploadTime(date);
        return  songDao.addmusic(musicDomain);
    }

    @Override
    public int CountUserSongs(long userId)   {
        return songDao.queryCountUserSongs(userId);
    }

    @Override
    public  List<SongDomain> querySongsBySearchkey(int index,int pagesize,String searchkey) {
        return songDao.querySongsBySearchkey(index, pagesize,searchkey);
    }

    @Override
    public int countSearchsongs(String searchkey) {
        return songDao.countSearchsongs(searchkey);
    }

    @Override
    public int countSearchsingers(String searchkey) {
        return songDao.countSearchsingers(searchkey);
    }

    @Override
    public List<UserDomain> querySingersBySearchkey(int index,int pagesize,String searchkey)   {
        return songDao.querySingersBySearchkey(index, pagesize,searchkey);
    }

    @Override
    public int deleteSong(long musicId)  {
        return songDao.deleteSong(musicId);
    }

    @Override
    public int checkIfUserOwnsSong(long userId, long musicId)  {
        return songDao.queryIfUserOwnsSong(userId,musicId);
    }

    @Override
    public int countAlbumsongs(long albumId) {
        return songDao.countAlbumsongs(albumId);
    }

    @Override
    public List<SongDomain> querySongsByalbumId(long albumId, int index, int pagesize) {
        return songDao.querySongsByalbumId(albumId,index,pagesize);
    }
}
