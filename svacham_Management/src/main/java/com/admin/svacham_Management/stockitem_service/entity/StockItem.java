package com.admin.svacham_Management.stockitem_service.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "stock_items")
public class StockItem {
    @Id
    private String id;

    // sequential business id for display; will be renumbered on delete
    private Integer seq;

    @NotBlank
    private String itemName;

    @NotBlank
    private String itemCategory;

    @NotNull
    @Min(0)
    private Integer quantity;

    @NotNull
    @Min(0)
    private Integer totalStock;

    @NotNull
    @Min(0)
    private Integer usedStock;

    // computed
    private Integer remainingStock;

    @NotBlank
    private String status;

    private String notes;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

