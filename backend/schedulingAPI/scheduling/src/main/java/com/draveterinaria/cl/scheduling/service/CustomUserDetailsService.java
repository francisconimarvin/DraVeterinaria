// CustomUserDetailsService.java
package com.draveterinaria.cl.scheduling.service;

import com.draveterinaria.cl.scheduling.model.User;
import com.draveterinaria.cl.scheduling.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections; // Para manejar roles simples
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // 1. Buscar al usuario por el username (email)
        User user = userService.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con email: " + username));

        // 2. Construir y devolver un objeto UserDetails de Spring Security (incluyendo Roles)

        // ⭐️ IMPORTANTE: Asumimos que tu modelo User tiene un getter para el rol simple (ej. getRole()
        // que devuelve "ADMIN" o "USER") y se envuelve en una lista para el mapeo.

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),          // Username: Email del JWT
                user.getPasswordHash(),   // Password: El hash (requerido por el constructor)

                // 💡 Mapeo de Roles/Autoridades: Crucial para la Autorización (HTTP 403 Forbidden)
                Collections.singleton(new SimpleGrantedAuthority(user.getRole()))

                /*
                 * Si tu modelo User tiene una lista de roles (List<Role>):
                 * user.getRoles().stream()
                 * .map(role -> new SimpleGrantedAuthority(role.getName()))
                 * .collect(Collectors.toList())
                 */
        );
    }
}