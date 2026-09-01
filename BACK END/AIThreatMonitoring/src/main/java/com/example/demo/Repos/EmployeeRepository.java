package com.example.demo.Repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entites.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {

	boolean existsByEmail(String email);

	Optional<Employee> findByEmail(String email);

}
