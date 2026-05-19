package com.admin.svacham_Management.order_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.admin.svacham_Management.order_service.entity.Order;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {

}

