package com.musifyApi.MusifyApi.controller;

import com.musifyApi.MusifyApi.document.User;
import com.musifyApi.MusifyApi.dto.AuthRequest;
import com.musifyApi.MusifyApi.dto.AuthResponse;
import com.musifyApi.MusifyApi.dto.RegisterRequest;
import com.musifyApi.MusifyApi.dto.UserResponse;
import com.musifyApi.MusifyApi.service.AppUserDetailsService;
import com.musifyApi.MusifyApi.service.UserService;
import com.musifyApi.MusifyApi.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final AppUserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        try{
            //authenticate the user
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));

            //load user details
            UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            User existingUser =userService.findByEmail(request.getEmail());

            //Generate jwt token
            String token = jwtUtil.generateToken(userDetails, existingUser.getRole().name());

            return ResponseEntity.ok(new AuthResponse(token,request.getEmail(),existingUser.getRole().name()));
        }catch (BadCredentialsException e){
            return ResponseEntity.badRequest().body("Email/Password is incorrect");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request){
        try{
            UserResponse response = userService.registerUser(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
