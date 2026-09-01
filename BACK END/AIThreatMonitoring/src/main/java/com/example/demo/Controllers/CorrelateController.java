package com.example.demo.Controllers;

import com.example.demo.Entites.CorrelationReport;
import com.example.demo.Repos.CorrelationReportRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/correlate")
public class CorrelateController {

    @Autowired
    private CorrelationService correlationService;
    
    @Autowired
    
    private CorrelationReportRepository correlationReportRepository;

    @GetMapping("/report")
    public ResponseEntity<?> getCorrelationReport(
            @RequestParam String employeeEmail,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate
    ) {
        try {
            CorrelationReport report = correlationService.correlateEvents(employeeEmail, startDate, endDate);
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error generating correlation report: " + e.getMessage());
        }
    }
    
    @GetMapping("/getEMployeeAlerts/{employeeEmail}")
    public ResponseEntity<List<CorrelationReport>> getAlerts(@PathVariable String employeeEmail) {
        return ResponseEntity.ok(correlationReportRepository.findByEmployeeEmail(employeeEmail));
    }
    
}
