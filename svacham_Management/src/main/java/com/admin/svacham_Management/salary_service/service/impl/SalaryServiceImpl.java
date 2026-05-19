package com.admin.svacham_Management.salary_service.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.admin.svacham_Management.salary_service.dto.SalaryRequestDTO;
import com.admin.svacham_Management.salary_service.dto.SalaryResponseDTO;
import com.admin.svacham_Management.salary_service.dto.SalarySummaryDTO;
import com.admin.svacham_Management.salary_service.entity.Salary;
import com.admin.svacham_Management.salary_service.repository.SalaryRepository;
import com.admin.svacham_Management.salary_service.service.SalaryService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SalaryServiceImpl implements SalaryService {

    @Autowired
    private final SalaryRepository repository;

    @Override
    public SalaryResponseDTO create(SalaryRequestDTO request) {
        Salary s = Salary.builder()
                .employeeName(request.getEmployeeName())
                .employeeRole(request.getEmployeeRole())
                .monthSalary(nullSafe(request.getMonthSalary()))
                .paidAmt(nullSafe(request.getPaidAmt()))
                .salaryMonth(request.getSalaryMonth())
                .paymentDate(request.getPaymentDate())
                .paymentMode(request.getPaymentMode())
                .status(request.getStatus())
                .notes(request.getNotes())
                .createdAt(LocalDateTime.now())
                .build();
        s.setSeq((int) (repository.count() + 1));
        s.setBalanceAmt(nullSafe(s.getMonthSalary()).subtract(nullSafe(s.getPaidAmt())));
        s.setUpdatedAt(s.getCreatedAt());
        Salary saved = repository.save(s);
        return toDto(saved);
    }

    @Override
    public void deleteById(String id) {
        Salary toDelete = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Salary record not found: " + id));
        Integer deletedSeq = toDelete.getSeq();
        repository.deleteById(id);
        if (deletedSeq != null) {
            List<Salary> all = repository.findAll();
            List<Salary> toUpdate = all.stream()
                    .filter(s -> s.getSeq() != null && s.getSeq() > deletedSeq)
                    .collect(Collectors.toList());
            for (Salary s : toUpdate) {
                s.setSeq(s.getSeq() - 1);
                repository.save(s);
            }
        }
    }

    @Override
    public SalaryResponseDTO updateById(String id, SalaryRequestDTO request) {
        Salary existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Salary record not found: " + id));
        existing.setEmployeeName(request.getEmployeeName());
        existing.setEmployeeRole(request.getEmployeeRole());
        existing.setMonthSalary(nullSafe(request.getMonthSalary()));
        existing.setPaidAmt(nullSafe(request.getPaidAmt()));
        existing.setSalaryMonth(request.getSalaryMonth());
        existing.setPaymentDate(request.getPaymentDate());
        existing.setPaymentMode(request.getPaymentMode());
        existing.setStatus(request.getStatus());
        existing.setNotes(request.getNotes());
        existing.setBalanceAmt(nullSafe(existing.getMonthSalary()).subtract(nullSafe(existing.getPaidAmt())));
        existing.setUpdatedAt(LocalDateTime.now());
        Salary saved = repository.save(existing);
        return toDto(saved);
    }

    @Override
    public List<SalaryResponseDTO> getAllSortedByRole() {
        List<Salary> all = repository.findAll(Sort.by(Sort.Direction.ASC, "employeeRole"));
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public SalarySummaryDTO getSummary() {
        List<Salary> all = repository.findAll();
        long totalRecords = all.size();
        BigDecimal totalMonthSalary = all.stream()
                .map(Salary::getMonthSalary)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalPaid = all.stream()
                .map(Salary::getPaidAmt)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalBalance = all.stream()
                .map(Salary::getBalanceAmt)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Long> byRole = all.stream()
                .filter(s -> s.getEmployeeRole() != null)
                .collect(Collectors.groupingBy(Salary::getEmployeeRole, Collectors.counting()));

        return SalarySummaryDTO.builder()
                .totalRecords(totalRecords)
                .totalMonthSalary(totalMonthSalary)
                .totalPaid(totalPaid)
                .totalBalance(totalBalance)
                .byRole(byRole)
                .build();
    }

    @Override
    public SalaryResponseDTO getById(String id) {
        Salary s = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Salary record not found: " + id));
        return toDto(s);
    }

    @Override
    public List<SalaryResponseDTO> getAll() {
        List<Salary> all = repository.findAll();
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    private SalaryResponseDTO toDto(Salary s) {
        return SalaryResponseDTO.builder()
                .id(s.getId())
                .seq(s.getSeq())
                .employeeName(s.getEmployeeName())
                .employeeRole(s.getEmployeeRole())
                .monthSalary(s.getMonthSalary())
                .paidAmt(s.getPaidAmt())
                .balanceAmt(s.getBalanceAmt())
                .salaryMonth(s.getSalaryMonth())
                .paymentDate(s.getPaymentDate())
                .paymentMode(s.getPaymentMode())
                .status(s.getStatus())
                .notes(s.getNotes())
                .createdAt(s.getCreatedAt())
                .updatedAt(s.getUpdatedAt())
                .build();
    }

    private BigDecimal nullSafe(BigDecimal b) {
        return b == null ? BigDecimal.ZERO : b;
    }
}

