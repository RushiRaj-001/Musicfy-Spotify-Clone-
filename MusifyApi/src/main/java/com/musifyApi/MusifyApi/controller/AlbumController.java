package com.musifyApi.MusifyApi.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.musifyApi.MusifyApi.document.Album;
import com.musifyApi.MusifyApi.dto.AlbumListResponse;
import com.musifyApi.MusifyApi.dto.AlbumRequest;
import com.musifyApi.MusifyApi.service.AlbumService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/albums")
public class AlbumController {

    @Autowired
    private final AlbumService albumService;

    @PostMapping
    public ResponseEntity<?> addAlbum(@RequestPart("request") String request,
                                      @RequestPart("file")MultipartFile file){
        try{
            ObjectMapper objectMapper = new ObjectMapper();
            AlbumRequest albumRequest = objectMapper.readValue(request, AlbumRequest.class);
            albumRequest.setImageFile(file);

            return ResponseEntity.status(HttpStatus.CREATED).body(albumService.addAlbum(albumRequest));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping(produces = "application/json")
    public ResponseEntity<?> listAlbum(){
        try{
           return ResponseEntity.ok(albumService.getAllAlbums());
        } catch (Exception e) {
            return ResponseEntity.ok(new AlbumListResponse(false,null));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> removeAlbum(@PathVariable String id){
        try{
            Boolean removed = albumService.removeAlbum(id);

            if (removed){
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            } else {
                return ResponseEntity.badRequest().build();
            }

        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
