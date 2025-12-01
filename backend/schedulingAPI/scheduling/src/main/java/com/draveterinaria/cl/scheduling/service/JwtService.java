package com.draveterinaria.cl.scheduling.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Service;

// Omitiremos generateToken() si ya no lo usas

@Service
public class JwtService {

    // ⭐️ DEBE COINCIDIR con la clave de loginAPI
    private static final String SECRET_KEY = "OTRO_SECRET_LOCAL";

    private final Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);

    // 💡 Método de extracción y validación de usuario:
    public String extractUsername(String token) {
        // Esto lanzará una excepción si el token es inválido (firma o expiración)
        DecodedJWT decodedJWT = JWT.require(algorithm)
                .build()
                .verify(token);

        // El Subject (email o ID) es el nombre de usuario
        return decodedJWT.getSubject();
    }

    // 💡 Opcional: Extraer el rol si lo necesitas directamente en el filtro
    public String extractRole(String token) {
        DecodedJWT decodedJWT = JWT.require(algorithm)
                .build()
                .verify(token);
        return decodedJWT.getClaim("role").asString();
    }

    // ... otros métodos de validación
}
