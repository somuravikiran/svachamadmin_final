package com.admin.svacham_Management.spending_service.entity;

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
@Document(collection = "spendings")
public class Spending {
    @Id
    private String id;

    // sequential business id used for display/ordering and will be adjusted on deletes
    private Integer seq;

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

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}

