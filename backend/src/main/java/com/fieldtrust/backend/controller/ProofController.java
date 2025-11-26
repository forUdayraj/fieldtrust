package com.fieldtrust.backend.controller;

import com.fieldtrust.backend.entity.Booking;
import com.fieldtrust.backend.repository.BookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/proof")
@CrossOrigin
public class ProofController {

    @Autowired
    private BookingRepository bookingRepository;

    private static final String UPLOAD_DIR = "uploads/";

    @PostMapping("/upload/{bookingId}")
    public Booking uploadProof(
            @PathVariable Long bookingId,
            @RequestParam("file") MultipartFile file
    ) {

        try {
            // Ensure upload dir exists
            File folder = new File(UPLOAD_DIR);
            if (!folder.exists()) folder.mkdirs();

            // File path
            String filename = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path path = Paths.get(UPLOAD_DIR + filename);

            // Save file
            Files.write(path, file.getBytes());

            // Update booking
            Booking b = bookingRepository.findById(bookingId).orElse(null);
            if (b == null) return null;

            b.setProofUrl(filename);
            b.setStatus("proof_uploaded");

            return bookingRepository.save(b);

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
