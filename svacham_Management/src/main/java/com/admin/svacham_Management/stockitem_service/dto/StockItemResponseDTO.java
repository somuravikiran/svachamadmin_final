package com.admin.svacham_Management.stockitem_service.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockItemResponseDTO {
    private String id;
    private Integer seq;
    private String itemName;
    private String itemCategory;
    private Integer quantity;
    private Integer totalStock;
    private Integer usedStock;
    private Integer remainingStock;
    private String status;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

