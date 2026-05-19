package com.admin.svacham_Management.stock_service.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.admin.svacham_Management.stock_service.dto.StockRequestDTO;
import com.admin.svacham_Management.stock_service.dto.StockResponseDTO;
import com.admin.svacham_Management.stock_service.dto.StockSummaryDTO;
import com.admin.svacham_Management.stock_service.entity.Stock;
import com.admin.svacham_Management.stock_service.repository.StockRepository;
import com.admin.svacham_Management.stock_service.service.StockService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StockServiceImpl implements StockService {

    @Autowired
    private final StockRepository repository;

    @Override
    public StockResponseDTO create(StockRequestDTO request) {
        Stock s = Stock.builder()
                .itemName(request.getItemName())
                .quality(request.getQuality())
                .itemCategory(request.getItemCategory())
                .stockUnit(request.getStockUnit())
                .totalStock(request.getTotalStock())
                .usedStock(request.getUsedStock())
                .purchasedPricePerUnit(request.getPurchasedPricePerUnit())
                .sellingPricePerUnit(request.getSellingPricePerUnit())
                .stockAddedDate(request.getStockAddedDate())
                .status(request.getStatus())
                .notes(request.getNotes())
                .createdAt(LocalDateTime.now())
                .build();
        s.setSeq((int) (repository.count() + 1));
        // initialize remainingStock: if a usedStock was supplied, subtract it from totalStock
        int initialRemaining = nullSafeInt(s.getTotalStock());
        if (nullSafeInt(s.getUsedStock()) > 0) {
            initialRemaining = initialRemaining - nullSafeInt(s.getUsedStock());
        }
        if (initialRemaining < 0) initialRemaining = 0;
        s.setRemainingStock(initialRemaining);
        // initialize cumulative stockUsed with the usedStock entry
        s.setStockUsed(nullSafeInt(s.getUsedStock()));
        s.setUpdatedAt(s.getCreatedAt());
        Stock saved = repository.save(s);
        return toDto(saved);
    }

    @Override
    public void deleteById(String id) {
        Stock toDelete = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Stock record not found: " + id));
        Integer deletedSeq = toDelete.getSeq();
        repository.deleteById(id);
        if (deletedSeq != null) {
            List<Stock> all = repository.findAll();
            List<Stock> toUpdate = all.stream()
                    .filter(s -> s.getSeq() != null && s.getSeq() > deletedSeq)
                    .collect(Collectors.toList());
            for (Stock s : toUpdate) {
                s.setSeq(s.getSeq() - 1);
                repository.save(s);
            }
        }
    }

    @Override
    public StockResponseDTO updateById(String id, StockRequestDTO request) {
        Stock existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Stock record not found: " + id));
        existing.setItemName(request.getItemName());
        existing.setQuality(request.getQuality());
        existing.setItemCategory(request.getItemCategory());
        existing.setStockUnit(request.getStockUnit());
        existing.setTotalStock(request.getTotalStock());
        existing.setUsedStock(request.getUsedStock());
        existing.setPurchasedPricePerUnit(request.getPurchasedPricePerUnit());
        existing.setSellingPricePerUnit(request.getSellingPricePerUnit());
        existing.setStockAddedDate(request.getStockAddedDate());
        existing.setStatus(request.getStatus());
        existing.setNotes(request.getNotes());
        existing.setUpdatedAt(LocalDateTime.now());
        // update per-entry usedStock and accumulate into stockUsed; do not change totalStock
        Integer usedEntry = request.getUsedStock();
        existing.setUsedStock(usedEntry);
        if (usedEntry != null && usedEntry > 0) {
            int prevRemaining = existing.getRemainingStock() != null ? existing.getRemainingStock() : nullSafeInt(existing.getTotalStock());
            int newRemaining = prevRemaining - nullSafeInt(usedEntry);
            if (newRemaining < 0) newRemaining = 0;
            existing.setRemainingStock(newRemaining);
            existing.setStockUsed(nullSafeInt(existing.getStockUsed()) + nullSafeInt(usedEntry));
        }
        Stock saved = repository.save(existing);
        return toDto(saved);
    }

    @Override
    public List<StockResponseDTO> getAllSortedByCategory() {
        List<Stock> all = repository.findAll(Sort.by(Sort.Direction.ASC, "itemCategory"));
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public StockSummaryDTO getSummary() {
        List<Stock> all = repository.findAll();
        long totalRecords = all.size();
        long totalUnits = all.stream()
                .map(Stock::getTotalStock)
                .filter(Objects::nonNull)
                .mapToLong(Integer::longValue)
                .sum();
        long totalUsedUnits = all.stream()
                .map(Stock::getUsedStock)
                .filter(Objects::nonNull)
                .mapToLong(Integer::longValue)
                .sum();

        BigDecimal totalInventoryValue = all.stream()
                .filter(s -> s.getTotalStock() != null && s.getPurchasedPricePerUnit() != null)
                .map(s -> s.getPurchasedPricePerUnit().multiply(BigDecimal.valueOf(s.getTotalStock())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Long> byCategory = all.stream()
                .filter(s -> s.getItemCategory() != null)
                .collect(Collectors.groupingBy(Stock::getItemCategory, Collectors.counting()));

        return StockSummaryDTO.builder()
                .totalRecords(totalRecords)
                .totalUnits(totalUnits)
                .totalUsedUnits(totalUsedUnits)
                .totalInventoryValue(totalInventoryValue)
                .byCategory(byCategory)
                .build();
    }

    @Override
    public StockResponseDTO getById(String id) {
        Stock s = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Stock record not found: " + id));
        return toDto(s);
    }

    @Override
    public List<StockResponseDTO> getAll() {
        List<Stock> all = repository.findAll();
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    private StockResponseDTO toDto(Stock s) {
        return StockResponseDTO.builder()
                .id(s.getId())
                .seq(s.getSeq())
                .itemName(s.getItemName())
                .quality(s.getQuality())
                .itemCategory(s.getItemCategory())
                .stockUnit(s.getStockUnit())
                .totalStock(s.getTotalStock())
                .usedStock(s.getUsedStock())
                .stockUsed(s.getStockUsed())
                .remainingStock(s.getRemainingStock())
                .purchasedPricePerUnit(s.getPurchasedPricePerUnit())
                .sellingPricePerUnit(s.getSellingPricePerUnit())
                .stockAddedDate(s.getStockAddedDate())
                .status(s.getStatus())
                .notes(s.getNotes())
                .createdAt(s.getCreatedAt())
                .updatedAt(s.getUpdatedAt())
                .build();
    }

    private int nullSafeInt(Integer i) {
        return i == null ? 0 : i;
    }
}

