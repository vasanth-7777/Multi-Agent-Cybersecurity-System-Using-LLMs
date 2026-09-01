package com.example.demo.Controllers;



import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entites.SecurityAnalyst;
import com.example.demo.Entites.ThreatAlert;
import com.example.demo.Repos.SecurityAnalystRepository;
import com.example.demo.Repos.ThreatAlertRepositroy;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/analyst")
public class SecurityAnalystController {

    @Autowired
    private SecurityAnalystRepository securityAnalystRepository;

    @Autowired
    private ThreatAlertRepositroy threatAlertRepositroy;

    // -----------------------------------------------------------
    // 1. REGISTER ANALYST
    // -----------------------------------------------------------
    @PostMapping("/register")
    public ResponseEntity<?> registerAnalyst(@RequestBody SecurityAnalyst analyst) {

        if (securityAnalystRepository.existsByEmail(analyst.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Analyst already exists with email: " + analyst.getEmail());
        }

        SecurityAnalyst saved = securityAnalystRepository.save(analyst);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // -----------------------------------------------------------
    // 2. CHECK ANALYST EXISTS BY EMAIL
    // -----------------------------------------------------------
    @GetMapping("/exists/{email}")
    public ResponseEntity<?> checkAnalystExists(@PathVariable String email) {
        boolean exists = securityAnalystRepository.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }

    // -----------------------------------------------------------
    // 3. LOGIN ANALYST
    // -----------------------------------------------------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody SecurityAnalyst loginRequest) {

        Optional<SecurityAnalyst> analyst = securityAnalystRepository.findByEmail(loginRequest.getEmail());

        if (analyst.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No analyst account found with email: " + loginRequest.getEmail());
        }

        if (!analyst.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Incorrect password!");
        }

        return ResponseEntity.ok(analyst.get());
    }

    // -----------------------------------------------------------
    // 4. GET ANALYST DETAILS BY EMAIL
    // -----------------------------------------------------------
    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<?> getAnalystByEmail(@PathVariable String email) {
        Optional<SecurityAnalyst> analyst = securityAnalystRepository.findByEmail(email);

        if (analyst.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Analyst not found!");
        }

        return ResponseEntity.ok(analyst.get());
    }

    // -----------------------------------------------------------
    // 5. GET ALL ANALYSTS
    // -----------------------------------------------------------
    @GetMapping("/all")
    public ResponseEntity<?> getAllAnalysts() {
        List<SecurityAnalyst> analysts = securityAnalystRepository.findAll();
        return ResponseEntity.ok(analysts);
    }

    // -----------------------------------------------------------
    // 6. GET ALL ALERTS ASSIGNED TO ANALYST
    // -----------------------------------------------------------
    @GetMapping("/alerts/{email}")
    public ResponseEntity<?> getAlertsByAnalyst(@PathVariable String email) {
        Optional<SecurityAnalyst> analyst = securityAnalystRepository.findByEmail(email);

        if (analyst.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Analyst not found!");
        }

        List<ThreatAlert> alerts = threatAlertRepositroy.findByAnalyst(analyst.get());
        return ResponseEntity.ok(alerts);
    }

    // -----------------------------------------------------------
    // 7. RESOLVE ALERT
    // -----------------------------------------------------------
    @PutMapping("/resolveAlert/{alertId}")
    public ResponseEntity<?> resolveAlert(@PathVariable Long alertId) {
        Optional<ThreatAlert> alertOpt = threatAlertRepositroy.findById(alertId);

        if (alertOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Alert not found!");
        }

        ThreatAlert alert = alertOpt.get();
        alert.setResolved(true);
        threatAlertRepositroy.save(alert);

        return ResponseEntity.ok("Alert resolved successfully");
    }
}

