package com.draveterinaria.cl.scheduling.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Permite preflight OPTIONS
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        // Abrir todas las rutas
                        .anyRequest().permitAll()
                )
                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(List.of("http://localhost:5173")); // tu front
        cfg.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        cfg.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
        cfg.setExposedHeaders(List.of("Authorization"));
        cfg.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }
}











/*package com.draveterinaria.cl.scheduling.config;


import com.draveterinaria.cl.scheduling.filter.JwtAuthFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider; // Importar AuthenticationProvider
import org.springframework.security.authentication.dao.DaoAuthenticationProvider; // Importar DaoAuthenticationProvider
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor // Usamos Lombok para el constructor
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    //  Agregamos las dependencias necesarias:
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    // =========================================================================
    // 1. CREACIÓN DEL DAOAUTHENTICATIONPROVIDER (EL BEAN SOLICITADO)
    // =========================================================================

    @Bean
    public AuthenticationProvider authenticationProvider() {
        // Instanciamos el proveedor que usa la base de datos (DAO)
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

        // Asignamos tu servicio de carga de usuarios
        authProvider.setUserDetailsService(userDetailsService);

        // Asignamos el codificador de contraseñas
        authProvider.setPasswordEncoder(passwordEncoder);

        return authProvider;
    }

    // =========================================================================
    // 2. CONFIGURACIÓN DE LA CADENA DE FILTROS
    // =========================================================================

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .cors(cors -> {})
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Permite preflight a TODO
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // ⚠️ Ruta de login deshabilitada o ajustada, ya que el login está en el 8095
                        // .requestMatchers("/auth/login").permitAll()

                        // Resto protegido
                        .anyRequest().authenticated()
                )
                // ⭐️ AGREGAR el proveedor de autenticación
                .authenticationProvider(authenticationProvider())

                // Tu filtro JWT antes del filtro estándar
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    // =========================================================================
    // 3. OTROS BEANS REQUERIDOS
    // =========================================================================

    // El bean de CORS se mantiene igual.
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration cfg = new CorsConfiguration();
        cfg.setAllowedOrigins(List.of("http://localhost:5173"));
        cfg.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        cfg.setAllowedHeaders(Arrays.asList("Content-Type", "Authorization"));
        cfg.setExposedHeaders(List.of("Authorization"));
        cfg.setAllowCredentials(false);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cfg);
        return source;
    }



    // ⚠️ Asegúrate de tener el bean de PasswordEncoder disponible en otra clase de configuración.
    // @Bean
    // public PasswordEncoder passwordEncoder() { return new BCryptPasswordEncoder(); }
}
*/
