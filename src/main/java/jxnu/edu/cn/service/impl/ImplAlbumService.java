package jxnu.edu.cn.service.impl;

import jxnu.edu.cn.dao.AlbumDao;
import jxnu.edu.cn.domain.AlbumDomain;
import jxnu.edu.cn.domain.SongDomain;
import jxnu.edu.cn.service.AlbumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("AlbumService")
public class ImplAlbumService implements AlbumService{
 @Autowired
 private AlbumDao albumDao;

 @Override
 public long addalbum(AlbumDomain albumDomain)   {return albumDao.addalbum(albumDomain);}

 @Override
 public List<AlbumDomain> queryalbumById(long userId)   {return albumDao.queryalbumById(userId);}
 @Override
 public int addalbumNumber(long albumId)   {return albumDao.addalbumNumber(albumId);}

 @Override
 public int deleteAlbumByAlbumId(long albumId) {
  return albumDao.deleteAlbum(albumId);
 }
}

