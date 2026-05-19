package com.admin.svacham_Management.bankdetails_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.admin.svacham_Management.bankdetails_service.entity.BankDetails;

@Repository
public interface BankDetailsRepository extends MongoRepository<BankDetails, String> {

}

