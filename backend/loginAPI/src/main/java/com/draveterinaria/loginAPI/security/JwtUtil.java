package com.draveterinaria.loginAPI.security;

import com.draveterinaria.loginAPI.model.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET = "MiSuperSecretoJWT123"; // mejor usar variable de entorno
    private static final long EXPIRATION = 1000 * 60 * 60 * 24; // 24 horas

    public static String generateToken(User user) {
        return JWT.create()
                .withSubject(user.getEmail())
                .withClaim("role", user.getRole())
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION))
                .sign(Algorithm.HMAC256(SECRET));
    }
}
