package com.fieldtrust.backend.controller;

import com.fieldtrust.backend.entity.Booking;
import com.fieldtrust.backend.entity.Provider;
import com.fieldtrust.backend.repository.BookingRepository;
import com.fieldtrust.backend.repository.ProviderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ProviderRepository providerRepository;

    // Create booking + auto-assign provider
    @PostMapping("/create")
    public Booking create(@RequestBody Booking booking) {

        // set createdAt if missing
        if (booking.getCreatedAt() == null) {
            booking.setCreatedAt(LocalDateTime.now());
        }

        // Step 1: Load providers from providers table
        List<Provider> providers = providerRepository.findAll();

        if (providers.isEmpty()) {
            booking.setStatus("pending");
            return bookingRepository.save(booking);
        }

        // Step 2: Select provider with fewest active jobs
        Provider bestProvider = providers.stream()
                .min(Comparator.comparingLong(p ->
                        bookingRepository.countByProviderIdAndStatusNot(
                                p.getId(),
                                "completed"
                        )
                ))
                .orElse(null);

        // Step 3: Assign provider
        if (bestProvider != null) {
            booking.setProviderId(bestProvider.getId());
            booking.setStatus("assigned");
        } else {
            booking.setStatus("pending");
        }

        return bookingRepository.save(booking);
    }

    // Get bookings for customer
    @GetMapping("/customer/{id}")
    public List<Booking> getCustomerBookings(@PathVariable Long id) {
        return bookingRepository.findByCustomerId(id);
    }

    // Get bookings for provider
    @GetMapping("/provider/{id}")
    public List<Booking> getProviderBookings(@PathVariable Long id) {
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
            @RequestParam String status
    ) {
        Booking booking = bookingRepository.findById(id).orElse(null);

        if (booking != null) {
            booking.setStatus(status);
            return bookingRepository.save(booking);
        }
        return null;
    }
}
