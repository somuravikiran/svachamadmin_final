package com.admin.svacham_Management.order_service.entity;

import java.math.BigDecimal;

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
public class OrderItem {
    @NotBlank
    private String itemId; // reference to Stock.id

    @NotBlank
    private String pickleType;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal packSizeInKg;

    @NotNull
    @Min(0)
    private Integer quantity;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal unitPrice;

    // computed
    private BigDecimal subtotal;
}

