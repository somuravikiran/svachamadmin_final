package com.admin.svacham_Management.stockitem_service.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.admin.svacham_Management.stockitem_service.dto.StockItemRequestDTO;
import com.admin.svacham_Management.stockitem_service.dto.StockItemResponseDTO;
import com.admin.svacham_Management.stockitem_service.dto.StockItemSummaryDTO;
import com.admin.svacham_Management.stockitem_service.entity.StockItem;
import com.admin.svacham_Management.stockitem_service.repository.StockItemRepository;
import com.admin.svacham_Management.stockitem_service.service.StockItemService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class StockItemServiceImpl implements StockItemService {

    @Autowired
    private final StockItemRepository repository;

    @Override
    public StockItemResponseDTO create(StockItemRequestDTO request) {
        StockItem s = StockItem.builder()
                .itemName(request.getItemName())
                .itemCategory(request.getItemCategory())
                .quantity(request.getQuantity())
                .totalStock(request.getTotalStock())
                .usedStock(request.getUsedStock())
                .status(request.getStatus())
                .notes(request.getNotes())
                .createdAt(LocalDateTime.now())
                .build();
        s.setSeq((int) (repository.count() + 1));
        s.setRemainingStock(nullSafeInt(s.getTotalStock()) - nullSafeInt(s.getUsedStock()));
        s.setUpdatedAt(s.getCreatedAt());
        StockItem saved = repository.save(s);
        return toDto(saved);
    }

    @Override
    public void deleteById(String id) {
        StockItem toDelete = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("StockItem not found: " + id));
        Integer deletedSeq = toDelete.getSeq();
        repository.deleteById(id);
        if (deletedSeq != null) {
            List<StockItem> all = repository.findAll();
            List<StockItem> toUpdate = all.stream()
                    .filter(s -> s.getSeq() != null && s.getSeq() > deletedSeq)
                    .collect(Collectors.toList());
            for (StockItem s : toUpdate) {
                s.setSeq(s.getSeq() - 1);
                repository.save(s);
            }
        }
    }

    @Override
    public StockItemResponseDTO updateById(String id, StockItemRequestDTO request) {
        StockItem existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("StockItem not found: " + id));
        existing.setItemName(request.getItemName());
        existing.setItemCategory(request.getItemCategory());
        existing.setQuantity(request.getQuantity());
        existing.setTotalStock(request.getTotalStock());
        existing.setUsedStock(request.getUsedStock());
        existing.setStatus(request.getStatus());
        existing.setNotes(request.getNotes());
        existing.setRemainingStock(nullSafeInt(existing.getTotalStock()) - nullSafeInt(existing.getUsedStock()));
        existing.setUpdatedAt(LocalDateTime.now());
        StockItem saved = repository.save(existing);
        return toDto(saved);
    }

    @Override
    public List<StockItemResponseDTO> getAllSortedByCategory() {
        List<StockItem> all = repository.findAll(Sort.by(Sort.Direction.ASC, "itemCategory"));
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public StockItemSummaryDTO getSummary() {
        List<StockItem> all = repository.findAll();
        long totalItems = all.size();
        long totalUnits = all.stream().map(StockItem::getTotalStock).filter(Objects::nonNull).mapToLong(Integer::longValue).sum();
        long totalUsedUnits = all.stream().map(StockItem::getUsedStock).filter(Objects::nonNull).mapToLong(Integer::longValue).sum();
        Map<String, Long> byCategory = all.stream().filter(s -> s.getItemCategory() != null).collect(Collectors.groupingBy(StockItem::getItemCategory, Collectors.counting()));
        return StockItemSummaryDTO.builder().totalItems(totalItems).totalUnits(totalUnits).totalUsedUnits(totalUsedUnits).byCategory(byCategory).build();
    }

    @Override
    public StockItemResponseDTO getById(String id) {
        StockItem s = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("StockItem not found: " + id));
        return toDto(s);
    }

    @Override
    public List<StockItemResponseDTO> getAll() {
        List<StockItem> all = repository.findAll();
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    private StockItemResponseDTO toDto(StockItem s) {
        return StockItemResponseDTO.builder()
                .id(s.getId())
                .seq(s.getSeq())
                .itemName(s.getItemName())
                .itemCategory(s.getItemCategory())
                .quantity(s.getQuantity())
                .totalStock(s.getTotalStock())
                .usedStock(s.getUsedStock())
                .remainingStock(s.getRemainingStock())
                .status(s.getStatus())
                .notes(s.getNotes())
                .createdAt(s.getCreatedAt())
                .updatedAt(s.getUpdatedAt())
                .build();
    }

    private int nullSafeInt(Integer i) { return i == null ? 0 : i; }
}

