package com.musifyApi.MusifyApi.document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;
    private String password;

    private Role role = Role.USER;
    public enum Role{
        USER,ADMIN
    }

}
