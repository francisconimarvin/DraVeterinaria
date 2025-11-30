package com.draveterinaria.cl.scheduling.service;

import com.draveterinaria.cl.scheduling.model.User;
import com.draveterinaria.cl.scheduling.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository; // El repository local de scheduling

    // 💡 Método necesario para el UserDetailsService:
    public Optional<User> findByEmail(String email) {
        // Asumiendo que UserRepository tiene este método.
        return userRepository.findByEmail(email);
    }

    // (Opcional, pero no necesario para JWT)
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
