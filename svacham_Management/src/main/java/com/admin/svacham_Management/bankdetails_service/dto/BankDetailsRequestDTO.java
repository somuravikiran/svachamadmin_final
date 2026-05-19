package com.admin.svacham_Management.bankdetails_service.dto;

import java.math.BigDecimal;

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
public class BankDetailsRequestDTO {
    @NotBlank
    private String holderName;

    @NotBlank
    private String bankName;

    @NotBlank
    @Pattern(regexp = "\\d{4}", message = "last4Acc must be exactly 4 digits")
    private String last4Acc;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal amtCredited;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal amtDeposited;
}

