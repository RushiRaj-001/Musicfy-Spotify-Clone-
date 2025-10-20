package com.musifyApi.MusifyApi.repository;

import com.musifyApi.MusifyApi.document.Song;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SongRepository extends MongoRepository<Song,String> {
}
