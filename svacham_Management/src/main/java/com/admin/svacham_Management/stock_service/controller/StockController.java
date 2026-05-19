package com.admin.svacham_Management.stock_service.controller;

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

import com.admin.svacham_Management.stock_service.dto.StockRequestDTO;
import com.admin.svacham_Management.stock_service.dto.StockResponseDTO;
import com.admin.svacham_Management.stock_service.dto.StockSummaryDTO;
import com.admin.svacham_Management.stock_service.service.StockService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/stocks")
@Validated
@RequiredArgsConstructor
public class StockController {

    private final StockService service;

    @PostMapping
    public ResponseEntity<StockResponseDTO> create(@Valid @RequestBody StockRequestDTO request) {
        StockResponseDTO created = service.create(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockResponseDTO> update(@PathVariable String id, @Valid @RequestBody StockRequestDTO request) {
        StockResponseDTO updated = service.updateById(id, request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/sorted-by-category")
    public ResponseEntity<List<StockResponseDTO>> getAllSortedByCategory() {
        return ResponseEntity.ok(service.getAllSortedByCategory());
    }

    @GetMapping("/summary")
    public ResponseEntity<StockSummaryDTO> getSummary() {
        return ResponseEntity.ok(service.getSummary());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockResponseDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<StockResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}

