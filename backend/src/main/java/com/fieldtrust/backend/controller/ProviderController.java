package com.fieldtrust.backend.controller;

import com.fieldtrust.backend.entity.Provider;
import com.fieldtrust.backend.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/provider")
@CrossOrigin
public class ProviderController {

    @Autowired
    private ProviderRepository providerRepository;

    @PostMapping("/create")
    public Provider create(@RequestBody Provider p) {
        return providerRepository.save(p);
    }

    @GetMapping("/all")
    public List<Provider> list() {
        return providerRepository.findAll();
    }
}
