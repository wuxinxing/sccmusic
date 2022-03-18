package jxnu.edu.cn.dao;

import jxnu.edu.cn.domain.*;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

public interface PlaySongDao {
    public SongDomain querySongByID(long id);
    public List<SongDomain> querySongOrderById(@Param("index") int index,@Param("pagesize") int pagesize);
    public List<SongDomain> querySongOrderByPlayedTimes(@Param("index") int index,@Param("pagesize") int pagesize);
    public List<SongDomain> querySongOrderByTime(@Param("index") int index,@Param("pagesize") int pagesize) ;
    public List<HistoryDomain> querySongHistory(@Param("userId")long userId,@Param("index") int index,@Param("pagesize") int pagesize) ;
    public long addHistory (HistoryDomain historyDomain);
    public int upadtePlaySongTimes(long id) ;
    public List<CollectDomain> queryCollectBySongId(@Param("userId")long userId,@Param("songId")long songId) ;
    public long addCollect(CollectDomain collectDomain) ;
    public int addCollecttimes(long songId) ;
    public int minusCollecttimes(long songId) ;
    public int removeCollect(@Param("userId")long userId,@Param("songId")long songId) ;
    public List<CollectDomain> queryUserCollectedSong(@Param("userId")long userId,@Param("index") int index,@Param("pagesize") int pagesize) ;
    public List<SongDomain> queryUsersongs(@Param("userId")long userId,@Param("index") int index,@Param("pagesize") int pagesize)  ;
    public int countRecomSongs() ;
    public int countSongsByType(String type) ;
    public int countUserSongs(long userId) ;
    public int countUserHistorys(long userId) ;
    public int countUserCollects(long userId) ;
    public List<SongDomain> querySongsByType(@Param("type")String type,@Param("index") int index,@Param("pagesize") int pagesize)  ;
    public int addmusic(SongDomain music);
    public int queryCountUserSongs(long userId) ;
    public  List<SongDomain> querySongsBySearchkey(@Param("index") int index,@Param("pagesize") int pagesize,@Param("searchkey")String searchkey);
    public  int countSearchsongs(String searchkey);
    public  List<UserDomain> querySingersBySearchkey(@Param("index") int index,@Param("pagesize") int pagesize,@Param("searchkey")String searchkey) ;
    public int deleteSong(long musicId) ;
    public  int countSearchsingers(String searchkey);
    public int queryIfUserOwnsSong(@Param("userId")long userId,@Param("musicId")long musicId) ;
    public  int countAlbumsongs(long albumId);
    public  List<SongDomain> querySongsByalbumId(@Param("albumId") long albumId,@Param("index") int index,@Param("pagesize") int pagesize);
}