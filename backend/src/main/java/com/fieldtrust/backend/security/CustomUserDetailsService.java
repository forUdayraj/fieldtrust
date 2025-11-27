package com.fieldtrust.backend.security;

import com.fieldtrust.backend.entity.User;
import com.fieldtrust.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import java.util.Collections;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository; // you must have this repo

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User u = userRepository.findByEmail(username);
        if (u == null) throw new UsernameNotFoundException("User not found");
        return new org.springframework.security.core.userdetails.User(
                u.getEmail(),
                u.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + u.getRole().toUpperCase()))
        );
    }
}
