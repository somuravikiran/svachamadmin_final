package com.admin.svacham_Management.stock_service.service;

import java.util.List;

import com.admin.svacham_Management.stock_service.dto.StockRequestDTO;
import com.admin.svacham_Management.stock_service.dto.StockResponseDTO;
import com.admin.svacham_Management.stock_service.dto.StockSummaryDTO;

public interface StockService {
    StockResponseDTO create(StockRequestDTO request);
    void deleteById(String id);
    StockResponseDTO updateById(String id, StockRequestDTO request);
    List<StockResponseDTO> getAllSortedByCategory();
    StockSummaryDTO getSummary();
    StockResponseDTO getById(String id);
    List<StockResponseDTO> getAll();
}

