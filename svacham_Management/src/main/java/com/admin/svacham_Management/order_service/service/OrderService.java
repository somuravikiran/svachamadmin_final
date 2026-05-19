package com.admin.svacham_Management.order_service.service;

import java.util.List;

import com.admin.svacham_Management.order_service.dto.OrderRequestDTO;
import com.admin.svacham_Management.order_service.dto.OrderResponseDTO;
import com.admin.svacham_Management.order_service.dto.OrderSummaryDTO;

public interface OrderService {
    OrderResponseDTO create(OrderRequestDTO request);
    void deleteById(String id);
    OrderResponseDTO updateById(String id, OrderRequestDTO request);
    List<OrderResponseDTO> getAllSortedByStatus();
    OrderSummaryDTO getSummary();
    OrderResponseDTO getById(String id);
    List<OrderResponseDTO> getAll();
}

