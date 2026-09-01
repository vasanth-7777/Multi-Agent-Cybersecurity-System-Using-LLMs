package com.example.demo.Controllers;


import com.example.demo.Entites.AttackEmail;
import com.example.demo.Entites.CorrelationReport;
import com.example.demo.Entites.Employee;
import com.example.demo.Entites.NetworkEvent;
import com.example.demo.Entites.SystemLog;
import com.example.demo.Repos.AttackEmailRepository;
import com.example.demo.Repos.CorrelationReportRepository;
import com.example.demo.Repos.EmployeeRepository;
import com.example.demo.Repos.NetworkEventRepository;
import com.example.demo.Repos.SystemLogRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CorrelationService {

    @Autowired
    private AttackEmailRepository attackEmailRepository;

    @Autowired
    private NetworkEventRepository networkEventRepository;

    @Autowired
    private SystemLogRepository systemLogRepository;

    @Autowired
    private CorrelationReportRepository correlationReportRepository;
    
    @Autowired
    
    private EmployeeRepository employeeRepository;

    @Autowired
    private ObjectMapper objectMapper;

    // Example simple correlation method
    public CorrelationReport correlateEvents(String employeeEmail, LocalDateTime start, LocalDateTime end) throws Exception {

        // 1. Fetch all relevant data for employee and date range
    	
    	Optional<Employee> emp = employeeRepository.findByEmail(employeeEmail);
    	
    	List<AttackEmail> emails = attackEmailRepository
    		    .findByEmployeeIdAndReceivedAtBetween(emp.get().getId(), start, end);

    		List<SystemLog> logs = systemLogRepository
    		    .findByEmployeeIdAndTimestampBetween(emp.get().getId(), start, end);

    		List<NetworkEvent> events = networkEventRepository
    		    .findByEmployeeIdAndTimestampBetween(emp.get().getId(), start, end);

        
        System.out.println("Emails fetched: " + emails.size());
        System.out.println("Logs fetched: " + logs.size());
        System.out.println("Network events fetched: " + events.size());


        // 2. Calculate final score based on your domain logic (example: average threat score weighted)
        double emailScoreAvg = emails.stream().mapToDouble(AttackEmail::getThreatScore).average().orElse(0);
        double logScoreAvg = logs.stream().mapToDouble(SystemLog::getAnomalyScore).average().orElse(0);
        double eventScoreAvg = events.stream().mapToDouble(NetworkEvent::getThreatScore).average().orElse(0);

        // Weighted final score (example weights, tune as per your logic)
        double finalScore = emailScoreAvg * 0.4 + logScoreAvg * 0.3 + eventScoreAvg * 0.3;

        // 3. Prepare human-readable explanation or JSON details for report
        String details = String.format(
            "Correlation Report for %s from %s to %s\nFinal Risk Score: %.2f\n" +
            "Emails analyzed: %d, Logs analyzed: %d, Network events analyzed: %d",
            employeeEmail, start.toString(), end.toString(), finalScore,
            emails.size(), logs.size(), events.size()
        );

        // 4. Serialize data to JSON strings for storage in report
        String emailsJson = objectMapper.writeValueAsString(emails);
        String logsJson = objectMapper.writeValueAsString(logs);
        String eventsJson = objectMapper.writeValueAsString(events);

        // 5. Create and save CorrelationReport entity
        CorrelationReport report = new CorrelationReport(
                employeeEmail, start, end, finalScore, details,
                emailsJson, logsJson, eventsJson
        );

        return correlationReportRepository.save(report);
    }
}

