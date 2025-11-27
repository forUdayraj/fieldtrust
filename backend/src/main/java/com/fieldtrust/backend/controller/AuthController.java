package com.fieldtrust.backend.controller;

import com.fieldtrust.backend.entity.User;
import com.fieldtrust.backend.entity.Provider;
import com.fieldtrust.backend.repository.UserRepository;
import com.fieldtrust.backend.repository.ProviderRepository;
import com.fieldtrust.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProviderRepository providerRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ================= USER REGISTER =================
    @PostMapping("/register")
    public User register(@RequestBody User req) {
        req.setPassword(passwordEncoder.encode(req.getPassword()));
        req.setRole(req.getRole() == null ? "CUSTOMER" : req.getRole().toUpperCase());
        return userRepository.save(req);
    }

    // ================= PROVIDER REGISTER =================
    @PostMapping("/register-provider")
    public Provider registerProvider(@RequestBody Provider req) {
        req.setPassword(passwordEncoder.encode(req.getPassword()));
        return providerRepository.save(req);
    }

    // ================= LOGIN (User + Provider) =================
    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest req) {
        String email = req.email;
        String password = req.password;

        // 1️⃣ CHECK USER TABLE
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            user.setPassword(null);
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole());
            return new LoginResponse(token, user);
        }

        // 2️⃣ CHECK PROVIDER TABLE
        Provider provider = providerRepository.findByEmail(email);
        if (provider != null && passwordEncoder.matches(password, provider.getPassword())) {
            provider.setPassword(null);
            String token = jwtUtil.generateToken(provider.getEmail(), "PROVIDER");
            return new ProviderLoginResponse(token, provider);
        }

        // 3️⃣ NO USER FOUND
        return null;
    }

    static class LoginRequest {
        public String email;
        public String password;
    }

    static class LoginResponse {
        public String token;
        public User user;

        public LoginResponse(String token, User user) {
            this.token = token;
            this.user = user;
        }
    }

    static class ProviderLoginResponse {
        public String token;
        public Provider provider;

        public ProviderLoginResponse(String token, Provider provider) {
            this.token = token;
            this.provider = provider;
        }
    }
}
