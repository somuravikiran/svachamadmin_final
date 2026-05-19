package com.admin.svacham_Management;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories(basePackages = "com.admin.svacham_Management")
public class SvachamManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(SvachamManagementApplication.class, args);
	}

}
