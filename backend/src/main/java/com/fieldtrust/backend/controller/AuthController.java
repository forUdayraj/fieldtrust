package com.fieldtrust.backend.controller;

import com.fieldtrust.backend.entity.User;
import com.fieldtrust.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User req) {
        return userRepository.save(req);
    }

    @PostMapping("/login")
    public User login(@RequestBody User req) {
        User user = userRepository.findByEmail(req.getEmail());
        if (user != null && user.getPassword().equals(req.getPassword())) {
            return user;  // temporary (later: return JWT)
        }
        return null;
    }
}
