package com.admin.svacham_Management.gstbill_service.controller;

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

import com.admin.svacham_Management.gstbill_service.dto.GstBillRequestDTO;
import com.admin.svacham_Management.gstbill_service.dto.GstBillResponseDTO;
import com.admin.svacham_Management.gstbill_service.dto.GstBillSummaryDTO;
import com.admin.svacham_Management.gstbill_service.service.GstBillService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/gstbills")
@Validated
@RequiredArgsConstructor
public class GstBillController {

    private final GstBillService gstBillService;

    @PostMapping
    public ResponseEntity<GstBillResponseDTO> create(@Valid @RequestBody GstBillRequestDTO request) {
        GstBillResponseDTO created = gstBillService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        gstBillService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<GstBillResponseDTO> update(@PathVariable String id, @Valid @RequestBody GstBillRequestDTO request) {
        GstBillResponseDTO updated = gstBillService.updateById(id, request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/sorted-by-status")
    public ResponseEntity<List<GstBillResponseDTO>> getSortedByStatus() {
        return ResponseEntity.ok(gstBillService.getAllSortedByStatus());
    }

    @GetMapping
    public ResponseEntity<List<GstBillResponseDTO>> getAll() {
        return ResponseEntity.ok(gstBillService.getAll());
    }

    @GetMapping("/summary")
    public ResponseEntity<GstBillSummaryDTO> getSummary() {
        return ResponseEntity.ok(gstBillService.getSummary());
    }

    @GetMapping("/{id}")
    public ResponseEntity<GstBillResponseDTO> getById(@PathVariable String id) {
        GstBillResponseDTO dto = gstBillService.findById(id);
        return ResponseEntity.ok(dto);
    }

}

