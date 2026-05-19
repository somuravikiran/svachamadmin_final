package com.admin.svacham_Management.salary_service.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.admin.svacham_Management.salary_service.entity.Salary;

@Repository
public interface SalaryRepository extends MongoRepository<Salary, String> {

}

