package com.admin.svacham_Management.gstbill_service.dto;

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
public class GstBillSummaryDTO {
    private long totalBills;
    private BigDecimal totalBillAmount;
    private BigDecimal totalGstAmount;
    private BigDecimal totalAmountWithGst;
    private Map<String, Long> billsByStatus;
}

