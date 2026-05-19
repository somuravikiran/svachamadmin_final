package com.admin.svacham_Management.gstbill_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.admin.svacham_Management.gstbill_service.entity.GstBill;

@Repository
public interface GstBillRepository extends MongoRepository<GstBill, String> {

}

