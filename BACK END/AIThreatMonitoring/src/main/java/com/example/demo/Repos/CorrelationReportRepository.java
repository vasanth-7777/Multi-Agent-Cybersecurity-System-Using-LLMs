package com.example.demo.Repos;

import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entites.CorrelationReport;

public interface CorrelationReportRepository extends JpaRepository<CorrelationReport, Long> {

	List<CorrelationReport> findByEmployeeEmail(String employeeEmail);

}
