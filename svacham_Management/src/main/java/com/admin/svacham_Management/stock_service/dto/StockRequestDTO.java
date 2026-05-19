package com.admin.svacham_Management.stock_service.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO for creating or updating a Stock record.
 * <p>
 * This request object is validated on entry. The service will compute derived
 * fields (for example remainingStock = totalStock - usedStock) and will
 * persist timestamps (createdAt/updatedAt) on the entity.
 * </p>
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StockRequestDTO {
    /** Human-friendly item name (e.g. "Glass Jars 500ml"). */
    @NotBlank
    private String itemName;

    /** Quality description (e.g. "A", "B", "Premium"). */
    @NotBlank
    private String quality;

    /** Category used for grouping/sorting (e.g. "Packaging"). */
    @NotBlank
    private String itemCategory;

    /** Unit of measure for stock (e.g. "pcs", "kg"). */
    @NotBlank
    private String stockUnit;

    /** Total number of units purchased/available in inventory. */
    @NotNull
    @Min(0)
    private Integer totalStock;

    /** Number of units already used/reserved (will be subtracted from totalStock). */
    @NotNull
    @Min(0)
    private Integer usedStock;

    /** Purchase cost per single unit. */
    @NotNull
    @DecimalMin("0.0")
    private BigDecimal purchasedPricePerUnit;

    /** Selling price per single unit. */
    @NotNull
    @DecimalMin("0.0")
    private BigDecimal sellingPricePerUnit;

    /** Date when these units were added to stock. */
    @NotNull
    private LocalDate stockAddedDate;

    /** Status of the stock entry (e.g. "active", "inactive", "reserved"). */
    @NotBlank
    private String status;

    /** Optional free-text notes about the stock entry. */
    private String notes;
}

