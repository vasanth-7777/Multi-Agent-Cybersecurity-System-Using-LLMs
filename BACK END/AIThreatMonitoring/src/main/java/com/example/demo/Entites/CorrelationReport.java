package com.example.demo.Entites;


import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "correlation_reports")
public class CorrelationReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String employeeEmail;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private double finalScore;

    @Column(length = 2000)  // explanation can be long
    private String details;

    @Lob  // large object, stores JSON or text
    @Column(columnDefinition = "TEXT")
    private String emailsJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String logsJson;

    @Lob
    @Column(columnDefinition = "TEXT")
    private String networkEventsJson;

    private LocalDateTime createdAt;

    public CorrelationReport() {}

    public CorrelationReport(String employeeEmail, LocalDateTime startDate, LocalDateTime endDate,
                             double finalScore, String details,
                             String emailsJson, String logsJson, String networkEventsJson) {
        this.employeeEmail = employeeEmail;
        this.startDate = startDate;
        this.endDate = endDate;
        this.finalScore = finalScore;
        this.details = details;
        this.emailsJson = emailsJson;
        this.logsJson = logsJson;
        this.networkEventsJson = networkEventsJson;
        this.createdAt = LocalDateTime.now();
    }

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmployeeEmail() {
		return employeeEmail;
	}

	public void setEmployeeEmail(String employeeEmail) {
		this.employeeEmail = employeeEmail;
	}

	public LocalDateTime getStartDate() {
		return startDate;
	}

	public void setStartDate(LocalDateTime startDate) {
		this.startDate = startDate;
	}

	public LocalDateTime getEndDate() {
		return endDate;
	}

	public void setEndDate(LocalDateTime endDate) {
		this.endDate = endDate;
	}

	public double getFinalScore() {
		return finalScore;
	}

	public void setFinalScore(double finalScore) {
		this.finalScore = finalScore;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public String getEmailsJson() {
		return emailsJson;
	}

	public void setEmailsJson(String emailsJson) {
		this.emailsJson = emailsJson;
	}

	public String getLogsJson() {
		return logsJson;
	}

	public void setLogsJson(String logsJson) {
		this.logsJson = logsJson;
	}

	public String getNetworkEventsJson() {
		return networkEventsJson;
	}

	public void setNetworkEventsJson(String networkEventsJson) {
		this.networkEventsJson = networkEventsJson;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

    
}

