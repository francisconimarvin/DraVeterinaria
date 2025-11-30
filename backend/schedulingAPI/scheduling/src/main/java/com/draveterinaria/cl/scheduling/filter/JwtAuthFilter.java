package com.draveterinaria.cl.scheduling.filter;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import com.draveterinaria.cl.scheduling.service.JwtService;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    // Necesario para cargar los detalles del usuario (roles, etc.)
    private final UserDetailsService userDetailsService;

    public JwtAuthFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;

        // 1. Verificar si hay un token
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        jwt = authHeader.substring(7);

        try {
            // 2. Extraer username y validar el token
            username = jwtService.extractUsername(jwt);
        } catch (Exception e) {
            // Token inválido (firma, expiración, etc.)
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid Token");
            return;
        }

        // 3. Si el usuario existe y no está ya autenticado
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // Cargar los detalles del usuario (asumiendo que tienes un UserDetailsService)
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

            // Aquí se asume que tu JwtService tiene un método para verificar la validez del token
            // Si la extracción fue exitosa, el token es válido en términos de firma y expiración.

            // 4. Crear el objeto de autenticación
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities() // Asignar roles/autoridades
            );
            authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request)
            );

            // 5. Establecer en el contexto de seguridad
            SecurityContextHolder.getContext().setAuthentication(authToken);
        }
        filterChain.doFilter(request, response);
    }
}
