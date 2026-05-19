package com.admin.svacham_Management.spending_service.dto;

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
public class SpendingResponseDTO {
    private String id;
    private Integer seq;
    private String itemName;
    private String itemCategory;
    private String description;
    private BigDecimal amt;
    private LocalDate spentDate;
    private String vendorName;
    private String paymentMode;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

