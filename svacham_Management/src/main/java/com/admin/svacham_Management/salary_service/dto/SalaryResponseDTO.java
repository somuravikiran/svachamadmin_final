package com.admin.svacham_Management.salary_service.dto;

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
public class SalaryResponseDTO {
    private String id;
    private Integer seq;
    private String employeeName;
    private String employeeRole;
    private BigDecimal monthSalary;
    private BigDecimal paidAmt;
    private BigDecimal balanceAmt;
    private String salaryMonth;
    private LocalDate paymentDate;
    private String paymentMode;
    private String status;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

