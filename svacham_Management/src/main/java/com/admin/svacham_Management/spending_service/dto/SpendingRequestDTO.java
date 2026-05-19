package com.admin.svacham_Management.spending_service.dto;

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
public class SpendingRequestDTO {
    @NotBlank
    private String itemName;

    @NotBlank
    private String itemCategory;

    private String description;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = true)
    private BigDecimal amt;

    @NotNull
    private LocalDate spentDate;

    @NotBlank
    private String vendorName;

    @NotBlank
    private String paymentMode;

    @NotBlank
    private String status;
}

