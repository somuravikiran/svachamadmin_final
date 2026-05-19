package com.admin.svacham_Management.order_service.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import jakarta.validation.constraints.DecimalMin;
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
public class OrderRequestDTO {
    @NotBlank
    private String clientId;

    @NotNull
    private LocalDate orderDate;

    private LocalDate deliveryDate;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal paidAmt;

    @NotBlank
    private String orderStatus;

    @NotNull
    private List<OrderItemRequestDTO> items;
}

