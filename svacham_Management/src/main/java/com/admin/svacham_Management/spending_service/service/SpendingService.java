package com.admin.svacham_Management.spending_service.service;

import java.util.List;

import com.admin.svacham_Management.spending_service.dto.SpendingRequestDTO;
import com.admin.svacham_Management.spending_service.dto.SpendingResponseDTO;
import com.admin.svacham_Management.spending_service.dto.SpendingSummaryDTO;

public interface SpendingService {
    SpendingResponseDTO create(SpendingRequestDTO request);
    void deleteById(String id);
    SpendingResponseDTO updateById(String id, SpendingRequestDTO request);
    List<SpendingResponseDTO> getAllSortedByCategory();
    SpendingSummaryDTO getSummary();
    SpendingResponseDTO getById(String id);
    List<SpendingResponseDTO> getAll();
}

