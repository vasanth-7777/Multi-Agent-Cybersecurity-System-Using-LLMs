package com.example.demo.Entites;


import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "attack_emails")
public class AttackEmail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Email fields
    @Column(nullable = false)
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String body;

    @Column
    private String sender;

    @Column
    private LocalDateTime receivedAt = LocalDateTime.now();

    // LLM Analysis fields
    @Column
    private boolean isPhishing;

    @Column(columnDefinition = "TEXT")
    private String llmExplanation; // why LLM marked as phishing

    @Column
    private double threatScore; // 0–100 rating by LLM

    // Relationship with Employee
    @ManyToOne
    @JoinColumn(name = "employee_id")
    @JsonBackReference
    private Employee employee;

    public AttackEmail() {}

    public AttackEmail(String subject, String body, String sender, Employee employee) {
        this.subject = subject;
        this.body = body;
        this.sender = sender;
        this.employee = employee;
    }

    // Getters & Setters
    
    public Long getId() {
        return id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public LocalDateTime getReceivedAt() {
        return receivedAt;
    }

    public void setReceivedAt(LocalDateTime receivedAt) {
        this.receivedAt = receivedAt;
    }

    public boolean isPhishing() {
        return isPhishing;
    }

    public void setPhishing(boolean phishing) {
        isPhishing = phishing;
    }

    public String getLlmExplanation() {
        return llmExplanation;
    }

    public void setLlmExplanation(String llmExplanation) {
        this.llmExplanation = llmExplanation;
    }

    public double getThreatScore() {
        return threatScore;
    }

    public void setThreatScore(double threatScore) {
        this.threatScore = threatScore;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}

