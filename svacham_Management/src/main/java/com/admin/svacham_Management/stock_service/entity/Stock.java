package com.admin.svacham_Management.stock_service.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.DecimalMin;
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
@Document(collection = "stocks")
public class Stock {
    @Id
    private String id;

    // sequential business id for display; will be renumbered on delete
    private Integer seq;

    @NotBlank
    private String itemName;

    @NotBlank
    private String quality;

    @NotBlank
    private String itemCategory;

    @NotBlank
    private String stockUnit;

    @NotNull
    @Min(0)
    private Integer totalStock;

    @NotNull
    @Min(0)
    private Integer usedStock;

    // cumulative used count across multiple entries (will be incremented each time usedStock is provided)
    private Integer stockUsed;

    // remainingStock represents currently available units (totalStock - cumulative usedStock)
    private Integer remainingStock;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal purchasedPricePerUnit;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal sellingPricePerUnit;

    @NotNull
    private LocalDate stockAddedDate;

    @NotBlank
    private String status;

    private String notes;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

