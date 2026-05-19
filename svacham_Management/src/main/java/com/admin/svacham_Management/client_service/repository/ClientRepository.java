package com.admin.svacham_Management.client_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.admin.svacham_Management.client_service.entity.Client;

@Repository
public interface ClientRepository extends MongoRepository<Client, String> {

}

