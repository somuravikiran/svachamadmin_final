package com.admin.svacham_Management.client_service.dto;

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
public class ClientRequestDTO {

    @NotBlank(message = "clientName is required")
    private String clientName;

    // Indian phone number: optional +91 or 0 prefix, then 10 digits starting with 6-9
    @Pattern(regexp = "^(?:\\+91[\\-\\s]?|0)?[6-9]\\d{9}$", message = "phoneNo must be a valid Indian mobile number")
    private String phoneNo;

    @NotBlank(message = "address is required")
    private String address;

    @NotBlank(message = "city is required")
    private String city;

    @NotBlank(message = "state is required")
    private String state;

    @NotNull(message = "totalAmt is required")
    @DecimalMin(value = "0.0", message = "totalAmt must be >= 0")
    private BigDecimal totalAmt;

    @NotNull(message = "amtPaid is required")
    @DecimalMin(value = "0.0", message = "amtPaid must be >= 0")
    private BigDecimal amtPaid;

}

