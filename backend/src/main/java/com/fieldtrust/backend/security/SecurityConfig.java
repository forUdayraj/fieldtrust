package com.fieldtrust.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public DaoAuthenticationProvider authProvider() {
        DaoAuthenticationProvider p = new DaoAuthenticationProvider();
        p.setUserDetailsService(userDetailsService);
        p.setPasswordEncoder(passwordEncoder());
        return p;
    }

   @Bean
public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

    http
        .csrf().disable()
        .cors().and()

        .authorizeHttpRequests()

        // Allow preflight CORS
        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

        // Public
        .requestMatchers("/auth/**", "/files/**", "/proof/**").permitAll()

        // Role based - using hasAuthority because token has ROLE_ prefix
        .requestMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
        .requestMatchers("/provider/**", "/booking/provider/**").hasAuthority("ROLE_PROVIDER")
        .requestMatchers("/customer/**", "/booking/customer/**", "/booking/create").hasAuthority("ROLE_CUSTOMER")

        .anyRequest().authenticated()
        .and()

        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()

        .authenticationProvider(authProvider())
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
}
}
