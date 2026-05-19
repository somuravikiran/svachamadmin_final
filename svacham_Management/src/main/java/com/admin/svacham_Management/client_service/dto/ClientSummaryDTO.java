package com.admin.svacham_Management.client_service.dto;

import java.math.BigDecimal;
import java.util.Map;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientSummaryDTO {
    private long totalClients;
    private BigDecimal totalAmount;
    private BigDecimal totalPaid;
    private BigDecimal totalBalance;
    private Map<String, Long> clientsByState;
}

