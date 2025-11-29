package com.draveterinaria.cl.scheduling.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET_KEY = "clave-secreta-segura-para-firmar-el-token";
    private static final long EXPIRATION_TIME = 3600_000; // 1 hora en milisegundos

    private final Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);

    public String generateToken(String username) {
        return JWT.create()
                .withSubject(username)
                .withIssuer("scheduling")
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(algorithm);
    }

    public String extractUsername(String token) {
        DecodedJWT decodedJWT = JWT.require(algorithm)
                .withIssuer("scheduling")
                .build()
                .verify(token);
        return decodedJWT.getSubject();
    }
}

