package com.admin.svacham_Management.salary_service.service;

import java.util.List;

import com.admin.svacham_Management.salary_service.dto.SalaryRequestDTO;
import com.admin.svacham_Management.salary_service.dto.SalaryResponseDTO;
import com.admin.svacham_Management.salary_service.dto.SalarySummaryDTO;

public interface SalaryService {
    SalaryResponseDTO create(SalaryRequestDTO request);
    void deleteById(String id);
    SalaryResponseDTO updateById(String id, SalaryRequestDTO request);
    List<SalaryResponseDTO> getAllSortedByRole();
    SalarySummaryDTO getSummary();
    SalaryResponseDTO getById(String id);
    List<SalaryResponseDTO> getAll();
}

