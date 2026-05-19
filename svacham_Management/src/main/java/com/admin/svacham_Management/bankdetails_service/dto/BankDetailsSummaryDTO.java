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
public class BankDetailsSummaryDTO {
    private long totalAccounts;
    private BigDecimal totalBalance;
    private LocalDateTime latestUpdatedAt;
}

