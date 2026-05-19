package com.admin.svacham_Management.client_service.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.admin.svacham_Management.client_service.dto.ClientRequestDTO;
import com.admin.svacham_Management.client_service.dto.ClientResponseDTO;
import com.admin.svacham_Management.client_service.dto.ClientSummaryDTO;
import com.admin.svacham_Management.client_service.entity.Client;
import com.admin.svacham_Management.client_service.repository.ClientRepository;
import com.admin.svacham_Management.client_service.service.ClientService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ClientServiceImpl implements ClientService {

    @Autowired
    private final ClientRepository repository;

    @Override
    public ClientResponseDTO create(ClientRequestDTO request) {
        Client c = Client.builder()
                .clientName(request.getClientName())
                .phoneNo(request.getPhoneNo())
                .address(request.getAddress())
                .city(request.getCity())
                .state(request.getState())
                .totalAmt(nullSafe(request.getTotalAmt()))
                .amtPaid(nullSafe(request.getAmtPaid()))
                .createdDate(LocalDateTime.now())
                .build();
        // assign sequential numeric id for ordering/display
        c.setSeq((int) (repository.count() + 1));
        // compute balance and initialize updatedDate same as createdDate
        c.setBalAmt(nullSafe(c.getTotalAmt()).subtract(nullSafe(c.getAmtPaid())));
        c.setUpdatedDate(c.getCreatedDate());
        Client saved = repository.save(c);
        return toDto(saved);
    }

    @Override
    public void deleteById(String id) {
        // find the entity to discover its seq value, delete it, then decrement seq of subsequent records
        Client toDelete = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Client not found: " + id));
        Integer deletedSeq = toDelete.getSeq();
        repository.deleteById(id);
        if (deletedSeq != null) {
            List<Client> all = repository.findAll();
            List<Client> toUpdate = all.stream()
                    .filter(c -> c.getSeq() != null && c.getSeq() > deletedSeq)
                    .collect(Collectors.toList());
            for (Client c : toUpdate) {
                c.setSeq(c.getSeq() - 1);
                repository.save(c);
            }
        }
    }

    @Override
    public ClientResponseDTO updateById(String id, ClientRequestDTO request) {
        Client existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Client not found: " + id));
        existing.setClientName(request.getClientName());
        existing.setPhoneNo(request.getPhoneNo());
        existing.setAddress(request.getAddress());
        existing.setCity(request.getCity());
        existing.setState(request.getState());
        existing.setTotalAmt(nullSafe(request.getTotalAmt()));
        existing.setAmtPaid(nullSafe(request.getAmtPaid()));
        // recalculate balance and set updated timestamp
        existing.setBalAmt(nullSafe(existing.getTotalAmt()).subtract(nullSafe(existing.getAmtPaid())));
        existing.setUpdatedDate(LocalDateTime.now());
        Client saved = repository.save(existing);
        return toDto(saved);
    }

    @Override
    public List<ClientResponseDTO> getAllSortedByState() {
        List<Client> all = repository.findAll(Sort.by(Sort.Direction.ASC, "state"));
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public ClientSummaryDTO getSummary() {
        List<Client> all = repository.findAll();
        long totalClients = all.size();
        BigDecimal totalAmount = all.stream()
                .map(Client::getTotalAmt)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalPaid = all.stream()
                .map(Client::getAmtPaid)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalBalance = all.stream()
                .map(Client::getBalAmt)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        Map<String, Long> byState = all.stream()
                .filter(c -> c.getState() != null)
                .collect(Collectors.groupingBy(Client::getState, Collectors.counting()));

        return ClientSummaryDTO.builder()
                .totalClients(totalClients)
                .totalAmount(totalAmount)
                .totalPaid(totalPaid)
                .totalBalance(totalBalance)
                .clientsByState(byState)
                .build();
    }

    @Override
    public ClientResponseDTO findById(String id) {
        Client c = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Client not found: " + id));
        return toDto(c);
    }

    @Override
    public List<ClientResponseDTO> getAll() {
        List<Client> all = repository.findAll();
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    private ClientResponseDTO toDto(Client c) {
        return ClientResponseDTO.builder()
                .id(c.getId())
                .seq(c.getSeq())
                .clientName(c.getClientName())
                .phoneNo(c.getPhoneNo())
                .address(c.getAddress())
                .city(c.getCity())
                .state(c.getState())
                .totalAmt(c.getTotalAmt())
                .amtPaid(c.getAmtPaid())
                .balAmt(c.getBalAmt())
                .createdDate(c.getCreatedDate())
                .updatedDate(c.getUpdatedDate())
                .build();
    }

    private BigDecimal nullSafe(BigDecimal b) {
        return b == null ? BigDecimal.ZERO : b;
    }
}


