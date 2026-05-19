package com.admin.svacham_Management.spending_service.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.admin.svacham_Management.spending_service.dto.SpendingRequestDTO;
import com.admin.svacham_Management.spending_service.dto.SpendingResponseDTO;
import com.admin.svacham_Management.spending_service.dto.SpendingSummaryDTO;
import com.admin.svacham_Management.spending_service.entity.Spending;
import com.admin.svacham_Management.spending_service.repository.SpendingRepository;
import com.admin.svacham_Management.spending_service.service.SpendingService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SpendingServiceImpl implements SpendingService {

    @Autowired
    private final SpendingRepository repository;

    @Override
    public SpendingResponseDTO create(SpendingRequestDTO request) {
        Spending s = Spending.builder()
                .itemName(request.getItemName())
                .itemCategory(request.getItemCategory())
                .description(request.getDescription())
                .amt(nullSafe(request.getAmt()))
                .spentDate(request.getSpentDate())
                .vendorName(request.getVendorName())
                .paymentMode(request.getPaymentMode())
                .status(request.getStatus())
                .createdAt(LocalDateTime.now())
                .build();
        s.setSeq((int) (repository.count() + 1));
        s.setUpdatedAt(s.getCreatedAt());
        Spending saved = repository.save(s);
        return toDto(saved);
    }

    @Override
    public void deleteById(String id) {
        Spending toDelete = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Spending record not found: " + id));
        Integer deletedSeq = toDelete.getSeq();
        repository.deleteById(id);
        if (deletedSeq != null) {
            List<Spending> all = repository.findAll();
            List<Spending> toUpdate = all.stream()
                    .filter(s -> s.getSeq() != null && s.getSeq() > deletedSeq)
                    .collect(Collectors.toList());
            for (Spending s : toUpdate) {
                s.setSeq(s.getSeq() - 1);
                repository.save(s);
            }
        }
    }

    @Override
    public SpendingResponseDTO updateById(String id, SpendingRequestDTO request) {
        Spending existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Spending record not found: " + id));
        existing.setItemName(request.getItemName());
        existing.setItemCategory(request.getItemCategory());
        existing.setDescription(request.getDescription());
        existing.setAmt(nullSafe(request.getAmt()));
        existing.setSpentDate(request.getSpentDate());
        existing.setVendorName(request.getVendorName());
        existing.setPaymentMode(request.getPaymentMode());
        existing.setStatus(request.getStatus());
        existing.setUpdatedAt(LocalDateTime.now());
        Spending saved = repository.save(existing);
        return toDto(saved);
    }

    @Override
    public List<SpendingResponseDTO> getAllSortedByCategory() {
        List<Spending> all = repository.findAll(Sort.by(Sort.Direction.ASC, "itemCategory"));
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public SpendingSummaryDTO getSummary() {
        List<Spending> all = repository.findAll();
        long totalRecords = all.size();
        BigDecimal totalAmount = all.stream()
                .map(Spending::getAmt)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Long> byCategory = all.stream()
                .filter(s -> s.getItemCategory() != null)
                .collect(Collectors.groupingBy(Spending::getItemCategory, Collectors.counting()));

        return SpendingSummaryDTO.builder()
                .totalRecords(totalRecords)
                .totalAmount(totalAmount)
                .byCategory(byCategory)
                .build();
    }

    @Override
    public SpendingResponseDTO getById(String id) {
        Spending s = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Spending record not found: " + id));
        return toDto(s);
    }

    @Override
    public List<SpendingResponseDTO> getAll() {
        List<Spending> all = repository.findAll();
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    private SpendingResponseDTO toDto(Spending s) {
        return SpendingResponseDTO.builder()
                .id(s.getId())
                .seq(s.getSeq())
                .itemName(s.getItemName())
                .itemCategory(s.getItemCategory())
                .description(s.getDescription())
                .amt(s.getAmt())
                .spentDate(s.getSpentDate())
                .vendorName(s.getVendorName())
                .paymentMode(s.getPaymentMode())
                .status(s.getStatus())
                .createdAt(s.getCreatedAt())
                .updatedAt(s.getUpdatedAt())
                .build();
    }

    private BigDecimal nullSafe(BigDecimal b) {
        return b == null ? BigDecimal.ZERO : b;
    }
}

