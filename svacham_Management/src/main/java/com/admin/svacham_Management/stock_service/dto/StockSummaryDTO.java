package com.admin.svacham_Management.stock_service.dto;

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
public class StockSummaryDTO {
    private long totalRecords;
    private long totalUnits;
    private long totalUsedUnits;
    private BigDecimal totalInventoryValue; // totalStock * purchasedPricePerUnit summed
    private Map<String, Long> byCategory;
}

