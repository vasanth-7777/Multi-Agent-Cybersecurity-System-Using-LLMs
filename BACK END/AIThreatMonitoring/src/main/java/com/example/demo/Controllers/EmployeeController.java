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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Entites.AttackEmail;
import com.example.demo.Entites.Employee;
import com.example.demo.Entites.SystemLog;
import com.example.demo.Repos.AttackEmailRepository;
import com.example.demo.Repos.EmployeeRepository;
import com.example.demo.Repos.SystemLogRepository;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/emp")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private SystemLogRepository systemLogRepository;

    @Autowired
    private AttackEmailRepository attackEmailRepository;


    // -----------------------------------------------------------
    // 1. REGISTER EMPLOYEE
    // -----------------------------------------------------------
    @PostMapping("/register")
    public ResponseEntity<?> registerEmployee(@RequestBody Employee employee) {

        if (employeeRepository.existsByEmail(employee.getEmail())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Employee already exists with email: " + employee.getEmail());
        }

        Employee saved = employeeRepository.save(employee);

        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }


    // -----------------------------------------------------------
    // 2. CHECK EMPLOYEE EXISTS BY EMAIL
    // -----------------------------------------------------------
    @GetMapping("/exists/{email}")
    public ResponseEntity<?> checkEmployeeExists(@PathVariable String email) {
        boolean exists = employeeRepository.existsByEmail(email);
        return ResponseEntity.ok(exists);
    }


    // -----------------------------------------------------------
    // 3. LOGIN EMPLOYEE
    // -----------------------------------------------------------
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Employee loginRequest) {

        Optional<Employee> emp = employeeRepository.findByEmail(loginRequest.getEmail());

        if (emp.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No account found with email: " + loginRequest.getEmail());
        }

        if (!emp.get().getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Incorrect password!");
        }

        return ResponseEntity.ok(emp.get());
    }


    // -----------------------------------------------------------
    // 4. GET EMPLOYEE DETAILS BY EMAIL
    // -----------------------------------------------------------
    @GetMapping("/getByEmail/{email}")
    public ResponseEntity<?> getEmployeeByEmail(@PathVariable String email) {
        Optional<Employee> emp = employeeRepository.findByEmail(email);

        if (emp.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Employee not found!");
        }

        return ResponseEntity.ok(emp.get());
    }


    // -----------------------------------------------------------
    // 5. GET ALL EMPLOYEES
    // -----------------------------------------------------------
    @GetMapping("/all")
    public ResponseEntity<?> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return ResponseEntity.ok(employees);
    }


    // -----------------------------------------------------------
    // 6. GET ALL ATTACK EMAILS FOR AN EMPLOYEE
    // -----------------------------------------------------------
    @GetMapping("/emails/{email}")
    public ResponseEntity<?> getAttackEmailsByEmployee(@PathVariable String email) {

        Optional<Employee> emp = employeeRepository.findByEmail(email);

        if (emp.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Employee not found!");
        }

        List<AttackEmail> emails = attackEmailRepository.findByEmployee(emp.get());
        return ResponseEntity.ok(emails);
    }


    // -----------------------------------------------------------
    // 7. GET ALL LOGS FOR AN EMPLOYEE
    // -----------------------------------------------------------
    @GetMapping("/logs/{email}")
    public ResponseEntity<?> getSystemLogsByEmployee(@PathVariable String email) {

        Optional<Employee> emp = employeeRepository.findByEmail(email);

        if (emp.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Employee not found!");
        }

        List<SystemLog> logs = systemLogRepository.findByEmployee(emp.get());
        return ResponseEntity.ok(logs);
    }

}

