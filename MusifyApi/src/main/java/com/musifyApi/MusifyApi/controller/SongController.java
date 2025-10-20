package com.musifyApi.MusifyApi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.musifyApi.MusifyApi.dto.SongListResponse;
import com.musifyApi.MusifyApi.dto.SongRequest;
import com.musifyApi.MusifyApi.service.SongService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/songs")
@RequiredArgsConstructor
public class SongController {

    private final SongService service;

    @PostMapping
    public ResponseEntity<?> addSong(@RequestPart("request") String requestString,
                                     @RequestPart("audio") MultipartFile audioFile,
                                     @RequestPart("image") MultipartFile imageFile){
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            SongRequest songRequest = objectMapper.readValue(requestString, SongRequest.class);
            songRequest.setAudioFile(audioFile);
            songRequest.setImageFile(imageFile);

            return ResponseEntity.status(HttpStatus.CREATED).body(service.addSong(songRequest));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> songList(){
        try{
            return ResponseEntity.ok(service.SongList());
        } catch (Exception e){
            return ResponseEntity.ok(new SongListResponse(false, null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeSong(@PathVariable String id){
        try{
            boolean removed = service.removeSong(id);
            if (removed){
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.badRequest().build();
            }
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
