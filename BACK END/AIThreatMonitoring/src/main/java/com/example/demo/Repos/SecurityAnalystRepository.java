package com.example.demo.Repos;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entites.SecurityAnalyst;

public interface SecurityAnalystRepository extends JpaRepository<SecurityAnalyst, Long> {

	boolean existsByEmail(String email);

	Optional<SecurityAnalyst> findByEmail(String email);

}
