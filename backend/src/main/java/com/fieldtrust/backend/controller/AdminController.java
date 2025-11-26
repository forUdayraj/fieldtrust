package com.fieldtrust.backend.controller;

import com.fieldtrust.backend.entity.AuditLog;
import com.fieldtrust.backend.entity.Booking;
import com.fieldtrust.backend.repository.BookingRepository;
import com.fieldtrust.backend.repository.AuditRepository;
import com.fieldtrust.backend.service.AuditService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.*;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private AuditService auditService;

    @Autowired
    private AuditRepository auditRepository;

    private static final String UPLOAD_DIR = "uploads/";

    // List all bookings (admin)
    @GetMapping("/bookings")
    public List<Booking> allBookings() {
        return bookingRepository.findAll();
    }

    // Get proof file by filename
    @GetMapping("/proof-file/{filename:.+}")
    public Resource getProofFile(@PathVariable String filename) throws Exception {
        Path file = Paths.get(UPLOAD_DIR).resolve(filename).normalize();
        Resource resource = new UrlResource(file.toUri());
        if (resource.exists()) {
            return resource;
        } else {
            throw new RuntimeException("File not found " + filename);
        }
    }

    // Approve/Reject proof + log with IP address
    @PostMapping("/verify/{bookingId}")
    public Booking verifyProof(
            @PathVariable Long bookingId,
            @RequestParam("admin") String adminName,
            @RequestParam("action") String action,
            HttpServletRequest request
    ) {

        Booking b = bookingRepository.findById(bookingId).orElse(null);
        if (b == null) return null;

        if ("approved".equalsIgnoreCase(action)) {
            b.setStatus("verified");
        } else {
            b.setStatus("rejected");
        }

        Booking saved = bookingRepository.save(b);

        // Extract IP
        String ip = request.getHeader("X-FORWARDED-FOR");
        if (ip == null) ip = request.getRemoteAddr();

        // Create audit entry with IP
        auditService.createAudit(bookingId, "proof_" + action, adminName, ip);

        return saved;
    }

    // Get audit logs for a specific booking
    @GetMapping("/audit/{bookingId}")
    public List<AuditLog> logsForBooking(@PathVariable Long bookingId) {
        return auditRepository.findByBookingIdOrderByTimestampAsc(bookingId);
    }

    // Get full audit chain
    @GetMapping("/audit/all")
    public List<AuditLog> allLogs() {
        return auditRepository.findAll();
    }
}
