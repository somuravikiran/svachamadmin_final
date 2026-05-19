package com.admin.svacham_Management.stockitem_service.service;

import java.util.List;

import com.admin.svacham_Management.stockitem_service.dto.StockItemRequestDTO;
import com.admin.svacham_Management.stockitem_service.dto.StockItemResponseDTO;
import com.admin.svacham_Management.stockitem_service.dto.StockItemSummaryDTO;

public interface StockItemService {
    StockItemResponseDTO create(StockItemRequestDTO request);
    void deleteById(String id);
    StockItemResponseDTO updateById(String id, StockItemRequestDTO request);
    List<StockItemResponseDTO> getAllSortedByCategory();
    StockItemSummaryDTO getSummary();
    StockItemResponseDTO getById(String id);
    List<StockItemResponseDTO> getAll();
}

