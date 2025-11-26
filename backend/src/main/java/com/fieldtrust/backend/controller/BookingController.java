package com.fieldtrust.backend.controller;

import com.fieldtrust.backend.entity.Booking;
import com.fieldtrust.backend.entity.Provider;
import com.fieldtrust.backend.repository.BookingRepository;
import com.fieldtrust.backend.repository.ProviderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/booking")
@CrossOrigin
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ProviderRepository providerRepository;

    // Auto-assign provider
    @PostMapping("/create")
    public Booking create(@RequestBody Booking b) {

        // Ensure createdAt is set
        if (b.getCreatedAt() == null) {
            b.setCreatedAt(java.time.LocalDateTime.now());
        }

        // Load all providers
        List<Provider> providers = providerRepository.findAll();
        if (providers.isEmpty()) {
            b.setStatus("pending");
            return bookingRepository.save(b);
        }

        // Choose provider with fewest active jobs
        Provider best = providers.stream()
                .min(Comparator.comparingLong(p ->
                        bookingRepository.countByProviderIdAndStatusNot(
                                p.getId(), "completed")))
                .orElse(null);

        if (best != null) {
            b.setProviderId(best.getId());
            b.setStatus("assigned");
        } else {
            b.setStatus("pending");
        }

        return bookingRepository.save(b);
    }

    // Get bookings for customer
    @GetMapping("/customer/{id}")
    public List<Booking> customerBookings(@PathVariable Long id) {
        return bookingRepository.findByCustomerId(id);
    }

    // Get bookings for provider
    @GetMapping("/provider/{id}")
    public List<Booking> providerBookings(@PathVariable Long id) {
        return bookingRepository.findByProviderId(id);
    }

    // Get single booking
    @GetMapping("/{id}")
    public Booking getBooking(@PathVariable Long id) {
        return bookingRepository.findById(id).orElse(null);
    }

    // Update job status
    @PostMapping("/update-status/{id}")
    public Booking updateStatus(
            @PathVariable Long id,
            @RequestParam String status) {

        Booking b = bookingRepository.findById(id).orElse(null);
        if (b != null) {
            b.setStatus(status);
            return bookingRepository.save(b);
        }
        return null;
    }
}
