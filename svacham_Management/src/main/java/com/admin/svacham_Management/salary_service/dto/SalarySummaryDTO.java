package com.admin.svacham_Management.salary_service.dto;

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
public class SalarySummaryDTO {
    private long totalRecords;
    private BigDecimal totalMonthSalary;
    private BigDecimal totalPaid;
    private BigDecimal totalBalance;
    private Map<String, Long> byRole;
}

