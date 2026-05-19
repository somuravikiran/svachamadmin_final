package com.admin.svacham_Management.gstbill_service.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "gstbills")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GstBill {

    @Id
    private String id;
    // sequential numeric id for display/order (managed by application)
    private Integer seq;

    @NotBlank(message = "vendorName is required")
    private String vendorName;

    @NotBlank(message = "billNumber is required")
    private String billNumber;

    @NotBlank(message = "gstNumber is required")
    @Pattern(regexp = "(?i)^[0-9A-Z]{15}$", message = "gstNumber must be 15 alphanumeric characters")
    private String gstNumber;

    @NotNull(message = "billAmt is required")
    @DecimalMin(value = "0.0", inclusive = false, message = "billAmt must be greater than 0")
    private BigDecimal billAmt;

    // Calculated
    private BigDecimal gstAmt;

    @NotNull(message = "gstPercentage is required")
    @DecimalMin(value = "0.0", message = "gstPercentage must be >= 0")
    @DecimalMax(value = "100.0", message = "gstPercentage must be <= 100")
    private BigDecimal gstPercentage;

    // total = billAmt + gstAmt
    private BigDecimal totalAmt;

    @NotNull(message = "billDate is required")
    private LocalDate billDate;

    @NotBlank(message = "paymentMethod is required")
    @Pattern(regexp = "(?i)^(card|upi|cash|online)$", message = "paymentMethod must be one of: card, upi, cash, online")
    private String paymentMethod;

    @NotBlank(message = "status is required")
    @Pattern(regexp = "(?i)^(paid|pending|partial)$", message = "status must be one of: paid, pending, partial")
    private String status;

    private String notes;

    private LocalDateTime createdDate;

}