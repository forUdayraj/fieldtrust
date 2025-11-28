package com.fieldtrust.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Task {

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTaskName() {
        return taskName;
    }

    public void setTaskName(String taskName) {
        this.taskName = taskName;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Provider getProvider() {
        return provider;
    }

    public void setProvider(Provider provider) {
        this.provider = provider;
    }

    public User getCustomer() {
        return customer;
    }

    public void setCustomer(User customer) {
        this.customer = customer;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String taskName;
    private String status;

    @ManyToOne
    @JoinColumn(name = "provider_id")   // Foreign key in DB
    private Provider provider;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;

}
