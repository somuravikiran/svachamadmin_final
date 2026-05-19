package com.admin.svacham_Management.gstbill_service.service;

import java.util.List;

import com.admin.svacham_Management.gstbill_service.dto.GstBillRequestDTO;
import com.admin.svacham_Management.gstbill_service.dto.GstBillResponseDTO;
import com.admin.svacham_Management.gstbill_service.dto.GstBillSummaryDTO;

public interface GstBillService {

    GstBillResponseDTO create(GstBillRequestDTO request);

    void deleteById(String id);

    GstBillResponseDTO updateById(String id, GstBillRequestDTO request);

    List<GstBillResponseDTO> getAllSortedByStatus();

    GstBillSummaryDTO getSummary();

    GstBillResponseDTO findById(String id);

    List<GstBillResponseDTO> getAll();

}

