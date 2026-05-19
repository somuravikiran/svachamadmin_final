package com.admin.svacham_Management.gstbill_service.dto;

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
public class GstBillResponseDTO {

    private String id;
    private Integer seq;
    private String vendorName;
    private String billNumber;
    private String gstNumber;
    private BigDecimal billAmt;
    private BigDecimal gstAmt;
    private BigDecimal gstPercentage;
    private BigDecimal totalAmt;
    private LocalDate billDate;
    private String paymentMethod;
    private String status;
    private String notes;
    private LocalDateTime createdDate;

}

