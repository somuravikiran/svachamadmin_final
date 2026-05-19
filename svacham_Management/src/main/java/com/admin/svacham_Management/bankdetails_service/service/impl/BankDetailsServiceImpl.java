package com.admin.svacham_Management.bankdetails_service.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.admin.svacham_Management.bankdetails_service.dto.BankDetailsRequestDTO;
import com.admin.svacham_Management.bankdetails_service.dto.BankDetailsResponseDTO;
import com.admin.svacham_Management.bankdetails_service.dto.BankDetailsSummaryDTO;
import com.admin.svacham_Management.bankdetails_service.entity.BankDetails;
import com.admin.svacham_Management.bankdetails_service.repository.BankDetailsRepository;
import com.admin.svacham_Management.bankdetails_service.service.BankDetailsService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BankDetailsServiceImpl implements BankDetailsService {

    @Autowired
    private final BankDetailsRepository repository;

    @Override
    public BankDetailsResponseDTO create(BankDetailsRequestDTO request) {
        BankDetails b = BankDetails.builder()
                .holderName(request.getHolderName())
                .bankName(request.getBankName())
                .last4Acc(request.getLast4Acc())
                .amtCredited(nullSafe(request.getAmtCredited()))
                .amtDeposited(nullSafe(request.getAmtDeposited()))
                .createdAt(LocalDateTime.now())
                .build();
        b.setSeq((int) (repository.count() + 1));
        b.setAccountBal(b.getAmtCredited().subtract(b.getAmtDeposited()));
        b.setUpdatedAt(b.getCreatedAt());
        BankDetails saved = repository.save(b);
        return toDto(saved);
    }

    @Override
    public void deleteById(String id) {
        BankDetails existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("BankDetails not found: " + id));
        Integer deletedSeq = existing.getSeq();
        repository.deleteById(id);
        if (deletedSeq != null) {
            List<BankDetails> all = repository.findAll();
            List<BankDetails> toUpdate = all.stream().filter(b -> b.getSeq() != null && b.getSeq() > deletedSeq).collect(Collectors.toList());
            for (BankDetails b : toUpdate) {
                b.setSeq(b.getSeq() - 1);
                repository.save(b);
            }
        }
    }

    @Override
    public BankDetailsResponseDTO updateById(String id, BankDetailsRequestDTO request) {
        BankDetails existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("BankDetails not found: " + id));
        existing.setHolderName(request.getHolderName());
        existing.setBankName(request.getBankName());
        existing.setLast4Acc(request.getLast4Acc());
        existing.setAmtCredited(nullSafe(request.getAmtCredited()));
        existing.setAmtDeposited(nullSafe(request.getAmtDeposited()));
        existing.setAccountBal(existing.getAmtCredited().subtract(existing.getAmtDeposited()));
        existing.setUpdatedAt(LocalDateTime.now());
        BankDetails saved = repository.save(existing);
        return toDto(saved);
    }

    @Override
    public List<BankDetailsResponseDTO> getAllSortedByBankName() {
        List<BankDetails> all = repository.findAll(Sort.by(Sort.Direction.ASC, "bankName"));
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public BankDetailsSummaryDTO getSummary() {
        List<BankDetails> all = repository.findAll();
        long totalAccounts = all.size();
        BigDecimal totalBalance = all.stream().map(BankDetails::getAccountBal).filter(Objects::nonNull).reduce(BigDecimal.ZERO, BigDecimal::add);
        Optional<LocalDateTime> latest = all.stream().map(BankDetails::getUpdatedAt).filter(Objects::nonNull).max(LocalDateTime::compareTo);
        return BankDetailsSummaryDTO.builder().totalAccounts(totalAccounts).totalBalance(totalBalance).latestUpdatedAt(latest.orElse(null)).build();
    }

    @Override
    public BankDetailsResponseDTO getById(String id) {
        BankDetails b = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("BankDetails not found: " + id));
        return toDto(b);
    }

    @Override
    public List<BankDetailsResponseDTO> getAll() {
        List<BankDetails> all = repository.findAll();
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    private BankDetailsResponseDTO toDto(BankDetails b) {
        return BankDetailsResponseDTO.builder()
                .id(b.getId())
                .seq(b.getSeq())
                .holderName(b.getHolderName())
                .bankName(b.getBankName())
                .last4Acc(b.getLast4Acc())
                .amtCredited(b.getAmtCredited())
                .amtDeposited(b.getAmtDeposited())
                .accountBal(b.getAccountBal())
                .createdAt(b.getCreatedAt())
                .updatedAt(b.getUpdatedAt())
                .build();
    }

    private BigDecimal nullSafe(BigDecimal b) { return b == null ? BigDecimal.ZERO : b; }
}

