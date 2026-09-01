package com.example.demo.Controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.Entites.AttackEmail;
import com.example.demo.Entites.Employee;
import com.example.demo.Repos.AttackEmailRepository;
import com.example.demo.Repos.EmployeeRepository;
import com.example.demo.Repos.GroqService;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/attackPhishing")
public class AttackEmailController {

    @Autowired
    private AttackEmailRepository attackEmailRepository;

    @Autowired
    private EmployeeRepository employeeRepository;
    

    @Autowired
    private GroqService groqService;


    @PostMapping("/send")
    public ResponseEntity<?> sendPhishingEmail(
            @RequestParam Long employeeId,
            @RequestParam String subject,
            @RequestParam String body,
            @RequestParam String sender
    ) {
        Optional<Employee> empOpt = employeeRepository.findById(employeeId);
        if (empOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Employee not found");
        }

        Employee employee = empOpt.get();
        AttackEmail email = new AttackEmail(subject, body, sender, employee);

        // Save first (to generate ID)
        attackEmailRepository.save(email);

        // ---------------------------
        // 🔥 CALL GROQ LLM
        // ---------------------------
        String llmRawResponse = groqService.analyzeEmail(email);

        // Store raw LLM response (optional but useful)
        email.setLlmExplanation(llmRawResponse);

        ObjectMapper mapper = new ObjectMapper();

        try {
            // Extract "content" field from Groq response
            JsonNode root = mapper.readTree(llmRawResponse);
            String content = root
                    .path("choices").get(0)
                    .path("message")
                    .path("content")
                    .asText();

            // Remove markdown formatting like ```json
            content = content.replace("```json", "")
                             .replace("```", "")
                             .trim();

            // Parse resulting JSON
            JsonNode result = mapper.readTree(content);

            boolean phishing = result.path("phishing").asBoolean();
            double score = result.path("score").asDouble();
            String explanation = result.path("explanation").asText();

            // Update email with structured LLM results
            email.setPhishing(phishing);
            email.setThreatScore(score);
            email.setLlmExplanation(explanation);

        } catch (Exception e) {
            e.printStackTrace();
            email.setLlmExplanation("LLM parsing failed: " + e.getMessage());
        }

        attackEmailRepository.save(email);

        return ResponseEntity.ok(email);
    }



    // 2️⃣ Employee views all received emails (Inbox)
    @GetMapping("/employee/{employeeEmail}/emails")
    public ResponseEntity<?> getEmailsForEmployee(@PathVariable String employeeEmail) {
        Optional<Employee> empOpt = employeeRepository.findByEmail(employeeEmail);
        if (empOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Employee not found");
        }

        List<AttackEmail> emails = attackEmailRepository.findByEmployeeId(empOpt.get().getId());
        return ResponseEntity.ok(emails);
    }


    // 3️⃣ Fetch a single email (Email detail page)
    @GetMapping("/email/{id}")
    public ResponseEntity<?> getEmailById(@PathVariable Long id) {
        Optional<AttackEmail> emailOpt = attackEmailRepository.findById(id);
        if (emailOpt.isEmpty()) {
            return ResponseEntity.status(404).body("Email not found");
        }
        return ResponseEntity.ok(emailOpt.get());
    }


    @GetMapping("/all")
    public ResponseEntity<List<AttackEmail>> getAllEmails() {
        List<AttackEmail> emails = attackEmailRepository.findAll();
        return ResponseEntity.ok(emails);
    }
}
