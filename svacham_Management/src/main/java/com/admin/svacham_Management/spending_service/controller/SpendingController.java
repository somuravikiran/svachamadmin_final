package com.admin.svacham_Management.spending_service.controller;

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

import com.admin.svacham_Management.spending_service.dto.SpendingRequestDTO;
import com.admin.svacham_Management.spending_service.dto.SpendingResponseDTO;
import com.admin.svacham_Management.spending_service.dto.SpendingSummaryDTO;
import com.admin.svacham_Management.spending_service.service.SpendingService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/spendings")
@Validated
@RequiredArgsConstructor
public class SpendingController {

    private final SpendingService service;

    @PostMapping
    public ResponseEntity<SpendingResponseDTO> create(@Valid @RequestBody SpendingRequestDTO request) {
        SpendingResponseDTO created = service.create(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<SpendingResponseDTO> update(@PathVariable String id, @Valid @RequestBody SpendingRequestDTO request) {
        SpendingResponseDTO updated = service.updateById(id, request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/sorted-by-category")
    public ResponseEntity<List<SpendingResponseDTO>> getAllSortedByCategory() {
        return ResponseEntity.ok(service.getAllSortedByCategory());
    }

    @GetMapping("/summary")
    public ResponseEntity<SpendingSummaryDTO> getSummary() {
        return ResponseEntity.ok(service.getSummary());
    }

    @GetMapping("/{id}")
    public ResponseEntity<SpendingResponseDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<SpendingResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}

