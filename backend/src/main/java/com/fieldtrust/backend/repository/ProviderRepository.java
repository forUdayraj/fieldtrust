package com.fieldtrust.backend.repository;

import com.fieldtrust.backend.entity.Provider;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProviderRepository extends JpaRepository<Provider, Long> {
    Provider findByEmail(String email);
}
