package com.example.demo.Repos;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.Entites.AttackEmail;
import com.example.demo.Entites.Employee;

public interface AttackEmailRepository extends JpaRepository<AttackEmail, Long> {

	List<AttackEmail> findByEmployee(Employee employee);

	List<AttackEmail> findByEmployeeId(Long employeeId);

	List<AttackEmail> findByEmployeeIdAndReceivedAtBetween(Long employeeId, LocalDateTime start, LocalDateTime end);
}
