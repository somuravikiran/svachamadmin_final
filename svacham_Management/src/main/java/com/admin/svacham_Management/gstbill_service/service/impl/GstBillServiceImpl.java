package com.admin.svacham_Management.gstbill_service.service.impl;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.admin.svacham_Management.gstbill_service.dto.GstBillRequestDTO;
import com.admin.svacham_Management.gstbill_service.dto.GstBillResponseDTO;
import com.admin.svacham_Management.gstbill_service.dto.GstBillSummaryDTO;
import com.admin.svacham_Management.gstbill_service.entity.GstBill;
import com.admin.svacham_Management.gstbill_service.repository.GstBillRepository;
import com.admin.svacham_Management.gstbill_service.service.GstBillService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GstBillServiceImpl implements GstBillService {

    private final GstBillRepository repository;

    @Override
    public GstBillResponseDTO create(GstBillRequestDTO request) {
        GstBill g = GstBill.builder()
                .vendorName(request.getVendorName())
                .billNumber(request.getBillNumber())
                .gstNumber(request.getGstNumber())
                .billAmt(request.getBillAmt())
                .gstPercentage(request.getGstPercentage())
                .billDate(request.getBillDate())
                .paymentMethod(request.getPaymentMethod())
                .status(request.getStatus())
                .notes(request.getNotes())
                .createdDate(LocalDateTime.now())
                .build();

        // assign sequential numeric id for ordering/display
        g.setSeq((int) (repository.count() + 1));

        BigDecimal gstAmt = calculateGst(g.getBillAmt(), g.getGstPercentage());
        g.setGstAmt(gstAmt);
        g.setTotalAmt(g.getBillAmt().add(gstAmt));

        GstBill saved = repository.save(g);
        return toDto(saved);
    }

    @Override
    public void deleteById(String id) {
        // find entity to discover its seq, delete it, then decrement seq of subsequent records
        GstBill toDelete = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("GstBill not found: " + id));
        Integer deletedSeq = toDelete.getSeq();
        repository.deleteById(id);
        if (deletedSeq != null) {
            List<GstBill> all = repository.findAll();
            List<GstBill> toUpdate = all.stream()
                    .filter(b -> b.getSeq() != null && b.getSeq() > deletedSeq)
                    .collect(Collectors.toList());
            for (GstBill b : toUpdate) {
                b.setSeq(b.getSeq() - 1);
                repository.save(b);
            }
        }
    }

    @Override
    public GstBillResponseDTO updateById(String id, GstBillRequestDTO request) {
        GstBill existing = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("GstBill not found: " + id));

        existing.setVendorName(request.getVendorName());
        existing.setBillNumber(request.getBillNumber());
        existing.setGstNumber(request.getGstNumber());
        existing.setBillAmt(request.getBillAmt());
        existing.setGstPercentage(request.getGstPercentage());
        existing.setBillDate(request.getBillDate());
        existing.setPaymentMethod(request.getPaymentMethod());
        existing.setStatus(request.getStatus());
        existing.setNotes(request.getNotes());

        BigDecimal gstAmt = calculateGst(existing.getBillAmt(), existing.getGstPercentage());
        existing.setGstAmt(gstAmt);
        existing.setTotalAmt(existing.getBillAmt().add(gstAmt));

        GstBill saved = repository.save(existing);
        return toDto(saved);
    }

    @Override
    public List<GstBillResponseDTO> getAllSortedByStatus() {
        List<GstBill> all = repository.findAll(Sort.by(Sort.Direction.ASC, "status"));
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public GstBillSummaryDTO getSummary() {
        List<GstBill> all = repository.findAll();
        long totalBills = all.size();
        BigDecimal totalBillAmount = all.stream()
                .map(GstBill::getBillAmt)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalGstAmount = all.stream()
                .map(GstBill::getGstAmt)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal totalAmountWithGst = all.stream()
                .map(GstBill::getTotalAmt)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Long> byStatus = all.stream()
                .filter(b -> b.getStatus() != null)
                .collect(Collectors.groupingBy(b -> b.getStatus().toLowerCase(), Collectors.counting()));

        return GstBillSummaryDTO.builder()
                .totalBills(totalBills)
                .totalBillAmount(totalBillAmount)
                .totalGstAmount(totalGstAmount)
                .totalAmountWithGst(totalAmountWithGst)
                .billsByStatus(byStatus)
                .build();
    }

    @Override
    public GstBillResponseDTO findById(String id) {
        GstBill b = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("GstBill not found: " + id));
        return toDto(b);
    }

    @Override
    public List<GstBillResponseDTO> getAll() {
        List<GstBill> all = repository.findAll();
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    private GstBillResponseDTO toDto(GstBill b) {
        return GstBillResponseDTO.builder()
                .id(b.getId())
                .seq(b.getSeq())
                .vendorName(b.getVendorName())
                .billNumber(b.getBillNumber())
                .gstNumber(b.getGstNumber())
                .billAmt(b.getBillAmt())
                .gstAmt(b.getGstAmt())
                .gstPercentage(b.getGstPercentage())
                .totalAmt(b.getTotalAmt())
                .billDate(b.getBillDate())
                .paymentMethod(b.getPaymentMethod())
                .status(b.getStatus())
                .notes(b.getNotes())
                .createdDate(b.getCreatedDate())
                .build();
    }

    private BigDecimal calculateGst(BigDecimal billAmt, BigDecimal gstPercentage) {
        if (billAmt == null || gstPercentage == null) {
            return BigDecimal.ZERO;
        }
        BigDecimal gstAmt = billAmt.multiply(gstPercentage).divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        return gstAmt;
    }

}

