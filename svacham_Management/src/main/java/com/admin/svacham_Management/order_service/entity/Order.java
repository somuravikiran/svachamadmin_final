package com.admin.svacham_Management.order_service.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
@Document(collection = "orders")
public class Order {
    @Id
    private String id;

    private Integer seq;

    @NotBlank
    private String clientId;

    @NotBlank
    private String clientName;

    @NotNull
    private LocalDate orderDate;

    private LocalDate deliveryDate;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal totalAmt;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal paidAmt;

    // computed
    private BigDecimal pendingAmt;

    @NotBlank
    private String orderStatus; // completed, pending, sent

    @NotNull
    private List<OrderItem> items;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

