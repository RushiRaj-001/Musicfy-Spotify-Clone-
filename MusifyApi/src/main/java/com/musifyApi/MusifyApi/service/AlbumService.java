package com.musifyApi.MusifyApi.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.musifyApi.MusifyApi.document.Album;
import com.musifyApi.MusifyApi.dto.AlbumListResponse;
import com.musifyApi.MusifyApi.dto.AlbumRequest;
import com.musifyApi.MusifyApi.repository.AlbumRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AlbumService
{

    @Autowired
    private final AlbumRepository albumRepository;

    private final Cloudinary cloudinary;

    public Album addAlbum(AlbumRequest albumRequest) throws IOException {
       Map<String,Object> imageUploadResult = cloudinary.uploader().upload(albumRequest.getImageFile().getBytes(), ObjectUtils.asMap("resource_type","image"));
       Album newAlbum = Album.builder()
               .name(albumRequest.getName())
               .desc(albumRequest.getDesc())
               .bgColour(albumRequest.getBgColor())
               .imageUrl(imageUploadResult.get("secure_url").toString())
               .build();

       return albumRepository.save(newAlbum);
    }

    public AlbumListResponse getAllAlbums(){
        return new AlbumListResponse(true, albumRepository.findAll());
    }

    public Boolean removeAlbum(String id){
        Album existingAlbum = albumRepository.findById(id).orElseThrow(()-> new RuntimeException("Album Not Found"));
        albumRepository.delete(existingAlbum);

        return true;
    }

}
