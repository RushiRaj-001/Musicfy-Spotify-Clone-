package com.musifyApi.MusifyApi.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AlbumRequest {
    private String name;
    private String desc;
    private String bgColor;
    private MultipartFile imageFile;
}
