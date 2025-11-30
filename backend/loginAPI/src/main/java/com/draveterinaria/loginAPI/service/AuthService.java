package com.draveterinaria.loginAPI.service;

import com.draveterinaria.loginAPI.dto.LoginRequest;
import com.draveterinaria.loginAPI.dto.LoginResponse;
import com.draveterinaria.loginAPI.model.User;
import com.draveterinaria.loginAPI.repository.UserRepository;
import com.draveterinaria.loginAPI.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public User register(String email, String password, String role) {
        String hashed = BCrypt.hashpw(password, BCrypt.gensalt());
        User user = User.builder()
                .email(email)
                .passwordHash(hashed)
                .role(role)
                .build();
        return userRepository.save(user);
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (!BCrypt.checkpw(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Contraseña incorrecta");
        }

        String token = jwtUtil.generateToken(user);
        return new LoginResponse(token, user.getRole());
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }
}
