package com.musifyApi.MusifyApi.dto;

import com.musifyApi.MusifyApi.document.Album;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AlbumListResponse {

    private boolean success;
    private List<Album> albums;



}
