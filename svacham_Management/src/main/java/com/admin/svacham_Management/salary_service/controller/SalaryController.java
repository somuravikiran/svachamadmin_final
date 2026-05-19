package com.admin.svacham_Management.salary_service.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.admin.svacham_Management.salary_service.dto.SalaryRequestDTO;
import com.admin.svacham_Management.salary_service.dto.SalaryResponseDTO;
import com.admin.svacham_Management.salary_service.dto.SalarySummaryDTO;
import com.admin.svacham_Management.salary_service.service.SalaryService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/salaries")
@Validated
@RequiredArgsConstructor
public class SalaryController {

    private final SalaryService service;

    @PostMapping
    public ResponseEntity<SalaryResponseDTO> create(@Valid @RequestBody SalaryRequestDTO request) {
        SalaryResponseDTO created = service.create(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<SalaryResponseDTO> update(@PathVariable String id, @Valid @RequestBody SalaryRequestDTO request) {
        SalaryResponseDTO updated = service.updateById(id, request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/sorted-by-role")
    public ResponseEntity<List<SalaryResponseDTO>> getAllSortedByRole() {
        return ResponseEntity.ok(service.getAllSortedByRole());
    }

    @GetMapping("/summary")
    public ResponseEntity<SalarySummaryDTO> getSummary() {
        return ResponseEntity.ok(service.getSummary());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SalaryResponseDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SalaryResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}

