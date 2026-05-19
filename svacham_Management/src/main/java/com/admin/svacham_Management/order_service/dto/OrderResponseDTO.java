package com.admin.svacham_Management.order_service.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponseDTO {
    private String id;
    private Integer seq;
    private String clientId;
    private String clientName;
    private LocalDate orderDate;
    private LocalDate deliveryDate;
    private BigDecimal totalAmt;
    private BigDecimal paidAmt;
    private BigDecimal pendingAmt;
    private String orderStatus;
    private List<OrderItemResponseDTO> items;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

