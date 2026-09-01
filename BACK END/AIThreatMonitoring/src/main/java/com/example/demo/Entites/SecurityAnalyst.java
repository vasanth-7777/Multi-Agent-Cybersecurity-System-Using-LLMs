package com.example.demo.Entites;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "analysts")
public class SecurityAnalyst {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic Analyst Details
    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String department;

    @Column
    private String role = "ANALYST";  // default role

    @Column
    private boolean isActive = true;

    // Relationship: Analyst reviews multiple alerts
    @OneToMany(mappedBy = "analyst", cascade = CascadeType.ALL)
    @JsonManagedReference("analyst-threats")
    private List<ThreatAlert> reviewedAlerts;


    // Constructors
    public SecurityAnalyst() {}

    public SecurityAnalyst(String name, String email, String password, String department) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.department = department;
        this.role = "ANALYST";
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getRole() {
        return role;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public List<ThreatAlert> getReviewedAlerts() {
        return reviewedAlerts;
    }

    public void setReviewedAlerts(List<ThreatAlert> reviewedAlerts) {
        this.reviewedAlerts = reviewedAlerts;
    }
}
