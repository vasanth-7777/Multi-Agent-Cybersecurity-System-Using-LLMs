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
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Basic Employee Details
    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column
    private String department;

    @Column
    private String role = "EMPLOYEE";  // default role

    @Column
    private Boolean isBlocked = false;


    // Relationship with Attack Emails
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<AttackEmail> attackEmails;

    // Relationship with Logs
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<SystemLog> logs;

    // Relationship with ThreatAlerts
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL)
    @JsonManagedReference("employee-threats")
    private List<ThreatAlert> threatAlerts;



    // Constructors
    public Employee() {}


	public Employee(Long id, String name, String email, String password, String department, String role,
			Boolean isBlocked, List<AttackEmail> attackEmails, List<SystemLog> logs, List<ThreatAlert> threatAlerts) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.department = department;
		this.role = "EMPLOYEE";
		this.isBlocked = isBlocked;
		this.attackEmails = attackEmails;
		this.logs = logs;
		this.threatAlerts = threatAlerts;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
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


	public void setRole(String role) {
		this.role = role;
	}


	public Boolean isBlocked() {
		return isBlocked;
	}


	public void setBlocked(Boolean isBlocked) {
		this.isBlocked = isBlocked;
	}


	public List<AttackEmail> getAttackEmails() {
		return attackEmails;
	}


	public void setAttackEmails(List<AttackEmail> attackEmails) {
		this.attackEmails = attackEmails;
	}


	public List<SystemLog> getLogs() {
		return logs;
	}


	public void setLogs(List<SystemLog> logs) {
		this.logs = logs;
	}


	public List<ThreatAlert> getThreatAlerts() {
		return threatAlerts;
	}


	public void setThreatAlerts(List<ThreatAlert> threatAlerts) {
		this.threatAlerts = threatAlerts;
	}

   
}

