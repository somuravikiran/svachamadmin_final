package com.admin.svacham_Management.stockitem_service.controller;

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

import com.admin.svacham_Management.stockitem_service.dto.StockItemRequestDTO;
import com.admin.svacham_Management.stockitem_service.dto.StockItemResponseDTO;
import com.admin.svacham_Management.stockitem_service.dto.StockItemSummaryDTO;
import com.admin.svacham_Management.stockitem_service.service.StockItemService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/stock-items")
@Validated
@RequiredArgsConstructor
public class StockItemController {

    private final StockItemService service;

    @PostMapping
    public ResponseEntity<StockItemResponseDTO> create(@Valid @RequestBody StockItemRequestDTO request) {
        StockItemResponseDTO created = service.create(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<StockItemResponseDTO> update(@PathVariable String id, @Valid @RequestBody StockItemRequestDTO request) {
        StockItemResponseDTO updated = service.updateById(id, request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/sorted-by-category")
    public ResponseEntity<List<StockItemResponseDTO>> getAllSortedByCategory() {
        return ResponseEntity.ok(service.getAllSortedByCategory());
    }

    @GetMapping("/summary")
    public ResponseEntity<StockItemSummaryDTO> getSummary() {
        return ResponseEntity.ok(service.getSummary());
    }

    @GetMapping("/{id}")
    public ResponseEntity<StockItemResponseDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<StockItemResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}

