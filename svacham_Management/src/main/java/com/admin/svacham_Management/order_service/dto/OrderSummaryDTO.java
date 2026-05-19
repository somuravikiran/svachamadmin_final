package com.admin.svacham_Management.order_service.dto;

import java.math.BigDecimal;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderSummaryDTO {
    private long totalOrders;
    private BigDecimal totalAmount;
    private BigDecimal totalPending;
    private Map<String, Long> byStatus;
}

