package com.admin.svacham_Management.order_service.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemResponseDTO {
    private String itemId;
    private String pickleType;
    private BigDecimal packSizeInKg;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal subtotal;
}

