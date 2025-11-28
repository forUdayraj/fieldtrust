package com.fieldtrust.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
protected void doFilterInternal(HttpServletRequest request,
                                HttpServletResponse response,
                                FilterChain filterChain) throws ServletException, IOException {

    String header = request.getHeader("Authorization");
    
    System.out.println("=== JWT Filter ===");
    System.out.println("Request URI: " + request.getRequestURI());
    System.out.println("Authorization Header: " + header);

    if (header != null && header.startsWith("Bearer ")) {
        String token = header.substring(7);
        
        String username = jwtUtil.getUsername(token);
        String role = jwtUtil.getRole(token);
        
        System.out.println("Username: " + username);
        System.out.println("Role from token: " + role);

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            // Add ROLE_ prefix if not present
            if (role != null && !role.startsWith("ROLE_")) {
                role = "ROLE_" + role;
            }
            
            SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role);
            
            System.out.println("Authority created: " + authority.getAuthority());
            
            UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(
                            username,
                            null,
                            Collections.singletonList(authority)
                    );

            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            System.out.println("Authentication set successfully");
        }
    } else {
        System.out.println("No Bearer token found");
    }

    filterChain.doFilter(request, response);
}
}