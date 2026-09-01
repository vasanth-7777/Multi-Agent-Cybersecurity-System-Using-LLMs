package com.example.demo.Repos;

import java.time.LocalDateTime;
import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entites.Employee;
import com.example.demo.Entites.NetworkEvent;

public interface NetworkEventRepository extends JpaRepository<NetworkEvent, Long> {

	List<NetworkEvent> findByEmployeeId(Long employeeId);


	List<NetworkEvent> findByEmployeeIdAndTimestampBetween(Long employeeId, LocalDateTime start, LocalDateTime end);
}
