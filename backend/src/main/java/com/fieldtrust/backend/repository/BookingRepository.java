package com.fieldtrust.backend.repository;

import com.fieldtrust.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerId(Long customerId);
    List<Booking> findByProviderId(Long providerId);

    long countByProviderIdAndStatusNot(Long providerId, String status);
}
