package com.admin.svacham_Management.bankdetails_service.service;

import java.util.List;

import com.admin.svacham_Management.bankdetails_service.dto.BankDetailsRequestDTO;
import com.admin.svacham_Management.bankdetails_service.dto.BankDetailsResponseDTO;
import com.admin.svacham_Management.bankdetails_service.dto.BankDetailsSummaryDTO;

public interface BankDetailsService {
    BankDetailsResponseDTO create(BankDetailsRequestDTO request);
    void deleteById(String id);
    BankDetailsResponseDTO updateById(String id, BankDetailsRequestDTO request);
    List<BankDetailsResponseDTO> getAllSortedByBankName();
    BankDetailsSummaryDTO getSummary();
    BankDetailsResponseDTO getById(String id);
    List<BankDetailsResponseDTO> getAll();
}

