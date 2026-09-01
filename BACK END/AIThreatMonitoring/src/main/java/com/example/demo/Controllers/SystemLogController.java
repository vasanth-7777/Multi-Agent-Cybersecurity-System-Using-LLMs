package com.example.demo.Controllers;

import java.util.List;
import java.util.Optional;

import com.example.demo.Entites.Employee;
import com.example.demo.Entites.SystemLog;
import com.example.demo.Repos.EmployeeRepository;
import com.example.demo.Repos.SystemLogRepository;
import com.example.demo.Repos.GroqService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/attackLogs")
public class SystemLogController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private SystemLogRepository systemLogRepository;

    @Autowired
    private GroqService groqService;

    // -------------------------------------------------------
    // 1️⃣ Attacker generates a malicious system log for employee
    // Analyze immediately using LLM
    // -------------------------------------------------------
    @PostMapping("/create")
    public ResponseEntity<?> createLog(
            @RequestParam Long employeeId,
            @RequestParam String logType,
            @RequestParam String logMessage
    ) {
        Employee emp = employeeRepository.findById(employeeId).orElse(null);

        if (emp == null) {
            return ResponseEntity.status(404).body("Employee not found");
        }

        SystemLog log = new SystemLog(logType, logMessage, emp);

        // Analyze immediately using LLM
        String llmRawResponse = groqService.analyzeNetworkEventLog(log); // new method to implement
        log.setAnalysisExplanation(llmRawResponse);

        // Extract JSON from LLM response
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(llmRawResponse);
            String content = root
                    .path("choices").get(0)
                    .path("message")
                    .path("content")
                    .asText();

            content = content.replace("```json", "").replace("```", "").trim();
            JsonNode result = mapper.readTree(content);

            boolean suspicious = result.path("suspicious").asBoolean();
            double score = result.path("score").asDouble();
            String explanation = result.path("explanation").asText();

            log.setSuspicious(suspicious);
            log.setAnomalyScore(score);
            log.setAnalysisExplanation(explanation);

        } catch (Exception e) {
            log.setAnalysisExplanation("LLM parsing failed: " + e.getMessage());
        }

        systemLogRepository.save(log);

        return ResponseEntity.ok(log);
    }

    // -------------------------------------------------------
    // 2️⃣ Fetch all logs for a specific employee
    // -------------------------------------------------------
    @GetMapping("/employee/{employeeEmail}")
    public ResponseEntity<?> getLogsForEmployee(@PathVariable String employeeEmail) {

        Optional<Employee> empOpt = employeeRepository.findByEmail(employeeEmail);
        if (empOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Employee not found");
        }

        List<SystemLog> logs = systemLogRepository.findByEmployeeId(empOpt.get().getId());
        return ResponseEntity.ok(logs);
    }

    // -------------------------------------------------------
    // 3️⃣ Fetch a single log entry
    // -------------------------------------------------------
    @GetMapping("/{logId}")
    public ResponseEntity<?> getLogById(@PathVariable Long logId) {

        Optional<SystemLog> logOpt = systemLogRepository.findById(logId);
        if (logOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Log not found");
        }

        return ResponseEntity.ok(logOpt.get());
    }

    // -------------------------------------------------------
    // 4️⃣ Analyze a log using LLM manually (optional)
    // -------------------------------------------------------
    @PostMapping("/analyze/{logId}")
    public ResponseEntity<?> analyzeLog(@PathVariable Long logId) {

        Optional<SystemLog> logOpt = systemLogRepository.findById(logId);
        if (logOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Log not found");
        }

        SystemLog log = logOpt.get();

        String llmRawResponse = groqService.analyzeNetworkEventLog(log);
        log.setAnalysisExplanation(llmRawResponse);

        // Parse JSON response
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode root = mapper.readTree(llmRawResponse);
            String content = root
                    .path("choices").get(0)
                    .path("message")
                    .path("content")
                    .asText();

            content = content.replace("```json", "").replace("```", "").trim();
            JsonNode result = mapper.readTree(content);

            boolean suspicious = result.path("suspicious").asBoolean();
            double score = result.path("score").asDouble();
            String explanation = result.path("explanation").asText();

            log.setSuspicious(suspicious);
            log.setAnomalyScore(score);
            log.setAnalysisExplanation(explanation);

        } catch (Exception e) {
            log.setAnalysisExplanation("LLM parsing failed: " + e.getMessage());
        }

        systemLogRepository.save(log);
        return ResponseEntity.ok(log);
    }

    // -------------------------------------------------------
    // 5️⃣ Analyst view — fetch ALL system logs
    // -------------------------------------------------------
    @GetMapping("/all")
    public ResponseEntity<?> getAllLogs() {
        return ResponseEntity.ok(systemLogRepository.findAll());
    }

}
