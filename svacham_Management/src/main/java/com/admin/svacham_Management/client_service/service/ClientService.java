package com.admin.svacham_Management.client_service.service;

import java.util.List;

import com.admin.svacham_Management.client_service.dto.ClientRequestDTO;
import com.admin.svacham_Management.client_service.dto.ClientResponseDTO;
import com.admin.svacham_Management.client_service.dto.ClientSummaryDTO;

public interface ClientService {

    ClientResponseDTO create(ClientRequestDTO request);

    void deleteById(String id);

    ClientResponseDTO updateById(String id, ClientRequestDTO request);

    List<ClientResponseDTO> getAllSortedByState();

    ClientSummaryDTO getSummary();

    ClientResponseDTO findById(String id);

    List<ClientResponseDTO> getAll();

}

