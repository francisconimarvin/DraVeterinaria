package com.draveterinaria.loginAPI.controller;

import com.draveterinaria.loginAPI.dto.LoginRequest;
import com.draveterinaria.loginAPI.dto.LoginResponse;
import com.draveterinaria.loginAPI.dto.RegisterRequest;
import com.draveterinaria.loginAPI.model.User;
import com.draveterinaria.loginAPI.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    // Registro libre para roles normales
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody RegisterRequest request) {
        if ("ADMIN".equalsIgnoreCase(request.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(authService.register(request.getEmail(), request.getPassword(), request.getRole()));
    }

    // Crear usuarios sensibles (ADMIN) protegido
    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody RegisterRequest request,
                                           @AuthenticationPrincipal UserDetails currentUserDetails) {
        User currentUser = authService.findByEmail(currentUserDetails.getUsername());

        if ("ADMIN".equalsIgnoreCase(request.getRole()) && !"ADMIN".equals(currentUser.getRole())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return ResponseEntity.ok(authService.register(request.getEmail(), request.getPassword(), request.getRole()));
    }
}
