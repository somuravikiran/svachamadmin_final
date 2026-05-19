package com.admin.svacham_Management.spending_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.admin.svacham_Management.spending_service.entity.Spending;

@Repository
public interface SpendingRepository extends MongoRepository<Spending, String> {

}

