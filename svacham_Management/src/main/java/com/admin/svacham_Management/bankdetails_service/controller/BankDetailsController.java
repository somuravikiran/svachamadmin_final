package com.admin.svacham_Management.bankdetails_service.controller;

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

import com.admin.svacham_Management.bankdetails_service.dto.BankDetailsRequestDTO;
import com.admin.svacham_Management.bankdetails_service.dto.BankDetailsResponseDTO;
import com.admin.svacham_Management.bankdetails_service.dto.BankDetailsSummaryDTO;
import com.admin.svacham_Management.bankdetails_service.service.BankDetailsService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/bank-details")
@Validated
@RequiredArgsConstructor
public class BankDetailsController {

    private final BankDetailsService service;

    @PostMapping
    public ResponseEntity<BankDetailsResponseDTO> create(@Valid @RequestBody BankDetailsRequestDTO request) {
        BankDetailsResponseDTO created = service.create(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<BankDetailsResponseDTO> update(@PathVariable String id, @Valid @RequestBody BankDetailsRequestDTO request) {
        BankDetailsResponseDTO updated = service.updateById(id, request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/sorted-by-bank")
    public ResponseEntity<List<BankDetailsResponseDTO>> getAllSortedByBank() {
        return ResponseEntity.ok(service.getAllSortedByBankName());
    }

    @GetMapping("/summary")
    public ResponseEntity<BankDetailsSummaryDTO> getSummary() {
        return ResponseEntity.ok(service.getSummary());
    }

    @GetMapping("/{id}")
    public ResponseEntity<BankDetailsResponseDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<BankDetailsResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}

