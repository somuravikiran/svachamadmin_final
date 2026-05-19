package com.admin.svacham_Management.stock_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.admin.svacham_Management.stock_service.entity.Stock;

@Repository
public interface StockRepository extends MongoRepository<Stock, String> {

}

