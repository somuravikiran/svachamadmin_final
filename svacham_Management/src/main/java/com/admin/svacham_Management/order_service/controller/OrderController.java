package com.admin.svacham_Management.order_service.controller;

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

import com.admin.svacham_Management.order_service.dto.OrderRequestDTO;
import com.admin.svacham_Management.order_service.dto.OrderResponseDTO;
import com.admin.svacham_Management.order_service.dto.OrderSummaryDTO;
import com.admin.svacham_Management.order_service.service.OrderService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@Validated
@RequiredArgsConstructor
public class OrderController {

    private final OrderService service;

    @PostMapping
    public ResponseEntity<OrderResponseDTO> create(@Valid @RequestBody OrderRequestDTO request) {
        OrderResponseDTO created = service.create(request);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> update(@PathVariable String id, @Valid @RequestBody OrderRequestDTO request) {
        OrderResponseDTO updated = service.updateById(id, request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/sorted-by-status")
    public ResponseEntity<List<OrderResponseDTO>> getAllSortedByStatus() {
        return ResponseEntity.ok(service.getAllSortedByStatus());
    }

    @GetMapping("/summary")
    public ResponseEntity<OrderSummaryDTO> getSummary() {
        return ResponseEntity.ok(service.getSummary());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> getById(@PathVariable String id) {
        return ResponseEntity.ok(service.getById(id));
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getAll() {
        return ResponseEntity.ok(service.getAll());
    }
}

