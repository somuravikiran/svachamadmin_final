package com.admin.svacham_Management.stock_service.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockResponseDTO {
    private String id;
    private Integer seq;
    private String itemName;
    private String quality;
    private String itemCategory;
    private String stockUnit;
    private Integer totalStock;
    private Integer usedStock;
    private Integer stockUsed;
    private Integer remainingStock;
    private BigDecimal purchasedPricePerUnit;
    private BigDecimal sellingPricePerUnit;
    private LocalDate stockAddedDate;
    private String status;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

