package com.admin.svacham_Management.stockitem_service.dto;

import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockItemSummaryDTO {
    private long totalItems;
    private long totalUnits;
    private long totalUsedUnits;
    private Map<String, Long> byCategory;
}

