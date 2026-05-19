package com.admin.svacham_Management.stockitem_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.admin.svacham_Management.stockitem_service.entity.StockItem;

@Repository
public interface StockItemRepository extends MongoRepository<StockItem, String> {

}

