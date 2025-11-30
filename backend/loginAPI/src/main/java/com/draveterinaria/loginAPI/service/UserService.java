package com.draveterinaria.loginAPI.service;

import com.draveterinaria.loginAPI.model.User;
import com.draveterinaria.loginAPI.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Crear usuario
    public User createUser(String email, String password, String role) {
        if(userRepository.existsByEmail(email)) {
            throw new RuntimeException("El email ya está registrado");
        }
        User user = User.builder()
                .email(email)
                .passwordHash(passwordEncoder.encode(password))
                .role(role)
                .build();
        return userRepository.save(user);
    }

    // Obtener todos los usuarios
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Obtener usuario por ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    // Actualizar usuario
    public User updateUser(Long id, String email, String password, String role) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        user.setEmail(email);
        if(password != null && !password.isEmpty()) {
            user.setPasswordHash(passwordEncoder.encode(password));
        }
        user.setRole(role);
        return userRepository.save(user);
    }

    // Eliminar usuario
    public void deleteUser(Long id) {
        if(!userRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        userRepository.deleteById(id);
    }

    // Login
    public User login(String email, String password) {
    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuario o contraseña incorrectos"));

    if (!passwordEncoder.matches(password, user.getPasswordHash())) {
        throw new RuntimeException("Usuario o contraseña incorrectos");
    }

    return user;
}
}
