package com.fieldtrust.backend.service;

import com.fieldtrust.backend.entity.AuditLog;
import com.fieldtrust.backend.repository.AuditRepository;
import com.fieldtrust.backend.util.HashUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuditService {

    @Autowired
    private AuditRepository auditRepository;

    /**
     * Create an audit entry. It links to the latest overall audit (previousHash).
     */
    public AuditLog createAudit(Long bookingId, String action, String performedBy, String ipAddress){
        // find previous overall log to chain
        AuditLog prev = auditRepository.findTopByOrderByIdDesc();
        String prevHash = (prev != null) ? prev.getCurrentHash() : "";

        AuditLog entry = new AuditLog();
        entry.setBookingId(bookingId);
        entry.setAction(action);
        entry.setPerformedBy(performedBy);
        entry.setTimestamp(LocalDateTime.now());
        entry.setPreviousHash(prevHash);
        entry.setIpAddress(ipAddress);
        // build content: previousHash + bookingId + action + performedBy + timestamp
        String toHash = prevHash + "|" + bookingId + "|" + action + "|" + performedBy + "|" + ipAddress + "|" + entry.getTimestamp();
        String currentHash = HashUtil.sha256Hex(toHash);
        entry.setCurrentHash(currentHash);

        return auditRepository.save(entry);
    }
}
