package jxnu.edu.cn.service;

import jxnu.edu.cn.domain.CollectDomain;
import jxnu.edu.cn.domain.HistoryDomain;
import jxnu.edu.cn.domain.SongDomain;
import jxnu.edu.cn.domain.UserDomain;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PlaySongService {
    public SongDomain querySongById(long id);
    public List<SongDomain> querySongOrderById(int index,int pagesize);
    public List<SongDomain> querySongOrderByPlayedTimes(int index,int pagesize);
    public List<SongDomain> querySongOrderByPlayedTimesFromRedis(int index,int pagesize);
    public List<SongDomain> querySongOrderByTime (int index,int pagesize) ;
    public List<SongDomain> querySongOrderByTimeFromRedis(int index,int pagesize) ;
    public List<HistoryDomain> querySongHistory(long userId, int index, int pagesize)  ;
    public long addHistory(long userId,long musicId) ;
    public int addPlaySongTimes(long id) ;
    public int queryCollectBySongId(long songId,long userId) ;
    public long addCollect(long userId,long songId) ;
    public int addCollecttimes(long songId) ;
    public int minusCollecttimes(long songId) ;
    public int removeCollect(long userId,long songId) ;
    public List<CollectDomain> queryuserCollectedSong(long userId, int index, int pagesize) ;
    public List<SongDomain> queryUsersongs(long userId,int index, int pagesize)  ;
    public int countRecomSongs() ;
    public int countSongsByType(String type) ;
    public int countUserSongs(long userId) ;
    public int countUserHistorys(long userId) ;
    public int countUserCollects(long userId) ;
    public List<SongDomain> querySongsByType(String type,int index,int pagesize)  ;
    public int uploadmusic(SongDomain music)  ;
    public int CountUserSongs(long userId) ;
    public  List<SongDomain> querySongsBySearchkey(int index,int pagesize,String searchkey) ;
    public int countSearchsongs(String searchkey);
    public int countSearchsingers(String searchkey);
    public  List<UserDomain> querySingersBySearchkey(int index,int pagesize,String searchkey) ;
    public int deleteSong(long musicId) ;
    public int checkIfUserOwnsSong(long userId,long musicId) ;
    public  int countAlbumsongs(long albumId);
    public  List<SongDomain> querySongsByalbumId(@Param("albumId") long albumId, @Param("index") int index, @Param("pagesize") int pagesize);

}
