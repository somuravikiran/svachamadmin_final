package com.admin.svacham_Management.salary_service.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
@Document(collection = "salaries")
public class Salary {
    @Id
    private String id;

    // sequential business id used for display/ordering and will be adjusted on deletes
    private Integer seq;

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

    // computed: monthSalary - paidAmt
    private BigDecimal balanceAmt;

    // format like "2026-05" or any string representing salary month
    @NotBlank
    private String salaryMonth;

    @NotNull
    private LocalDate paymentDate;

    @NotBlank
    private String paymentMode;

    @NotBlank
    private String status;

    private String notes;

    // creation timestamp
    private LocalDateTime createdAt;

    // last update timestamp
    private LocalDateTime updatedAt;
}

