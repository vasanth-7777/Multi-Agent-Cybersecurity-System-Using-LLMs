package com.example.demo.Controllers;

import com.example.demo.Entites.Employee;
import com.example.demo.Entites.NetworkEvent;
import com.example.demo.Repos.EmployeeRepository;
import com.example.demo.Repos.NetworkEventRepository;
import com.example.demo.Repos.GroqService;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/attackNetworkEvent")
public class NetworkEventController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private NetworkEventRepository networkEventRepository;

    @Autowired
    private GroqService groqService;

    private final ObjectMapper mapper = new ObjectMapper();

    // ---------------------------------------------------------
    // 🔥 Utility: Analyze Event Using Groq LLM
    // ---------------------------------------------------------
    private void analyzeEventLLM(NetworkEvent event) {
        try {
            String llmRaw = groqService.analyzeNetworkEvent(event);
            event.setLlmExplanation(llmRaw);

            JsonNode root = mapper.readTree(llmRaw);
            String content = root.path("choices").get(0)
                    .path("message").path("content").asText();

            content = content.replace("```json", "").replace("```", "").trim();

            JsonNode result = mapper.readTree(content);

            event.setMalicious(result.path("malicious").asBoolean());
            event.setThreatScore(result.path("score").asDouble());
            event.setLlmExplanation(result.path("explanation").asText());

        } catch (Exception e) {
            e.printStackTrace();
            event.setLlmExplanation("LLM parsing failed: " + e.getMessage());
            event.setMalicious(false);
            event.setThreatScore(0);
        }
    }

    // ---------------------------------------------------------
    // 1️⃣ SINGLE NETWORK ATTACK WITH LLM ANALYSIS
    // ---------------------------------------------------------
    @PostMapping("/attack/{employeeId}")
    public ResponseEntity<?> simulateNetworkAttack(
            @PathVariable Long employeeId,
            @RequestBody Map<String, Object> requestBody
    ) {

        Optional<Employee> empOpt = employeeRepository.findById(employeeId);
        if (empOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Employee not found");
        }

        Employee employee = empOpt.get();

        NetworkEvent event = new NetworkEvent();
        event.setSourceIp((String) requestBody.get("sourceIp"));
        event.setDestinationIp((String) requestBody.get("destinationIp"));
        event.setPort((Integer) requestBody.get("port"));
        event.setProtocol((String) requestBody.get("protocol"));
        event.setEmployee(employee);

        // save first to generate ID
        networkEventRepository.save(event);

        // 🔥 LLM analysis
        analyzeEventLLM(event);

        networkEventRepository.save(event);

        return ResponseEntity.ok(event);
    }

    // ---------------------------------------------------------
    // 2️⃣ PORT SCAN ATTACK (Multiple Events + LLM)
    // ---------------------------------------------------------
    @PostMapping("/port-scan/{employeeId}")
    public ResponseEntity<?> simulatePortScan(
            @PathVariable Long employeeId,
            @RequestBody Map<String, Object> requestBody
    ) {

        Optional<Employee> empOpt = employeeRepository.findById(employeeId);
        if (empOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Employee not found");
        }

        Employee employee = empOpt.get();

        String src = (String) requestBody.get("sourceIp");
        String dst = (String) requestBody.get("destinationIp");

        List<Integer> ports = Arrays.asList(21, 22, 80, 443, 3306, 8080);

        List<NetworkEvent> results = new ArrayList<>();

        for (int port : ports) {
            NetworkEvent event = new NetworkEvent();
            event.setSourceIp(src);
            event.setDestinationIp(dst);
            event.setPort(port);
            event.setProtocol("TCP");
            event.setEmployee(employee);

            networkEventRepository.save(event);

            // 🔥 LLM analysis
            analyzeEventLLM(event);

            networkEventRepository.save(event);
            results.add(event);
        }

        return ResponseEntity.ok(results);
    }

    // ---------------------------------------------------------
    // 3️⃣ MULTI-VECTOR ATTACK (Multiple Events + LLM)
    // ---------------------------------------------------------
    @PostMapping("/multi-vector/{employeeId}")
    public ResponseEntity<?> simulateMultiVectorAttack(
            @PathVariable Long employeeId,
            @RequestBody Map<String, Object> body
    ) {

        Optional<Employee> empOpt = employeeRepository.findById(employeeId);
        if (empOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Employee not found");
        }

        Employee employee = empOpt.get();

        String src = (String) body.get("sourceIp");
        String dst = (String) body.get("destinationIp");

        int[] ports = {22, 80, 443, 3389};
        String[] protocols = {"TCP", "UDP", "ICMP", "TCP"};

        List<NetworkEvent> results = new ArrayList<>();

        for (int i = 0; i < ports.length; i++) {
            NetworkEvent event = new NetworkEvent();
            event.setSourceIp(src);
            event.setDestinationIp(dst);
            event.setPort(ports[i]);
            event.setProtocol(protocols[i]);
            event.setEmployee(employee);

            networkEventRepository.save(event);

            // 🔥 LLM analysis
            analyzeEventLLM(event);

            networkEventRepository.save(event);
            results.add(event);
        }

        return ResponseEntity.ok(results);
    }

    // ---------------------------------------------------------
    // 4️⃣ GET ALL EVENTS
    // ---------------------------------------------------------
    @GetMapping("/all")
    public ResponseEntity<?> getAllEvents() {
        return ResponseEntity.ok(networkEventRepository.findAll());
    }

    // ---------------------------------------------------------
    // 5️⃣ GET EVENTS FOR EMPLOYEE
    // ---------------------------------------------------------
    @GetMapping("/employee/{email}")
    public ResponseEntity<?> getEventsByEmployee(@PathVariable String email) {

        Optional<Employee> empOpt = employeeRepository.findByEmail(email);
        if (empOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Employee not found");
        }

        return ResponseEntity.ok(networkEventRepository.findByEmployeeId(empOpt.get().getId()));
    }

    // ---------------------------------------------------------
    // 6️⃣ SINGLE EVENT
    // ---------------------------------------------------------
    @GetMapping("/{id}")
    public ResponseEntity<?> getEventById(@PathVariable Long id) {
        Optional<NetworkEvent> eventOpt = networkEventRepository.findById(id);
        if (eventOpt.isPresent()) {
            return ResponseEntity.ok(eventOpt.get());
        } else {
            return ResponseEntity.status(404).body("Event not found");
        }
    }

}
