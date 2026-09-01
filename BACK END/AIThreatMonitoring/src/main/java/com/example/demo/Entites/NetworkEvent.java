package com.example.demo.Entites;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "network_events")
public class NetworkEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String sourceIp;

    @Column(nullable = false)
    private String destinationIp;

    private Integer port;

    private String protocol;  // TCP, UDP, ICMP, etc.

    // LLM Analysis
    private boolean isMalicious;

    @Column(columnDefinition = "TEXT")
    private String llmExplanation;

    private double threatScore; // 0–100

    private LocalDateTime timestamp = LocalDateTime.now();

    // Relationship with Employee (optional but recommended)
    @ManyToOne
    @JoinColumn(name = "employee_id")
    @JsonBackReference
    private Employee employee;

    public NetworkEvent() {
		// TODO Auto-generated constructor stub
	}

	public NetworkEvent(Long id, String sourceIp, String destinationIp, Integer port, String protocol,
			boolean isMalicious, String llmExplanation, double threatScore, LocalDateTime timestamp,
			Employee employee) {
		super();
		this.id = id;
		this.sourceIp = sourceIp;
		this.destinationIp = destinationIp;
		this.port = port;
		this.protocol = protocol;
		this.isMalicious = isMalicious;
		this.llmExplanation = llmExplanation;
		this.threatScore = threatScore;
		this.timestamp = timestamp;
		this.employee = employee;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getSourceIp() {
		return sourceIp;
	}

	public void setSourceIp(String sourceIp) {
		this.sourceIp = sourceIp;
	}

	public String getDestinationIp() {
		return destinationIp;
	}

	public void setDestinationIp(String destinationIp) {
		this.destinationIp = destinationIp;
	}

	public Integer getPort() {
		return port;
	}

	public void setPort(Integer port) {
		this.port = port;
	}

	public String getProtocol() {
		return protocol;
	}

	public void setProtocol(String protocol) {
		this.protocol = protocol;
	}

	public boolean isMalicious() {
		return isMalicious;
	}

	public void setMalicious(boolean isMalicious) {
		this.isMalicious = isMalicious;
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

	public LocalDateTime getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDateTime timestamp) {
		this.timestamp = timestamp;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
    
    
}

