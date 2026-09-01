package com.example.demo.Repos;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entites.Employee;
import com.example.demo.Entites.SystemLog;

public interface SystemLogRepository extends JpaRepository<SystemLog, Long> {

	List<SystemLog> findByEmployee(Employee employee);

	List<SystemLog> findByEmployeeId(Long employeeId);


	List<SystemLog> findByEmployeeIdAndTimestampBetween(Long employeeId, LocalDateTime start, LocalDateTime end);
}
