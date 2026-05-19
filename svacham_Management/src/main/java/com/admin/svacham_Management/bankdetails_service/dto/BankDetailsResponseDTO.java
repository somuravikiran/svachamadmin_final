package com.admin.svacham_Management.bankdetails_service.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BankDetailsResponseDTO {
    private String id;
    private Integer seq;
    private String holderName;
    private String bankName;
    private String last4Acc;
    private BigDecimal amtCredited;
    private BigDecimal amtDeposited;
    private BigDecimal accountBal;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

