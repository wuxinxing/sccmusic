package jxnu.edu.cn.dao;

import jxnu.edu.cn.domain.AlbumDomain;
import jxnu.edu.cn.domain.SongDomain;

import java.util.List;

public interface AlbumDao {
   public long addalbum(AlbumDomain albumDomain) ;
   public List<AlbumDomain> queryalbumById(long userId) ;
   public  int addalbumNumber(long albumId) ;
   public int deleteAlbum(long albumId);
}
