package com.fieldtrust.backend.controller;

import com.fieldtrust.backend.entity.AuditLog;
import com.fieldtrust.backend.repository.AuditRepository;
import com.fieldtrust.backend.util.HashUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/audit")
@CrossOrigin
public class AuditValidatorController {

    @Autowired
    private AuditRepository auditRepository;

    @GetMapping("/validate")
    public String validateChain() {
        List<AuditLog> logs = auditRepository.findAll();

        if (logs == null || logs.isEmpty()) {
            return "No audit logs found.";
        }

        String prevHash = "";

        for (AuditLog log : logs) {

            // Check previousHash match
            if (!log.getPreviousHash().equals(prevHash)) {
                return "❌ Tampering detected at log ID " + log.getId() +
                        " — previousHash mismatch";
            }

            // Recompute the SHA256
            String content = prevHash + "|" + log.getBookingId() + "|" +
                    log.getAction() + "|" + log.getPerformedBy() + "|" +
                    log.getTimestamp();

            String recomputedHash = HashUtil.sha256Hex(content);

            if (!recomputedHash.equals(log.getCurrentHash())) {
                return "❌ Tampering detected at log ID " + log.getId() +
                        " — currentHash mismatch";
            }

            prevHash = log.getCurrentHash();
        }

        return "✔ Chain is valid. No tampering detected.";
    }
}
