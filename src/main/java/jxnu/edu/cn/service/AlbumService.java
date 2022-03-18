package jxnu.edu.cn.service;

import jxnu.edu.cn.domain.AlbumDomain;
import jxnu.edu.cn.domain.SongDomain;

import java.util.List;

public interface AlbumService {
    public long addalbum(AlbumDomain albumDomain) ;
    public List<AlbumDomain> queryalbumById(long userId) ;
    public  int addalbumNumber(long albumId) ;
    public int deleteAlbumByAlbumId(long albumId);
}
