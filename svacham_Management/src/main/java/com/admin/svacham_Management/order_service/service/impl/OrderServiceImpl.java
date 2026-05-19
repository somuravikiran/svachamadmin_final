package com.admin.svacham_Management.order_service.service.impl;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.admin.svacham_Management.client_service.repository.ClientRepository;
import com.admin.svacham_Management.order_service.dto.OrderItemRequestDTO;
import com.admin.svacham_Management.order_service.dto.OrderItemResponseDTO;
import com.admin.svacham_Management.order_service.dto.OrderRequestDTO;
import com.admin.svacham_Management.order_service.dto.OrderResponseDTO;
import com.admin.svacham_Management.order_service.dto.OrderSummaryDTO;
import com.admin.svacham_Management.order_service.entity.Order;
import com.admin.svacham_Management.order_service.entity.OrderItem;
import com.admin.svacham_Management.order_service.repository.OrderRepository;
import com.admin.svacham_Management.order_service.service.OrderService;
// removed direct dependency on Stock to decouple order and stock services

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    @Autowired
    private final OrderRepository repository;

    @Autowired
    private final ClientRepository clientRepository;

    // stockRepository removed - orders no longer modify stock

    @Override
    public OrderResponseDTO create(OrderRequestDTO request) {
        // validate client
        var client = clientRepository.findById(request.getClientId()).orElseThrow(() -> new IllegalArgumentException("Client not found: " + request.getClientId()));

        // build order items (no stock updates here - decoupled)
        List<OrderItem> items = request.getItems().stream().map(this::toEntityItem).collect(Collectors.toList());

        BigDecimal total = BigDecimal.ZERO;
        for (OrderItem it : items) {
            it.setSubtotal(nullSafe(it.getUnitPrice()).multiply(BigDecimal.valueOf(it.getQuantity() == null ? 0 : it.getQuantity())));
            total = total.add(it.getSubtotal());
        }

        Order o = Order.builder()
                .clientId(client.getId())
                .clientName(client.getClientName())
                .orderDate(request.getOrderDate())
                .deliveryDate(request.getDeliveryDate())
                .items(items)
                .paidAmt(nullSafe(request.getPaidAmt()))
                .totalAmt(total)
                .orderStatus(request.getOrderStatus())
                .createdAt(LocalDateTime.now())
                .build();

        o.setSeq((int) (repository.count() + 1));
        o.setPendingAmt(nullSafe(o.getTotalAmt()).subtract(nullSafe(o.getPaidAmt())));
        o.setUpdatedAt(o.getCreatedAt());
        Order saved = repository.save(o);
        return toDto(saved);
    }

    @Override
    public void deleteById(String id) {
        Order existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Order not found: " + id));
        // orders no longer modify stock; no stock restoration needed
        Integer deletedSeq = existing.getSeq();
        repository.deleteById(id);
        if (deletedSeq != null) {
            var all = repository.findAll();
            var toUpdate = all.stream().filter(o -> o.getSeq() != null && o.getSeq() > deletedSeq).collect(Collectors.toList());
            for (Order o : toUpdate) {
                o.setSeq(o.getSeq() - 1);
                repository.save(o);
            }
        }
    }

    @Override
    public OrderResponseDTO updateById(String id, OrderRequestDTO request) {
        Order existing = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Order not found: " + id));
        // previously orders adjusted stock; that behavior has been removed

        // process new items
        List<OrderItem> items = request.getItems().stream().map(this::toEntityItem).collect(Collectors.toList());
        BigDecimal total = BigDecimal.ZERO;
        for (OrderItem it : items) {
            // no stock validation here; external stock service is responsible for inventory
            it.setSubtotal(nullSafe(it.getUnitPrice()).multiply(BigDecimal.valueOf(it.getQuantity() == null ? 0 : it.getQuantity())));
            total = total.add(it.getSubtotal());
        }

        var client = clientRepository.findById(request.getClientId()).orElseThrow(() -> new IllegalArgumentException("Client not found: " + request.getClientId()));

        existing.setClientId(client.getId());
        existing.setClientName(client.getClientName());
        existing.setOrderDate(request.getOrderDate());
        existing.setDeliveryDate(request.getDeliveryDate());
        existing.setItems(items);
        existing.setPaidAmt(nullSafe(request.getPaidAmt()));
        existing.setTotalAmt(total);
        existing.setOrderStatus(request.getOrderStatus());
        existing.setPendingAmt(nullSafe(existing.getTotalAmt()).subtract(nullSafe(existing.getPaidAmt())));
        existing.setUpdatedAt(LocalDateTime.now());

        Order saved = repository.save(existing);
        return toDto(saved);
    }

    @Override
    public List<OrderResponseDTO> getAllSortedByStatus() {
        List<Order> all = repository.findAll(Sort.by(Sort.Direction.ASC, "orderStatus"));
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public OrderSummaryDTO getSummary() {
        List<Order> all = repository.findAll();
        long totalOrders = all.size();
        BigDecimal totalAmount = all.stream().map(Order::getTotalAmt).filter(Objects::nonNull).reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal totalPending = all.stream().map(Order::getPendingAmt).filter(Objects::nonNull).reduce(BigDecimal.ZERO, BigDecimal::add);
        Map<String, Long> byStatus = all.stream().filter(o -> o.getOrderStatus() != null).collect(Collectors.groupingBy(Order::getOrderStatus, Collectors.counting()));
        return OrderSummaryDTO.builder().totalOrders(totalOrders).totalAmount(totalAmount).totalPending(totalPending).byStatus(byStatus).build();
    }

    @Override
    public OrderResponseDTO getById(String id) {
        Order o = repository.findById(id).orElseThrow(() -> new IllegalArgumentException("Order not found: " + id));
        return toDto(o);
    }

    @Override
    public List<OrderResponseDTO> getAll() {
        List<Order> all = repository.findAll();
        return all.stream().map(this::toDto).collect(Collectors.toList());
    }

    private OrderItem toEntityItem(OrderItemRequestDTO dto) {
        OrderItem it = OrderItem.builder()
                .itemId(dto.getItemId())
                .pickleType(dto.getPickleType())
                .packSizeInKg(dto.getPackSizeInKg())
                .quantity(dto.getQuantity())
                .unitPrice(dto.getUnitPrice())
                .build();
        return it;
    }

    private OrderResponseDTO toDto(Order o) {
        List<OrderItemResponseDTO> items = o.getItems() == null ? List.of() : o.getItems().stream().map(it -> OrderItemResponseDTO.builder()
                .itemId(it.getItemId())
                .pickleType(it.getPickleType())
                .packSizeInKg(it.getPackSizeInKg())
                .quantity(it.getQuantity())
                .unitPrice(it.getUnitPrice())
                .subtotal(it.getSubtotal())
                .build()).collect(Collectors.toList());

        return OrderResponseDTO.builder()
                .id(o.getId())
                .seq(o.getSeq())
                .clientId(o.getClientId())
                .clientName(o.getClientName())
                .orderDate(o.getOrderDate())
                .deliveryDate(o.getDeliveryDate())
                .totalAmt(o.getTotalAmt())
                .paidAmt(o.getPaidAmt())
                .pendingAmt(o.getPendingAmt())
                .orderStatus(o.getOrderStatus())
                .items(items)
                .createdAt(o.getCreatedAt())
                .updatedAt(o.getUpdatedAt())
                .build();
    }

    private BigDecimal nullSafe(BigDecimal b) {
        return b == null ? BigDecimal.ZERO : b;
    }
}


