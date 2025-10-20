package com.musifyApi.MusifyApi.repository;

import com.musifyApi.MusifyApi.document.Album;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AlbumRepository extends MongoRepository<Album,String> {
}
