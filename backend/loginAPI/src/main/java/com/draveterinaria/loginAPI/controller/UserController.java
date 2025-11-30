package com.draveterinaria.loginAPI.controller;

import com.draveterinaria.loginAPI.dto.LoginRequest;
import com.draveterinaria.loginAPI.dto.RegisterRequest;
import com.draveterinaria.loginAPI.model.User;
import com.draveterinaria.loginAPI.service.UserService;
import com.draveterinaria.loginAPI.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    // GET todos los usuarios
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // GET usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST registrar usuario
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody RegisterRequest request) {
        User user = userService.createUser(request.getEmail(), request.getPassword(), request.getRole());
        return ResponseEntity.ok(user);
    }

    // PUT actualizar usuario
    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody RegisterRequest request) {
        User updatedUser = userService.updateUser(id, request.getEmail(), request.getPassword(), request.getRole());
        return ResponseEntity.ok(updatedUser);
    }

    // DELETE usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // POST login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        User user = userService.login(request.getEmail(), request.getPassword());
        String token = JwtUtil.generateToken(user);
        return ResponseEntity.ok(token);
    }
}
