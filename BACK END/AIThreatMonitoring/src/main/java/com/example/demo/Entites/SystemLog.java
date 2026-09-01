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
@Table(name = "system_logs")
public class SystemLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Log fields
    @Column(nullable = false)
    private String logType;  // LOGIN, ERROR, FILE_ACCESS, etc.

    @Column(columnDefinition = "TEXT")
    private String logMessage;

    @Column
    private LocalDateTime timestamp = LocalDateTime.now();

    // LLM Threat Analysis
    @Column
    private boolean isSuspicious;

    @Column(columnDefinition = "TEXT")
    private String analysisExplanation;

    @Column
    private double anomalyScore; // 0–100 score

    // Relationship with Employee
    @ManyToOne
    @JoinColumn(name = "employee_id")
    @JsonBackReference
    private Employee employee;

    public SystemLog() {}

    public SystemLog(String logType, String logMessage, Employee employee) {
        this.logType = logType;
        this.logMessage = logMessage;
        this.employee = employee;
    }

    // Getters & Setters
    
    public Long getId() {
        return id;
    }

    public String getLogType() {
        return logType;
    }

    public void setLogType(String logType) {
        this.logType = logType;
    }

    public String getLogMessage() {
        return logMessage;
    }

    public void setLogMessage(String logMessage) {
        this.logMessage = logMessage;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public boolean isSuspicious() {
        return isSuspicious;
    }

    public void setSuspicious(boolean suspicious) {
        isSuspicious = suspicious;
    }

    public String getAnalysisExplanation() {
        return analysisExplanation;
    }

    public void setAnalysisExplanation(String analysisExplanation) {
        this.analysisExplanation = analysisExplanation;
    }

    public double getAnomalyScore() {
        return anomalyScore;
    }

    public void setAnomalyScore(double anomalyScore) {
        this.anomalyScore = anomalyScore;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
}

