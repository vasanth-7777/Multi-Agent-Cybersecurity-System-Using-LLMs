package com.example.demo.Controllers;

import com.example.demo.Entites.AttackEmail;
import com.example.demo.Entites.NetworkEvent;
import com.example.demo.Entites.SystemLog;
import com.example.demo.Repos.AttackEmailRepository;
import com.example.demo.Repos.NetworkEventRepository;
import com.example.demo.Repos.SystemLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AttackEmailRepository attackEmailRepository;

    @Autowired
    private SystemLogRepository systemLogRepository;

    @Autowired
    private NetworkEventRepository networkEventRepository;

    /**
     * Get overall analytics for all employees
     */
    @GetMapping("/overview")
    public ResponseEntity<?> getOverallAnalytics() {
        Map<String, Object> analytics = new HashMap<>();

        // Emails
        List<AttackEmail> emails = attackEmailRepository.findAll();
        long phishingEmails = emails.stream().filter(AttackEmail::isPhishing).count();
        double avgEmailScore = emails.stream().mapToDouble(AttackEmail::getThreatScore).average().orElse(0);

        analytics.put("emails", Map.of(
                "totalEmails", emails.size(),
                "phishingEmails", phishingEmails,
                "averageThreatScore", avgEmailScore
        ));

        // Logs
        List<SystemLog> logs = systemLogRepository.findAll();
        long suspiciousLogs = logs.stream().filter(SystemLog::isSuspicious).count();
        double avgLogScore = logs.stream().mapToDouble(SystemLog::getAnomalyScore).average().orElse(0);

        analytics.put("logs", Map.of(
                "totalLogs", logs.size(),
                "suspiciousLogs", suspiciousLogs,
                "averageAnomalyScore", avgLogScore
        ));

        // Network Events
        List<NetworkEvent> events = networkEventRepository.findAll();
        long maliciousEvents = events.stream().filter(NetworkEvent::isMalicious).count();
        double avgEventScore = events.stream().mapToDouble(NetworkEvent::getThreatScore).average().orElse(0);

        analytics.put("networkEvents", Map.of(
                "totalEvents", events.size(),
                "maliciousEvents", maliciousEvents,
                "averageThreatScore", avgEventScore
        ));

        return ResponseEntity.ok(analytics);
    }

    /**
     * Get analytics grouped by employee
     */
    @GetMapping("/by-employee")
    public ResponseEntity<?> getAnalyticsByEmployee() {
        Map<String, Map<String, Object>> result = new HashMap<>();

        // Emails grouped by employee
        Map<String, List<AttackEmail>> emailsByEmp = attackEmailRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(e -> e.getEmployee().getEmail()));

        emailsByEmp.forEach((email, emailList) -> {
            long phishingCount = emailList.stream().filter(AttackEmail::isPhishing).count();
            double avgScore = emailList.stream().mapToDouble(AttackEmail::getThreatScore).average().orElse(0);
            result.computeIfAbsent(email, k -> new HashMap<>()).put("emails", Map.of(
                    "totalEmails", emailList.size(),
                    "phishingEmails", phishingCount,
                    "averageThreatScore", avgScore
            ));
        });

        // Logs grouped by employee
        Map<String, List<SystemLog>> logsByEmp = systemLogRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(l -> l.getEmployee().getEmail()));

        logsByEmp.forEach((email, logList) -> {
            long suspiciousCount = logList.stream().filter(SystemLog::isSuspicious).count();
            double avgScore = logList.stream().mapToDouble(SystemLog::getAnomalyScore).average().orElse(0);
            result.computeIfAbsent(email, k -> new HashMap<>()).put("logs", Map.of(
                    "totalLogs", logList.size(),
                    "suspiciousLogs", suspiciousCount,
                    "averageAnomalyScore", avgScore
            ));
        });

        // Network events grouped by employee
        Map<String, List<NetworkEvent>> eventsByEmp = networkEventRepository.findAll()
                .stream()
                .collect(Collectors.groupingBy(e -> e.getEmployee().getEmail()));

        eventsByEmp.forEach((email, eventList) -> {
            long maliciousCount = eventList.stream().filter(NetworkEvent::isMalicious).count();
            double avgScore = eventList.stream().mapToDouble(NetworkEvent::getThreatScore).average().orElse(0);
            result.computeIfAbsent(email, k -> new HashMap<>()).put("networkEvents", Map.of(
                    "totalEvents", eventList.size(),
                    "maliciousEvents", maliciousCount,
                    "averageThreatScore", avgScore
            ));
        });

        return ResponseEntity.ok(result);
    }

    /**
     * Get top N risky employees based on combined threat/anomaly scores
     */
    @GetMapping("/top-risk")
    public ResponseEntity<?> getTopRiskyEmployees(@RequestParam(defaultValue = "5") int topN) {
        Map<String, Double> riskScores = new HashMap<>();

        Set<String> employees = new HashSet<>();
        attackEmailRepository.findAll().forEach(e -> employees.add(e.getEmployee().getEmail()));
        systemLogRepository.findAll().forEach(l -> employees.add(l.getEmployee().getEmail()));
        networkEventRepository.findAll().forEach(ne -> employees.add(ne.getEmployee().getEmail()));

        for (String email : employees) {
            double emailScore = attackEmailRepository.findAll().stream()
                    .filter(e -> e.getEmployee().getEmail().equals(email))
                    .mapToDouble(AttackEmail::getThreatScore).average().orElse(0);

            double logScore = systemLogRepository.findAll().stream()
                    .filter(l -> l.getEmployee().getEmail().equals(email))
                    .mapToDouble(SystemLog::getAnomalyScore).average().orElse(0);

            double eventScore = networkEventRepository.findAll().stream()
                    .filter(ne -> ne.getEmployee().getEmail().equals(email))
                    .mapToDouble(NetworkEvent::getThreatScore).average().orElse(0);

            double combinedScore = emailScore * 0.4 + logScore * 0.3 + eventScore * 0.3;
            riskScores.put(email, combinedScore);
        }

        // Sort by descending score
        List<Map.Entry<String, Double>> sorted = riskScores.entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .limit(topN)
                .toList();

        return ResponseEntity.ok(sorted);
    }
}
