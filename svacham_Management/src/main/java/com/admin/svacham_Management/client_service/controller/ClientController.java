package com.admin.svacham_Management.client_service.controller;

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

import com.admin.svacham_Management.client_service.dto.ClientRequestDTO;
import com.admin.svacham_Management.client_service.dto.ClientResponseDTO;
import com.admin.svacham_Management.client_service.dto.ClientSummaryDTO;
import com.admin.svacham_Management.client_service.service.ClientService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/clients")
@Validated
@RequiredArgsConstructor
public class ClientController {

    private final ClientService clientService;

    @PostMapping
    public ResponseEntity<ClientResponseDTO> create(@Valid @RequestBody ClientRequestDTO request) {
        ClientResponseDTO created = clientService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        clientService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ClientResponseDTO> update(@PathVariable String id, @Valid @RequestBody ClientRequestDTO request) {
        ClientResponseDTO updated = clientService.updateById(id, request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/sorted-by-state")
    public ResponseEntity<List<ClientResponseDTO>> getSortedByState() {
        return ResponseEntity.ok(clientService.getAllSortedByState());
    }

    @GetMapping
    public ResponseEntity<List<ClientResponseDTO>> getAll() {
        return ResponseEntity.ok(clientService.getAll());
    }

    @GetMapping("/summary")
    public ResponseEntity<ClientSummaryDTO> getSummary() {
        return ResponseEntity.ok(clientService.getSummary());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ClientResponseDTO> getById(@PathVariable String id) {
        ClientResponseDTO dto = clientService.findById(id);
        return ResponseEntity.ok(dto);
    }

}

