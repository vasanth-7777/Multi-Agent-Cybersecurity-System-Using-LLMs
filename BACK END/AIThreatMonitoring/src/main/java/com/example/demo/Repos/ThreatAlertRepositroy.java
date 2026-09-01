package com.example.demo.Repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entites.SecurityAnalyst;
import com.example.demo.Entites.ThreatAlert;

public interface ThreatAlertRepositroy extends JpaRepository<ThreatAlert, Long> {

	List<ThreatAlert> findByAnalyst(SecurityAnalyst securityAnalyst);

}
