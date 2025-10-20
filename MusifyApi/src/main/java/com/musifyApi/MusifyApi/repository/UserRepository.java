package com.musifyApi.MusifyApi.repository;

import com.musifyApi.MusifyApi.document.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {


    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);
}
