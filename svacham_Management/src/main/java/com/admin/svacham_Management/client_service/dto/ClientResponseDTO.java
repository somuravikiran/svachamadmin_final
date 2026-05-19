package com.admin.svacham_Management.client_service.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClientResponseDTO {

    private String id;
    private Integer seq;
    private String clientName;
    private String phoneNo;
    private String address;
    private String city;
    private String state;
    private BigDecimal totalAmt;
    private BigDecimal amtPaid;
    private BigDecimal balAmt;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

}

