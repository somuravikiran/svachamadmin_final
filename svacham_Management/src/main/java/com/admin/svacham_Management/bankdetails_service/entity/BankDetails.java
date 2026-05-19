package com.admin.svacham_Management.bankdetails_service.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "bank_details")
public class BankDetails {
    @Id
    private String id;

    // sequential business id for display; will be renumbered on delete
    private Integer seq;

    @NotBlank
    private String holderName;

    @NotBlank
    private String bankName;

    // last 4 digits of account number
    @NotBlank
    @Pattern(regexp = "\\d{4}", message = "last4Acc must be exactly 4 digits")
    private String last4Acc;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal amtCredited;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal amtDeposited;

    // computed: amtCredited - amtDeposited
    private BigDecimal accountBal;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

