package com.fieldtrust.backend.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Value("${jwt.expiration-ms}")
    private long jwtExpirationMs;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public String generateToken(String email, String role) {
    // DON'T add ROLE_ prefix here - we'll add it in the filter
    // Remove this code block:
    // if (!role.startsWith("ROLE_")) {
    //     role = "ROLE_" + role;
    // }

    return Jwts.builder()
            .setSubject(email)
            .claim("role", role) // Store as "CUSTOMER", not "ROLE_CUSTOMER"
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs))
            .signWith(getSigningKey(), SignatureAlgorithm.HS256)
            .compact();
}

    public Claims validateAndGetClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException e) {
            return null;
        }
    }

    public String getUsername(String token) {
        Claims c = validateAndGetClaims(token);
        return c != null ? c.getSubject() : null;
    }

    public String getRole(String token) {
        Claims c = validateAndGetClaims(token);
        return c != null ? c.get("role", String.class) : null;
    }
}
