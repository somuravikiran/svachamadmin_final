package com.admin.svacham_Management.salary_service.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

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
public class SalaryRequestDTO {
    @NotBlank
    private String employeeName;

    @NotBlank
    private String employeeRole;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal monthSalary;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal paidAmt;

    @NotBlank
    private String salaryMonth; // e.g. "2026-05"

    @NotNull
    private LocalDate paymentDate;

    @NotBlank
    private String paymentMode;

    @NotBlank
    private String status;

    private String notes;
}

