package com.admin.svacham_Management.spending_service.dto;

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
public class SpendingSummaryDTO {
    private long totalRecords;
    private BigDecimal totalAmount;
    private Map<String, Long> byCategory;
}

